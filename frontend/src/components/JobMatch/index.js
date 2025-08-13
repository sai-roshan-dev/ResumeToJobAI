import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { LuUpload, LuFileText, LuX, LuZap, LuSparkles } from 'react-icons/lu';
import { HiCheckCircle } from 'react-icons/hi';
import './index.css';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import Toast from '../Toast';
import config from '../../config'; // Import the new config file
const API_URL = `${config.API_BASE_URL}/api/resumes/match`;

const JobMatchPage = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [matchResults, setMatchResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            setError('');
        },
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1
    });

    const handleMatch = async () => {
        if (isLoading) return;  // Prevent multiple rapid calls

        if (!file || !jobDescription) {
            setError('Please upload a resume and paste a job description.');
            return;
        }

        setIsLoading(true);
        setError('');
        setMatchResults(null);
        setToast({ message: '', type: '' });

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDescription);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            setMatchResults(response.data.data);
            setToast({ message: 'Job match analysis completed successfully!', type: 'success' });
        } catch (err) {
            console.error('Job Match API Error:', err);
            setError('Failed to perform job match. Please check your inputs and backend server.');
            setToast({ message: 'Job match failed. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-text-center">
                        <h1 className="hero-title">AI-Powered Job Matching</h1>
                        <p className="hero-description">
                            Discover how well your resume matches any job description with our advanced AI analysis. 
                            Get instant insights and personalized recommendations to boost your chances.
                        </p>
                        <div className="hero-features">
                            <div className="hero-feature-item">
                                <HiCheckCircle size={20} />
                                <span>Instant Analysis</span>
                            </div>
                            <div className="hero-feature-item">
                                <LuZap size={20} />
                                <span>AI-Powered Insights</span>
                            </div>
                            <div className="hero-feature-item">
                                <LuSparkles size={20} />
                                <span>Personalized Tips</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-card">
                            <LoadingSpinner />
                            <p className="loading-text">Analyzing your match...</p>
                        </div>
                    </div>
                )}

                {error && <ErrorMessage message={error} />}
                <Toast message={toast.message} type={toast.type} />

                <div className="input-section-card">
                    <h2 className="input-section-title">Upload Your Resume & Job Description</h2>
                    
                    <div className="input-grid-enhanced">
                        {/* File Upload */}
                        <div className="input-group-enhanced">
                            <label className="input-label-enhanced">Upload Resume</label>
                            <div
                                {...getRootProps()}
                                className={`dropzone-area-enhanced ${isDragActive ? 'dropzone-active' : ''}`}
                            >
                                <input {...getInputProps()} />
                                <LuUpload size={48} className="dropzone-icon" />
                                <p className="dropzone-text-primary">
                                    {isDragActive ? 'Drop your file here...' : 'Drag & drop your PDF resume'}
                                </p>
                                <p className="dropzone-text-secondary">or click to browse</p>
                            </div>
                            
                            {file && (
                                <div className="file-info-enhanced">
                                    <div className="file-info-content">
                                        <LuFileText size={20} className="file-icon" />
                                        <span className="file-name-text">{file.name}</span>
                                    </div>
                                    <button
                                        onClick={() => setFile(null)}
                                        className="file-remove-btn"
                                        aria-label="Remove file"
                                    >
                                        <LuX size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Job Description */}
                        <div className="input-group-enhanced">
                            <label htmlFor="jobDescription" className="input-label-enhanced">
                                Job Description
                            </label>
                            <textarea
                                id="jobDescription"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="input-textarea-enhanced"
                                placeholder="Paste the complete job description here..."
                            />
                        </div>
                    </div>

                    <div className="action-button-container">
                        <button
                            onClick={handleMatch}
                            disabled={isLoading || !file || !jobDescription}
                            className="action-button-enhanced"
                        >
                            {isLoading ? 'Analyzing Match...' : 'Analyze Job Match'}
                        </button>
                    </div>
                </div>

                {matchResults && (
                    <div className="results-section-card">
                        <div className="results-header">
                            <h3 className="results-title">Match Analysis Results</h3>
                            <div className="match-percentage-container">
                                <div className="match-percentage-circle">
                                    <svg className="progress-ring" viewBox="0 0 120 120">
                                        <circle
                                            className="progress-ring-bg"
                                            cx="60"
                                            cy="60"
                                            r="50"
                                        />
                                        <circle
                                            className="progress-ring-fill"
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            style={{
                                                strokeDasharray: `${matchResults.matchPercentage * 3.14} 314`,
                                            }}
                                        />
                                    </svg>
                                    <div className="progress-ring-text">
                                        <span className="percentage-text">
                                            {matchResults.matchPercentage}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="results-grid">
                            <div className="result-card result-card-blue">
                                <h4 className="result-card-title">Match Summary</h4>
                                <p className="result-card-text">{matchResults.matchSummary}</p>
                            </div>
                            
                            <div className="result-card result-card-orange">
                                <h4 className="result-card-title">Skills to Develop</h4>
                                <div className="tag-container">
                                    {matchResults.missingSkills.map((skill, index) => (
                                        <span key={index} className="tag tag-orange">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="result-card result-card-green">
                                <h4 className="result-card-title">Keywords to Add</h4>
                                <div className="tag-container">
                                    {matchResults.keywordsToAdd.map((keyword, index) => (
                                        <span key={index} className="tag tag-green">{keyword}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobMatchPage;
