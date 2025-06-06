import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copywrite}>© 2025 Younghoo Nam</div>
      <div className={styles.links}>
        <Link href={"https://www.github.com/younghoonam"} target="_blank">
          <img className={styles.icon} src="/icons/github-mark.svg"></img>
        </Link>
        <Link href={"https://www.instagram.com/younghoo_nam/"} target="_blank">
          <img className={styles.icon} src="/icons/Instagram_Glyph_Black.svg"></img>
        </Link>
      </div>
    </footer>
  );
}
