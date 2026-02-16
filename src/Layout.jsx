import { Outlet, useParams } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

export default function Layout() {
  const { lang } = useParams()
  return (
    <>
      <Header lang={lang || 'en'} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
