import React, { useState } from "react";
import { FiPlayCircle, FiRefreshCw } from "react-icons/fi";

const CHOICES = ["Rock", "Paper", "Scissors"];

export default function RockPaperScissors({ mode }) {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });

  const isDark = mode === "dark";

  const getResult = (user, computer) => {
    if (user === computer) return "It's a Tie! 🤝";
    if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {
      return "You Win! 🎉";
    }
    return "Computer Wins! 🤖";
  };

  const playGame = (choice) => {
    const compChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setUserChoice(choice);
    setComputerChoice(compChoice);
    
    const gameResult = getResult(choice, compChoice);
    setResult(gameResult);

    if (gameResult.includes("You Win")) {
      setScore(prev => ({ ...prev, user: prev.user + 1 }));
    } else if (gameResult.includes("Computer Wins")) {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setScore({ user: 0, computer: 0 });
  };

  const getEmoji = (choice) => {
    if (choice === "Rock") return "✊";
    if (choice === "Paper") return "✋";
    if (choice === "Scissors") return "✌️";
    return "❓";
  };

  return (
    <div className="premium-card text-center h-100 d-flex flex-column" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
        <FiPlayCircle size={28} style={{ color: isDark ? "#fff" : "#111" }} />
        <h2 className="mb-0" style={{ color: isDark ? "#fff" : "#111", fontWeight: "700" }}>
          Rock Paper Scissors
        </h2>
      </div>

      <div className="d-flex justify-content-between mb-4 px-3 py-2 rounded" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
        <div>
          <span style={{ fontSize: "0.9rem", color: isDark ? "#94a3b8" : "#64748b" }}>You</span>
          <h4 className="mb-0 fw-bold">{score.user}</h4>
        </div>
        <div>
          <span style={{ fontSize: "0.9rem", color: isDark ? "#94a3b8" : "#64748b" }}>Computer</span>
          <h4 className="mb-0 fw-bold">{score.computer}</h4>
        </div>
      </div>

      <div className="d-flex justify-content-around mb-4">
        <div className="text-center">
          <div style={{ fontSize: "3rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}>
            {userChoice ? getEmoji(userChoice) : "👤"}
          </div>
          <span style={{ fontSize: "0.9rem", color: isDark ? "#cbd5e1" : "#475569" }}>You</span>
        </div>
        <div className="text-center d-flex flex-column justify-content-center">
          <strong style={{ fontSize: "1.2rem", color: "var(--accent-light)" }}>VS</strong>
        </div>
        <div className="text-center">
          <div style={{ fontSize: "3rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}>
            {computerChoice ? getEmoji(computerChoice) : "🤖"}
          </div>
          <span style={{ fontSize: "0.9rem", color: isDark ? "#cbd5e1" : "#475569" }}>Computer</span>
        </div>
      </div>

      <div 
        className="mb-4 py-2 px-4 rounded-pill d-inline-block mx-auto"
        style={{ 
          background: result.includes("Win") 
            ? (isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.1)")
            : (isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
          color: result.includes("Win") ? (isDark ? "#34d399" : "#059669") : (isDark ? "#f8fafc" : "#0f172a"),
          fontWeight: "600",
          minHeight: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {result || "Choose your move!"}
      </div>

      <div className="mt-auto">
        <div className="d-flex gap-2 justify-content-center mb-3">
          {CHOICES.map(choice => (
            <button
              key={choice}
              onClick={() => playGame(choice)}
              className="modern-btn modern-btn-primary flex-grow-1"
              style={{ fontSize: "1.5rem", padding: "10px" }}
              title={choice}
            >
              {getEmoji(choice)}
            </button>
          ))}
        </div>
        <button className="modern-btn modern-btn-secondary w-100" onClick={resetGame}>
          <FiRefreshCw /> Reset Score
        </button>
      </div>
    </div>
  );
}
