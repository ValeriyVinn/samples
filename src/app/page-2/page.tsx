"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const answers = ["A7:A10", "B2", "D6", "D10:F10", "G4", "J1:J3", "J10"];

const slides = Array.from(
  { length: 2 },
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
    newScores[index] = correct ? 1 : 0;

    setChecked(newChecked);
    setScores(newScores);
  };

  const quizSum = scores.reduce((a, b) => a + b, 0);

  /* ===== Теорія (слайдер) ===== */

  const [slideIndex, setSlideIndex] = useState(0);
  const [theoryScore, setTheoryScore] = useState(0);

  const slideStartTime = useRef<number>(Date.now());
  const readSlides = useRef<Set<number>>(new Set());

  const changeSlide = (dir: number) => {
    const now = Date.now();
    const timeSpent = now - slideStartTime.current;

    // якщо на слайді були ≥ 5 секунд — зараховуємо
    if (timeSpent >= 5000) {
      readSlides.current.add(slideIndex);
    }

    setSlideIndex((prev) => {
      const next = prev + dir;
      if (next < 0 || next >= slides.length) return prev;
      return next;
    });

    // старт часу для нового слайду
    slideStartTime.current = now;
  };

  useEffect(() => {
    if (slideIndex === 1) {
      const timer = setTimeout(() => {
        readSlides.current.add(1);

        if (readSlides.current.size === 2 && theoryScore === 0) {
          setTheoryScore(1);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [slideIndex, theoryScore]);

  /* ===== Електронна таблиця ===== */

  const [shopName, setShopName] = useState("");

  const [] = useState(
    Array.from({ length: 5 }, () => ({
      name: "",
      price: "",
      qty: "",
      formula: "",
      correct: false,
    })),
  );

  const [totalFormulaText, setTotalFormulaText] = useState("");
  const [] = useState(false);

  /* ===== Завдання 1. Арифметика в Excel ===== */

  type ExcelTask = {
    row: number;
    a: number;
    b: number;
    op: string;
  };

  const excelTasks: ExcelTask[] = [
    { row: 2, a: 15, b: 20, op: "+" },
    { row: 4, a: 40, b: 15, op: "-" },
    { row: 6, a: 6, b: 7, op: "*" },
    { row: 8, a: 64, b: 8, op: "/" },
    { row: 10, a: 20, b: 200, op: "%" },
  ];

  const correctFormulas = ["=B2+D2", "=B4-D4", "=B6*D6", "=B8/D8", "=B10*D10"];

  const [answers1, setAnswers1] = useState<string[]>(
    Array(correctFormulas.length).fill(""),
  );

  const [correct1, setCorrect1] = useState<boolean[]>(
    Array(correctFormulas.length).fill(false),
  );

  const checkAnswer1 = (index: number) => {
    const user = answers1[index].replace(/\s+/g, "");
    const expected = correctFormulas[index];

    const copy = [...correct1];
    copy[index] = user === expected;
    setCorrect1(copy);
  };

  const task1Score = correct1.filter(Boolean).length * 5;

  // самооцінка за завдання 1
  const [] = useState(false);
  const [productsInfo, setProductsInfo] = useState<"a" | "b" | "c" | null>(
    null,
  );
  const [formulaD2Correct, setFormulaD2Correct] = useState(false);
  const [formulaD2Wrong, setFormulaD2Wrong] = useState(false);
  const [otherFormulas, setOtherFormulas] = useState(false);
  const [] = useState(false);

  const tableScore = useMemo(() => {
    let score = 0;

    if (shopName) score += 1;

    if (productsInfo === "a") score += 2;
    if (productsInfo === "b") score += 3;
    if (productsInfo === "c") score += 4;

    if (formulaD2Correct) score += 2;
    if (formulaD2Wrong) score += 1;

    if (otherFormulas) score += 2;
    if (totalFormulaText) score += 2;

    return score;
  }, [
    shopName,
    productsInfo,
    formulaD2Correct,
    formulaD2Wrong,
    otherFormulas,
    totalFormulaText,
  ]);
  // !----------------------------------------------------
  /* ===== Загальна оцінка ===== */
  const totalScore = quizSum + theoryScore + task1Score + tableScore;

  return (
    <div className={styles.container}>
      <div className={styles.total}>Загальна оцінка: {totalScore}</div>

      <h1 className={styles.headerOne}>Урок 26</h1>
      <h2 className={styles.headerTwo}>
        Ви навчитеся створювати таблиці з автоматизованими обрахунками
      </h2>
      <ol>
        <li>Створите власну версію електроного електроного калькулятора </li>
        <li>Складете розумний електронй чек магазину</li>
      </ol>

      <h2 className={styles.headerTwo}>Морський бій</h2>
      <div>
        Назвіть правильно адресу корабля - наприклад: кораблі, розміром
        в 1 клітинку: A3 , а кораблі розміром більше однієї
        клітинки - наприклад: A1:D1 
      </div>

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
              <div key={i} className={styles.quizRow}>
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
      <p>
        Прочитайте слайди, після ознайомлення з першим, пролистайте і прочитайте
        другий{" "}
      </p>

      <div className={styles.slider}>
        <button onClick={() => changeSlide(-1)}>◀</button>

        <div className={styles.slideWrapper}>
          <Image src={slides[slideIndex]} alt="Слайд" fill />
        </div>

        <button onClick={() => changeSlide(1)}>▶</button>
      </div>

      <div className={styles.sum}>Оцінка блоку: {theoryScore}</div>

      <h2 className={styles.headerTwo}>Завдання 1</h2>
      <div>
        Напишіть формули для підрахункку математичних дій в жовті клітинки
      </div>
      <div className={styles.sheet}>
        <table className={styles.excel}>
          <thead>
            <tr>
              <th></th>
              {["A", "B", "C", "D", "E", "F", "G"].map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 11 }, (_, r) => {
              const row = r + 1;
              const taskIndex = excelTasks.findIndex((t) => t.row === row);
              const task = excelTasks[taskIndex];

              return (
                <tr key={row}>
                  <th>{row}</th>

                  {/* A */}
                  <td></td>

                  {/* B */}
                  <td className={task ? styles.orange : ""}>{task?.a ?? ""}</td>

                  {/* C (оператор) */}
                  <td className={styles.operator}>{task?.op ?? ""}</td>

                  {/* D */}
                  <td className={task ? styles.orange : ""}>{task?.b ?? ""}</td>

                  {/* E (=) */}
                  <td className={styles.operator}>{task ? "=" : ""}</td>

                  {/* F (input з формулою) */}
                  <td
                    className={
                      task
                        ? correct1[taskIndex]
                          ? styles.correctCell
                          : styles.answerCell
                        : ""
                    }
                  >
                    {task && (
                      <input
                        value={answers1[taskIndex]}
                        onChange={(e) => {
                          const copy = [...answers1];
                          copy[taskIndex] = e.target.value;
                          setAnswers1(copy);
                        }}
                        onBlur={() => checkAnswer1(taskIndex)}
                      />
                    )}
                  </td>

                  {/* G */}
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.sum}>Оцінка блоку: {task1Score}</div>

      <h2 className={styles.headerTwo}>Завдання 2. Список покупок</h2>
      <div>
        Створіть за інструкцією таблицю в Excel, приєднайте файл та САМООЦІНІТЬ
        себе за пунктами (за це нарахуються інфобакси)
      </div>

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
          За зразком складіть формули для інших видів товарів у вашій таблиці.
        </li>
        <li>
          У клітинці D13 напишіть формулу, яка обчислить автоматично повну суму,
          яку ви повинні заплатити за товар.
        </li>
      </ol>

      

      <Image
        className={styles.navalImage}
        src="/page-2/images/exercise-two.png"
        alt="Список покупок"
        width={500}
        height={500}
      />
      <div>
<div>Поставте відмітки в полях зправа якщо</div>

        {/* 1 */}
        <div className={styles.checkRow}>
          <div className={styles.left}>1) Є назва магазину</div>
          <div className={styles.right}>
            <input
              type="checkbox"
              checked={!!shopName}
              onChange={(e) => setShopName(e.target.checked ? "shop" : "")}
            />
            {shopName && <span className={styles.score}>1</span>}
          </div>
        </div>

        {/* 2 */}
        <div className={styles.checkRow}>
          <div className={styles.left}>
            2) Інформація про товари:
            <div className={styles.sub}>а) Менше трьох товарів</div>
            <div className={styles.sub}>б) Три товари</div>
            <div className={styles.sub}>в) Більше 3 товарів</div>
          </div>

          <div className={styles.rightColumn}>
            <label>
              <input
                type="radio"
                name="products"
                onChange={() => setProductsInfo("a")}
              />
              {productsInfo === "a" && <span className={styles.score}>2</span>}
            </label>

            <label>
              <input
                type="radio"
                name="products"
                onChange={() => setProductsInfo("b")}
              />
              {productsInfo === "b" && <span className={styles.score}>3</span>}
            </label>

            <label>
              <input
                type="radio"
                name="products"
                onChange={() => setProductsInfo("c")}
              />
              {productsInfo === "c" && <span className={styles.score}>4</span>}
            </label>
          </div>
        </div>

        {/* 3 */}
        <div className={styles.checkRow}>
          <div className={styles.left}>
            3) У клітинці D2 правильно вказана формула
          </div>
          <div className={styles.rightColumn}>
            <label>
              так
              <input
                type="checkbox"
                checked={formulaD2Correct}
                onChange={(e) => {
                  setFormulaD2Correct(e.target.checked);
                  setFormulaD2Wrong(false);
                }}
              />
              {formulaD2Correct && <span className={styles.score}>2</span>}
            </label>

            <label>
              ні
              <input
                type="checkbox"
                checked={formulaD2Wrong}
                onChange={(e) => {
                  setFormulaD2Wrong(e.target.checked);
                  setFormulaD2Correct(false);
                }}
              />
              {formulaD2Wrong && <span className={styles.score}>1</span>}
            </label>
          </div>
        </div>

        {/* 4 */}
        <div className={styles.checkRow}>
          <div className={styles.left}>4) Є формули вартості інших товарів</div>
          <div className={styles.right}>
            <input
              type="checkbox"
              checked={otherFormulas}
              onChange={(e) => setOtherFormulas(e.target.checked)}
            />
            {otherFormulas && <span className={styles.score}>2</span>}
          </div>
        </div>

        {/* 5 */}
        <div className={styles.checkRow}>
          <div className={styles.left}>
            5) Формула сумарної вартості в клітинці D13
          </div>
          <div className={styles.right}>
            <input
              type="checkbox"
              checked={!!totalFormulaText}
              onChange={(e) =>
                setTotalFormulaText(e.target.checked ? "true" : "")
              }
            />
            {totalFormulaText && <span className={styles.score}>2</span>}
          </div>
        </div>

        <div className={styles.sum}>Оцінка блоку: {tableScore}</div>
      </div>
    </div>
  );
}
