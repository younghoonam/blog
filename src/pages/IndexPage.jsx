import { useEffect, useState, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getPostsWithMetadata, getPostsWithMetadataSync, getPostList } from '../lib/posts'
import PortfolioLink from '../components/Header/PortfolioLink'
import HoverUnderline from '../components/HoverUnderline/HoverUnderline'
import UniversalDate from '../components/UniversalDate'
import styles from './IndexPage.module.css'

export default function IndexPage() {
  const { lang } = useParams()
  const [posts, setPosts] = useState([])

  const fallbackPosts = useMemo(() => {
    const list = getPostList().filter((p) => p.lang === lang)
    if (list.length > 0) return list.map((p) => ({ slug: p.slug, lang: p.lang, title: p.slug, date: '' }))
    return [
      { slug: 'bucket-hat', lang, title: 'Bucket Hat Pattern Generator', date: '2025-03-15' },
      { slug: 'marblie', lang, title: 'Marblie, a Marble Run Game', date: '2025-06-06' },
    ].filter((p) => p.lang === lang)
  }, [lang])

  const postsForLang = useMemo(() => {
    const all = getPostsWithMetadataSync()
    return all.filter((p) => p.lang === lang)
  }, [lang])

  useEffect(() => {
    setPosts(postsForLang.length > 0 ? postsForLang : fallbackPosts)
  }, [lang, postsForLang, fallbackPosts])

  useEffect(() => {
    document.title = lang === 'ko' ? '남영후 | Younghoo Nam' : 'Younghoo Nam | 남영후'
  }, [lang])

  if (lang !== 'en' && lang !== 'ko') {
    return <Navigate to="/en" replace />
  }

  const displayPosts = posts.length > 0 ? posts : (postsForLang.length > 0 ? postsForLang : fallbackPosts)

  return (
    <>
      <PortfolioLink />
      <main className={styles.indexWrapper}>
        {displayPosts.map((post) => (
          <Link className={styles.link} key={`${post.slug}-${post.lang}`} to={`/${lang}/${post.slug}`}>
            <UniversalDate date={post.date} lang={lang} />
            <HoverUnderline>
              <h2 className={styles.title}>{post.title}</h2>
            </HoverUnderline>
          </Link>
        ))}
      </main>
    </>
  )
}
