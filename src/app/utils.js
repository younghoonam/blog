import fs from "fs/promises";
import path from "path";
import dynamic from "next/dynamic";
import rehypePrism from "rehype-prism-plus";
import { compileMDX } from "next-mdx-remote/rsc";

function parseFrontmatter(fileContent) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { metadata: {}, content: fileContent.trim() };
  }

  let frontMatterBlock = match[1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim()] = value;
  });

  return { metadata, content };
}

export async function getPostData(lang, slug) {
  const dir = path.join(process.cwd(), "src", "app", "[lang]", "[slug]", "content");

  try {
    const folders = await fs.readdir(dir);
    const projectDirectories = folders.map((folder) => path.join(dir, folder));

    const filteredPostDirs = (
      await Promise.all(
        projectDirectories.map(async (projectDir) => {
          const files = await fs.readdir(projectDir);
          return files
            .filter((file) => file.endsWith(`.${lang}.mdx`))
            .map((file) => path.join(projectDir, file));
        })
      )
    ).flat(); // Flatten the array of arrays

    const postContent = await Promise.all(
      filteredPostDirs.map(async (filePath) => {
        const content = await fs.readFile(filePath, "utf-8");
        return parseFrontmatter(content);
      })
    );

    if (slug) {
      return postContent.find((post) => post.metadata.slug === slug);
    }

    postContent.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
    return postContent;
  } catch (error) {
    console.error("Error reading post data:", error);
    return null; // Handle errors gracefully
  }
}

export function extractMDXImports(mdxContent) {
  const importRegex = /^import\s+\{([^}]+)\}\s+from\s+["'](.+?)["'];?/gm;
  const imports = {};

  let match;
  while ((match = importRegex.exec(mdxContent)) !== null) {
    const components = match[1].split(",").map((c) => c.trim());
    const importPath = match[2];

    components.forEach((component) => {
      imports[component] = importPath;
    });
  }

  return imports;
}

export async function getMDXComponents(mdxContent, mdxFilePath) {
  const importMap = extractMDXImports(mdxContent);
  const components = {};

  for (const [name, relativePath] of Object.entries(importMap)) {
    try {
      // Convert file path to a valid dynamic import path
      const modulePath = relativePath.replace(/^\.\/|^\//, ""); // Remove leading "./" or "/"
      console.log(modulePath);

      components[name] = dynamic(
        async () => await import(`@/app/[lang]/[slug]/content/${mdxFilePath}/${modulePath}`)
      );
    } catch (error) {
      console.warn(`⚠️ Error processing component ${name}: ${error.message}`);
    }
  }

  return components;
}

export async function getCompiledMDXData(lang, slug, components) {
  const dir = path.join(
    process.cwd(),
    `/src/app/[lang]/[slug]/content/${slug}/${slug}.${lang}.mdx`
  );
  const { content, frontmatter } = await compileMDX({
    source: await fs.readFile(dir),
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrism, { showLineNumbers: true }]], // Enable syntax highlighting
      },
    },
    components: components,
  });
  return content;
}
