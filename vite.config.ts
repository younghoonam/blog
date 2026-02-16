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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core - MUST be together (React and React-DOM)
          // These are tightly coupled and should never be split
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-core'
          }
          // React Router - depends on React
          // Rollup's dependency analysis ensures react-core loads first
          if (id.includes('node_modules/react-router')) {
            return 'react-router-vendor'
          }
          // React-dependent UI libraries
          // These can be separate chunks; Rollup handles load order
          if (id.includes('node_modules/next-themes')) {
            return 'react-ui-vendor'
          }
          // MDX React runtime - depends on React
          if (id.includes('node_modules/@mdx-js/react')) {
            return 'mdx-runtime-vendor'
          }
          // MDX build tools (build-time only, not runtime)
          if (
            id.includes('node_modules/@mdx-js/mdx') ||
            id.includes('node_modules/@mdx-js/rollup') ||
            id.includes('node_modules/remark') ||
            id.includes('node_modules/rehype')
          ) {
            return 'mdx-build-vendor'
          }
          // Heavy content libraries (can be lazy-loaded)
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/d3') ||
            id.includes('node_modules/katex') ||
            id.includes('node_modules/@codesandbox')
          ) {
            return 'content-vendor'
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
