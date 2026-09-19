import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import CommonNumbers from "./components/CommonNumbers";
import TaskTimer from "./components/TaskTimer";
import DevCommands from "./components/DevCommands";
import TicTacToe from "./components/TicTacToe";
import RockPaperScissors from "./components/RockPaperScissors";
import MemoryGame from "./components/MemoryGame";
import { Loader } from "lucide-react";

function App() {
  const savedMode = localStorage.getItem("mode") || "light";
  const [mode, setMode] = useState(savedMode);
  const [loading, setLoading] = useState(true);

  const togglemode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.body.setAttribute("data-theme", newMode);
    
    toast.success(
      `${newMode.charAt(0).toUpperCase() + newMode.slice(1)} mode has been enabled`
    );
    document.title = `Task Tracker ${
      newMode.charAt(0).toUpperCase() + newMode.slice(1)
    } Mode`;
    localStorage.setItem("mode", newMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
    document.title = `Task Tracker ${mode === "dark" ? "Dark" : "Light"} Mode`;
  }, [mode]);

  return (
    <>
      {loading ? (
        <div className="loading-overlay">
          <Loader className="spinner" size={50} />
        </div>
      ) : (
        <>
          <Navbar title="Task Tracker" mode={mode} togglemode={togglemode} />
          <Toaster position="bottom-right" />
          <main className="app-container">
            <section id="timer" className="mb-5">
              <TaskTimer mode={mode} />
            </section>
            <section id="dev-commands" className="mb-5">
              <DevCommands mode={mode} />
            </section>
            <section id="common-numbers" className="mb-5">
              <CommonNumbers mode={mode} />
            </section>
            <section id="text-form" className="mb-5">
              <TextForm heading="Text Analyzer" mode={mode} />
            </section>
            <section id="games" className="mb-5">
              <div className="text-center mb-4">
                <h2 style={{ color: mode === "dark" ? "#fff" : "#111", fontWeight: "700" }}>🎮 Gaming Zone</h2>
                <p style={{ color: mode === "dark" ? "#94a3b8" : "#64748b" }}>Take a break and play against the Computer!</p>
              </div>
              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <TicTacToe mode={mode} />
                </div>
                <div className="col-lg-4 col-md-6">
                  <RockPaperScissors mode={mode} />
                </div>
                <div className="col-lg-4 col-md-12">
                  <MemoryGame mode={mode} />
                </div>
              </div>
            </section>
          </main>
          <span id="contact">
            <Footer mode={mode} />
          </span>
        </>
      )}
    </>
  );
}

export default App;
