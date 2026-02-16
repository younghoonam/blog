import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/en">Go to blog</Link>
    </main>
  )
}
