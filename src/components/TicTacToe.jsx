import React, { useState } from "react";
import { FiRefreshCcw, FiPlay } from "react-icons/fi";

export default function TicTacToe({ mode }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // User is X, Computer is O
  const [winner, setWinner] = useState(null);

  const isDark = mode === "dark";

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    // User can only click on their turn
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsXNext(false);
    }
  };

  // Computer AI move
  React.useEffect(() => {
    if (!isXNext && !winner && board.includes(null)) {
      const timer = setTimeout(() => {
        const newBoard = [...board];
        
        // Simple AI: Check if computer can win, else check if user can win and block, else random
        let move = -1;
        
        // 1. Can AI win?
        for (let i = 0; i < 9; i++) {
          if (!newBoard[i]) {
            newBoard[i] = "O";
            if (checkWinner(newBoard) === "O") {
              move = i;
              break;
            }
            newBoard[i] = null;
          }
        }
        
        // 2. Block User win
        if (move === -1) {
          for (let i = 0; i < 9; i++) {
            if (!newBoard[i]) {
              newBoard[i] = "X";
              if (checkWinner(newBoard) === "X") {
                move = i;
                newBoard[i] = null; // Revert
                break;
              }
              newBoard[i] = null;
            }
          }
        }
        
        // 3. Random empty square
        if (move === -1) {
          const emptySquares = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
          move = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
        
        newBoard[move] = "O";
        setBoard(newBoard);
        
        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
          setWinner(gameWinner);
        } else {
          setIsXNext(true);
        }
      }, 500); // 500ms delay for realism
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isDraw = !winner && board.every((square) => square !== null);

  const getStatusMessage = () => {
    if (winner === "X") return `You Won! 🎉`;
    if (winner === "O") return `Computer Won! 🤖`;
    if (isDraw) return "It's a Draw! 🤝";
    return isXNext ? "Your Turn (X)" : "Computer's Turn (O)...";
  };

  return (
    <div className="premium-card text-center" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
        <FiPlay size={28} style={{ color: isDark ? "#fff" : "#111" }} />
        <h2 className="mb-0" style={{ color: isDark ? "#fff" : "#111", fontWeight: "700" }}>
          Tic-Tac-Toe
        </h2>
      </div>

      <div 
        className="mb-4 py-2 px-4 rounded-pill d-inline-block"
        style={{ 
          background: winner || isDraw 
            ? (isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.1)")
            : (isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
          color: winner ? (isDark ? "#34d399" : "#059669") : (isDark ? "#f8fafc" : "#0f172a"),
          fontWeight: "600",
          fontSize: "1.1rem",
          transition: "all 0.3s ease"
        }}
      >
        {getStatusMessage()}
      </div>

      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "10px",
          background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          padding: "10px",
          borderRadius: "16px",
          marginBottom: "1.5rem"
        }}
      >
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={winner || value}
            style={{
              height: "90px",
              background: isDark ? "rgba(30, 41, 59, 0.8)" : "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "2.5rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: winner || value ? "default" : "pointer",
              color: value === "X" ? "#3b82f6" : (value === "O" ? "#ef4444" : "transparent"),
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              transition: "transform 0.1s ease, background 0.2s ease"
            }}
            onMouseDown={(e) => {
              if (!winner && !value) e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <button className="modern-btn modern-btn-secondary" onClick={resetGame} style={{ width: "100%" }}>
        <FiRefreshCcw /> Restart Game
      </button>
    </div>
  );
}
