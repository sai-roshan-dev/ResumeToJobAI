/* --- File: frontend/src/components/ResumeTable/index.js --- */
import React from 'react';
import './index.css';

const ResumeTable = ({ resumes, onViewDetails, onDelete }) => {
    return (
        <div className="resume-table-container">
            <table className="resume-table">
                <thead>
                    <tr className="table-header">
                        <th>File Name</th>
                        <th>Rating</th>
                        <th>Upload Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {resumes.map((item) => (
                        <tr key={item._id}>
                            <td>{item.fileName}</td>
                            <td>
                                {item.aiAnalysis && item.aiAnalysis.resumeRating ? (
                                    <span 
                                        className="rating-badge" 
                                        style={{ backgroundColor: item.aiAnalysis.resumeRating > 7 ? '#D1FAE5' : '#FEF3C7', color: item.aiAnalysis.resumeRating > 7 ? '#065F46' : '#92400E' }}>
                                        {item.aiAnalysis.resumeRating}/10
                                    </span>
                                ) : (
                                    <span className="rating-badge" style={{ backgroundColor: '#e5e7eb', color: '#6b7280' }}>
                                        N/A
                                    </span>
                                )}
                            </td>
                            <td>{new Date(item.uploadedAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => onViewDetails(item)}>View Details</button>
                                <button onClick={() => onDelete(item)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResumeTable;
