/* --- File: frontend/src/components/AIAnalysis/index.js --- */
import React from 'react';
import './index.css';

const AIAnalysis = ({ analysis }) => {
    if (!analysis || !analysis.aiAnalysis) {
        return null;
    }

    const { upskillSuggestions, strengthsIdentified ,recommendedJobRoles} = analysis.aiAnalysis;

    return (
        <div className="ai-analysis-section">
    {/* Upskill Suggestions */}
    <h4 className="analysis-title">Upskill Suggestions:</h4>
    {upskillSuggestions && upskillSuggestions.length > 0 ? (
        <ul className="suggestions-list">
            {upskillSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
            ))}
        </ul>
    ) : (
        <p>No upskill suggestions provided.</p>
    )}

    {/* Strengths Identified */}
    <h4 className="analysis-title" style={{ marginTop: '1.5rem' }}>Strengths Identified:</h4>
    {strengthsIdentified && strengthsIdentified.length > 0 ? (
        <ul className="suggestions-list">
            {strengthsIdentified.map((strength, index) => (
                <li key={index}>{strength}</li>
            ))}
        </ul>
    ) : (
        <p>No strengths identified.</p>
    )}

    {/* Recommended Job Roles */}
    <h4 className="analysis-title" style={{ marginTop: '1.5rem' }}>Recommended Job Roles:</h4>
    {recommendedJobRoles && recommendedJobRoles.length > 0 ? (
        <ul className="suggestions-list">
            {recommendedJobRoles.map((role, index) => (
                <li key={index}>{role}</li>
            ))}
        </ul>
    ) : (
        <p>No job roles recommended.</p>
    )}
</div>

    );
};

export default AIAnalysis;
