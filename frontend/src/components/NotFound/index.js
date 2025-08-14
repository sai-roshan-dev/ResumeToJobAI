import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://via.placeholder.com/300x200?text=404+Not+Found"
      alt="404 Not Found"
      className="notfound-image"
    />
    <h1 className="notfound-title">404 — Page Not Found</h1>
    <p className="notfound-message">
      Oops! Looks like the page you're looking for doesn't exist.
    </p>
    <Link to="/" className="notfound-button">
      Go Back Home
    </Link>
  </div>
);

export default NotFound;
