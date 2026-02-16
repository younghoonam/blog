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
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React and React DOM together (avoid circular dependency)
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          // MDX and related
          if (
            id.includes('node_modules/@mdx-js') ||
            id.includes('node_modules/mdx') ||
            id.includes('node_modules/remark') ||
            id.includes('node_modules/rehype')
          ) {
            return 'mdx-vendor'
          }
          // Heavy content libraries
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/d3') ||
            id.includes('node_modules/katex') ||
            id.includes('node_modules/@codesandbox')
          ) {
            return 'content-vendor'
          }
          // Router
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor'
          }
          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
