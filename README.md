# 🌱 Nutrova – Full-Stack BMI Tracker

Nutrova is a comprehensive full-stack health and BMI tracking application that enables users to calculate
their BMI, track their progress over time, and visualize health trends through interactive charts. 
The application integrates secure authentication, a robust backend API, and a modern responsive
frontend to deliver a seamless user experience.

🚀 Features

📊 BMI Calculator – Calculates BMI using user input (height, weight).

🕒 History Tracking – Stores and retrieves BMI history for each user.

🔑 Authentication – Secure login, registration, and session management via Clerk.

📈 Data Visualization – Interactive BMI charts powered by Recharts.

⚡ Fast & Modern UI – Built with React + Vite + TailwindCSS.

🌐 Robust Backend – REST APIs with Node.js + Express + MongoDB.

## 🛠 Tech Stack

### Frontend (Nutrova-frontend)
- **React 19** + Vite (build tool)
- **React Router v7** (navigation)
- **Redux Toolkit** (state management)
- **TailwindCSS 4** (styling)
- **Clerk** (authentication)
- **React Toastify** (notifications)
- **Recharts** (data visualization)

### Backend (Nutrova-backend)
- **Node.js** + Express 5 (server framework)
- **MongoDB** + Mongoose (database and ODM)
- **Clerk middleware** (auth verification)
- **JWT** / bcryptjs (security)
- **dotenv, CORS** (environment configuration and security)

## 📂 Project Structure

## 📂 Project Structure
Nutrova/
│
├── Nutrova-frontend/           # Frontend (React + Vite)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, icons
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # App pages (Home, Dashboard, History)
│   │   ├── store/              # Redux slices
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx             # Root React component
│   │   └── main.jsx            # Entry point
│   ├── index.html              # App entry
│   └── vite.config.js          # Vite config
│
├── Nutrova-backend/            # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/        # API controllers
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API routes
│   │   ├── middlewares/        # Auth middleware
│   │   ├── utils/              # Utility functions
│   │   └── server.js           # App entry
│   ├── .env.example            # Example env vars
│   └── package.json
│
└── README.md                   # Project documentation


## ⚡ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Clerk account for authentication

### 1. Clone the Repository
```bash
git clone https://github.com/amit07d/Nutrova.git
cd Nutrova

2. Backend Setup
cd Nutrova-backend
npm install


Create .env file in Nutrova-backend/:

PORT=8000
MONGODB_URI=your_mongo_uri
CLERK_SECRET_KEY=your_clerk_secret_key


Run backend:

npm run dev

3. Frontend Setup
cd Nutrova-frontend
npm install


Create .env file in Nutrova-frontend/:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:8000/api


Run frontend:

npm run dev

📖 API Endpoints
BMI Routes

POST /api/bmi/save → Save BMI entry for logged-in user

GET /api/bmi/history/:userId → Fetch BMI history

Auth Routes

Managed via Clerk (frontend + backend middleware)

📌 Roadmap

 User profile with weight/height tracking

 Advanced analytics dashboard

 AI-powered health suggestions (coming soon)

 Mobile-friendly PWA version


🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to open a PR or issue to improve the project.

📜 License

This project is licensed under the ISC License.
