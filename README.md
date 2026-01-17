# HMCTS Task Manager

A full-stack task management system for HMCTS caseworkers, built with Java Spring Boot and Node.js with minimal HTML.

## Project Overview

This application allows caseworkers to efficiently manage their tasks with full CRUD operations, status tracking, and due date management.

## Technologies

### Backend
- Java 17
- Spring Boot 3.2.1
- Spring Data JPA
- H2 Database (development) / PostgreSQL (production)
- Gradle
- JUnit 5 & Mockito
- OpenAPI/Swagger

### Frontend
- Node.js
- Express.js
- Vanilla JavaScript
- HTML5 & CSS3
- Jest (testing)

## Features

- Create tasks with title, description, status, and due date
- View all tasks in a user-friendly interface
- Update tasks and change their status
- Delete tasks with confirmation
- Full validation and error handling
- Comprehensive unit tests (backend and frontend)
- API documentation with Swagger
- Responsive design
- Minimal HTML with no heavy frameworks

## Project Structure

```
hmcts-task-manager/
├── backend/                 # Spring Boot API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/uk/gov/hmcts/taskmanager/
│   │   │   │   ├── controller/     # REST endpoints
│   │   │   │   ├── dto/            # Request/Response objects
│   │   │   │   ├── exception/      # Error handling
│   │   │   │   ├── model/          # JPA entities
│   │   │   │   ├── repository/     # Data access
│   │   │   │   └── service/        # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/uk/gov/hmcts/taskmanager/
│   ├── build.gradle
│   ├── settings.gradle
│   └── README.md
│
└── frontend/                # Node.js + HTML application
    ├── public/              # Static files
    │   ├── index.html      # Main page
    │   ├── styles.css      # Styling
    │   └── app.js          # Client-side JS
    ├── src/
    │   ├── server.js       # Express server
    │   └── server.test.js  # Tests
    ├── package.json
    └── README.md
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Gradle (or use included wrapper)
- npm

### Backend Setup

```bash
cd backend
./gradlew build
./gradlew bootRun
```

The API will be available at `http://localhost:8080`

**API Documentation**: http://localhost:8080/swagger-ui.html

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`

## Running Tests

### Backend Tests

```bash
cd backend
./gradlew test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/tasks | Create a new task |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/{id} | Get task by ID |
| PUT | /api/tasks/{id} | Update a task |
| PATCH | /api/tasks/{id}/status | Update task status |
| DELETE | /api/tasks/{id} | Delete a task |

## Task Status Values

- `TODO` - Task not started
- `IN_PROGRESS` - Task in progress
- `COMPLETED` - Task completed
- `CANCELLED` - Task cancelled

## Example API Usage

### Create a Task

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review case documents",
    "description": "Review all documents for case #12345",
    "status": "TODO",
    "dueDateTime": "2026-02-01T14:00:00"
  }'
```

### Get All Tasks

```bash
curl http://localhost:8080/api/tasks
```

### Update Task Status

```bash
curl -X PATCH http://localhost:8080/api/tasks/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'
```

### Delete a Task

```bash
curl -X DELETE http://localhost:8080/api/tasks/1
```

## Database Configuration

The application uses H2 in-memory database for development. For production deployment, configure PostgreSQL in `application-prod.properties`.

**H2 Console**: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:taskdb`
- Username: `sa`
- Password: (empty)

## Building for Production

### Backend

```bash
cd backend
./gradlew clean build
java -jar build/libs/task-manager-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm install --production
PORT=80 npm start
```

## Key Implementation Details

### Backend

- **Validation**: Jakarta Bean Validation annotations on DTOs
- **Error Handling**: Global exception handler with structured error responses
- **Testing**: JUnit 5 + Mockito for controller and service layers
- **Documentation**: OpenAPI/Swagger auto-generated from annotations
- **Database**: JPA repositories with automatic timestamps

### Frontend

- **Architecture**: Express server proxies API calls to avoid CORS
- **Client-Side**: Vanilla JavaScript with no heavy frameworks
- **Styling**: Custom CSS following HMCTS design patterns
- **Testing**: Jest + Supertest for server endpoint testing
- **Security**: HTML escaping to prevent XSS attacks

## Design Decisions

1. **Gradle over Maven**: Following HMCTS starter repo convention
2. **Node.js + HTML**: Minimal frontend as specified, no React/Angular
3. **API Proxy**: Express server handles CORS and provides clean separation
4. **H2 Database**: Simple development setup, production-ready PostgreSQL support
5. **DTO Pattern**: Separates API contracts from database entities
6. **Vanilla JS**: No framework overhead, fast page loads, easy to understand
7. **HMCTS Styling**: Government Digital Service inspired design

## Features Checklist

### Backend Requirements ✅
- [x] Create task with title, description (optional), status, due date/time
- [x] Retrieve task by ID
- [x] Retrieve all tasks
- [x] Update task status
- [x] Delete task
- [x] Unit tests
- [x] Database storage (H2/PostgreSQL)
- [x] Validation and error handling
- [x] API documentation

### Frontend Requirements ✅
- [x] Create tasks
- [x] View tasks
- [x] Update tasks
- [x] Delete tasks
- [x] User-friendly interface
- [x] Node.js implementation
- [x] Minimal HTML (no heavy frameworks)

## Future Enhancements

- User authentication and authorization
- Task filtering and sorting
- Task search functionality
- Task assignment to users
- Task priority levels
- Email notifications
- Task comments/notes
- File attachments
- Audit logging
- Dark mode

## Troubleshooting

### Backend won't start
- Ensure Java 17 is installed: `java -version`
- Check port 8080 is not in use: `lsof -i :8080`

### Frontend won't start
- Ensure Node.js is installed: `node -v`
- Check port 3000 is not in use: `lsof -i :3000`
- Verify backend is running on port 8080

### Tests failing
- Backend: `./gradlew clean test`
- Frontend: `npm test -- --clearCache && npm test`

## License

MIT

## Author

Created for the HMCTS Developer Technical Test

## Submission

This project demonstrates:
- Clean code architecture
- Comprehensive testing
- Proper error handling
- API documentation
- Responsive design
- Security best practices
- Production-ready code

Both backend and frontend can be run independently and are ready for GitHub submission.
