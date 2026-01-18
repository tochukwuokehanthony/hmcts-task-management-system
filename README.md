# HMCTS DTS Developer Challenge – Task Management Service

A lightweight task management backend with an optional minimal frontend, implemented to meet the HMCTS DTS Developer Challenge requirements.

## Project Overview

This application provides core task management functionality, allowing users to create, retrieve, update, and delete tasks with status tracking and due date management.
The solution is intentionally simple and production-oriented, focusing on correctness, maintainability, testing, and clear API design.

## Challenge Confirmation

I confirm that I have completed the HMCTS Case Management Coding Challenge and that this repository contains my submitted solution.

## Technologies

### Backend

- Java 17
- Spring Boot 3.2.1
- Spring Data JPA
- H2 (development) / PostgreSQL (production-ready)
- Gradle
- JUnit 5 & Mockito
- OpenAPI / Swagger

### Frontend (Optional)

- Node.js
- Express.js
- Vanilla JavaScript
- HTML5 & CSS3
- Jest

## Requirements Coverage

### Backend API

The backend fulfils all required capabilities:

- **Create a task** with:
  - Title
  - Description (optional)
  - Status
  - Due date/time
- **Retrieve a task by ID**
- **Retrieve all tasks**
- **Update the status of a task**
- **Delete a task**

Data is persisted using a relational database and exposed via RESTful endpoints with validation and structured error handling.

### Frontend Application

The frontend supports all required functionality:

- Create tasks
- View existing tasks
- Update tasks and task status
- Delete tasks

The frontend is deliberately minimal and exists primarily to demonstrate end-to-end interaction with the API. The primary assessment focus is the backend service.

## Technical Requirements

This solution meets all technical requirements specified in the challenge:

- **Backend:** Implemented using Java and Spring Boot
- **Frontend:** Implemented using Node.js and minimal HTML/JavaScript
- **Unit testing:**
  - Backend: JUnit 5 and Mockito
  - Frontend: Jest and Supertest
- **Database storage:** Relational database via JPA
- **Validation and error handling:**
  - Bean Validation on request DTOs
  - Centralised exception handling
- **API documentation:**
  - OpenAPI/Swagger available at runtime

## Project Structure

```
hmcts-task-manager/
├── backend/
│   ├── src/main/java/uk/gov/hmcts/taskmanager/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── exception/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   └── src/test/java/uk/gov/hmcts/taskmanager/
└── frontend/
    ├── public/
    └── src/
```

## Getting Started

### Prerequisites

- Java 17+
- Node.js 16+
- Gradle (or wrapper)
- npm

### Backend

```bash
cd backend
./gradlew build
./gradlew bootRun
```

**API available at:**
http://localhost:8080

**Swagger UI:**
http://localhost:8080/swagger-ui.html

### Frontend

```bash
cd frontend
npm install
npm start
```

**Frontend available at:**
http://localhost:3000

## Running Tests

### Backend

```bash
./gradlew test
```

### Frontend

```bash
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/tasks | Create task |
| GET | /api/tasks | Retrieve all tasks |
| GET | /api/tasks/{id} | Retrieve task by ID |
| PATCH | /api/tasks/{id}/status | Update task status |
| DELETE | /api/tasks/{id} | Delete task |

## Task Status Values

- `TODO`
- `IN_PROGRESS`
- `COMPLETED`
- `CANCELLED`

## Key Implementation Decisions

- Gradle chosen to align with HMCTS conventions
- DTO pattern used to separate API contracts from persistence models
- Minimal frontend included only to demonstrate API interaction
- Validation and error handling implemented centrally
- Database abstraction allows easy migration from H2 to PostgreSQL
- Vanilla JavaScript used to avoid unnecessary framework complexity

## Assumptions

- Tasks are managed independently and do not require authentication for the scope of this challenge
- Status updates are performed as a discrete operation
- Due date/time is optional unless specified by business rules

## Future Enhancements (Out of Scope)

- Authentication and authorisation
- Audit logging
- Task filtering and search
- User assignment
- Notifications
