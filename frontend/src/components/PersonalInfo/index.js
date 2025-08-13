import React from 'react';
import './index.css';

const PersonalInfo = ({ extractedData }) => {
    if (!extractedData) {
        return null;
    }

    const { name, email, phone, linkedinUrl, portfolioUrl } = extractedData;

    return (
        <div className="personal-info-section">
            <h4 className="personal-info-title">Personal Information</h4>
            <ul className="personal-info-list">
                {name && <li><strong>Name:</strong> {name}</li>}
                {email && <li><strong>Email:</strong> {email}</li>}
                {phone && <li><strong>Phone:</strong> {phone}</li>}
                {linkedinUrl && <li><strong>LinkedIn:</strong> <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">{linkedinUrl}</a></li>}
                {portfolioUrl && <li><strong>Portfolio:</strong> <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">{portfolioUrl}</a></li>}
            </ul>
        </div>
    );
};

export default PersonalInfo;
