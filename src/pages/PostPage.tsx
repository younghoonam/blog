/**
 * Post page - displays a single blog post.
 */
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePost } from '@/hooks/usePost'
import { isValidLang } from '@/utils/routing'
import { usePostList } from '@/hooks/usePosts'
import HoverUnderline from '@/components/HoverUnderline/HoverUnderline'
import UniversalDate from '@/components/UniversalDate'
import PostContent from '@/components/features/blog/PostContent'
import type { Lang } from '@/types'
import styles from './PostPage.module.css'

export default function PostPage() {
  const params = useParams<{ lang?: string; slug?: string }>()
  const lang = params.lang
  const slug = params.slug

  const { Content, metadata, error, loading } = usePost(slug, lang as Lang | undefined)
  const postList = usePostList()
  const exists = postList.some((p) => p.slug === slug && p.lang === lang)

  const validLang = isValidLang(lang)
  const title = metadata?.title || slug || ''
  const date = metadata?.date || ''

  useEffect(() => {
    document.title = title ? `${title} | Younghoo Nam` : 'Younghoo Nam | 남영후'
    return () => {
      document.title = 'Younghoo Nam | 남영후'
    }
  }, [title])

  if (!validLang) {
    return (
      <article>
        <p>Invalid language.</p>
        <Link to="/en">Go to blog</Link>
      </article>
    )
  }

  if (error || (!exists && !loading)) {
    return (
      <article>
        <p>{error || 'Post not found'}</p>
        <Link to={`/${lang}`}>Go back</Link>
      </article>
    )
  }

  if (loading || !Content) {
    return <article>Loading...</article>
  }

  return (
    <article>
      <div className={styles.MDXWrapper}>
        <Link className={styles.backButton} to={`/${lang}`}>
          <HoverUnderline lineWidth="3px">
            <span>{lang === 'ko' ? '뒤로 돌아가기' : 'Go Back'}</span>
          </HoverUnderline>
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <UniversalDate date={date} lang={lang} />
        <PostContent Content={Content} />
      </div>
    </article>
  )
}
