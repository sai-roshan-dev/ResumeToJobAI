// --- File: frontend/src/components/ResumeUpload/index.js ---
import React, { useState, useContext } from 'react'; // Import useContext
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { LuUpload, LuFileText, LuX } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import Toast from '../Toast';
import './index.css';
import config from '../../config';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

const API_URL = `${config.API_BASE_URL}/api/resumes`;

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Use useContext with AuthContext
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setError('');
        setToast({ message: '', type: '' });
      },
      accept: {
        'application/pdf': ['.pdf'],
      },
      maxFiles: 1
    });

    const handleUpload = async () => {
        if (!user) {
            setToast({ message: 'Please log in to upload a resume.', type: 'error' });
            setTimeout(() => navigate('/login'), 1500);
            return;
        }

        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        setIsLoading(true);
        setError('');
        setToast({ message: '', type: '' });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            const newResumeId = response.data.data._id;
            setToast({ message: 'Upload successful! Redirecting...', type: 'success' });
            setTimeout(() => {
                navigate(`/analysis/${newResumeId}`);
            }, 1500);

        } catch (err) {
            console.error('API Error:', err);
            if (err.response && err.response.status === 401) {
                setError('Authentication failed. Please log in again.');
                setToast({ message: 'Authentication failed. Redirecting to login.', type: 'error' });
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setError('Upload failed. Please check your backend server.');
                setToast({ message: 'Upload failed. Please try again.', type: 'error' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            <Toast message={toast.message} type={toast.type} />
            {!isLoading ? (
                <div>
                    {!file ? (
                        <div {...getRootProps()} className="dropzone-area">
                            <input {...getInputProps()} />
                            <LuUpload size={48} color="#9ca3af" />
                            <p className="dropzone-text">
                                {isDragActive ? 'Drop your file here...' : 'Drag & drop a PDF, or click to browse'}
                            </p>
                        </div>
                    ) : (
                        <div className="file-info">
                            <div className="file-name">
                                <LuFileText size={20} color="#4f46e5" />
                                <span>{file.name}</span>
                            </div>
                            <button onClick={() => setFile(null)} aria-label="Remove file">
                                <LuX size={16} color="#ef4444" />
                            </button>
                        </div>
                    )}
                    <button
                        onClick={handleUpload}
                        className="upload-button"
                        disabled={!file || isLoading}
                    >
                        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default ResumeUpload;