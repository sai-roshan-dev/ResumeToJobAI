/* --- File: frontend/src/components/DashboardPage/index.js --- */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import './index.css';

const API_URL = `${config.API_BASE_URL}/api/resumes/stats/dashboard`;

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            setError('');
             try {
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });    
            setStats(response.data.data);
            } catch (err) {
                console.error('Dashboard API Error:', err);
                setError('Failed to fetch dashboard data. Please check the backend server.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!stats) {
        return <p>No dashboard data found.</p>;
    }

    // Format data for Recharts
    const scoreTrendData = stats.scoreTrend.map(item => ({
        date: item._id,
        'Average Rating': parseFloat(item.averageRating.toFixed(1)),
    }));
    const technicalSkillsData = stats.topTechnicalSkills.map(item => ({
        skill: item._id,
        count: item.count,
    }));
    const softSkillsData = stats.topSoftSkills.map(item => ({
        skill: item._id,
        count: item.count,
    }));

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Analytics Dashboard</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3 className="stat-card-title">Average Match Score</h3>
                    <p className="stat-card-value">
                        {stats.averageMatchScore.length > 0 ? `${stats.averageMatchScore[0].averagePercentage.toFixed(1)}%` : 'N/A'}
                    </p>
                </div>
            </div>
            
            <div className="chart-section">
                <h3 className="chart-title">Resume Score Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={scoreTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Average Rating" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="skills-section">
                <h3 className="chart-title">Top Skills Found</h3>
                <div className="skills-grid">
                    <div className="skill-list-container">
                        <h4>Top Technical Skills</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={technicalSkillsData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="skill" type="category" />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="skill-list-container">
                        <h4>Top Soft Skills</h4>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={softSkillsData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="skill" type="category" />
                                <Tooltip />
                                <Bar dataKey="count" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
