import LangButton from "./LangButton";
import styles from "./Header.module.css";
import HoverUnderline from "../HoverUnderline/HoverUnderline";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header({ lang }) {
  return (
    <header>
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
          Younghoo Nam
        </Link>
        <div className={styles.toggleWrapper}>
          <HoverUnderline>
            <LangButton lang={lang} />
          </HoverUnderline>
          <HoverUnderline>
            <ThemeToggle />
          </HoverUnderline>
        </div>
      </div>
    </header>
  );
}
