import React from 'react';
import './index.css';

const Projects = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <div className="projects-section">
            <h4 className="projects-title">Projects</h4>
            {projects.map((project, index) => (
                <div key={index} className="project-card">
                    <p className="project-name">{project.name}</p>
                    {project.description && <p className="project-description">{project.description}</p>}
                    {project.technologies && project.technologies.length > 0 && (
                        <p className="project-technologies">
                            <strong>Technologies:</strong> {project.technologies.join(', ')}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Projects;
