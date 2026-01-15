import Link from "next/link";
import styles from "./Menu.module.css";

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <Link href="/" className={styles.link}>
        Home
      </Link>
      <Link href="/page-1" className={styles.link}>
        Item 1
      </Link>
      <Link href="/page-2" className={styles.link}>
        Item 2
      </Link>
    </nav>
  );
}
