/**
 * MDX module type declarations.
 */

import type { ComponentType } from 'react'

export interface MDXModule {
  default: ComponentType<any>
  frontmatter?: Record<string, any>
  [key: string]: any
}

declare module '*.mdx' {
  const Component: ComponentType<any>
  export default Component
}

declare module '*.md' {
  const Component: ComponentType<any>
  export default Component
}
