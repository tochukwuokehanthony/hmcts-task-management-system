# HMCTS Task Manager - Backend

A Spring Boot REST API for managing caseworker tasks.

## Technologies

- Java 17
- Spring Boot 3.2.1
- Spring Data JPA
- H2 Database (development)
- PostgreSQL (production)
- Gradle
- JUnit 5 & Mockito
- OpenAPI/Swagger

## Features

- Create, read, update, and delete tasks
- Update task status independently
- Full validation and error handling
- Comprehensive unit tests
- OpenAPI documentation

## Prerequisites

- Java 17 or higher
- Gradle (or use the included wrapper)

## Getting Started

### Installation

```bash
cd backend
./gradlew build
```

### Running the Application

```bash
./gradlew bootRun
```

The API will be available at `http://localhost:8080`

### Running Tests

```bash
./gradlew test
```

## API Documentation

Once the application is running, you can access:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api-docs

## API Endpoints

### Create Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Review case documents",
  "description": "Review all documents for case #12345",
  "status": "TODO",
  "dueDateTime": "2026-02-01T14:00:00"
}
```

### Get All Tasks
```
GET /api/tasks
```

### Get Task by ID
```
GET /api/tasks/{id}
```

### Update Task
```
PUT /api/tasks/{id}
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "dueDateTime": "2026-02-01T14:00:00"
}
```

### Update Task Status
```
PATCH /api/tasks/{id}/status
Content-Type: application/json

{
  "status": "COMPLETED"
}
```

### Delete Task
```
DELETE /api/tasks/{id}
```

## Task Status Values

- `TODO` - Task not started
- `IN_PROGRESS` - Task in progress
- `COMPLETED` - Task completed
- `CANCELLED` - Task cancelled

## Database Configuration

### Development (H2)
The application uses an in-memory H2 database by default. You can access the H2 console at:
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:taskdb`
- Username: `sa`
- Password: (leave empty)

### Production (PostgreSQL)
Create an `application-prod.properties` file:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taskdb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

Run with production profile:
```bash
./gradlew bootRun --args='--spring.profiles.active=prod'
```

## Error Handling

The API returns structured error responses:

```json
{
  "timestamp": "2026-01-17T10:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Task not found with id: 1",
  "path": "/api/tasks/1"
}
```

Validation errors include field-specific details:

```json
{
  "timestamp": "2026-01-17T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/tasks",
  "validationErrors": {
    "title": "Title is required",
    "dueDateTime": "Due date is required"
  }
}
```

## Project Structure

```
src/main/java/uk/gov/hmcts/taskmanager/
├── controller/          # REST controllers
├── dto/                 # Data transfer objects
├── exception/           # Exception handling
├── model/               # JPA entities
├── repository/          # Data repositories
└── service/             # Business logic

src/test/java/uk/gov/hmcts/taskmanager/
├── controller/          # Controller tests
└── service/             # Service tests
```

## Building for Production

```bash
./gradlew clean build
java -jar build/libs/task-manager-1.0.0.jar
```
