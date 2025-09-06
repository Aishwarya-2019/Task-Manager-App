# 📝 Task Manager App

A simple **Task Manager application** built with **React (Vite)** on the frontend and **Node.js + Express** on the backend.  
Users can **register/login**, manage tasks (add, edit, delete, mark complete), and filter tasks by status.  

---

## 🚀 Features
- 🔐 **Authentication**
  - User Registration & Login
  - Error handling for invalid credentials
  - Context-based authentication state
- ✅ **Task Management**
  - Add, Edit, Delete tasks
  - Mark tasks as Completed / Pending
  - Task filters → **All | Completed | Pending**
- 🎨 **UI/UX**
  - Clean, responsive UI with **TailwindCSS**
  - Error messages & form validations
- ⚡ **Backend**
  - Simple Express server
  - User & task storage with **JSON files (`users.json`, `tasks.json`)**

---

## 🛠 Tech Stack
**Frontend**
- React (Vite)
- Context API (for Auth & Task state)
- TailwindCSS

**Backend**
- Node.js + Express
- JSON file as a mock database

---

## 📂 Project Structure
TASK-MANAGER/
│── backend/
│ ├── server.js
│ ├── users.json
│ ├── tasks.json
│ └── package.json
│
│── src/
│ ├── components/
│ │ ├── Auth/
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ ├── Tasks/
│ │ │ ├── TaskForm.jsx
│ │ │ ├── TaskItem.jsx
│ │ │ ├── TaskList.jsx
│ │ │ └── Navbar.jsx
│ ├── context/
│ │ ├── AuthContext.jsx
│ │ └── TaskContext.jsx
│ ├── pages/
│ │ └── TasksPage.jsx
│ ├── utils/
│ │ └── helpers.js
│ ├── App.jsx
│ ├── index.jsx
│ ├── App.css
│ └── index.css
│
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
2️⃣ Install dependencies

Backend

cd backend
npm install


Frontend

cd ..
npm install

3️⃣ Run the app

Start backend server

cd backend
node server.js


Backend runs at 👉 http://localhost:5000

Start frontend

npm run dev


Frontend runs at 👉 http://localhost:5173

🔐 Authentication Flow

Register with a valid email & password → stored in users.json

Login with registered credentials

Logged-in user can access the Task Manager dashboard

Logout clears user session (handled via Context API)

📌 Future Enhancements

🔑 Add JWT authentication instead of plain JSON storage

⏰ Add due date & priority fields for tasks

📱 Improve responsive UI with animations

☁️ Connect to a real database (MongoDB / PostgreSQL)
