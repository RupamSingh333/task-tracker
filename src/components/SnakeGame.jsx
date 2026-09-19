import React, { useEffect, useRef, useState } from "react";
import { FiRefreshCw, FiPlayCircle } from "react-icons/fi";

const BOARD_SIZE = 10;
const INITIAL_SNAKE = [
  { x: 4, y: 5 },
  { x: 3, y: 5 },
  { x: 2, y: 5 },
];

const randomFood = (snake) => {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((segment) => segment.x === food.x && segment.y === food.y));
  return food;
};

export default function SnakeGame({ mode }) {
  const isDark = mode === "dark";
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(randomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const directionRef = useRef({ x: 1, y: 0 });

  const resetGame = () => {
    const startSnake = INITIAL_SNAKE;
    setSnake(startSnake);
    setFood(randomFood(startSnake));
    setDirection({ x: 1, y: 0 });
    directionRef.current = { x: 1, y: 0 };
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      const nextDirection = keyMap[event.key];
      if (!nextDirection) return;

      const isOpposite =
        nextDirection.x === -directionRef.current.x &&
        nextDirection.y === -directionRef.current.y;

      if (!isOpposite) {
        directionRef.current = nextDirection;
        setDirection(nextDirection);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const nextHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        const hitWall =
          nextHead.x < 0 ||
          nextHead.y < 0 ||
          nextHead.x >= BOARD_SIZE ||
          nextHead.y >= BOARD_SIZE;

        const hitSelf = prevSnake.some(
          (segment) => segment.x === nextHead.x && segment.y === nextHead.y
        );

        if (hitWall || hitSelf) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [nextHead, ...prevSnake];
        const ateFood = nextHead.x === food.x && nextHead.y === food.y;

        if (ateFood) {
          setScore((prev) => prev + 10);
          setFood(randomFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 160);

    return () => clearInterval(timer);
  }, [food, gameOver]);

  const cells = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
    const x = index % BOARD_SIZE;
    const y = Math.floor(index / BOARD_SIZE);
    const isHead = snake[0] && snake[0].x === x && snake[0].y === y;
    const isBody = snake.some((segment, segmentIndex) => segmentIndex > 0 && segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;

    return { x, y, isHead, isBody, isFood };
  });

  return (
    <div className="premium-card text-center h-100 d-flex flex-column game-card-glow" >
      <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
        <FiPlayCircle size={28} style={{ color: isDark ? "#fff" : "#111" }} />
        <h2 className="mb-0" style={{ color: isDark ? "#fff" : "#111", fontWeight: "700" }}>
          Snake
        </h2>
      </div>

      <div className="d-flex justify-content-between mb-3 px-3 py-2 rounded" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
        <div>
          <span style={{ fontSize: "0.85rem", color: isDark ? "#94a3b8" : "#64748b" }}>Score</span>
          <h4 className="mb-0 fw-bold">{score}</h4>
        </div>
        <div>
          <span style={{ fontSize: "0.85rem", color: isDark ? "#94a3b8" : "#64748b" }}>Status</span>
          <h4 className="mb-0 fw-bold">{gameOver ? "Game Over" : "Alive"}</h4>
        </div>
      </div>

      <div className="snake-board mb-4" style={{ background: isDark ? "rgba(15,23,42,0.8)" : "#f8fafc" }}>
        {cells.map((cell, index) => (
          <div
            key={`${cell.x}-${cell.y}-${index}`}
            className={[
              "snake-cell",
              cell.isHead ? "snake-head" : "",
              cell.isBody ? "snake-body" : "",
              cell.isFood ? "snake-food" : "",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="mt-auto d-flex gap-2">
        <button className="modern-btn modern-btn-primary flex-grow-1" onClick={resetGame}>
          {gameOver ? "Restart" : "New Game"}
        </button>
        <button className="modern-btn modern-btn-secondary" onClick={resetGame}>
          <FiRefreshCw />
        </button>
      </div>
    </div>
  );
}
