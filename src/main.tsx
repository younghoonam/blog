/**
 * Application entry point with lazy loading and error boundaries.
 */
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { MDXProvider } from '@mdx-js/react'
import Layout from './components/layout/Layout'
import NotFound from './pages/NotFound'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { PostLoadingSkeleton, PostListSkeleton } from './components/ui/LoadingSkeleton'
import { getDefaultLang } from './utils/routing'
import './index.css'

// Lazy load page components for code splitting
const IndexPage = lazy(() => import('./pages/IndexPage'))
const PostPage = lazy(() => import('./pages/PostPage'))

function LayoutWrapper() {
  const location = useLocation()
  if (location.pathname === '/') {
    const lang = getDefaultLang()
    return <Navigate to={`/${lang}`} replace />
  }
  return <Layout />
}

function App() {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
      <MDXProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LayoutWrapper />}>
              <Route
                path=":lang"
                element={
                  <Suspense fallback={<PostListSkeleton />}>
                    <IndexPage />
                  </Suspense>
                }
              />
              <Route
                path=":lang/:slug"
                element={
                  <Suspense fallback={<PostLoadingSkeleton />}>
                    <PostPage />
                  </Suspense>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </MDXProvider>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
