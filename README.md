# 🚀 TaskMate - Task Management Application
TaskMate is a modern, full-stack task management application built with React, Node.js, and MongoDB. It provides a user-friendly interface for managing tasks with features like task creation, editing, deletion, and status tracking.

## ✨ Features

- **🔐 User Authentication**
  - Secure login and registration
  - JWT-based authentication

- **📝 Task Management**
  - Create, read, update, and delete tasks
  - Add due dates
  - Task categorization

- **🎨 User Interface**
  - Modern and responsive design
  - Dark mode support
  - Intuitive task organization
  - Real-time updates

## 🛠️ Tech Stack

- **💻 Frontend**
  - React.js
  - Vite
  - Tailwind CSS
  - React Router
  - Axios

- **⚙️ Backend**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication


## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskmate.git
   cd taskmate
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Start the development servers:
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend development server
   cd ../client
   npm run dev
   ```

## 📁 Project Structure

```
taskmate/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
└── server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    └── middleware/       # Custom middleware
```

## 🔌 API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📞 Contact

Your Name - Arvin Choudhary
Email- ArvindChoudhary054@gmail.com
