/* --- File: frontend/src/components/Modal/index.js --- */
import React from 'react';
import { LuX } from 'react-icons/lu';
import './index.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-button" aria-label="Close modal">
                    <LuX />
                </button>
                {title && <h3 className="modal-header">{title}</h3>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
