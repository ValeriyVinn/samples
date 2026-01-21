"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const answers = ["A7:A10", "B2", "D6", "D10:F10", "G4", "J1:J3", "J10"];

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
  /* ===== Електронна таблиця ===== */

  const [shopName, setShopName] = useState("");

  const [products, setProducts] = useState(
    Array.from({ length: 5 }, () => ({
      name: "",
      price: "",
      qty: "",
      formula: "",
      correct: false,
    })),
  );

  const [totalFormula, setTotalFormula] = useState("");
  const [totalCorrect, setTotalCorrect] = useState(false);

  const checkProductFormula = (index: number) => {
    const row = products[index];
    const expected = `=B${index + 3}*C${index + 3}`;

    const updated = [...products];
    updated[index].correct = row.formula.replace(/\s/g, "") === expected;
    setProducts(updated);
  };

  const checkTotalFormula = () => {
    const filledRows = products
      .map((p, i) => (p.name && p.price && p.qty ? `D${i + 3}` : null))
      .filter(Boolean);

    if (filledRows.length === 0) {
      setTotalCorrect(false);
      return;
    }

    const expected = "=" + filledRows.join("+");

    setTotalCorrect(totalFormula.replace(/\s/g, "") === expected);
  };

  const filledProducts = products.filter(
    (p) => p.name && p.price && p.qty,
  ).length;

  let tableScore = 0;

  if (shopName.trim()) tableScore += 1;

  if (filledProducts >= 1 && filledProducts <= 2) tableScore += 2;
  if (filledProducts === 3) tableScore += 3;
  if (filledProducts > 3) tableScore += 4;

  products.forEach((p) => {
    if (p.correct) tableScore += 2;
  });

  if (totalCorrect) tableScore += 2;

  /* ===== Загальна оцінка ===== */
  const totalScore = quizSum + theoryScore + tableScore;

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

      <h2 className={styles.headerTwo}>Завдання 2. Список покупок</h2>
      <div>Створіть таблицю за інструкцією</div>
      <ol>
        <li>У таблиці введіть назву магазину.</li>
        <li>
          Оберіть декілька товарів (не менше трьох), введіть їх назву (стовпчик
          A), ціну за штуку в гривнях (стовпчик В), та кількість штук товару
          такого виду (стовпчик С).
        </li>
        <li>
          У клітинці D2 напишіть формулу для автоматичного обчислення загальної
          вартості товару одного виду.
        </li>
        <li>
          За зразком складіть формули для інших видів товарів у вашій таблиці. У
          клітинці D13 напишіть формулу, яка обчислить автоматично повну суму,
          яку ви повинні заплатити за товар.
        </li>
      </ol>

      <h3 className={styles.headerTwo}>Електронна таблиця</h3>

      <div className={styles.sheet}>
        <table className={styles.excel}>
          <thead>
            <tr>
              <th></th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
            </tr>
          </thead>

          <tbody>
            {/* ===== Row 1 ===== */}
            <tr>
              <th>1</th>
              <td colSpan={2}>Назва магазину</td>
              <td colSpan={2}>
                <input
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />
              </td>
              <td></td>
            </tr>

            {/* ===== Row 2 ===== */}
            <tr>
              <th>2</th>
              <td>Назва товару</td>
              <td>Ціна за 1 шт, грн</td>
              <td>Кількість</td>
              <td>Формула</td>
              <td></td>
            </tr>

            {/* ===== Rows 3–7 ===== */}
            {products.map((p, i) => (
              <tr key={i}>
                <th>{i + 3}</th>

                <td>
                  <input
                    placeholder={i === 0 ? "Ручка кулькова, чорна" : ""}
                    value={p.name}
                    onChange={(e) => {
                      const copy = [...products];
                      copy[i].name = e.target.value;
                      setProducts(copy);
                    }}
                  />
                </td>

                <td>
                  <input
                    value={p.price}
                    onChange={(e) => {
                      const copy = [...products];
                      copy[i].price = e.target.value;
                      setProducts(copy);
                    }}
                  />
                </td>

                <td>
                  <input
                    value={p.qty}
                    onChange={(e) => {
                      const copy = [...products];
                      copy[i].qty = e.target.value;
                      setProducts(copy);
                    }}
                  />
                </td>

                <td>
                  <input
                    // placeholder={`=B${i + 3}*C${i + 3}`}
                    value={p.formula}
                    onChange={(e) => {
                      const copy = [...products];
                      copy[i].formula = e.target.value;
                      setProducts(copy);
                    }}
                    onBlur={() => checkProductFormula(i)}
                  />
                </td>

                <td>{p.correct && "вірно"}</td>
              </tr>
            ))}

            {/* ===== Row 8 ===== */}
            <tr>
              <th>8</th>
              <td colSpan={3}>Загальна вартість покупки:</td>
              <td>
                <input
                  // placeholder="=D3+D4"
                  value={totalFormula}
                  onChange={(e) => setTotalFormula(e.target.value)}
                  onBlur={checkTotalFormula}
                />
              </td>
              <td>{totalCorrect && "вірно"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.sum}>Оцінка блоку: {tableScore}</div>
    </div>
  );
}
