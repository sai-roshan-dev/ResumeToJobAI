/* --- File: frontend/src/components/AIAnalysis/index.js --- */
import React from 'react';
import { LuLightbulb, LuThumbsUp, LuBriefcase } from 'react-icons/lu';
import './index.css';

// A reusable card component for consistent styling
const AnalysisCard = ({ icon, title, items, emptyText }) => (
    <div className="analysis-card">
        <div className="card-header">
            <div className="card-icon">{icon}</div>
            <h4 className="card-title">{title}</h4>
        </div>
        <div className="card-body">
            {items && items.length > 0 ? (
                <ul className="suggestions-list">
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>{emptyText}</p>
            )}
        </div>
    </div>
);

const AIAnalysis = ({ analysis }) => {
    // Check if analysis or aiAnalysis data is missing
    if (!analysis || !analysis.aiAnalysis) {
        return (
            <div className="ai-analysis-section">
                <p>AI analysis is not available for this resume.</p>
            </div>
        );
    }

    const { upskillSuggestions, strengthsIdentified, recommendedJobRoles } = analysis.aiAnalysis;

    return (
        <div className="ai-analysis-section">
            <AnalysisCard
                icon={<LuLightbulb size={20} />}
                title="Upskill Suggestions"
                items={upskillSuggestions}
                emptyText="No upskill suggestions were provided."
            />
            <AnalysisCard
                icon={<LuThumbsUp size={20} />}
                title="Strengths Identified"
                items={strengthsIdentified}
                emptyText="No specific strengths were identified from the resume."
            />
            <AnalysisCard
                icon={<LuBriefcase size={20} />}
                title="Recommended Job Roles"
                items={recommendedJobRoles}
                emptyText="No job roles were recommended based on the resume."
            />
        </div>
    );
};

export default AIAnalysis;