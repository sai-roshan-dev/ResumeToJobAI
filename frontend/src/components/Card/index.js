/* --- File: frontend/src/components/Card/index.js --- */
import React from 'react';
import './index.css';

const Card = ({ children }) => {
    return (
        <div className="card-container">
            {children}
        </div>
    );
};

export default Card;
