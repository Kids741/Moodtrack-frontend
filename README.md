 MoodTrack


MoodTrack is a mental health web app that allows users to track moods, journal thoughts, access mental health resources, and engage with a supportive community.

Overview

MoodTrack is a full-stack MERN app (MongoDB, Express, React + Vite, Node.js).

Users can:

Track daily moods and patterns

Maintain private journals

Access mental health resources and AI-powered suggestions

Connect with a safe community for support

 Technology Stack
Layer	Technology
Frontend	React.js, Vite, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB (via Mongoose)
Hosting	Frontend: Vercel • Backend: Render
Version Control	Git & GitHub
🧩 Project Structure
MoodTrack/
├── Frontend/          # React + Vite application (UI)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/           # Node.js + Express API
│   ├── src/
│   ├── models/
│   ├── routes/
│   └── package.json
│
├── .gitignore
└── README.md

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/Kids741/MoodTrack.git
cd MoodTrack

2️⃣ Setup the Frontend
cd Frontend
pnpm install       
pnpm run dev       


➡️ App runs at http://localhost:3000 

3️⃣ Setup the Backend
cd ../Backend
pnpm install
pnpm run dev


➡️ API runs at http://localhost:5000

🔐 Environment Variables
Backend .env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Frontend .env
VITE_API_URL=http://localhost:5000

✨ Features

📝 Daily mood tracking

📖 Personal journaling

💬 Community support forum

🤖 AI-powered mental health suggestions

📊 Mood analytics and history

🤝 Contributing

We welcome contributions from developers and mental health enthusiasts!

Steps to contribute:

Create a new branch

git checkout -b feature/<feature-name>


Commit changes

git commit -m "Add <feature-name>"


Push and open a Pull Request

git push -u origin feature/<feature-name>

🔄 Branch Workflow
Branch	Purpose
main	Production-ready code
dev	Active development
feature/*	New feature or fix
👩‍💻 Team & Contributors
Frontend Developers
Name	GitHub
Dennis Kidake	@Kids741

Backend Developers
Name	GitHub
Dennis Kidake	@Kids741

Add your name	@username
🌐 Deployment Links
Service	URL
Frontend (Vercel)	https://moodtrack.vercel.app

Backend (Render)	Coming soon
Database (MongoDB Atlas)	Configured privately
📜 License

This project is maintained by Dennis Kidake and collaborators for mental health awareness and educational purposes.
© 2025 MoodTrack – All rights reserved.