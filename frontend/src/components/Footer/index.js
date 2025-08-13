import React from 'react';
import './index.css';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer-container">
            <p>&copy; {year} Resume Analyzer. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
