/* --- File: frontend/src/App.js --- */
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import History from './components/History';
import Header from './components/Header';
import AnalysisPage from './components/AnalysisPage';
import JobMatchPage from './components/JobMatch';
import DashboardPage from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import JobSearchPage from './components/JobSearchPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
        <div className="full-page-container">
          <div className="main-content">
            <Header />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/job-search" element={<PrivateRoute><JobSearchPage /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/job-match" element={<PrivateRoute><JobMatchPage /></PrivateRoute>} />
            <Route path="/analysis/:id" element={<PrivateRoute><AnalysisPage /></PrivateRoute>} />
          </Routes>
        </div>
    </AuthProvider>
  );
}

export default App;
