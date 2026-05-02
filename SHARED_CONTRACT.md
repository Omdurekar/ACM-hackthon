# API Shared Contract

This document outlines the API endpoints, expected request/response JSON formats, and status codes for the FocusFlow application.

## 1. Authentication Endpoints

### `POST /api/auth/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123",
    "username": "focus_user"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "user": { /* User Object */ },
    "token": "jwt_token_here"
  }
  ```
- **Error (400 Bad Request)**: `{ "error": "Invalid input" }`

### `POST /api/auth/login`
- **Description**: Authenticate a user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "user": { /* User Object */ },
    "token": "jwt_token_here"
  }
  ```
- **Error (401 Unauthorized)**: `{ "error": "Invalid credentials" }`

## 2. Tasks Endpoints

### `GET /api/tasks`
- **Description**: Retrieve all tasks for the authenticated user.
- **Response (200 OK)**:
  ```json
  {
    "tasks": [ /* Array of Task Objects */ ]
  }
  ```

### `POST /api/tasks`
- **Description**: Create a new task.
- **Request Body**:
  ```json
  {
    "title": "Complete Architecture Setup",
    "complexity": "high",
    "description": "Setup folders and schemas"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "task": { /* Created Task Object */ }
  }
  ```

### `PUT /api/tasks/:id`
- **Description**: Update an existing task.
- **Request Body**:
  ```json
  {
    "status": "completed",
    "order": 1
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "task": { /* Updated Task Object */ }
  }
  ```

## 3. Focus Sessions Endpoints

### `POST /api/sessions`
- **Description**: Start a new focus session or break.
- **Request Body**:
  ```json
  {
    "taskId": "task_id_here",
    "type": "focus",
    "duration": 1500
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "session": { /* Created FocusSession Object */ }
  }
  ```

### `PUT /api/sessions/:id/complete`
- **Description**: Mark a focus session as complete.
- **Request Body**:
  ```json
  {
    "endTime": "2026-05-02T10:00:00Z"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "session": { /* Updated FocusSession Object */ }
  }
  ```

## 4. AI Insights & Suggestions Endpoints

### `GET /api/insights/suggestions`
- **Description**: Fetch AI-generated suggestions for time allocation and task ordering.
- **Response (200 OK)**:
  ```json
  {
    "suggestions": [ /* Array of Suggestion Objects */ ]
  }
  ```
