import styles from "./Header.module.css";
export default function PorfolioLink() {
  return (
    <a className={styles.portfolioLink} href="https://younghoonam.com">
      <span>
        Portfolio <span style={{ fontSize: "1rem" }}>🡕</span>
      </span>
    </a>
  );
}
