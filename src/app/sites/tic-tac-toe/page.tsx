// app/sites/tic-tac-toe/page.tsx
import Link from "next/link";
import styles from "./page.module.css";

export default function TicTacToeRulesPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.hone }> «ТаМіки»</h1>
<h2 className={styles.htwo }>Наша гра</h2>
      <p>
        «ТаМіки» — це логічна гра для двох гравців, Тараса і Міли.
        Гравці по черзі ставлять (Т) або (М)
        на полі 3×3. Перемагає той, хто першим вибудує
        три свої символи в ряд — по горизонталі, вертикалі
        або діагоналі.
      </p>

      <Link href="/sites/tic-tac-toe/game" className={styles.link}>
        ▶ Перейти до гри
      </Link>
    </main>
  );
}