/* --- File: frontend/src/components/ResumeDisplay/index.js --- */
import React from 'react';
import ResumeOverview from '../ResumeOverview';
import AIAnalysis from '../AIAnalysis';
import PersonalInfo from '../PersonalInfo';
import WorkExperience from '../WorkExperience';
import Education from '../Education';
import Skills from '../Skills';
import Projects from '../Projects';
import './index.css';

const ResumeDisplay = ({ analysis }) => {
    if (!analysis) {
        return <p>No analysis data to display.</p>;
    }

    // Safe destructuring with defaults
    const extractedData = analysis.extractedData || {};
    const aiAnalysis = analysis.aiAnalysis || {};

    return (
        <div className="resume-display-container">
            <h3 className="resume-display-header">Analysis Results</h3>

            {/* High-level overview and AI insights */}
            <ResumeOverview analysis={{ aiAnalysis }} />
            <AIAnalysis analysis={{ aiAnalysis }} />

            {/* Display extracted resume details */}
            {(extractedData.name || extractedData.email) && (
                <PersonalInfo extractedData={extractedData} />
            )}

            {extractedData.workExperience && extractedData.workExperience.length > 0 && (
                <WorkExperience workExperience={extractedData.workExperience} />
            )}

            {(extractedData.technicalSkills?.length > 0 || extractedData.softSkills?.length > 0) && (
                <Skills
                    technicalSkills={extractedData.technicalSkills}
                    softSkills={extractedData.softSkills}
                />
            )}

            {extractedData.education && extractedData.education.length > 0 && (
                <Education education={extractedData.education} />
            )}

            {extractedData.projects && extractedData.projects.length > 0 && (
                <Projects projects={extractedData.projects} />
            )}
        </div>
    );
};

export default ResumeDisplay;
