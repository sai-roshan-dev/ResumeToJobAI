import React from 'react';
import './index.css';

const Education = ({ education }) => {
    if (!education || education.length === 0) {
        return null;
    }

    return (
        <div className="education-section">
            <h4 className="education-title">Education</h4>
            {education.map((edu, index) => (
                <div key={index} className="institution-card">
                    <p className="institution-degree">{edu.degree}</p>
                    <p className="institution-details">
                        {edu.institution} {edu.graduationYear && `| Graduated: ${edu.graduationYear}`}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Education;
