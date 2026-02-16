import styles from './UniversalDate.module.css'

export default function UniversalDate({ lang, date }) {
  return <span className={styles.date}>{date}</span>
}
