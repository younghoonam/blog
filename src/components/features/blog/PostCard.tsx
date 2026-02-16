/**
 * Post card component for displaying a post in the list.
 */
import { Link } from 'react-router-dom'
import { memo, startTransition } from 'react'
import { getPostModule } from '@/lib/posts'
import HoverUnderline from '@/components/HoverUnderline/HoverUnderline'
import UniversalDate from '@/components/UniversalDate'
import type { PostMetadata, Lang } from '@/types'
import styles from '@/pages/IndexPage.module.css'

interface PostCardProps {
  post: PostMetadata
  lang: Lang
}

function PostCard({ post, lang }: PostCardProps) {
  const handleMouseEnter = () => {
    // Prefetch post content on hover
    startTransition(() => {
      getPostModule(post.slug, lang).catch(() => {
        // Silently fail prefetch
      })
    })
  }

  return (
    <Link
      className={styles.link}
      to={`/${lang}/${post.slug}`}
      onMouseEnter={handleMouseEnter}
    >
      <UniversalDate date={post.date} lang={lang} />
      <HoverUnderline>
        <h2 className={styles.title}>{post.title}</h2>
      </HoverUnderline>
    </Link>
  )
}

export default memo(PostCard)
