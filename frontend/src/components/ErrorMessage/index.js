/* --- File: frontend/src/components/ErrorMessage/index.js --- */
import React from 'react';
import './index.css';

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="error-message-container">
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;
