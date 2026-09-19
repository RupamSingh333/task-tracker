import React, { useState, useEffect } from "react";
import { FiPlayCircle, FiRefreshCw } from "react-icons/fi";

const EMOJIS = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥝"];

export default function MemoryGame({ mode }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);

  const isDark = mode === "dark";

  const shuffleCards = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({ id, emoji }));
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIndices.includes(index)) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        setMatchedIndices(prev => [...prev, firstIndex, secondIndex]);
        setFlippedIndices([]);
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  const isWin = matchedIndices.length === EMOJIS.length * 2;

  return (
    <div className="premium-card text-center h-100 d-flex flex-column" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
        <FiPlayCircle size={28} style={{ color: isDark ? "#fff" : "#111" }} />
        <h2 className="mb-0" style={{ color: isDark ? "#fff" : "#111", fontWeight: "700" }}>
          Memory Match
        </h2>
      </div>

      <div className="d-flex justify-content-between mb-4 px-3 py-2 rounded" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
        <div>
          <span style={{ fontSize: "0.9rem", color: isDark ? "#94a3b8" : "#64748b" }}>Moves</span>
          <h4 className="mb-0 fw-bold">{moves}</h4>
        </div>
        <div>
          <span style={{ fontSize: "0.9rem", color: isDark ? "#94a3b8" : "#64748b" }}>Matches</span>
          <h4 className="mb-0 fw-bold">{matchedIndices.length / 2} / 8</h4>
        </div>
      </div>

      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: "10px",
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          padding: "15px",
          borderRadius: "16px",
          marginBottom: "1.5rem",
          flexGrow: 1
        }}
      >
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index) || matchedIndices.includes(index);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              style={{
                height: "60px",
                background: isFlipped ? (isDark ? "rgba(30, 41, 59, 0.8)" : "#fff") : (isDark ? "rgba(59, 130, 246, 0.5)" : "#3b82f6"),
                border: "none",
                borderRadius: "8px",
                fontSize: "1.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isFlipped ? "default" : "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, background 0.3s ease",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <div style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", opacity: isFlipped ? 1 : 0, transition: "opacity 0.2s" }}>
                {card.emoji}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto">
        {isWin && (
          <div className="mb-3 p-2 rounded" style={{ background: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.1)", color: isDark ? "#34d399" : "#059669", fontWeight: "bold" }}>
            You Won in {moves} moves! 🎉
          </div>
        )}
        <button className="modern-btn modern-btn-secondary w-100" onClick={shuffleCards}>
          <FiRefreshCw /> Restart Game
        </button>
      </div>
    </div>
  );
}
