/**
 * KaTeX equation renderer component.
 */
import katex from 'katex'
import { useEffect, useRef } from 'react'
import styles from './bucketHat.module.css'

interface KatexProps {
  equation: string
}

function Katex({ equation }: KatexProps) {
  const katexRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (katexRef.current) {
      katex.render(equation, katexRef.current)
    }
  }, [equation])
  return <span className={styles.latex} ref={katexRef}></span>
}

export default Katex
export { Katex }
