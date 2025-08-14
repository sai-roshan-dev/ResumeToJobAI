/* --- File: frontend/src/components/Header/index.js --- */
import React, { useContext, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './index.css';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleProfileDropdown = (e) => {
        e.stopPropagation();
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsProfileDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header-container">
            <div className="header-left">
                <a href="/" className="header-logo">
                    ResumeToJobAI
                </a>
            </div>
            
            {/* Mobile menu button */}
            <button 
                className="mobile-menu-button"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                {isAuthenticated ? (
                    <>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/job-match" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Job Match
                        </NavLink>
                        <NavLink 
                            to="/dashboard" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink 
                            to="/job-search" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Fresh Jobs
                        </NavLink>
                        <NavLink 
                            to="/history" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            History
                        </NavLink>
                        {/* Profile dropdown */}
                        <div className="profile-dropdown" ref={profileDropdownRef}>
                            <button 
                                className="nav-link profile-button"
                                onClick={toggleProfileDropdown}
                            >
                                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profile
                                <svg className={`dropdown-arrow ${isProfileDropdownOpen ? 'rotated' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {isProfileDropdownOpen && (
                                <div className="dropdown-menu">
                                    <NavLink 
                                        to="/profile" 
                                        className="dropdown-item"
                                        onClick={() => {
                                            setIsProfileDropdownOpen(false);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </NavLink>
                                    <button 
                                        onClick={handleLogout} 
                                        className="dropdown-item logout-button"
                                    >
                                        <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink 
                            to="/login" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Login
                        </NavLink>
                        <NavLink 
                            to="/register" 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </nav>

            {/* Mobile menu overlay */}
            {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
        </header>
    );
};

export default Header;