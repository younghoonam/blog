/**
 * Hook for fetching and filtering blog posts.
 */
import { useMemo } from 'react'
import { getPostsWithMetadataSync, getPostList } from '@/lib/posts'
import type { PostMetadata, Lang } from '@/types'

/**
 * Get all posts with metadata, memoized.
 */
export function usePostsMetadata(): PostMetadata[] {
  return useMemo(() => getPostsWithMetadataSync(), [])
}

/**
 * Get posts filtered by language, memoized.
 */
export function usePostsByLang(lang: Lang): PostMetadata[] {
  const allPosts = usePostsMetadata()
  return useMemo(() => {
    return allPosts.filter((post) => post.lang === lang)
  }, [allPosts, lang])
}

/**
 * Get post list (without metadata), memoized.
 */
export function usePostList() {
  return useMemo(() => getPostList(), [])
}
