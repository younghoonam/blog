import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPostModule, getPostList, getPostsWithMetadata } from '../lib/posts'
import HoverUnderline from '../components/HoverUnderline/HoverUnderline'
import UniversalDate from '../components/UniversalDate'
import styles from './PostPage.module.css'

export default function PostPage() {
  const { lang, slug } = useParams()
  const [Content, setContent] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [error, setError] = useState(null)

  const validLang = lang === 'en' || lang === 'ko'
  const postList = getPostList()
  const exists = postList.some((p) => p.slug === slug && p.lang === lang)
  const title = (metadata && metadata.title) || slug || ''
  const date = (metadata && metadata.date) || ''

  useEffect(() => {
    if (!validLang || !slug || !exists) {
      setError(!exists ? 'Post not found' : 'Invalid language')
      return
    }
    setError(null)
    setContent(null)
    Promise.all([
      getPostModule(slug, lang),
      getPostsWithMetadata().then((list) => list.find((p) => p.slug === slug && p.lang === lang)),
    ])
      .then(([mod, meta]) => {
        const Component = mod?.default
        if (!Component || typeof Component !== 'function') {
          setError('Invalid post content')
          return
        }
        setContent(() => Component)
        setMetadata(meta || {})
      })
      .catch((err) => {
        setError(err?.message || 'Failed to load post')
      })
  }, [slug, lang, validLang, exists])

  useEffect(() => {
    document.title = title ? `${title} | Younghoo Nam` : 'Younghoo Nam | 남영후'
    return () => { document.title = 'Younghoo Nam | 남영후' }
  }, [title])

  if (!validLang) {
    return (
      <article>
        <p>Invalid language.</p>
        <Link to="/en">Go to blog</Link>
      </article>
    )
  }

  if (error) {
    return (
      <article>
        <p>{error}</p>
        <Link to={`/${lang}`}>Go back</Link>
      </article>
    )
  }

  if (!Content) {
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
        <div className={styles.MDXContentWrapper + ' MDXContentWrapper'}>
          <Content />
        </div>
      </div>
    </article>
  )
}
