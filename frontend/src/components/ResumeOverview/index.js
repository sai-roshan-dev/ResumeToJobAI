/* --- File: frontend/src/components/ResumeOverview/index.js --- */
import React from 'react';
import './index.css';

const ResumeOverview = ({ analysis }) => {
    if (!analysis || !analysis.aiAnalysis) {
        return null;
    }

    const aiAnalysis = analysis.aiAnalysis || {};
    const { resumeRating, improvementAreas } = aiAnalysis;

    const ratingColorClass = resumeRating >= 50 ? 'rating-high' : 'rating-low';

    return (
        <div className="resume-overview-grid">
            {/* ATS Score */}
            <div className="overview-card score-card">
    <h4 className="card-title">ATS Score</h4>
    <div className={`score-circle ${ratingColorClass}`}>
        {typeof resumeRating === 'number' ? `${resumeRating}` : 'N/A'}
    </div>
</div>


            {/* Improvement Areas */}
            <div className="overview-card">
                <h4 className="card-title">Need to Improve:</h4>
                {Array.isArray(improvementAreas) && improvementAreas.length > 0 ? (
                    <ul className="improvement-list">
                        {improvementAreas.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="summary-content">
                        No improvements available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResumeOverview;
