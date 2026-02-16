/**
 * Post content wrapper component.
 */
import { memo } from 'react'
import type { ComponentType } from 'react'
import styles from '@/pages/PostPage.module.css'

interface PostContentProps {
  Content: ComponentType
}

function PostContent({ Content }: PostContentProps) {
  return (
    <div className={styles.MDXContentWrapper + ' MDXContentWrapper'}>
      <Content />
    </div>
  )
}

export default memo(PostContent)
