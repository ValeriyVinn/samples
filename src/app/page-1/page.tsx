"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function InformaticsPractice() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [feedback, setFeedback] = useState<
    Record<string, "correct" | "wrong" | null>
  >({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
  });
  const [result, setResult] = useState<string | null>(null);

  const correctAnswers = {
    q1: "a",
    q2: "b",
    q3: ["a", "c"],
    q4: "c",
    q5: ["a", "c"],
  };

  function checkAnswers() {
    const newFeedback: Record<string, "correct" | "wrong" | null> = {
      ...feedback,
    };
    let score = 0;

    // Q1
    if (answers.q1 === correctAnswers.q1) {
      newFeedback.q1 = "correct";
      score++;
    } else newFeedback.q1 = "wrong";

    // Q2
    if (answers.q2 === correctAnswers.q2) {
      newFeedback.q2 = "correct";
      score++;
    } else newFeedback.q2 = "wrong";

    // Q3
    if (
      Array.isArray(answers.q3) &&
      correctAnswers.q3.every((v) => answers.q3.includes(v)) &&
      answers.q3.length === correctAnswers.q3.length
    ) {
      newFeedback.q3 = "correct";
      score++;
    } else newFeedback.q3 = "wrong";

    // Q4
    if (answers.q4 === correctAnswers.q4) {
      newFeedback.q4 = "correct";
      score++;
    } else newFeedback.q4 = "wrong";

    // Q5
    if (
      Array.isArray(answers.q5) &&
      correctAnswers.q5.every((v) => answers.q5.includes(v)) &&
      answers.q5.length === correctAnswers.q5.length
    ) {
      newFeedback.q5 = "correct";
      score++;
    } else newFeedback.q5 = "wrong";

    setFeedback(newFeedback);
    setResult(`Ваш результат: ${score} / 5`);
  }

  function toggleCheckbox(question: string, value: string) {
    setAnswers((prev) => {
      const arr = prev[question] || [];
      return {
        ...prev,
        [question]: arr.includes(value)
          ? arr.filter((v: string) => v !== value)
          : [...arr, value],
      };
    });
  }

  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h1>22.1. Як класифікують веб сайти?</h1>
          {/* <p className={styles.intro}>
            Теоретичний розділ курсу подано у вигляді роботи ІТ-агенції, яка
            отримує запит клієнта та поетапно залучає різні «відділи мислення».
          </p> */}
        </header>

        {/* CLIENT REQUEST */}
        <article>
          {/* <h2>Запит клієнта</h2> */}
          <p>
            До Тараса на канікулах прижджала його молодша сестра Міла з міста.
            Вони разом грали в різні ігри, але найбільше їм подобалась гра
            «хрестики-нулики». Вони навіть вигадали свою назву для цієї гри —
            «ТаМіки», де Т означає Тарас, а М — Міла. І одного разу до Тараса
            прийшла ідея подарувати сестрі свій особистий застосунок цієї гри.
            Він звернувся до ІТ-агенції з запитом створити персоналізований
            застосунок улюбленої гри з описом правил та самою грою:
          </p>
          <p>
            Для реалізації цієї ідеї агенція обрала формат інтерактивного
            веб-застосунку, яка складається з:
          </p>

          <ul>
            <li>статичної сторінки з описом гри ;</li>
            <li>динамічної сторінки, що реагує на дії користувача.</li>
          </ul>
        </article>
        <h2 className={styles.htwo}>ІТ-агенція починає працювати...</h2>
        {/* PHILOSOPHY DEPARTMENT */}
        <article className={styles.block}>
          <h2>Філософський відділ</h2>

          <p>
            Філософський відділ починає роботу з осмислення запиту клієнта та
            виокремлення смислів, з якими далі працюватимуть інші відділи.
          </p>

          <ul className={styles.dialogue}>
            <li>
              <strong>Питання:</strong> Що насправді хоче клієнт?
            </li>
            <li>
              <strong>Відповідь:</strong>
              <span className={styles.meaning}>
                Клієнт хоче взаємодіяти з улюбленою грою
              </span>
              , а не просто отримати файл чи програму.
            </li>

            <li>
              <strong>Питання:</strong> У якій формі клієнт очікує цю взаємодію?
            </li>
            <li>
              <strong>Відповідь:</strong>
              <span className={styles.meaning}>
                У формі послідовного досвіду
              </span>
              , який можна відкривати, переглядати та з яким можна діяти.
            </li>

            <li>
              <strong>Питання:</strong> Чи є цей досвід однорідним?
            </li>
            <li>
              <strong>Відповідь:</strong> Ні.
              <span className={styles.meaning}>
                Цей досвід складається з різних смислових станів
              </span>
              .
            </li>

            <li>
              <strong>Питання:</strong> Які мінімальні смислові стани потрібно
              передбачити?
            </li>
            <li>
              <strong>Відповідь:</strong>
              <span className={styles.meaning}>Їх щонайменше два</span>: стан
              ознайомлення та стан взаємодії.
            </li>

            <li>
              <strong>Питання:</strong> Чим ці стани принципово відрізняються?
            </li>
            <li>
              <strong>Відповідь:</strong>
              <span className={styles.meaning}>
                В одному стані інформація є незмінною, а в іншому результат
                залежить від дій користувача
              </span>
              .
            </li>

            <li>
              <strong>Питання:</strong> Як користувач переходить між цими
              станами?
            </li>
            <li>
              <strong>Відповідь:</strong>
              <span className={styles.meaning}>
                Він перемикається між ними через усвідомлений перехід між
                смисловими станами
              </span>
              , що поєднує їх у єдину систему.
            </li>
          </ul>
          <p className={styles.conclusion}>
            <strong>Висновок:</strong> Нам потрібно побдувати{" "}
            <span className={styles.meaning}>
              систему пов’язаних смислових станів
            </span>
            , у якій користувач може послідовно переходити від{" "}
            <span className={styles.meaning}>ознайомлення з інформацією</span>{" "}
            до <span className={styles.meaning}>активної взаємодії</span>. Саме
            ця смислова структура є основою майбутнього цифрового продукту.
          </p>
        </article>

        {/* SEMANTIC DEPARTMENT */}
        <article className={styles.block}>
          <h2>Семантичний відділ</h2>

          <p>
            Семантичний відділ зосереджується на уточненні значень термінів, щоб
            команда однаково розуміла опис майбутнього{" "}
            <span className={styles.meaning}>вебсайту</span>.
          </p>

          <ul className={styles.dialogue}>
            <li>
              <strong>Питання:</strong> Які ключові поняття використовуються в
              описі завдання?
            </li>
            <li>
              <strong>Відповідь:</strong>{" "}
              <span className={styles.meaning}>веб-сторінка</span>,{" "}
              <span className={styles.meaning}>статична сторінка</span>,{" "}
              <span className={styles.meaning}>динамічна сторінка</span>,{" "}
              <span className={styles.meaning}>гіпертекст</span>.
            </li>

            <li>
              <strong>Питання:</strong> Що означає{" "}
              <span className={styles.meaning}>статична сторінка</span>?
            </li>
            <li>
              <strong>Відповідь:</strong> Це{" "}
              <span className={styles.meaning}>
                веб-сторінка з наперед підготовленим вмістом
              </span>
              , який{" "}
              <span className={styles.meaning}>
                не змінюється під час взаємодії з користувачем
              </span>
              .
            </li>

            <li>
              <strong>Питання:</strong> А що означає{" "}
              <span className={styles.meaning}>динамічна сторінка</span>?
            </li>
            <li>
              <strong>Відповідь:</strong> Це{" "}
              <span className={styles.meaning}>
                веб-сторінка, вміст або поведінка якої формується
              </span>{" "}
              <span className={styles.meaning}>
                під час взаємодії з користувачем
              </span>
              .
            </li>

            <li>
              <strong>Питання:</strong> У чому принципова різниця між цими
              сторінками?
            </li>
            <li>
              <strong>Відповідь:</strong> У{" "}
              <span className={styles.meaning}>способі формування змісту</span>:
              заздалегідь або під час використання.
            </li>

            <li>
              <strong>Питання:</strong> Як користувач переходить між сторінками?
            </li>
            <li>
              <strong>Відповідь:</strong> За допомогою{" "}
              <span className={styles.meaning}>гіпертексту</span> — системи{" "}
              <span className={styles.meaning}>гіперпосилань</span> між
              сторінками.
            </li>
          </ul>

          <p className={styles.conclusion}>
            <strong>Висновок:</strong> У межах вебсайту{" "}
            <span className={styles.meaning}>
              статичні та динамічні веб-сторінки
            </span>{" "}
            відрізняються{" "}
            <span className={styles.meaning}>способом формування змісту</span>,
            а <span className={styles.meaning}>гіпертекст</span> забезпечує{" "}
            <span className={styles.meaning}>
              смисловий звʼязок між сторінками
            </span>
            .
          </p>
        </article>

        {/* MATH DEPARTMENT */}
        <article className={styles.block}>
          <h2>Математичний відділ</h2>

          <p>
            Математичний відділ переходить від смислів і термінів до{" "}
            <span className={styles.meaning}>
              формального опису поведінки сайту
            </span>
            .
          </p>

          <ul className={styles.dialogue}>
            <li>
              <strong>Питання:</strong> Як формально описати роботу сайту?
            </li>
            <li>
              <strong>Відповідь:</strong> Як{" "}
              <span className={styles.meaning}>відображення</span>, що кожному{" "}
              <span className={styles.meaning}>запиту користувача</span> ставить
              у відповідність{" "}
              <span className={styles.meaning}>певну веб-сторінку</span>.
            </li>

            <li>
              <strong>Питання:</strong> Що в цій моделі є запитом?
            </li>
            <li>
              <strong>Відповідь:</strong>{" "}
              <span className={styles.meaning}>дія користувача</span>: перехід
              за посиланням, натискання кнопки, введення даних.
            </li>

            <li>
              <strong>Питання:</strong> Що є результатом відображення?
            </li>
            <li>
              <strong>Відповідь:</strong>{" "}
              <span className={styles.meaning}>
                веб-сторінка або її поточний стан
              </span>{" "}
              у браузері.
            </li>

            <li>
              <strong>Питання:</strong> Чи завжди результат однаковий?
            </li>
            <li>
              <strong>Відповідь:</strong> Ні, це залежить від{" "}
              <span className={styles.meaning}>типу сторінки</span>.
            </li>

            <li>
              <strong>Питання:</strong> Як формально описати{" "}
              <span className={styles.meaning}>статичну сторінку</span>?
            </li>
            <li>
              <strong>Відповідь:</strong> Як{" "}
              <span className={styles.meaning}>сталу функцію</span>: одному й
              тому самому запиту завжди відповідає{" "}
              <span className={styles.meaning}>один і той самий результат</span>
              .
            </li>

            <li>
              <strong>Питання:</strong> Як описати{" "}
              <span className={styles.meaning}>динамічну сторінку</span>?
            </li>
            <li>
              <strong>Відповідь:</strong> Як{" "}
              <span className={styles.meaning}>функцію з параметрами</span>, де
              результат залежить від{" "}
              <span className={styles.meaning}>
                введених даних або дій користувача
              </span>
              .
            </li>
          </ul>

          <p className={styles.conclusion}>
            <strong>Висновок:</strong> Вебсайт формально описується як{" "}
            <span className={styles.meaning}>система відображень</span>, у якій{" "}
            <span className={styles.meaning}>статичні сторінки</span>{" "}
            відповідають{" "}
            <span className={styles.meaning}>сталим результатам</span>, а{" "}
            <span className={styles.meaning}>динамічні сторінки</span> — це{" "}
            <span className={styles.meaning}>
              функції, значення яких залежать від параметрів
            </span>
            .
          </p>
        </article>

        {/* MODELING DEPARTMENT */}
        <article className={styles.block}>
          <h2>Відділ моделювання</h2>

          <p>
            Відділ моделювання будує{" "}
            <span className={styles.meaning}>спрощену модель роботи сайту</span>
            , відкидаючи деталі реалізації та зосереджуючись на{" "}
            <span className={styles.meaning}>
              сутностях і звʼязках між ними
            </span>
            .
          </p>

          <ul className={styles.dialogue}>
            <li>
              <strong>Питання:</strong> Яку частину реальності потрібно
              змоделювати?
            </li>
            <li>
              <strong>Відповідь:</strong>{" "}
              <span className={styles.meaning}>
                взаємодію користувача з вебсайтом
              </span>{" "}
              через браузер.
            </li>

            <li>
              <strong>Питання:</strong> Які основні елементи цієї взаємодії?
            </li>
            <li>
              <strong>Відповідь:</strong>{" "}
              <span className={styles.meaning}>запит користувача</span>,{" "}
              <span className={styles.meaning}>механізм обробки</span> та{" "}
              <span className={styles.meaning}>
                результат у вигляді веб-сторінки
              </span>
              .
            </li>

            <li>
              <strong>Питання:</strong> Що вважається{" "}
              <span className={styles.meaning}>запитом</span> у моделі?
            </li>
            <li>
              <strong>Відповідь:</strong> Будь-яка{" "}
              <span className={styles.meaning}>дія користувача</span>: перехід
              між сторінками або взаємодія з елементами сторінки.
            </li>

            <li>
              <strong>Питання:</strong> Що є{" "}
              <span className={styles.meaning}>результатом</span> виконання
              моделі?
            </li>
            <li>
              <strong>Відповідь:</strong>{" "}
              <span className={styles.meaning}>поточний стан веб-сторінки</span>
              , який відображається користувачу.
            </li>

            <li>
              <strong>Питання:</strong> Чи однаково формується результат у всіх
              випадках?
            </li>
            <li>
              <strong>Відповідь:</strong> Ні. Для{" "}
              <span className={styles.meaning}>статичної сторінки</span>{" "}
              результат{" "}
              <span className={styles.meaning}>заздалегідь визначений</span>, а
              для <span className={styles.meaning}>динамічної сторінки</span> —{" "}
              <span className={styles.meaning}>
                формується під час виконання моделі
              </span>
              .
            </li>

            <li>
              <strong>Питання:</strong> Яке спрощення є ключовим у цій моделі?
            </li>
            <li>
              <strong>Відповідь:</strong> Вважається, що{" "}
              <span className={styles.meaning}>
                кожен запит призводить до переходу
              </span>{" "}
              системи в{" "}
              <span className={styles.meaning}>
                новий або той самий стан сторінки
              </span>
              .
            </li>
          </ul>

          <p className={styles.conclusion}>
            <strong>Висновок:</strong> Модель вебсайту зводиться до{" "}
            <span className={styles.meaning}>
              послідовності станів веб-сторінок
            </span>
            , які{" "}
            <span className={styles.meaning}>
              змінюються або залишаються незмінними
            </span>{" "}
            у відповідь на{" "}
            <span className={styles.meaning}>запити користувача</span>:{" "}
            <span className={styles.meaning}>статичні сторінки</span> мають{" "}
            <span className={styles.meaning}>фіксований стан</span>, а{" "}
            <span className={styles.meaning}>динамічні сторінки</span> формують
            його{" "}
            <span className={styles.meaning}>під час виконання моделі</span>.
          </p>
        </article>

        {/* UML DEPARTMENT */}
        {/* <article className={styles.block}>
          <h2>UML-відділ</h2>

          <p>
            UML-відділ переводить модель у формалізовану схему взаємодії
            елементів системи, не привʼязуючись до конкретних технологій.
          </p>

          <ul className={styles.dialogue}>
            <li>
              <strong>Питання:</strong> Які основні учасники взаємодії в
              системі?
            </li>
            <li>
              <strong>Відповідь:</strong> Користувач і веб-система, з якою він
              взаємодіє через браузер.
            </li>

            <li>
              <strong>Питання:</strong> Яку роль виконує браузер у цій
              взаємодії?
            </li>
            <li>
              <strong>Відповідь:</strong> Браузер виступає посередником між
              користувачем і веб-сторінкою, відображаючи поточний стан системи.
            </li>

            <li>
              <strong>Питання:</strong> Де відбувається формування сторінки?
            </li>
            <li>
              <strong>Відповідь:</strong> Формування може відбуватись або
              заздалегідь (статична сторінка), або під час обробки запиту
              (динамічна сторінка).
            </li>

            <li>
              <strong>Питання:</strong> Як це відобразити в UML-моделі?
            </li>
            <li>
              <strong>Відповідь:</strong> Через діаграми взаємодії, де запит
              користувача запускає послідовність дій і призводить до
              відображення сторінки.
            </li>

            <li>
              <strong>Питання:</strong> Де саме виникає динаміка системи?
            </li>
            <li>
              <strong>Відповідь:</strong> На етапі обробки запиту, коли
              результат формується залежно від умов або параметрів.
            </li>
          </ul>

          <p className={styles.conclusion}>
            Висновок: UML-модель показує систему як набір учасників і взаємодій,
            у яких динаміка виникає під час обробки запиту користувача, а
            результатом є відображення відповідного стану веб-сторінки.
          </p>
        </article> */}

        {/* ARCHITECTURE DEPARTMENT */}
        {/* <article className={styles.block}>
          <h2>Архітектурний відділ</h2>

          <p>
            Архітектурний відділ визначає, де саме в системі відбувається
            формування веб-сторінки та як розподіляється відповідальність між
            частинами системи.
          </p>

          <ul className={styles.dialogue}>
            <li>
              <strong>Питання:</strong> З яких частин складається веб-система?
            </li>
            <li>
              <strong>Відповідь:</strong> З клієнтської частини (браузера) та
              серверної частини.
            </li>

            <li>
              <strong>Питання:</strong> Яку роль виконує браузер?
            </li>
            <li>
              <strong>Відповідь:</strong> Браузер відображає веб-сторінку та
              обробляє взаємодію користувача з інтерфейсом.
            </li>

            <li>
              <strong>Питання:</strong> Яку роль виконує сервер?
            </li>
            <li>
              <strong>Відповідь:</strong> Сервер зберігає дані та, за потреби,
              формує відповідь на запит користувача.
            </li>

            <li>
              <strong>Питання:</strong> Де формується статична сторінка?
            </li>
            <li>
              <strong>Відповідь:</strong> Статична сторінка зберігається на
              сервері та передається клієнту без змін.
            </li>

            <li>
              <strong>Питання:</strong> Де може формуватися динамічна сторінка?
            </li>
            <li>
              <strong>Відповідь:</strong> Або на сервері під час обробки запиту,
              або в браузері в процесі взаємодії користувача з інтерфейсом.
            </li>

            <li>
              <strong>Питання:</strong> Що визначає архітектурне рішення?
            </li>
            <li>
              <strong>Відповідь:</strong> Те, де саме виконується логіка
              формування сторінки і як розподіляється навантаження між частинами
              системи.
            </li>
          </ul>

          <p className={styles.conclusion}>
            Висновок: архітектура визначає, де і яким чином формується поведінка
            веб-сайту — на сервері, у браузері або спільно, — але не змінює
            змісту інформації, яку отримує користувач.
          </p>
        </article> */}

        <h2>Основні правила класифікації вебсайтів</h2>

        <ol className={styles.rules}>
          <li>
            <strong>Вебсайт</strong> — це <strong>набір веб-сторінок</strong>,
            пов’язаних між собою
            <strong> гіперпосиланнями</strong>.
          </li>

          <li>
            <strong>Веб-сторінка</strong> — це{" "}
            <strong>гіпертекстовий документ</strong>, створений мовою розмітки
            (переважно HTML), що містить текст, зображення та посилання.
          </li>

          <li>
            <strong>Класифікація вебсайтів</strong> здійснюється за
            <strong> технологією створення</strong>.

            <ul className={styles.sublist}>
              <li>
                {" "}
                <strong>Статичний сайт</strong>
                <ul>
                  <li>
                    складається зі{" "}
                    <strong>заздалегідь підготовлених сторінок</strong>;
                  </li>
                  <li>
                    вміст <strong>не змінюється</strong> під час роботи
                    користувача;
                  </li>
                  <li>
                    сторінки зберігаються на сервері у{" "}
                    <strong>готовому вигляді</strong>.
                  </li>
                </ul>
              </li>
              <li>
                {" "}
                <strong>Динамічний сайт</strong>
                <ul>
                  <li>
                    сторінки{" "}
                    <strong>формуються під час запиту користувача</strong>;
                  </li>
                  <li>
                    вміст може залежати від <strong>даних у базі</strong> або
                    <strong> дій у браузері</strong>.
                  </li>
                </ul>
              </li>
              <li>
                {" "}
                <strong>Flash-сайт</strong>
                <ul>
                  <li>
                    є <strong>інтерактивною програмою</strong>;
                  </li>
                  <li>
                    використовує <strong>анімацію та векторну графіку</strong>;
                  </li>
                  <li>
                    створюється у спеціальному середовищі (Macromedia Flash).
                  </li>
                </ul>
              </li>
              <li>
                {" "}
                <strong>Комбінований сайт</strong>
                <ul>
                  <li>
                    поєднує <strong>декілька технологій</strong>;
                  </li>
                  <li>
                    може містити статичні, динамічні та інтерактивні елементи.
                  </li>
                </ul>
              </li>
            </ul>
          </li>

         
            
 
        </ol>

        {/* <h2>Коротка формула для запам’ятовування</h2>

        <p>
          <strong>
            Тип вебсайту визначається тим, як формується його вміст: заздалегідь
            чи під час взаємодії з користувачем.
          </strong>
        </p> */}

        <Link href="/sites/tic-tac-toe/" className={styles.ticTacToe}>
          Сайт ТаМіки
        </Link>
      </section>

      <section className={styles.section}>
        <h2>Практична частина: перевір себе</h2>

        {/* QUESTION 1 */}
        <div
          className={`${styles.block} ${
            feedback.q1 === "correct"
              ? styles.correct
              : feedback.q1 === "wrong"
              ? styles.wrong
              : ""
          }`}
        >
          <p>
            <strong>1. Що таке вебсайт?</strong>
          </p>
          <label>
            <input
              type="radio"
              name="q1"
              onChange={() => setAnswers({ ...answers, q1: "a" })}
            />
            Набір веб-сторінок, повʼязаних гіперпосиланнями
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="q1"
              onChange={() => setAnswers({ ...answers, q1: "b" })}
            />
            Окремий HTML-файл
          </label>
        </div>

        {/* QUESTION 2 */}
        <div
          className={`${styles.block} ${
            feedback.q2 === "correct"
              ? styles.correct
              : feedback.q2 === "wrong"
              ? styles.wrong
              : ""
          }`}
        >
          <p>
            <strong>2. Яка ознака характерна для статичного сайту?</strong>
          </p>
          <label>
            <input
              type="radio"
              name="q2"
              onChange={() => setAnswers({ ...answers, q2: "a" })}
            />
            Сторінки змінюються залежно від користувача
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="q2"
              onChange={() => setAnswers({ ...answers, q2: "b" })}
            />
            Сторінки зберігаються у готовому вигляді
          </label>
        </div>

        {/* QUESTION 3 */}
        <div
          className={`${styles.block} ${
            feedback.q3 === "correct"
              ? styles.correct
              : feedback.q3 === "wrong"
              ? styles.wrong
              : ""
          }`}
        >
          <p>
            <strong>3. Оберіть ознаки динамічного сайту</strong>
          </p>
          <label>
            <input type="checkbox" onChange={() => toggleCheckbox("q3", "a")} />
            Сторінки формуються під час запиту
          </label>
          <br />
          <label>
            <input type="checkbox" onChange={() => toggleCheckbox("q3", "b")} />
            Лише HTML-файли
          </label>
          <br />
          <label>
            <input type="checkbox" onChange={() => toggleCheckbox("q3", "c")} />
            Можливе використання баз даних
          </label>
        </div>

        {/* QUESTION 4 */}
        <div
          className={`${styles.block} ${
            feedback.q4 === "correct"
              ? styles.correct
              : feedback.q4 === "wrong"
              ? styles.wrong
              : ""
          }`}
        >
          <p>
            <strong>4. Де може формуватися динамічна сторінка?</strong>
          </p>
          <label>
            <input
              type="radio"
              name="q4"
              onChange={() => setAnswers({ ...answers, q4: "a" })}
            />
            Лише на сервері
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="q4"
              onChange={() => setAnswers({ ...answers, q4: "b" })}
            />
            Лише в браузері
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="q4"
              onChange={() => setAnswers({ ...answers, q4: "c" })}
            />
            На сервері або в браузері
          </label>
        </div>

        {/* QUESTION 5 */}
        <div
          className={`${styles.block} ${
            feedback.q5 === "correct"
              ? styles.correct
              : feedback.q5 === "wrong"
              ? styles.wrong
              : ""
          }`}
        >
          <p>
            <strong>5. Який сайт є комбінованим?</strong>
          </p>
          <label>
            <input type="checkbox" onChange={() => toggleCheckbox("q5", "a")} />
            Має статичні та динамічні сторінки
          </label>
          <br />
          <label>
            <input type="checkbox" onChange={() => toggleCheckbox("q5", "b")} />
            Складається лише з Flash-анімації
          </label>
          <br />
          <label>
            <input type="checkbox" onChange={() => toggleCheckbox("q5", "c")} />
            Використовує кілька технологій
          </label>
        </div>

        <button className={styles.button} onClick={checkAnswers}>
          Перевірити відповіді
        </button>

        {result && <p className={styles.result}>{result}</p>}
      </section>
    </>
  );
}
