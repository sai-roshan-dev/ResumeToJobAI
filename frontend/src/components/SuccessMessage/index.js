/* --- File: frontend/src/components/SuccessMessage/index.js --- */
import React from 'react';
import './index.css';

const SuccessMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="success-message-container">
            <p>{message}</p>
        </div>
    );
};

export default SuccessMessage;
