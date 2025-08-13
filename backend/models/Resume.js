/* --- File: backend/models/Resume.js --- */
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fileName: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    extractedData: {
        type: Object,
        required: false
    },
    aiAnalysis: {
        type: Object,
        required: false
    },
    jobMatch: {
        type: Object,
        required: false
    },
    jobSearchData: {
        jobTitle: { type: String, required: false },
        skills: [{ type: String, required: false }],
        domain: { type: String, required: false }
    }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
