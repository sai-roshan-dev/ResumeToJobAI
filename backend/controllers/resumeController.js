/* --- File: backend/controllers/resumeController.js --- */
const multer = require('multer');
const path = require('path');
const pdf = require('pdf-parse');
const Resume = require('../models/Resume');
const { getAIAnalysis, getJobMatchAnalysis, getJobSearchData } = require('../services/analysisService');
const { searchAdzunaJobs } = require('../services/jobSearchService');

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
    }
}).fields([{ name: 'resume', maxCount: 1 }, { name: 'filters', maxCount: 1 }]);

const uploadResume = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
        if (!req.files || !req.files['resume'] || req.files['resume'].length === 0) {
            return res.status(400).json({ success: false, error: 'No resume file uploaded.' });
        }
        
        // Use the userId from the authenticated user
        const userId = req.user._id;

        try {
            // 1. Extract text from PDF
            const dataBuffer = req.files['resume'][0].buffer;
            const pdfData = await pdf(dataBuffer);
            const extractedText = pdfData.text;

            // 2. Perform AI analysis using the new service
            const aiAnalysisResult = await getAIAnalysis(extractedText);

            // 3. Save the data to MongoDB, linking it to the user
            const newResume = new Resume({
                userId,
                fileName: req.files['resume'][0].originalname,
                extractedData: aiAnalysisResult.extractedData,
                aiAnalysis: aiAnalysisResult.aiAnalysis
            });
            await newResume.save();

            res.status(201).json({
                success: true,
                message: 'Resume analyzed and saved successfully.',
                data: newResume
            });

        } catch (error) {
            console.error('Error during resume upload and analysis:', error);
            res.status(500).json({ success: false, error: 'Internal server error.' });
        }
    });
};

const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }); // Filter by userId
        res.status(200).json({ success: true, data: resumes });
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};

const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id }); // Filter by userId
        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found.' });
        }
        res.status(200).json({ success: true, data: resume });
    } catch (error) {
        console.error('Error fetching resume by ID:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};

const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); // Filter by userId
        if (!resume) {
            return res.status(404).json({ success: false, error: 'Resume not found.' });
        }
        res.status(200).json({ success: true, message: 'Resume deleted successfully.' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};

const matchResume = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
        if (!req.files || !req.files['resume'] || !req.body.jobDescription) {
            return res.status(400).json({ success: false, error: 'Resume file and job description are required.' });
        }
        
        // Use the userId from the authenticated user
        const userId = req.user._id;

        try {
            const resumeBuffer = req.files['resume'][0].buffer;
            const jobDescription = req.body.jobDescription;

            const pdfData = await pdf(resumeBuffer);
            const resumeText = pdfData.text;

            const jobMatchAnalysis = await getJobMatchAnalysis(resumeText, jobDescription);

            const newResume = new Resume({
                userId,
                fileName: req.files['resume'][0].originalname,
                extractedData: { text: resumeText },
                jobMatch: jobMatchAnalysis
            });
            await newResume.save();

            res.status(200).json({
                success: true,
                message: 'Job match analysis completed.',
                data: jobMatchAnalysis
            });

        } catch (error) {
            console.error('Error during job match analysis:', error);
            res.status(500).json({ success: false, error: 'Internal server error.' });
        }
    });
};

const getFreshJobs = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err.message });
        }
        if (!req.files || !req.files['resume'] || req.files['resume'].length === 0) {
            return res.status(400).json({ success: false, error: 'Resume file is required.' });
        }

        try {
            const resumeBuffer = req.files['resume'][0].buffer;
            const pdfData = await pdf(resumeBuffer);
            const resumeText = pdfData.text;
            
            const filters = req.body.filters ? JSON.parse(req.body.filters) : {};
            const page = req.query.page || 1;
            
            const { jobTitle, skills, domain } = await getJobSearchData(resumeText);
            const { jobs, totalJobs } = await searchAdzunaJobs(jobTitle, skills, domain, filters, page);

            res.status(200).json({
                success: true,
                message: 'Jobs fetched successfully.',
                data: {
                    jobs,
                    totalJobs
                }
            });

        } catch (error) {
            console.error('Error during job search:', error);
            res.status(500).json({ success: false, error: 'Internal server error.' });
        }
    });
};

const getDashboardStats = async (req, res) => {
    try {
        const stats = await Resume.aggregate([
            { $match: { userId: req.user._id } }, // Filter by userId
            {
                $facet: {
                    scoreTrend: [
                        { $match: { "aiAnalysis.resumeRating": { $exists: true } } },
                        {
                            $group: {
                                _id: {
                                    $dateToString: { format: "%Y-%m-%d", date: "$uploadedAt" }
                                },
                                averageRating: { $avg: "$aiAnalysis.resumeRating" }
                            }
                        },
                        { $sort: { _id: 1 } }
                    ],
                    topTechnicalSkills: [
                        { $unwind: "$extractedData.technicalSkills" },
                        { $group: { _id: "$extractedData.technicalSkills", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 }
                    ],
                    topSoftSkills: [
                        { $unwind: "$extractedData.softSkills" },
                        { $group: { _id: "$extractedData.softSkills", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 10 }
                    ],
                    averageMatchScore: [
                        { $match: { "jobMatch.matchPercentage": { $exists: true } } },
                        { $group: { _id: null, averagePercentage: { $avg: "$jobMatch.matchPercentage" } } }
                    ]
                }
            }
        ]);

        res.status(200).json({ success: true, data: stats[0] });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};

module.exports = {
    uploadResume,
    getAllResumes,
    getResumeById,
    deleteResume,
    matchResume,
    getFreshJobs,
    getDashboardStats
};
