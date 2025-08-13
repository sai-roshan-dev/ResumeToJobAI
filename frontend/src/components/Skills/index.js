/* --- File: frontend/src/components/Skills/index.js --- */
import React from 'react';
import Badge from '../Badge'; // Import the new component
import './index.css';

const Skills = ({ technicalSkills, softSkills }) => {
    if ((!technicalSkills || technicalSkills.length === 0) && (!softSkills || softSkills.length === 0)) {
        return null;
    }

    return (
        <div className="skills-section">
            <h4 className="skills-title">Skills</h4>
            {technicalSkills && technicalSkills.length > 0 && (
                <>
                    <p className="skill-category">Technical Skills:</p>
                    <ul className="skill-list">
                        {technicalSkills.map((skill, index) => (
                            <li key={index} className="skill-badge">
                                <Badge>{skill}</Badge>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {softSkills && softSkills.length > 0 && (
                <>
                    <p className="skill-category" style={{ marginTop: '1rem' }}>Soft Skills:</p>
                    <ul className="skill-list">
                        {softSkills.map((skill, index) => (
                            <li key={index} className="skill-badge">
                                <Badge>{skill}</Badge>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Skills;
