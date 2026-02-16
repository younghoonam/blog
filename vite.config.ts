import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import blogMetadataPlugin from './vite-plugin-blog-metadata.js'
import mdx from '@mdx-js/rollup'
import rehypePrism from 'rehype-prism-plus'
import rehypeKatex from 'rehype-katex'
import rehypeClassNames from 'rehype-class-names'
import remarkMath from 'remark-math'
import remarkFrontmatter from 'remark-frontmatter'
import { visit } from 'unist-util-visit'
import type { Plugin } from 'vite'
import type { Root } from 'mdast'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function remarkEscapeMath() {
  return (tree: Root) => {
    visit(tree, 'math', (node: any) => {
      node.value = node.value.replace(/\{/g, '\\{').replace(/\}/g, '\\}')
    })
  }
}

export default defineConfig({
  plugins: [
    blogMetadataPlugin(),
    react(),
    mdx({
      providerImportSource: '@mdx-js/react',
      rehypePlugins: [
        rehypeKatex,
        [rehypeClassNames, { code: 'inlineCode' }],
        [rehypePrism, { showLineNumbers: true }],
      ],
      remarkPlugins: [remarkEscapeMath, remarkMath, remarkFrontmatter],
    }) as Plugin,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    // Let Vite handle chunk splitting automatically
    // Only add manual chunks if analysis shows specific issues:
    // - Duplication across chunks
    // - Massive vendor bundle
    // - Hydration issues
  },
})
