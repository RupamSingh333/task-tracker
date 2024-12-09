import React from "react";

export default function About({ mode }) {
    
  return (
    <div
      className={`container my-5 ${mode === 'light' ? 'text-dark' : 'text-white'}`}
    >
      <h1 className="my-3 text-center">About Us</h1>

      {/* Introduction Section */}
      <div className="row mt-5">
        <div className="col-md-6">
          <h3>Welcome to Our Website</h3>
          <p>
            We are a passionate team of web developers dedicated to creating
            high-quality, user-friendly websites and applications. Our mission
            is to help businesses grow by building digital solutions that drive
            success.
          </p>
        </div>

        <div className="col-md-6 text-center">
          <img
            src="https://www.daac.in/images/facultyimg/1231673487.png"
            alt="Team"
            className="img-fluid rounded-circle shadow"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Our Services Section */}
      <div className="row mt-5">
        <div className="col-md-4">
          <div
            className={`card text-center ${
              mode === "light" ? "bg-light text-dark" : "bg-dark text-light"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">Web Development</h5>
              <p className="card-text">
                We build responsive, performance-optimized websites tailored to
                your business needs.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className={`card text-center ${
              mode === "light" ? "bg-light text-dark" : "bg-dark text-light"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">Mobile App Development</h5>
              <p className="card-text">
                We create seamless mobile experiences for both Android and iOS
                platforms.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className={`card text-center ${
              mode === "light" ? "bg-light text-dark" : "bg-dark text-light"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">UI/UX Design</h5>
              <p className="card-text">
                We design intuitive user interfaces and experiences that
                captivate and engage users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Skills and Technologies Section */}
      <div className="row mt-5">
        <div className="col-md-4">
          <div
            className={`card text-center ${
              mode === "light" ? "bg-light text-dark" : "bg-dark text-light"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">AWS</h5>
              <p className="card-text">
                Experience in cloud computing services using AWS, deploying
                scalable applications.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className={`card text-center ${
              mode === "light" ? "bg-light text-dark" : "bg-dark text-light"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">MERN Stack</h5>
              <p className="card-text">
                Proficient in MongoDB, Express.js, React, and Node.js for
                full-stack web development.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className={`card text-center ${
              mode === "light" ? "bg-light text-dark" : "bg-dark text-light"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">PHP</h5>
              <p className="card-text">
                Experience in backend development using PHP and frameworks like
                Laravel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Section */}
      <div className="row mt-5">
        <div className="col-md-12 text-center">
          <h4 className={`${mode === "light" ? "text-dark" : "text-light"}`}>
            Find My Work on GitHub
          </h4>
          <a
            href="https://github.com/RupamSingh333"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className={`btn ${mode === "light" ? "btn-dark" : "btn-light"}`}
            >
              Visit My GitHub Profile
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
