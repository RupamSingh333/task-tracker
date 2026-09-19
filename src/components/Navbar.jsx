import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";

export default function Navbar(props) {
  const [currentTime, setCurrentTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDark = props.mode === "dark";

  return (
    <div style={{
      position: "sticky",
      top: isScrolled ? "1rem" : "1.5rem",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      padding: "0 1rem"
    }}>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          background: isDark ? "rgba(15, 23, 42, 0.65)" : "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)",
          borderRadius: "50px",
          padding: "0.6rem 1.5rem",
          boxShadow: isScrolled 
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "auto",
          maxWidth: "100%"
        }}
      >
        {/* Brand/Logo */}
        <div style={{
          color: isDark ? "#fff" : "#111",
          fontWeight: "700",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <FiCheckSquare size={20} style={{ color: isDark ? "#fff" : "#111" }}/>
          {props.title}
        </div>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Watch */}
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: "600",
              color: isDark ? "#cbd5e1" : "#475569",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center"
            }}
          >
            {currentTime || "Loading..."}
          </div>
          
          {/* Divider */}
          <div style={{
            width: "1px",
            height: "20px",
            background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }}></div>

          {/* Theme Toggle */}
          <div
            onClick={props.togglemode}
            style={{ 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isDark ? "#f8fafc" : "#0f172a",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.15)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
          </div>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  togglemode: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: "Task Tracker",
};
