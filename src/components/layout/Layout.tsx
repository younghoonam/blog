/**
 * Root layout component.
 */
import { Outlet, useParams } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { isValidLang } from '@/utils/routing'
import type { RouteParams } from '@/types'

export default function Layout() {
  const params = useParams<RouteParams>()
  const lang = isValidLang(params.lang) ? params.lang : 'en'
  return (
    <>
      <Header lang={lang} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
