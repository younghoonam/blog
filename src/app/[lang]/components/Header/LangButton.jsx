"use client";
import styles from "./Header.module.css";
import { usePathname, useRouter } from "next/navigation";

export default function LangButton({ lang }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      className={styles.langButton}
      onClick={() => {
        router.replace(pathname.replace(`${lang}`, lang === "ko" ? "en" : "ko"));
      }}
    >
      {lang === "ko" ? "EN" : "KR"}
    </button>
  );
}
