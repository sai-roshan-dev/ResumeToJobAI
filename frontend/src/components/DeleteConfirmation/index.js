/* --- File: frontend/src/components/DeleteConfirmation/index.js --- */
import React from 'react';
import Modal from '../Modal'; // Import the new reusable Modal component
import './index.css';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, fileName }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="delete-modal-content">
                <h3 className="delete-modal-title">Confirm Deletion</h3>
                <p className="delete-modal-message">
                    Are you sure you want to delete the resume for **{fileName}**? This action cannot be undone.
                </p>
                <div className="delete-modal-actions">
                    <button onClick={onConfirm} className="delete-button">Delete</button>
                    <button onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmation;
