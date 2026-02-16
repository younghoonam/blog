import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { MDXProvider } from '@mdx-js/react'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'
import './index.css'

function LayoutWrapper() {
  const location = useLocation()
  if (location.pathname === '/') {
    const preferred = (navigator.language || '').split('-')[0]
    const lang = preferred === 'ko' ? 'ko' : 'en'
    return <Navigate to={`/${lang}`} replace />
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function App() {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <MDXProvider>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route path=":lang" element={<IndexPage />} />
          <Route path=":lang/:slug" element={<PostPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </MDXProvider>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
