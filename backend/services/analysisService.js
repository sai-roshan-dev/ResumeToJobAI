const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const getAIAnalysis = async (resumeText) => {
    try {
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

const prompt = `
You are an expert in Applicant Tracking Systems (ATS) and resume evaluation.
Analyze the following resume text for ATS-friendliness and output a single, valid JSON object with no additional commentary or formatting.

Your analysis must follow this structure:

{
  "extractedData": {
    "name": String,
    "email": String,
    "phone": String,
    "linkedinUrl": String or null,
    "portfolioUrl": String or null,
    "summary": String,
    "workExperience": [
      {
        "role": String,
        "company": String,
        "duration": String,
        "description": [String, String, ...]
      }
    ],
    "education": [
      {
        "degree": String,
        "institution": String,
        "graduationYear": String or number
      }
    ],
    "technicalSkills": [String, String, ...],
    "softSkills": [String, String, ...],
    "projects": [
      {
        "name": String,
        "description": String,
        "technologies": [String, String, ...]
      }
    ]
  },
  "aiAnalysis": {
    "resumeRating": Number (0-100, where 100 means fully ATS-optimized),
    "improvementAreas": [String, String, ...],
    "upskillSuggestions": [String, String, ...],
    "strengthsIdentified": [String, String, ...],
    "recommendedJobRoles": [String, String, ...]
  }
}

**ATS Scoring Guidelines** for "resumeRating":
- Evaluate keyword optimization based on industry terms and role-specific skills.
- Check if the resume includes contact details, LinkedIn, portfolio/GitHub links.
- Assess structure: use of clear headings, bullet points, and chronological order.
- Detect presence of quantified achievements (e.g., “Increased efficiency by 20%”).
- Ensure relevant skills match target job domain.
- Deduct points for overuse of graphics, tables, or formatting that ATS may fail to parse.
- Deduct points for missing key sections (summary, experience, education, skills).

**"improvementAreas"**:
- Provide 3 to 7 short, actionable bullet points for ATS optimization.
- Each point must be specific (e.g., “Add measurable results to project descriptions” not “Improve descriptions”).

**"upskillSuggestions"**:
- Suggest skills and tools aligned with the candidates current domain and career goals.

**"strengthsIdentified"**:
- Highlight existing strong points from the resume.

**"recommendedJobRoles"**:
- Suggest 3 to 6 realistic roles based on skills and experience.

Ensure:
- Output is strictly JSON and valid.
- No markdown, comments, or text outside of the JSON.

Resume Text to Analyze:
"""
${resumeText}
"""
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('Gemini raw response:', text);

        let jsonString = text.trim();
        if (jsonString.startsWith('```json')) {
          jsonString = jsonString.substring(7);
        }
        if (jsonString.endsWith('```')) {
          jsonString = jsonString.substring(0, jsonString.length - 3);
        }

        try {
            return JSON.parse(jsonString);
        } catch (parseError) {
            console.error('Failed to parse JSON string:', parseError);
            console.error('Corrupted JSON string:', jsonString);
            return {
                extractedData: {},
                aiAnalysis: {
                    resumeRating: 0,
                    improvementAreas: "JSON parsing failed. Data may be incomplete.",
                    upskillSuggestions: [],
                    strengthsIdentified: [],
                    recommendedJobRoles: []
                }
            };
        }
    } catch (error) {
        console.error('Error with Gemini API:', error);
        return {
            extractedData: {},
            aiAnalysis: {
                resumeRating: 0,
                improvementAreas: "Failed to analyze resume. Please try again.",
                upskillSuggestions: [],
                strengthsIdentified: [],
                recommendedJobRoles: []
            }
        };
    }
};

// Job match analysis unchanged - same robust JSON parsing and error fallback
const getJobMatchAnalysis = async (resumeText, jobDescription) => {
    try {
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

        const prompt = `
            You are a professional resume analyst. Compare the provided resume against the job description and provide a structured JSON response with the following fields:

            1.  "matchPercentage": A numeric value (e.g., 85) representing how well the resume matches the job description.
            2.  "missingSkills": An array of strings for important skills from the job description that are not present in the resume.
            3.  "keywordsToAdd": An array of strings for keywords or phrases from the job description that would strengthen the resume.
            4.  "matchSummary": A concise string explaining the key strengths and weaknesses of the match.
            
            Ensure the response is a single, valid JSON object and contains no other text.

            Resume:
            """
            ${resumeText}
            """

            Job Description:
            """
            ${jobDescription}
            """
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let jsonString = text.trim();
        if (jsonString.startsWith('```json')) {
            jsonString = jsonString.substring(7);
        }
        if (jsonString.endsWith('```')) {
            jsonString = jsonString.substring(0, jsonString.length - 3);
        }

        try {
            return JSON.parse(jsonString);
        } catch (parseError) {
            console.error('Failed to parse JSON string for job match:', parseError);
            return {
                matchPercentage: 0,
                missingSkills: [],
                keywordsToAdd: [],
                matchSummary: "Failed to perform job match analysis."
            };
        }
    } catch (error) {
        console.error('Error with Gemini API for job match:', error);
        return {
            matchPercentage: 0,
            missingSkills: [],
            keywordsToAdd: [],
            matchSummary: "Job match analysis failed."
        };
    }
};

// Updated to return explicit error info when quota exceeded
const getJobSearchData = async (resumeText) => {
    try {
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

        const prompt = `
            Analyze the following resume text and extract key information for a job search. Provide a single, valid JSON response with the following fields:

            1.  "jobTitle": A string representing the most likely job title based on the resume (e.g., "Full-Stack Developer").
            2.  "skills": An array of strings for all relevant technical and soft skills.
            3.  "domain": A string for the primary industry or domain (e.g., "Software Engineering", "Data Science").

            Ensure the response is a single, valid JSON object. Do not include any other text.

            Resume Text:
            """
            ${resumeText}
            """
        `;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let jsonString = text.trim();
        if (jsonString.startsWith('```json')) {
            jsonString = jsonString.substring(7);
        }
        if (jsonString.endsWith('```')) {
            jsonString = jsonString.substring(0, jsonString.length - 3);
        }

        try {
            return JSON.parse(jsonString);
        } catch (parseError) {
            console.error('Failed to parse JSON for job search data:', parseError);
            return { jobTitle: '', skills: [], domain: '' };
        }
    } catch (error) {
        console.error('Error with Gemini API for job search:', error);

        // Check if error indicates quota exceeded (Google API 429)
        if (error.status === 429 || (error.message && error.message.toLowerCase().includes('quota'))) {
            return { error: 'quota exceeded' };
        }

        return { jobTitle: '', skills: [], domain: '' };
    }
};


module.exports = {
    getAIAnalysis,
    getJobMatchAnalysis,
    getJobSearchData
};
