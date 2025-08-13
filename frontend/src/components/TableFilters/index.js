/* --- File: frontend/src/components/TableFilters/index.js --- */
import React, { useState } from 'react';
import './index.css';

const TableFilters = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        // Call the parent's filter function with the new search term
        onFilterChange({ searchTerm: value });
    };

    return (
        <div className="filters-container">
            <div className="filter-group">
                <label htmlFor="search" className="filter-label">Search by File Name</label>
                <input
                    id="search"
                    name="search"
                    type="text"
                    className="filter-input"
                    placeholder="e.g., 'resume.pdf'"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
            {/* Other filters like date range or rating can be added here */}
        </div>
    );
};

export default TableFilters;
