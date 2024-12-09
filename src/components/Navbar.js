import React from "react";
import PropTypes from "prop-types";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons
// import { NavLink } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} shadow-sm  fixed-top`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            {props.title}
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/" end>
                  Home
                </a>
              </li>

              {/* <li className="nav-item">
                <a className="nav-link" href="/task-timer">
                  Task Timer
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/common-numbers">
                  Common Numbers
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/about">
                  {props.aboutText}
                </a>
              </li> */}
            </ul>

            {/* Only show icon for mode toggle */}
            <div
              className={`form-check form-switch text-${
                props.mode === "light" ? "dark" : "light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={props.togglemode} // Toggle mode on icon click
            >
              {/* Icon toggle */}
              {props.mode === "light" ? <FaMoon /> : <FaSun />}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  togglemode: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: "TextUtils",
  aboutText: "About Us",
};
