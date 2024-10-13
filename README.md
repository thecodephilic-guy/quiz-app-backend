# MCQ Quiz Management API

## Overview

This project is an MCQ Quiz Management System built with Node.js, Express.js, Drizzle ORM, and Supabase. It includes:

- User authentication (Register/Login)
- Quiz management (Create, Fetch Quizzes, Get Quiz Details)
- Taking quizzes and viewing results

## Features

- User registration and login.
- Create, manage, and take MCQ quizzes (single correct answer).
- View quiz results.
- JSON-based API with token-based authentication.

## Tech Stack

- Node.js
- Express.js
- Drizzle ORM
- Supabase (Postgres DB)
- JWT for authentication

## Setup Instructions

### Prerequisites

1. Install Node.js (version >= 16.x).
2. A Supabase account (or a PostgreSQL database).

### Steps to Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/thecodephilic-guy/quiz-app-backend.git
   cd quiz-app-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:

- Create a .env file in the root directory based on .env.example
  ```bash
  PORT=8000
  DATABASE_URL=<Your Supabase/Postgres URL>
  JWT_SECRET=<Your JWT secret>
  ```

4.  Run the application:
    ```bash
    npm run dev
The application should be running on http://localhost:8000. Or 5000

### Database Setup

- Create your Supabase/PostgreSQL database.
- Make sure the tables are set up using Drizzle ORM migrations or manually based on the schema provided.

# API Documentation

### 1. User Authentication

#### 1.1 Register

Endpoint: POST /api/auth/register

- Request:

  ```bash
  {
      "username": "user1",
      "email": "user1@example.com",
      "password": "password123"
  }
  ```

- Response:

  ```bash
      {
          userId: 1,
          username: "user1",
          email: : "user1@example.com",
          "token": "<JWT Token>"
      }
  ```

### 1.2 Login

Endpoint: POST /api/auth/login

- Request:
  ```bash
      {
          "email": "john@example.com",
          "password": "password123"
      }
  ```
- Response:
  ```bash
      {
          userId: 1,
          username: "user1",
          email: : "user1@example.com"
          "token": "<JWT Token>"
      }
  ```

### 2. Quiz Management

#### 2.1 Create Quiz (Authenticated)

Endpoint: POST /POST/api/quizzes

- Request (Header):
  ```bash
  Authorization: Bearer <JWT Token>
  ```
- Request(Body):

  ```bash
  {
    "title": "Photography Basics",
    "description": "A quiz to test your knowledge about photography basics.",
    "questions": [
        {
            "quesText": "What is the focal length of a standard lens?",
            "options": [
                { "optionText": "35mm", "isCorrect": false },
                { "optionText": "50mm", "isCorrect": true },
                { "optionText": "70mm", "isCorrect": false },
                { "optionText": "100mm", "isCorrect": false }
            ]
        },
        {
            "quesText": "What does ISO refer to in photography?",
            "options": [
                { "optionText": "Image quality", "isCorrect": false },
                { "optionText": "Light sensitivity", "isCorrect": true },
                { "optionText": "Shutter speed", "isCorrect": false },
                { "optionText": "Aperture size", "isCorrect": false }
            ]
        }
    ]
    }
- Response:

    ```bash
        {
            "message": "Quiz created successfully",
            "quizId": 1
        }

# Other End Points:
- 2.3 Get Quiz Details\
Endpoint: GET /api/quizzes/:quizId

- Submit Quiz (Authenticated)\
Endpoint: POST /api/quizzes/:quizId/submit

- View Results (Authenticated)\
Endpoint: GET /api/quizzes/:quizId/results

---

This is your `README.md` file. You can now copy and paste this into your project. It includes all necessary instructions for setting up the project, testing the APIs, and submitting it to GitHub. Let me know if you need any further adjustments!
