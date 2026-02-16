/**
 * Post list component for displaying multiple posts.
 */
import { memo } from 'react'
import PostCard from './PostCard'
import type { PostMetadata, Lang } from '@/types'
import styles from '@/pages/IndexPage.module.css'

interface PostListProps {
  posts: PostMetadata[]
  lang: Lang
}

function PostList({ posts, lang }: PostListProps) {
  return (
    <main className={styles.indexWrapper}>
      {posts.map((post) => (
        <PostCard key={`${post.slug}-${post.lang}`} post={post} lang={lang} />
      ))}
    </main>
  )
}

export default memo(PostList)
