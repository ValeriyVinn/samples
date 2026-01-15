import styles from "./page.module.css";

export default function PageTwo() {
  return (
    <>
      <h1>Page 2</h1>
      <p className={styles.text}>
        Друга сторінка для експериментів або іншого розділу.
      </p>
    </>
  );
}
