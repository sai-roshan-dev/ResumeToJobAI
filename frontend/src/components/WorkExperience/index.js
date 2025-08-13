import React from 'react';
import './index.css';

const WorkExperience = ({ workExperience }) => {
    if (!workExperience || workExperience.length === 0) {
        return null;
    }

    return (
        <div className="work-experience-section">
            <h4 className="work-experience-title">Work Experience</h4>
            {workExperience.map((job, index) => (
                <div key={index} className="job-card">
                    <p className="job-role">{job.role}</p>
                    <p className="job-details">{job.company} | {job.duration}</p>
                    {job.description && (
                        <ul className="job-description-list">
                            {job.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WorkExperience;
