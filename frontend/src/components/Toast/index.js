import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'; // Changed icons here
import './index.css';

const Toast = ({ message, type, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!isVisible || !message) {
        return null;
    }

    const toastClass = `toast-container ${type}`;
    const icon = type === 'success' ? <FiCheckCircle /> : <FiXCircle />;  // updated icons

    return (
        <div className={toastClass}>
            {icon}
            <span className="toast-message">{message}</span>
        </div>
    );
};

export default Toast;
