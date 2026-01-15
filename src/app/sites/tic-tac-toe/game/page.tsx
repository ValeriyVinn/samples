// app/sites/tic-tac-toe/game/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./game.module.css";

type Cell = "T" | "М" | null;

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board: Cell[]): Cell | "draw" | null {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every((cell) => cell !== null)) {
    return "draw";
  }

  return null;
}

export default function TicTacToeGamePage() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Cell | "draw" | null>(null);

  function handleClick(index: number) {
    if (!isPlayerTurn || board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = "T";
    const result = checkWinner(newBoard);

    setBoard(newBoard);
    setWinner(result);
    setIsPlayerTurn(false);

    if (!result) {
      setTimeout(() => computerMove(newBoard), 500);
    }
  }

  function computerMove(currentBoard: Cell[]) {
    const emptyCells = currentBoard
      .map((cell, i) => (cell === null ? i : null))
      .filter((i) => i !== null) as number[];

    if (emptyCells.length === 0) return;

    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const newBoard = [...currentBoard];
    newBoard[randomIndex] = "М";

    const result = checkWinner(newBoard);

    setBoard(newBoard);
    setWinner(result);
    setIsPlayerTurn(true);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  }

  return (
    <main className={styles.container}>
      <h1>ТаМіки</h1>

      <div className={styles.grid}>
        {board.map((cell, i) => (
          <button
            key={i}
            className={styles.cell}
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <p className={styles.result}>
          {winner === "draw"
            ? "Нічия 🤝"
            : winner === "T"
            ? "Я переміг 🎉"
            : "Перемогла Міла 🤖"}
        </p>
      )}

      <button onClick={resetGame} className={styles.reset}>
        Почати спочатку
      </button>

      <Link href="/sites/tic-tac-toe" className={styles.link}>
        ← Назад до правил
      </Link>
    </main>
  );
}

