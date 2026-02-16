import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
import react from '@vitejs/plugin-react'
import blogMetadataPlugin from './vite-plugin-blog-metadata.js'
import mdx from '@mdx-js/rollup'
import rehypePrism from 'rehype-prism-plus'
import rehypeKatex from 'rehype-katex'
import rehypeClassNames from 'rehype-class-names'
import remarkMath from 'remark-math'
import remarkFrontmatter from 'remark-frontmatter'
import { visit } from 'unist-util-visit'

function remarkEscapeMath() {
  return (tree) => {
    visit(tree, 'math', (node) => {
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
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
