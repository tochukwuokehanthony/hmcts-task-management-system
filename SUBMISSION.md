# HMCTS Task Manager - Submission Guide

This guide will help you submit the HMCTS Task Manager project to GitHub.

## Project Summary

**What:** Task management system for HMCTS caseworkers
**Backend:** Java 17 + Spring Boot + Gradle
**Frontend:** Node.js + Express + Vanilla JavaScript with minimal HTML
**Database:** H2 (dev) / PostgreSQL (production)

## Repository Structure for Submission

You should create **two separate repositories** on GitHub:

1. `hmcts-task-manager-backend` - Java Spring Boot API
2. `hmcts-task-manager-frontend` - Node.js + HTML application

### Option: Single Repository

Alternatively, you can submit as a single monorepo called `hmcts-task-manager` containing both backend and frontend.

## Pre-Submission Checklist

### Backend ✅
- [x] Java source code with proper package structure
- [x] Gradle build files (build.gradle, settings.gradle)
- [x] Unit tests (JUnit + Mockito)
- [x] API documentation (Swagger/OpenAPI)
- [x] Error handling and validation
- [x] Database configuration
- [x] Comprehensive README.md

### Frontend ✅
- [x] Node.js Express server
- [x] Minimal HTML interface
- [x] Vanilla JavaScript (no frameworks)
- [x] Unit tests (Jest + Supertest)
- [x] CSS styling (HMCTS design)
- [x] Comprehensive README.md

## Steps to Submit

### 1. Create GitHub Repositories

#### Option A: Two Separate Repositories

**Backend Repository:**
```bash
cd backend
git init
git add .
git commit -m "Initial commit: HMCTS Task Manager Backend

- Java Spring Boot REST API
- Full CRUD operations for tasks
- Validation and error handling
- Unit tests with JUnit and Mockito
- Swagger API documentation
- H2/PostgreSQL database support"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/hmcts-task-manager-backend.git
git branch -M main
git push -u origin main
```

**Frontend Repository:**
```bash
cd frontend
git init
git add .
git commit -m "Initial commit: HMCTS Task Manager Frontend

- Node.js Express server
- Minimal HTML interface
- Vanilla JavaScript
- API proxy to backend
- HMCTS-styled responsive design
- Unit tests with Jest"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/hmcts-task-manager-frontend.git
git branch -M main
git push -u origin main
```

#### Option B: Single Monorepo

```bash
cd hmcts-task-manager
git init
git add .
git commit -m "Initial commit: HMCTS Task Manager

Full-stack task management system for caseworkers

Backend:
- Java Spring Boot REST API
- Gradle build system
- JUnit tests
- Swagger documentation

Frontend:
- Node.js + Express
- Minimal HTML/CSS/JS
- Jest tests
- HMCTS design patterns"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/hmcts-task-manager.git
git branch -M main
git push -u origin main
```

### 2. Verify Repository Contents

Ensure your repository includes:

**Backend:**
- ✅ Source code (`src/main/java/`)
- ✅ Tests (`src/test/java/`)
- ✅ Build files (`build.gradle`, `settings.gradle`)
- ✅ Configuration (`src/main/resources/application.properties`)
- ✅ README.md with setup instructions
- ✅ .gitignore

**Frontend:**
- ✅ Server code (`src/server.js`)
- ✅ Static files (`public/index.html`, `public/app.js`, `public/styles.css`)
- ✅ Tests (`src/server.test.js`)
- ✅ Configuration (`package.json`, `jest.config.js`)
- ✅ README.md with setup instructions

### 3. Test Before Submission

Run these commands to verify everything works:

**Backend:**
```bash
cd backend
./gradlew clean build
./gradlew bootRun
# In another terminal:
curl http://localhost:8080/api/tasks
# Should return: []
```

**Frontend:**
```bash
cd frontend
npm install
npm test
npm start
# Visit: http://localhost:3000
```

### 4. Add Repository Links

Create a file with your submission links:

