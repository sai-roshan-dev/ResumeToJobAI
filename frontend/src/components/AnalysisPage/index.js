/* --- File: frontend/src/components/AnalysisPage/index.js --- */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { normalizeKeys } from '../../utils';
import ResumeDisplay from '../ResumeDisplay';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import './index.css';
import config from '../../config'; // 1. IMPORT THE CONFIG FILE

// 2. USE THE CONFIG FILE TO BUILD THE API URL
const API_URL = `${config.API_BASE_URL}/api/resumes`;

const AnalysisPage = () => {
    const { id } = useParams();
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnalysis = async () => {
            setIsLoading(true);
            setError('');
            try {
                // No changes needed here, it already uses the API_URL variable
                const response = await axios.get(`${API_URL}/${id}`);
                const rawData = response.data.data;

                const cleanedAnalysis = {
                    ...normalizeKeys(rawData),
                    extractedData: normalizeKeys(rawData.extractedData),
                    aiAnalysis: normalizeKeys(rawData.aiAnalysis),
                };

                setAnalysis(cleanedAnalysis);
                console.log('Normalized Analysis object keys:', Object.keys(cleanedAnalysis));
            } catch (err) {
                console.error('API Error:', err);
                setError('Failed to fetch resume analysis. Please check the resume ID.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchAnalysis();
        }
    }, [id]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!analysis) {
        return <p className="no-analysis-message">No analysis data found.</p>;
    }
    return (
        <div className="analysis-page-container">
            <ResumeDisplay analysis={analysis} />
        </div>
    );
};

export default AnalysisPage;