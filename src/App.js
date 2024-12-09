import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import CommonNumbers from "./components/CommonNumbers";
import TaskTimer from "./components/TaskTimer";

function App() {
  const savedMode = localStorage.getItem("mode") || "light";
  const [mode, setMode] = useState(savedMode);

  const togglemode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.body.style.backgroundColor =
      newMode === "dark" ? "rgb(33 37 41)" : "white";
    toast.success(
      `${
        newMode.charAt(0).toUpperCase() + newMode.slice(1)
      } mode has been enabled`
    );
    document.title = `Task Tracker ${
      newMode.charAt(0).toUpperCase() + newMode.slice(1)
    } Mode`;
    localStorage.setItem("mode", newMode);
  };

  useEffect(() => {
    if (mode === "dark") {
      document.body.style.backgroundColor = "rgb(33 37 41)";
      document.title = "Task Tracker Dark Mode";
    } else {
      document.body.style.backgroundColor = "white";
      document.title = "Task Tracker Light Mode";
    }
  }, [mode]);

  return (
    <>
      <Navbar title="Task Tracker By Rupam" mode={mode} togglemode={togglemode} />
      <Toaster position="bottom-right" />
      <main className={`container my-3 text-${mode === "dark" ? "light" : "dark"}`}>
        <section id="timer" className="mb-5">
          <TaskTimer mode={mode} />
        </section>
        <section id="common-numbers" className="mb-5">
          <CommonNumbers mode={mode} />
        </section>
        <section id="text-form" className="mb-5">
          <TextForm heading="Enter the text to analyse below" mode={mode} />
        </section>
        <section id="about" className="mb-5">
          <About mode={mode} />
        </section>
      </main>
      <Footer mode={mode} />
    </>
  );
}

export default App;
