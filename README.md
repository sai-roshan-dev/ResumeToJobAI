# 🚀 Resume2JobAI 🌟

**An AI-Powered Resume & Job Matching Platform**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

---

## 📖 Overview

Resume2JobAI is a **full-stack web application** that helps job seekers:

* Optimize resumes with AI insights
* Match skills to real-time job listings
* Track resume performance over time

By leveraging **Google Gemini AI** and **Adzuna API**, the platform analyzes resumes, provides actionable feedback, and finds the best job matches.

---

## ✨ Features

* **📝 AI-Powered Resume Analysis**
  Upload a PDF resume and get a numeric rating, key strengths, and improvement suggestions.

* **📊 Job Match Analysis**
  Compare your resume with job descriptions for match percentage and missing keywords.

* **🔍 "Get Fresh Jobs" Feature**
  Automatically extract job title, skills, and domain to fetch relevant listings from Adzuna.

* **📂 Historical Data**
  Save all analyzed resumes and job matches in MongoDB for future reference.

* **📈 Analytics Dashboard**
  Visualize resume performance, average scores, and top skills with interactive charts.

* **💻 Clean & Responsive UI**
  Modern, fully responsive React.js interface for a seamless experience.

---

## 💡 Why Resume2JobAI is Unique

* **🌟 One-Stop Career Tool** – Improve your resume and find jobs in one platform.
* **🤖 Actionable AI Insights** – Extract key skills for job searches, not just a score.
* **📊 Data-Driven Decisions** – Track resume trends and in-demand skills over time.

---

## 🛠️ Tech Stack

### Frontend

* **⚛️ React.js** – Component-based UI
* **🛣 React Router DOM** – Client-side routing
* **📡 Axios** – API requests
* **📊 Recharts** – Interactive charts
* **📂 react-dropzone** – Drag-and-drop uploads
* **🎨 react-icons** – Vector icons

### Backend

* **🟢 Node.js** – Server runtime
* **🚂 Express.js** – REST API framework
* **🍃 MongoDB** – NoSQL database
* **🔗 Mongoose** – ODM for MongoDB
* **🤖 Google Gemini API** – AI resume & job analysis
* **💼 Adzuna API** – Real-time job listings
* **📄 Multer & PDF-Parse** – File upload & PDF parsing
* **🛡 Helmet & Express-Rate-Limit** – API security

---

## 📁 Project Structure

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── HomePage/
│   │   ├── History/
│   │   ├── JobMatchPage/
│   │   ├── Dashboard/
│   │   └── ... (other components)
│   ├── App.js
│   └── index.css
└── ...
```

### Backend

```
backend/
├── models/          # MongoDB schema
│   └── Resume.js              
├── routes/          # Express routes
│   └── resumeRoutes.js        
├── controllers/     # Request handlers
│   └── resumeController.js    
├── services/        # AI & Job search logic
│   ├── analysisService.js     
│   └── jobSearchService.js    
├── middleware/      # Error handling
│   └── errorHandler.js        
├── config/          # Database config
│   └── database.js            
├── server.js       # Entry point                 
└── .env             # Environment variables
```

---

## ⚙️ API Endpoints

| Method | Endpoint                       | Description             | Request Body           |
| ------ | ------------------------------ | ----------------------- | ---------------------- |
| POST   | `/api/resumes/upload`          | Upload & analyze resume | PDF file               |
| GET    | `/api/resumes`                 | Get all resumes         | None                   |
| GET    | `/api/resumes/:id`             | Get specific resume     | None                   |
| DELETE | `/api/resumes/:id`             | Delete resume           | None                   |
| POST   | `/api/resumes/match`           | Match resume to job     | PDF + jobDescription   |
| POST   | `/api/resumes/search-jobs`     | Find jobs from resume   | PDF + optional filters |
| GET    | `/api/resumes/stats/dashboard` | Dashboard data          | None                   |

---

## 🛠️ Getting Started

### Prerequisites

* Node.js (v18+)
* MongoDB (local or Atlas)
* Adzuna API Key
* Google Gemini API Key

### Installation

```bash
# Clone repo
git clone https://github.com/sai-roshan-dev/ResumeToJobAI.git
cd ResumeToJobAI

# Backend setup
cd backend
npm install

# Create .env
GOOGLE_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key

# Frontend setup
cd ../frontend
npm install
```

### Running

```bash
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start
```

Access the app at: [http://localhost:3000](http://localhost:3000)

---

## 🤝 Contribution

Open an issue or submit a pull request to contribute.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Sai Roshan Neelam - [GitHub](https://github.com/sai-roshan-dev)
