/* --- File: frontend/src/components/ResumeModal/index.js --- */
import React from 'react';
import Modal from '../Modal'; // Import the new reusable Modal component
import ResumeDisplay from '../ResumeDisplay';
import './index.css';

const ResumeModal = ({ isOpen, onClose, resumeData }) => {
    if (!resumeData) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Resume Details">
            <ResumeDisplay analysis={resumeData} />
        </Modal>
    );
};

export default ResumeModal;
