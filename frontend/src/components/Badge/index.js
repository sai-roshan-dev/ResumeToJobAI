/* --- File: frontend/src/components/Badge/index.js --- */
import React from 'react';
import './index.css';

const Badge = ({ children }) => {
    return (
        <span className="badge-container">
            {children}
        </span>
    );
};

export default Badge;
