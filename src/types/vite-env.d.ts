/// <reference types="vite/client" />

/**
 * Vite-specific type declarations for virtual modules and glob imports.
 */

import type { PostMetadata } from './index'

declare module 'virtual:blog-posts-metadata' {
  const postsMetadata: PostMetadata[]
  export default postsMetadata
}

interface ImportMetaGlob {
  (
    pattern: string,
    options?: {
      eager?: boolean
      query?: string
      import?: string
    }
  ): Record<string, () => Promise<any> | any>
}

interface ImportMeta {
  readonly glob: ImportMetaGlob
}
