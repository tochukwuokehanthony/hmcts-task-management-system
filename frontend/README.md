# HMCTS Task Manager - Frontend

A Node.js application with minimal HTML for managing caseworker tasks.

## Technologies

- Node.js
- Express.js
- Vanilla JavaScript
- HTML5 & CSS3
- Jest (testing)
- Axios (API communication)

## Features

- Create and edit tasks with form validation
- View all tasks in a responsive list
- Update task status with quick actions
- Delete tasks with confirmation
- Real-time error handling and success messages
- Minimal, clean HTML interface
- Server-side API proxy to handle CORS
- Unit tests

## Prerequisites

- Node.js 16 or higher
- npm or yarn
- Backend API running on http://localhost:8080

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Running the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`

For development with auto-restart:

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

## Project Structure

```
frontend/
├── public/              # Static files
│   ├── index.html      # Main HTML page
│   ├── styles.css      # CSS styles
│   └── app.js          # Client-side JavaScript
├── src/                # Server code
│   ├── server.js       # Express server
│   └── server.test.js  # Server tests
├── package.json        # Dependencies
└── README.md           # This file
```

## How It Works

### Architecture

The frontend uses a simple architecture:

1. **Express Server** (`src/server.js`):
   - Serves static HTML/CSS/JS files
   - Provides API proxy endpoints to the backend
   - Handles CORS issues by proxying requests

2. **Client-Side JavaScript** (`public/app.js`):
   - Vanilla JavaScript (no frameworks)
   - Handles DOM manipulation and user interactions
   - Makes fetch requests to the Express proxy

3. **HTML Interface** (`public/index.html`):
   - Minimal, semantic HTML
   - HMCTS-styled forms and components
   - Accessible and responsive design

### API Proxy

The Express server proxies all API calls to the backend:

```
Frontend (Browser) → Express Server → Spring Boot API
```

This approach:
- Avoids CORS issues
- Allows environment-specific backend URLs
- Provides a single origin for the frontend

## Environment Configuration

You can configure the backend API URL using an environment variable:

```bash
API_BASE_URL=http://localhost:8080/api/tasks npm start
```

Default: `http://localhost:8080/api/tasks`

## Features Guide

### Creating a Task

1. Fill in the task form at the top of the page
2. Required fields: Title, Status, Due Date & Time
3. Optional field: Description
4. Click "Create Task"

### Editing a Task

1. Click the "Edit" button on any task
2. The form will populate with task details
3. Make your changes
4. Click "Update Task" or "Cancel"

### Quick Actions

- **Mark Complete**: Instantly mark a task as completed
- **Start**: Change task status to "In Progress"
- **Delete**: Remove a task (requires confirmation)

### Task Status

Tasks can have the following statuses:
- **TODO**: Task not started (blue)
- **IN_PROGRESS**: Task in progress (orange)
- **COMPLETED**: Task completed (green)
- **CANCELLED**: Task cancelled (grey)

## Styling

The application uses custom CSS following HMCTS design patterns:
- HMCTS blue header (#1d70b8)
- Government-style form inputs
- Accessible color scheme with proper contrast
- Responsive design for mobile and desktop
- Government Digital Service (GDS) inspired layout

## Error Handling

The application handles various error scenarios:
- Backend server not running
- Network failures
- API validation errors
- Task not found errors

All errors are displayed to users with clear, actionable messages.

## Testing

The application includes server-side tests for:
- API proxy endpoint functionality
- Error handling
- Request/response formatting

Run tests with:
```bash
npm test
```

For test coverage:
```bash
npm test -- --coverage
```

## Security Features

- HTML escaping to prevent XSS attacks
- Server-side API proxy to hide backend URL
- No sensitive data in client-side code
- Validation on both client and server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

The application follows accessibility best practices:
- Semantic HTML5 elements
- Proper form labels and ARIA attributes
- Keyboard navigation support
- High contrast color ratios
- Focus indicators for interactive elements
- Screen reader friendly

## Development

### File Watching

For development with automatic server restart on file changes:

```bash
npm run dev
```

This uses `nodemon` to watch for changes in the `src/` directory.

### Adding New Features

1. Update `server.js` for new API endpoints
2. Update `app.js` for client-side logic
3. Update `styles.css` for new styles
4. Add tests in `server.test.js`

## Production Deployment

### Build and Run

```bash
npm install --production
npm start
```

### Environment Variables

- `PORT`: Server port (default: 3000)
- `API_BASE_URL`: Backend API URL (default: http://localhost:8080/api/tasks)

### Example Production Start

```bash
PORT=80 API_BASE_URL=https://api.example.com/api/tasks npm start
```

## Health Check

The server includes a health check endpoint:

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-17T10:00:00.000Z"
}
```

## Troubleshooting

### Backend Connection Issues

If you see "Failed to load tasks" errors:

1. Ensure the backend is running on port 8080
2. Check the `API_BASE_URL` environment variable
3. Verify backend API is accessible: `curl http://localhost:8080/api/tasks`

### Port Already in Use

If port 3000 is already in use:

```bash
PORT=3001 npm start
```

## License

MIT
