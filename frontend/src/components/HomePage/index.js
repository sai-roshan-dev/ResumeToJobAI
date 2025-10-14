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
          <h1>
            Land Your Dream Job Faster{" "}
            <div className="icon-rocket-special"></div>
          </h1>
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
            <div className="icon-upload-special">
              <div className="upload-arrow"></div>
              <div className="upload-paper"></div>
            </div>
            <h3>Upload Resume</h3>
            <p>Simply upload your resume in PDF or DOCX format.</p>
          </div>
          <div className="how-card">
            <div className="icon-ai-special">
              <div className="ai-core"></div>
              <div className="ai-orbit ai-orbit-1"></div>
              <div className="ai-orbit ai-orbit-2"></div>
              <div className="ai-orbit ai-orbit-3"></div>
            </div>
            <h3>AI Analysis</h3>
            <p>Our AI scans and suggests improvements instantly.</p>
          </div>
          <div className="how-card">
            <div className="icon-success-special">
              <div className="success-circle"></div>
              <div className="success-check"></div>
              <div className="success-sparkle sparkle-1"></div>
              <div className="success-sparkle sparkle-2"></div>
              <div className="success-sparkle sparkle-3"></div>
              <div className="success-sparkle sparkle-4"></div>
            </div>
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