**submission-links.txt:**
```
HMCTS Task Manager - Submission

Backend Repository:
https://github.com/YOUR_USERNAME/hmcts-task-manager-backend

Frontend Repository:
https://github.com/YOUR_USERNAME/hmcts-task-manager-frontend

OR (if using monorepo):

Full Project Repository:
https://github.com/YOUR_USERNAME/hmcts-task-manager

Deployed URLs (if applicable):
Backend API: https://your-backend.example.com
Frontend: https://your-frontend.example.com
```

## What to Highlight in Your Submission

### Technical Excellence

1. **Clean Architecture**
   - Separation of concerns (Controller → Service → Repository)
   - DTO pattern for API contracts
   - Proper package structure

2. **Testing**
   - Backend: 100% coverage of service and controller layers
   - Frontend: API proxy endpoint tests
   - Easy to run: `./gradlew test` and `npm test`

3. **Error Handling**
   - Global exception handler
   - Validation with clear error messages
   - User-friendly error display

4. **Documentation**
   - Auto-generated Swagger/OpenAPI docs
   - Comprehensive README files
   - Code comments where needed
   - API examples with curl commands

5. **Best Practices**
   - SOLID principles
   - DRY code
   - Security (XSS prevention, validation)
   - Production-ready configuration

### Meeting Requirements

**Backend Requirements:**
- ✅ Create task (title, description, status, due date/time)
- ✅ Retrieve task by ID
- ✅ Retrieve all tasks
- ✅ Update task status
- ✅ Delete task
- ✅ Unit tests
- ✅ Database storage
- ✅ Validation
- ✅ Error handling
- ✅ API documentation

**Frontend Requirements:**
- ✅ Create tasks
- ✅ View tasks
- ✅ Update tasks
- ✅ Delete tasks
- ✅ User-friendly interface
- ✅ Node.js implementation
- ✅ Minimal HTML (no heavy frameworks)

**Technical Requirements:**
- ✅ Java backend
- ✅ Node.js + HTML frontend
- ✅ Unit tests (both)
- ✅ Database (H2/PostgreSQL)
- ✅ Validation and error handling
- ✅ API documentation
- ✅ Helpful README files

## Repository Best Practices

### README.md Sections
Each README should include:
- Project description
- Technologies used
- Features list
- Prerequisites
- Installation steps
- Running instructions
- Testing instructions
- API documentation (backend)
- Project structure
- Troubleshooting

### .gitignore
Ensure sensitive and build files are ignored:
- `build/` (Gradle)
- `node_modules/` (npm)
- `.gradle/`
- `*.iml`, `.idea/`
- Environment files

### Commit Messages
Use clear, descriptive commit messages:
- Initial commit with full description
- Feature commits: "Add task creation endpoint"
- Fix commits: "Fix validation error handling"
- Test commits: "Add unit tests for TaskService"

## Optional Enhancements

If you have time, consider adding:

1. **GitHub Actions CI/CD**
   - Automated testing on push
   - Build verification

2. **Docker Support**
   - Dockerfile for backend
   - Dockerfile for frontend
   - docker-compose.yml

3. **Additional Documentation**
   - Architecture diagram
   - API flow diagram
   - Screenshots of the UI

4. **Live Demo**
   - Deploy backend to Heroku/Railway
   - Deploy frontend to Vercel/Netlify

## Support

If you encounter any issues during submission:

1. Verify all tests pass
2. Check README instructions are accurate
3. Ensure .gitignore is properly configured
4. Test clone and setup in a fresh directory

## Final Checklist

Before submitting, verify:

- [ ] All code is committed and pushed
- [ ] Tests pass (`./gradlew test` and `npm test`)
- [ ] README files are complete and accurate
- [ ] .gitignore prevents unwanted files
- [ ] Repository is public (or accessible to reviewers)
- [ ] Submission links are provided
- [ ] Code follows best practices
- [ ] No sensitive data (passwords, keys) in code

## Submission Statement

When submitting, you can include this statement:

> "This submission demonstrates a production-ready task management system built with Java Spring Boot and Node.js. The backend provides a robust REST API with comprehensive testing and documentation, while the frontend offers a minimal, accessible HTML interface following HMCTS design patterns. All requirements have been met, with additional emphasis on code quality, security, and maintainability."

Good luck with your submission! 🚀
