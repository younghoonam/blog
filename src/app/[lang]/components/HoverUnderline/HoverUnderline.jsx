import styles from "./HoverUnderline.module.css";

export default function HoverUnderline({ children, className, lineWidth = "5px" }) {
  return (
    <div className={styles.wrapper + " " + className}>
      {children}
      <span style={{ height: lineWidth }} className={styles.underline}></span>
    </div>
  );
}
