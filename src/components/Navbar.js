import React, { useRef } from "react";
import PropTypes from "prop-types";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons
import { FiHome } from "react-icons/fi"; // Home icon

export default function Navbar(props) {
  const footerRef = props.footerRef; // Get the footer ref from props

  const handleScrollToFooter = () => {
    if (footerRef && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to footer
    }
  };

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
                href="#"
                onClick={handleScrollToFooter} // Scroll to footer on click
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
        </div>
      </div>
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
