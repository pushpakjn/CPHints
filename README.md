# CPHints

Welcome to **CPHints**, a platform designed for coding enthusiasts to share, discover, and upvote high-quality coding hints and tips. The platform supports 6 popular coding platforms, including **Codeforces** and **Leetcode**, helping users improve their performance by upto 25% and achieve higher ranks.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)


## Project Overview

**CPHints** aims to be a one-stop platform where users can share coding hints and tips across various platforms to enhance their problem-solving skills. The platform promotes quality content through a user-driven voting system, where tips are rated based on their usefulness and accuracy. Users can upvote or downvote tips to help others find the best content quickly.

## Features

- **Multi-platform Support**: Hints and tips for 6 major coding platforms, including Codeforces and Leetcode.
- **User-Generated Content**: Users can submit their coding tips, which are reviewed by admins before being posted.
- **Voting System**: A system for users to upvote or downvote hints based on accuracy and usefulness.
- **Performance Insights**: Helps users improve their coding performance by 25% and achieve higher ranks.
- **Authentication**: JWT-based secure authentication for users and admins.
- **Email Notifications**: Integration with SendGrid API for notifications (account activation, hint reviews).

## Tech Stack

### Frontend
- **React.js**: Modern JavaScript framework for building user interfaces.
- **Framer Motion**: For animations and smooth UI transitions.

### Backend
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **PostgreSQL**: Relational database for storing user data and hints.
- **Redis**: For caching and improving API performance.
- **JWT**: Secure user authentication.

### Other Services
- **SendGrid API**: For sending email notifications (user registration, hint submission updates).

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Redis
- SendGrid API key

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cphints.git
   cd cphints
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**:
   Create a `.env` file in both `backend` and `frontend` directories. Include variables such as:

   **Backend `.env`:**
   ```env
   PORT=5000
   DATABASE_URL=your_postgresql_url
   REDIS_URL=your_redis_url
   JWT_SECRET=your_jwt_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

   **Frontend `.env`:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Run the development server**:

   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm start
   ```

6. Visit `http://localhost:3000` to view the frontend and `http://localhost:5000/api` for backend API.

## API Endpoints

Below are some key API endpoints available in the project:

- **`POST /api/auth/register`**: User registration
- **`POST /api/auth/login`**: User login
- **`POST /api/hints`**: Submit a new hint (JWT protected)
- **`GET /api/hints`**: Get all hints
- **`PUT /api/hints/:id/upvote`**: Upvote a hint (JWT protected)
- **`PUT /api/hints/:id/downvote`**: Downvote a hint (JWT protected)

## Contributing

Contributions are welcome! If you want to contribute, please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.


### Useful Links
- **Live Website**: [https://cphints.com](https://cphints.com) 
- **Report Issues**: [https://github.com/yourusername/cphints/issues](https://github.com/pushpakjn/cphints/issues)

---

