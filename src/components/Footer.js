import React from 'react';
import { FaFacebook, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Importing icons

export default function Footer({ mode }) {
  return (
    <footer className={`footer ${mode === 'light' ? 'bg-light text-dark' : 'bg-dark text-white'}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Me</h5>
            <p>
              Hi, I'm <strong>Rupam Singh</strong>, a passionate web developer.
              You can reach me via email or connect with me on social media.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Contact Information</h5>
            <ul className="list-unstyled">
              <li>
                <FaEnvelope /> <a href="mailto:rupamkumar333@gmail.com" className="text-decoration-none">rupamkumar333@gmail.com</a>
              </li>
              <li>
                <FaPhoneAlt /> <a href="tel:+918538945025" className="text-decoration-none">8538945025</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Connect with Me</h5>
            <ul className="list-unstyled d-flex">
              <li className="mx-2">
                <a href="https://www.instagram.com/rupamsingh_007/profilecard/?igsh=b3hmcG9zajl4dmI5" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} className={`text-${mode === 'light' ? 'dark' : 'white'}`} />
                </a>
              </li>
              <li className="mx-2">
                <a href="https://www.facebook.com/share/15phR6gpk6/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} className={`text-${mode === 'light' ? 'dark' : 'white'}`} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Rupam Singh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
