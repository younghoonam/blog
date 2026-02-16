/**
 * Loading skeleton component for post content.
 */
import styles from '@/pages/PostPage.module.css'

export function PostLoadingSkeleton() {
  return (
    <article>
      <div className={styles.MDXWrapper}>
        <div className={styles.backButton} style={{ opacity: 0.5 }}>
          <span>Go Back</span>
        </div>
        <div style={{ height: '2rem', width: '60%', background: 'var(--background-secondary)', marginBottom: '1rem', borderRadius: '0.3em' }} />
        <div style={{ height: '1rem', width: '20%', background: 'var(--background-secondary)', marginBottom: '5rem', borderRadius: '0.3em' }} />
        <div className={styles.MDXContentWrapper}>
          <div style={{ height: '20rem', background: 'var(--background-secondary)', borderRadius: '0.3em' }} />
        </div>
      </div>
    </article>
  )
}

export function PostListSkeleton() {
  return (
    <main style={{ maxWidth: '45rem', marginInline: 'auto' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ margin: '3rem 0' }}>
          <div style={{ height: '0.8rem', width: '10%', background: 'var(--background-secondary)', marginBottom: '0.8rem', borderRadius: '0.3em' }} />
          <div style={{ height: '2rem', width: '80%', background: 'var(--background-secondary)', borderRadius: '0.3em' }} />
        </div>
      ))}
    </main>
  )
}
