import React from "react";
import "./index.css";
import ResumeUpload from "../ResumeUpload";
import Footer from "../Footer";
const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Land Your Dream Job Faster 🚀</h1>
          <p>
            Upload your resume and let our AI instantly analyze, enhance, and
            optimize it for maximum impact.
          </p>
        </div>
        <div className="hero-upload">
          <ResumeUpload />
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="how-it-works-cards">
          <div className="how-card">
            <span className="card-icon">📄</span>
            <h3>Upload Resume</h3>
            <p>Simply upload your resume in PDF or DOCX format.</p>
          </div>
          <div className="how-card">
            <span className="card-icon">🤖</span>
            <h3>AI Analysis</h3>
            <p>Our AI scans and suggests improvements instantly.</p>
          </div>
          <div className="how-card">
            <span className="card-icon">✅</span>
            <h3>Download & Apply</h3>
            <p>Download the enhanced resume and start applying.</p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
