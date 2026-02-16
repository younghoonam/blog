import katex from "katex";
import { useEffect, useRef } from "react";
import styles from "./bucketHat.module.css";

function Katex({ equation }) {
  const katexRef = useRef();
  useEffect(() => {
    katex.render(equation, katexRef.current);
  });
  return <span className={styles.latex} ref={katexRef}></span>;
}

export default Katex;
export { Katex };
