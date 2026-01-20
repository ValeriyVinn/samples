"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const answers = ["A7:A10", "B2", "D6", "D10:F10", "G4", "G1:G3", "J10"];

const slides = Array.from(
  { length: 10 },
  (_, i) => `/page-2/images/slide${i + 1}.jpg`,
);

export default function Page2() {
  /* ===== Морський бій ===== */
  const [inputs, setInputs] = useState<string[]>(Array(7).fill(""));
  const [checked, setChecked] = useState<boolean[]>(Array(7).fill(false));
  const [scores, setScores] = useState<number[]>(Array(7).fill(0));

  const checkAnswer = (index: number) => {
    if (checked[index]) return;

    const correct = inputs[index].trim().toUpperCase() === answers[index];
    const newChecked = [...checked];
    const newScores = [...scores];

    newChecked[index] = true;
    newScores[index] = correct ? 1 : -1;

    setChecked(newChecked);
    setScores(newScores);
  };

  const quizSum = scores.reduce((a, b) => a + b, 0);

  /* ===== Теорія (слайдер) ===== */
  const [slideIndex, setSlideIndex] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [theoryScore, setTheoryScore] = useState(0);
  const lastClickTime = useRef<number>(0);

  const changeSlide = (dir: number) => {
    const now = Date.now();

    if (now - lastClickTime.current >= 5000) {
      lastClickTime.current = now;
      setClicks((c) => c + 1);
    }

    setSlideIndex((prev) => {
      const next = prev + dir;
      if (next < 0 || next >= slides.length) return prev;
      return next;
    });
  };

  if (clicks > 5 && theoryScore === 0) {
    setTheoryScore(1);
  }

  /* ===== Загальна оцінка ===== */
  const totalScore = quizSum + theoryScore;

  return (
    <div className={styles.container}>
      <div className={styles.total}>Загальна оцінка: {totalScore}</div>

      <h1 className={styles.headerOne}>Урок 26</h1>

      <h2 className={styles.headerTwo}>Морський бій</h2>
      <div className={styles.navalContainer}>
        <Image
          className={styles.navalImage}
          src="/page-2/images/naval-battle.jpg"
          alt="Морський бій"
          width={500}
          height={500}
        />
        <div className={styles.quizz}></div>
        <div className={styles.quiz}>
          {answers.map((answer, i) => {
            const isCorrect =
              checked[i] && inputs[i].trim().toUpperCase() === answer;

            return (
              <div key={i} className={styles.row}>
                <div>{i + 1}</div>

                <input
                  value={inputs[i]}
                  disabled={checked[i]}
                  onChange={(e) => {
                    const copy = [...inputs];
                    copy[i] = e.target.value;
                    setInputs(copy);
                  }}
                  className={
                    checked[i]
                      ? isCorrect
                        ? styles.correct
                        : styles.wrong
                      : ""
                  }
                />

                <div className={styles.correctAnswer}>
                  {!isCorrect && checked[i] ? answer : ""}
                </div>

                <button onClick={() => checkAnswer(i)}>Відповісти</button>

                <div>{scores[i]}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.sum}>Оцінка блоку: {quizSum}</div>

      <h2 className={styles.headerTwo}>Теорія</h2>

      <div className={styles.slider}>
        <button onClick={() => changeSlide(-1)}>◀</button>

        <div className={styles.slideWrapper}>
          <Image src={slides[slideIndex]} alt="Слайд" fill />
        </div>

        <button onClick={() => changeSlide(1)}>▶</button>
      </div>

      <div className={styles.sum}>Оцінка блоку: {theoryScore}</div>
    </div>
  );
}
