/* --- File: backend/services/jobSearchService.js --- */
const axios = require('axios');

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

const searchAdzunaJobs = async (
    jobTitle,
    skills,
    domain,
    filters,
    location = 'in', // default country: India
    resultsPerPage = 10,
    page = 1
) => {
    try {
        if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
            console.error('Adzuna API credentials are not set in the .env file.');
            return { error: 'Adzuna API credentials are not set.' };
        }

        // ✅ Ensure valid 2-letter country code
        const locationCode =
            typeof location === 'string' && location.length === 2
                ? location.toLowerCase()
                : 'in';

        // ✅ Build query string
        const queryParts = [];
        if (jobTitle && jobTitle.trim()) queryParts.push(jobTitle);
        if (domain && domain.trim()) queryParts.push(domain);
        const query = queryParts.join(' ');

        // ✅ Base API URL
        let url = `https://api.adzuna.com/v1/api/jobs/${locationCode}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=${resultsPerPage}&what=${encodeURIComponent(query)}`;

        // ✅ Add filters
        if (filters?.remote) {
            url += `&full_time=1&permanent=0&distance=10`;
        }
        if (filters?.salaryMin) {
            url += `&salary_min=${filters.salaryMin}`;
        }
        if (filters?.dateRange) {
            url += `&max_days_old=${filters.dateRange}`;
        }

        // 🔍 Log API request for debugging
        console.log('--- Job Search Service Log ---');
        console.log('Constructed Adzuna API URL:', url);

        // ✅ Send request
        const response = await axios.get(url);

        console.log('Adzuna API Response Status:', response.status);
        console.log('Jobs found in response:', response.data?.count || 0);
        console.log('--- End Job Search Service Log ---');

        // ✅ Return structured jobs
        if (response.data?.results) {
            return {
                jobs: response.data.results.map(job => ({
                    title: job.title || 'No title',
                    company: job.company?.display_name || 'Unknown company',
                    location: job.location?.display_name || 'Location not specified',
                    postedDate: job.created || null,
                    applyLink: job.redirect_url || '#'
                })),
                totalJobs: response.data.count || 0
            };
        } else {
            console.warn('Adzuna API returned an empty or malformed result.');
            return { jobs: [], totalJobs: 0 };
        }

    } catch (error) {
        console.error('Error with Adzuna API:', error.message);
        return { error: 'Failed to fetch jobs from Adzuna API.' };
    }
};

module.exports = {
    searchAdzunaJobs
};
