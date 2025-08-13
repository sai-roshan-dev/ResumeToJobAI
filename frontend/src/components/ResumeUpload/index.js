// --- File: frontend/src/components/ResumeUpload/index.js ---
import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { LuUpload, LuFileText, LuX } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import Toast from '../Toast'; // Import the new Toast component
import './index.css';
import config from '../../config'; // Import the new config file

const API_URL = `${config.API_BASE_URL}/api/resumes`;

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });
    const navigate = useNavigate();
    
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
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            const newResumeId = response.data.data._id;
            setToast({ message: 'Upload successful! Redirecting...', type: 'success' });
            setTimeout(() => {
                navigate(`/analysis/${newResumeId}`);
            }, 1500);

        } catch (err) {
            console.error('API Error:', err);
            setError('Upload failed. Please check your backend server.');
            setToast({ message: 'Upload failed. Please try again.', type: 'error' });
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
