# ✅ Task Manager App
A modern **Task Manager App** built with **React 19** using cutting-edge features like async Server Components, streaming with Suspense, enhanced concurrent rendering, and new hooks such as `useFormStatus()`, `useOptimistic()`, and `useTransition()`. It also utilizes metadata handling for managing document head elements like title and description. The backend is built with **Node.js + Express** and uses **MongoDB** to store tasks.

---

## 🚀 Tech Stack

| Layer      | Technology               |
|------------|---------------------------|
| Frontend   | React 19 |
| Backend    | Node.js + Express         |
| Database   | MongoDB (via Mongoose)    |
| Styling    | Tailwind CSS    |
| Deployment | Vercel (frontend), Render (backend)

---

## ✨ Features

- ✅ Add, edit, delete, and complete tasks
- ✅ Store tasks in MongoDB
- ✅ Used newly introduced hooks in React 19 (`useFormStatus()`, `useOptimistic()`, `useTransition()`)  
- ✅ Suspense and streaming UI
- ✅ REST API with Express
- ✅ Deployed frontend and backend

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-app.git
```

---

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

Create a `.env` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager
```

Start the server:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:4000
```

---

## 🔗 Live Demo

- 🌐 **Frontend**: [https://task-manager-app.vercel.app](https://task-manager-self-tau.vercel.app/)
- 🛠 **Backend API**: [https://task-manager-api.onrender.com](https://task-manager-backend-bg6c.onrender.com) 
