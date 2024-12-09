import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa"; // Importing icons
import { FaGithub } from "react-icons/fa";


export default function Footer({ mode }) {
  return (
    <footer
      className={`footer py-4 ${
        mode === "light" ? "bg-light text-dark" : "bg-dark text-white"
      }`}
      style={{
        boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
        borderTop: mode === "light" ? "1px solid #ddd" : "1px solid #444",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* About Me Section */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">About Me</h5>
            <p>
              Hi, I'm <strong>Rupam Singh</strong>, a passionate web developer.
              Connect with me via email or on social platforms for
              collaborations.
            </p>
          </div>

          {/* Contact Information Section */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contact Information</h5>
            <ul className="list-unstyled">
              <li className="my-2">
                <FaEnvelope className="me-2" />
                <a
                  href="mailto:rupamkumar333@gmail.com"
                  className="text-decoration-none"
                >
                  rupamkumar333@gmail.com
                </a>
              </li>
              <li className="my-2">
                <FaPhoneAlt className="me-2" />
                <a href="tel:+918538945025" className="text-decoration-none">
                  +91 8538945025
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Connect with Me</h5>
            <ul className="list-unstyled d-flex align-items-center">
              <li className="mx-2">
                <a
                  href="https://www.instagram.com/rupamsingh_007/profilecard/?igsh=b3hmcG9zajl4dmI5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <FaInstagram
                    size={30}
                    className={`text-${mode === "light" ? "dark" : "white"}`}
                  />
                </a>
              </li>
              <li className="mx-2">
                <a
                  href="https://www.facebook.com/share/15phR6gpk6/?mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <FaFacebook
                    size={30}
                    className={`text-${mode === "light" ? "dark" : "white"}`}
                  />
                </a>
              </li>
              <li className="mx-2">
                <a
                  href="https://www.linkedin.com/in/rupam-kumar-1061321b2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <FaLinkedin
                    size={30}
                    className={`text-${mode === "light" ? "dark" : "white"}`}
                  />
                </a>
              </li>

              <li className="mx-2">
                <a
                  href="https://github.com/RupamSingh333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <FaGithub
                    size={30}
                    className={`text-${mode === "light" ? "dark" : "white"}`}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        {/* Footer Bottom Text */}
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} <strong>Rupam Singh</strong>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
