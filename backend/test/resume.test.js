const request = require('supertest');
const app = require('../server.cjs');
const mongoose = require('mongoose');
const path = require('path');

describe('Resume API', () => {
    // Connect to the database before all tests run.
    beforeAll(async () => {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error("MongoDB URI is not set. Please check your .env file.");
            // Or throw an error to fail fast
        }

        try {
            await mongoose.connect(mongoUri);
            console.log("Connected to MongoDB for testing.");
        } catch (err) {
            console.error("MongoDB connection error during testing:", err.message);
        }
    });

    // Clean up the database after each test to ensure tests are isolated.
    afterEach(async () => {
        // Drop the 'resumes' collection to reset the state.
        await mongoose.connection.collection('resumes').deleteMany({});
    });

    // Disconnect from the database after all tests are finished.
    afterAll(async () => {
        await mongoose.connection.close();
        console.log("Disconnected from MongoDB after testing.");
    });

    // Test case 1: Successful PDF upload.
    test('should upload a PDF and return a success message', async () => {
        const filePath = path.join(__dirname, 'sample_resume.pdf');
        
        try {
            const response = await request(app)
                .post('/api/resumes/upload')
                .attach('resume', filePath);

            expect(response.statusCode).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Resume analyzed and saved successfully.');
            expect(response.body.data.fileName).toBe('sample_resume.pdf');
        } catch (error) {
            console.error("Test failed due to file upload error:", error);
            throw error;
        }
    });

    // Test case 2: Error handling for no file uploaded.
    test('should return a 400 error if no file is uploaded', async () => {
        const response = await request(app)
            .post('/api/resumes/upload');
        
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('No file uploaded.');
    });
});
