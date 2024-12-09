import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons
import { FiHome } from "react-icons/fi"; // Home icon

export default function Navbar(props) {

  // State to store the current time
  const [currentTime, setCurrentTime] = useState("");

  // Function to update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);


  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} shadow-sm fixed-top`}
    >
      <div className="container-fluid">
        {/* Logo and Title */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span className="brand-title">{props.title}</span>
        </a>

        {/* Toggler button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links and toggler */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center"
                href="#"
                aria-current="page"
              >
                <FiHome className="me-1" />
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#contact"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Dark/Light Mode Toggle */}
          <div
            className={`mode-toggle text-${
              props.mode === "light" ? "dark" : "light"
            }`}
            onClick={props.togglemode}
            style={{ cursor: "pointer" }}
          >
            {props.mode === "light" ? <FaMoon /> : <FaSun />}
          </div>

          {/* Watch */}
          <div
            className="watch ms-3"
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: props.mode === "light" ? "#000" : "#fff",
              textShadow: "0px 1px 5px rgba(0, 0, 0, 0.5)",
              animation: "pulse 1s infinite",
            }}
          >
            {currentTime}
          </div>
        </div>
      </div>

      {/* Adding CSS for the watch animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  togglemode: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: "Modern Website",
  aboutText: "About Us",
};
