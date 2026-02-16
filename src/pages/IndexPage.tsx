/**
 * Index page - displays list of blog posts for a language.
 */
import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { usePostsByLang, usePostList } from '@/hooks/usePosts'
import { isValidLang } from '@/utils/routing'
import PortfolioLink from '@/components/Header/PortfolioLink'
import PostList from '@/components/features/blog/PostList'

export default function IndexPage() {
  const params = useParams<{ lang?: string }>()
  const lang = params.lang

  useEffect(() => {
    const title = lang === 'ko' ? '남영후 | Younghoo Nam' : 'Younghoo Nam | 남영후'
    document.title = title
  }, [lang])

  if (!isValidLang(lang)) {
    return <Navigate to="/en" replace />
  }

  const posts = usePostsByLang(lang)
  const fallbackPosts = usePostList()
    .filter((p) => p.lang === lang)
    .map((p) => ({ slug: p.slug, lang: p.lang, title: p.slug, date: '' }))

  const displayPosts = posts.length > 0 ? posts : fallbackPosts

  return (
    <>
      <PortfolioLink />
      <PostList posts={displayPosts} lang={lang} />
    </>
  )
}
