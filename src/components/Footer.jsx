import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaGithub
} from "react-icons/fa";

export default function Footer({ mode }) {
  const isDark = mode === "dark";
  const iconStyle = {
    color: isDark ? "#cbd5e1" : "#475569",
    transition: "all 0.2s ease"
  };

  const handleHover = (e, color) => {
    e.currentTarget.style.color = color;
    e.currentTarget.style.transform = "translateY(-3px)";
  };
  
  const handleOut = (e) => {
    e.currentTarget.style.color = iconStyle.color;
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <div className="container pb-4">
      <footer
        className="py-4 px-4 rounded-4"
        style={{
          background: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
          boxShadow: isDark ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "0 4px 30px rgba(0, 0, 0, 0.05)",
          marginTop: "2rem"
        }}
      >
        <div className="row g-4 justify-content-between">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <span style={{
                color: isDark ? "#fff" : "#111",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}>
                Task Tracker
              </span>
            </div>
            <p style={{ color: isDark ? "#94a3b8" : "#64748b", lineHeight: "1.6" }}>
              A modern, minimalist application to help you stay productive, manage your tasks, and analyze your text locally without compromising your privacy.
            </p>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3" style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>Connect</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaEnvelope style={{ color: "var(--accent-light)" }} />
                <a
                  href="mailto:rupamkumar333@gmail.com"
                  className="text-decoration-none"
                  style={{ color: isDark ? "#cbd5e1" : "#475569", transition: "color 0.2s" }}
                  onMouseOver={(e) => e.target.style.color = "var(--accent-light)"}
                  onMouseOut={(e) => e.target.style.color = isDark ? "#cbd5e1" : "#475569"}
                >
                  rupamkumar333@gmail.com
                </a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaPhoneAlt style={{ color: "var(--accent-light)" }} />
                <a 
                  href="tel:+918538945025" 
                  className="text-decoration-none"
                  style={{ color: isDark ? "#cbd5e1" : "#475569", transition: "color 0.2s" }}
                  onMouseOver={(e) => e.target.style.color = "var(--accent-light)"}
                  onMouseOut={(e) => e.target.style.color = isDark ? "#cbd5e1" : "#475569"}
                >
                  +91 8538945025
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-12">
            <h5 className="fw-bold mb-3" style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>Socials</h5>
            <div className="d-flex gap-3">
              <a href="https://github.com/RupamSingh333" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} style={iconStyle} onMouseOver={(e) => handleHover(e, isDark ? "#fff" : "#000")} onMouseOut={handleOut} />
              </a>
              <a href="https://www.linkedin.com/in/rupam-singh-1061321b2/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} style={iconStyle} onMouseOver={(e) => handleHover(e, "#0a66c2")} onMouseOut={handleOut} />
              </a>
              <a href="https://www.instagram.com/rupamsingh_007" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} style={iconStyle} onMouseOver={(e) => handleHover(e, "#e1306c")} onMouseOut={handleOut} />
              </a>
              <a href="https://www.facebook.com/share/15phR6gpk6/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} style={iconStyle} onMouseOver={(e) => handleHover(e, "#1877f2")} onMouseOut={handleOut} />
              </a>
            </div>
          </div>
        </div>
        
        <div 
          className="text-center mt-5 pt-4" 
          style={{ 
            borderTop: `1px solid ${isDark ? "#1e293b" : "#e2e8f0"}`,
            color: isDark ? "#64748b" : "#94a3b8",
            fontSize: "0.9rem"
          }}
        >
          <p className="mb-0">
            &copy; {new Date().getFullYear()} <strong style={{ color: isDark ? "#cbd5e1" : "#475569" }}>Rupam Singh</strong>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
