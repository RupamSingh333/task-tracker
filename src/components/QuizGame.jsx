import React, { useEffect, useMemo, useState } from "react";
import { FiCheckCircle, FiRefreshCw } from "react-icons/fi";

const FALLBACK_QUESTIONS = [
  { question: "Which language runs in a web browser?", options: ["Python", "Java", "JavaScript", "C++"], answer: "JavaScript" },
  { question: "What does CSS control?", options: ["Server logic", "Page styling", "Database queries", "HTML parsing"], answer: "Page styling" },
  { question: "Which of these is a React hook?", options: ["useEffect", "useFor", "useStateMap", "useData"], answer: "useEffect" },
  { question: "Which symbol is used for strict equality in JavaScript?", options: ["=", "==", "===", "=>"], answer: "===" },
  { question: "Which HTML tag is used to create a link?", options: ["<link>", "<a>", "<url>", "<nav>"], answer: "<a>" },
];

const decodeHtml = (value = "") => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
};

const shuffleQuestions = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const normalizeQuestion = (question) => {
  const options = shuffleQuestions([
    ...question.incorrect_answers,
    question.correct_answer,
  ]).map((option) => decodeHtml(option));

  return {
    question: decodeHtml(question.question),
    options,
    answer: decodeHtml(question.correct_answer),
  };
};

const fetchQuestions = async () => {
  const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
  if (!response.ok) {
    throw new Error("Quiz API is unavailable");
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("No questions returned");
  }

  return data.results.map(normalizeQuestion);
};

export default function QuizGame({ mode }) {
  const isDark = mode === "dark";
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentQuestion = questions[index];
  const progress = useMemo(
    () => (questions.length ? ((index + (submitted ? 1 : 0)) / questions.length) * 100 : 0),
    [index, questions.length, submitted]
  );

  const loadQuestions = async () => {
    setLoading(true);
    setError("");
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setIndex(0);

    try {
      const data = await fetchQuestions();
      setQuestions(data);
    } catch (fetchError) {
      setQuestions(shuffleQuestions(FALLBACK_QUESTIONS));
      setError("Live API failed, so demo questions are being used.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const resetDeck = () => {
    loadQuestions();
  };

  const handleAnswer = (option) => {
    if (!currentQuestion || submitted) return;
    setSelected(option);
    setSubmitted(true);

    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (!questions.length) return;

    if (index === questions.length - 1) {
      loadQuestions();
      return;
    }

    setIndex((prev) => prev + 1);
    setSelected(null);
    setSubmitted(false);
  };

  const isFinished = currentQuestion && index === questions.length - 1 && submitted;

  if (loading || !currentQuestion) {
    return (
      <div className="premium-card text-center h-100 d-flex flex-column justify-content-center game-card-glow">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
          <FiCheckCircle size={28} style={{ color: isDark ? "#fff" : "#111" }} />
          <h2 className="mb-0" style={{ color: isDark ? "#fff" : "#111", fontWeight: "700" }}>
            Quiz Game
          </h2>
        </div>
        <p style={{ color: isDark ? "#cbd5e1" : "#475569", margin: 0 }}>
          Loading questions...
        </p>
      </div>
    );
  }

  return (
    <div className="premium-card text-center h-100 d-flex flex-column game-card-glow" >
      <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
        <FiCheckCircle size={28} style={{ color: isDark ? "#fff" : "#111" }} />
        <h2 className="mb-0" style={{ color: isDark ? "#fff" : "#111", fontWeight: "700" }}>
          Quiz Game
        </h2>
      </div>

      {error && (
        <div className="mb-3 px-3 py-2 rounded" style={{ background: "rgba(245,158,11,0.12)", color: isDark ? "#fef3c7" : "#92400e", fontSize: "0.8rem" }}>
          {error}
        </div>
      )}

      <div className="d-flex justify-content-between mb-3 px-3 py-2 rounded" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
        <div>
          <span style={{ fontSize: "0.85rem", color: isDark ? "#94a3b8" : "#64748b" }}>Score</span>
          <h4 className="mb-0 fw-bold">{score}</h4>
        </div>
        <div>
          <span style={{ fontSize: "0.85rem", color: isDark ? "#94a3b8" : "#64748b" }}>Question</span>
          <h4 className="mb-0 fw-bold">{index + 1}/{questions.length}</h4>
        </div>
      </div>

      <div className="mb-3">
        <div className="w-100 rounded-pill overflow-hidden" style={{ height: "10px", background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #22c55e, #3b82f6)", transition: "width 0.3s ease" }} />
        </div>
      </div>

      <div className="mb-4 p-3 rounded" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", color: isDark ? "#f8fafc" : "#0f172a", fontWeight: 600, textAlign: "left" }}>
        {currentQuestion.question}
      </div>

      <div className="d-grid gap-2 mb-4" style={{ display: "grid" }}>
        {currentQuestion.options.map((option) => {
          const isAnswer = option === currentQuestion.answer;
          const isSelected = option === selected;
          const showCorrect = submitted && isAnswer;
          const showWrong = submitted && isSelected && !isAnswer;

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={submitted}
              className="quiz-option"
              style={{
                background: showCorrect ? "rgba(34,197,94,0.18)" : showWrong ? "rgba(239,68,68,0.18)" : isDark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.03)",
                color: isDark ? "#fff" : "#111",
                border: showCorrect ? "1px solid rgba(34,197,94,0.5)" : showWrong ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(148,163,184,0.2)",
                opacity: submitted && !showCorrect && !showWrong ? 0.8 : 1,
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-auto d-flex gap-2">
        <button className="modern-btn modern-btn-primary flex-grow-1" onClick={handleNext}>
          {isFinished ? "Play Again" : "Next"}
        </button>
        <button className="modern-btn modern-btn-secondary" onClick={resetDeck}>
          <FiRefreshCw />
        </button>
      </div>
    </div>
  );
}
