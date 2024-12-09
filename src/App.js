import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
// import Alert from "./components/Alert";
import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import CommonNumbers from "./components/CommonNumbers";
import TaskTimer from "./components/TaskTimer";

function App() {
  // Check the mode from localStorage when the component mounts
  const savedMode = localStorage.getItem("mode") || "light"; // Default to "light" if not found
  const [mode, setMode] = useState(savedMode);

  // Function to toggle mode
  const togglemode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.body.style.backgroundColor =
      newMode === "dark" ? "rgb(33 37 41)" : "white";
    toast.success(
      `${
        newMode.charAt(0).toUpperCase() + newMode.slice(1)
      } mode has been enabled`
    ); // Display success toast
    document.title = `Task Tracker ${
      newMode.charAt(0).toUpperCase() + newMode.slice(1)
    } Mode`; // Change document title based on mode

    // Save the selected mode to localStorage
    localStorage.setItem("mode", newMode);
  };

  useEffect(() => {
    // Apply the mode when the component mounts
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
      {/* <Router> */}
      <Navbar title="Task Tracker By Rupam" mode={mode} togglemode={togglemode} />
      {/* <Alert alert={alert} /> */}
      {/* Toast container for showing toasts */}
      <Toaster position="bottom-right" />{" "}
      {/* Position it in the bottom-right corner */}
      <div className="container my-3">
        <TaskTimer mode={mode} />
        <CommonNumbers mode={mode} />
        <TextForm
          // showAlert={showAlert}
          heading="Enter the text to analyse below"
          mode={mode}
        />
        <About mode={mode} />
        {/* <Routes> */} {/* Replaced Switch with Routes */}
        {/* <Route path="/about"  element={<About mode={mode} />} />{" "}
            <Route path="/common-numbers"  element={<CommonNumbers mode={mode} />} />{" "}
            <Route path="/task-timer"  element={<TaskTimer mode={mode} />} />{" "} */}
        {/* Used 'element' instead of 'children' */}
        {/* <Route
              path="/"
              element={
                <TextForm
                  // showAlert={showAlert}
                  heading="Enter the text to analyse below"
                  mode={mode}
                />
              }
            /> */}
        {/* </Routes> */}
      </div>
      <Footer mode={mode} />
      {/* </Router> */}
    </>
  );
}

export default App;
