import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { LuUpload, LuFileText, LuX, LuBriefcase, LuBuilding, LuCalendar } from 'react-icons/lu';
import './index.css';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import Toast from '../Toast';

const API_URL = "http://localhost:5000/api/resumes/search-jobs";

const JobSearchPage = () => {
    const [file, setFile] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });
    const [hasSearched, setHasSearched] = useState(false);

    // State for filters
    const [filters, setFilters] = useState({
        remote: false,
        salaryMin: '',
        experience: '',
        dateRange: ''
    });

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

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

    const handleSearch = async () => {
        if (isLoading) return; // Prevent multiple API calls
        if (!file) {
            setError('Please upload a resume to find jobs.');
            return;
        }

        setIsLoading(true);
        setError('');
        setToast({ message: '', type: '' });
        setJobs([]);
        setHasSearched(true);

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('filters', JSON.stringify(filters));

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setJobs(response.data.data.jobs);
            setToast({ message: 'Jobs fetched successfully!', type: 'success' });
        } catch (err) {
            console.error('Job Search API Error:', err);
            setError('Failed to fetch jobs. Please check your resume and try again.');
            setToast({ message: 'Job search failed. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setError('');
    };

    return (
        <div className="job-search-container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Find Your Dream Job</h1>
                    <p className="hero-subtitle">
                        Upload your resume and discover personalized job opportunities tailored to your skills and experience
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">10K+</span>
                            <span className="stat-label">Jobs Available</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h2 className="section-title">Get Fresh Jobs</h2>

                {/* Loading Spinner */}
                {isLoading && <LoadingSpinner />}

                {/* Error Message */}
                {error && <ErrorMessage message={error} />}

                {/* Toast Notifications */}
                <Toast message={toast.message} type={toast.type} />

                <div className="input-grid">
                    {/* Upload Section */}
                    <div className="input-group">
                        <label className="input-label">Upload Resume</label>
                        <div
                            {...getRootProps()}
                            className={`dropzone-area ${isDragActive ? 'drag-active' : ''}`}
                        >
                            <input {...getInputProps()} />
                            <div className="dropzone-icon">
                                <LuUpload size={48} />
                            </div>
                            <p className="dropzone-text">
                                {isDragActive
                                    ? 'Drop your file here...'
                                    : 'Drag & drop a PDF, or click to browse'
                                }
                            </p>
                            <p className="dropzone-text" style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                                Maximum file size: 10MB
                            </p>
                        </div>

                        {/* File Info Display */}
                        {file && (
                            <div className="file-info">
                                <div className="file-name">
                                    <LuFileText size={20} />
                                    <div>
                                        <span>{file.name}</span>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={removeFile}
                                    className="file-remove-btn"
                                    aria-label="Remove file"
                                    type="button"
                                >
                                    <LuX size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Filters Section */}
                    <div className="filters-section">
                        <h3 className="filters-title">Job Filters</h3>

                        {/* Remote Work Filter */}
                        <div className="filter-group-item">
                            <label className="filter-label-checkbox">
                                <input
                                    type="checkbox"
                                    name="remote"
                                    checked={filters.remote}
                                    onChange={handleFilterChange}
                                />
                                <span>Remote Work Opportunities</span>
                            </label>
                        </div>

                        {/* Salary Filter */}
                        <div className="filter-group-item">
                            <label htmlFor="salaryMin" className="filter-label">
                                Minimum Salary
                            </label>
                            <input
                                type="number"
                                id="salaryMin"
                                name="salaryMin"
                                value={filters.salaryMin}
                                onChange={handleFilterChange}
                                className="filter-input"
                                placeholder="e.g., 50000"
                                min="0"
                                step="1000"
                            />
                        </div>

                        {/* Date Range Filter */}
                        <div className="filter-group-item">
                            <label htmlFor="dateRange" className="filter-label">
                                Posted Within
                            </label>
                            <select
                                id="dateRange"
                                name="dateRange"
                                value={filters.dateRange}
                                onChange={handleFilterChange}
                                className="filter-select"
                            >
                                <option value="">Any Time</option>
                                <option value="1">Last 24 hours</option>
                                <option value="7">Last 7 days</option>
                                <option value="30">Last 30 days</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="action-button-container">
                    <button
                        onClick={handleSearch}
                        disabled={isLoading || !file}
                        className="action-button"
                        type="button"
                    >
                        {isLoading ? (
                            <span>Searching Jobs...</span>
                        ) : (
                            <>
                                <LuBriefcase size={20} />
                                <span>Find My Perfect Jobs</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Job Results */}
                {jobs.length > 0 && (
                    <div className="job-list">
                        <h3 className="section-title">
                            Job Results ({jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found)
                        </h3>

                        <div className="jobs-grid">
                            {jobs.map((job, index) => (
                                <div key={index} className="job-card">
                                    <div className="job-header">
                                        <h4 className="job-title">{job.title}</h4>
                                        <div className="job-meta">
                                            {job.salary && (
                                                <span className="job-salary">
                                                    ${job.salary.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="job-details-grid">
                                        <div className="job-detail">
                                            <LuBuilding size={16} />
                                            <div>
                                                <strong>Company: </strong>
                                                <span>{job.company}</span>
                                            </div>
                                        </div>
                                        <div className="job-detail">
                                            <LuBriefcase size={16} />
                                            <div>
                                                <strong>Location: </strong>
                                                <span>{job.location}</span>
                                            </div>
                                        </div>
                                        <div className="job-detail">
                                            <LuCalendar size={16} />
                                            <div>
                                                <strong>Posted: </strong>
                                                <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {job.description && (
                                        <p className="job-description">
                                            {job.description.length > 150
                                                ? `${job.description.substring(0, 150)}...`
                                                : job.description
                                            }
                                        </p>
                                    )}

                                    {job.requirements && job.requirements.length > 0 && (
                                        <div className="job-requirements">
                                            <strong>Key Requirements:</strong>
                                            <ul>
                                                {job.requirements.slice(0, 3).map((req, idx) => (
                                                    <li key={idx}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="job-actions">
                                        <a
                                            href={job.applyLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="apply-link"
                                        >
                                            Apply Now
                                            <span>→</span>
                                        </a>

                                        {job.matchScore && (
                                            <div className="match-score">
                                                <span className="match-label">Match Score: </span>
                                                <span className="match-percentage">{job.matchScore}%</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results Message */}
                {!isLoading && hasSearched && jobs.length === 0 && file && (
                    <div className="no-results">
                        <div className="no-results-icon">
                            <LuBriefcase size={64} />
                        </div>
                        <h3>No Jobs Found</h3>
                        <p>
                            We couldn't find any jobs matching your criteria. 
                            Try adjusting your filters or uploading a different resume.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobSearchPage;
