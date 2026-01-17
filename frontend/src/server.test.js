const request = require('supertest');
const express = require('express');

// Mock axios
jest.mock('axios');
const axios = require('axios');

// Create a test app
const app = express();
app.use(express.json());

// Copy the routes from server.js for testing
app.get('/api/tasks', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/tasks');
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch tasks',
            message: error.message
        });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8080/api/tasks', req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: 'Failed to create task',
            message: error.response?.data?.message || error.message
        });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await axios.delete(`http://localhost:8080/api/tasks/${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: 'Failed to delete task',
            message: error.message
        });
    }
});

describe('Server API Proxy Endpoints', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/tasks', () => {
        test('should return tasks from backend API', async () => {
            const mockTasks = [
                { id: 1, title: 'Test Task', status: 'TODO' },
                { id: 2, title: 'Test Task 2', status: 'IN_PROGRESS' }
            ];

            axios.get.mockResolvedValue({ data: mockTasks });

            const response = await request(app).get('/api/tasks');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockTasks);
            expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/tasks');
        });

        test('should handle errors from backend API', async () => {
            axios.get.mockRejectedValue(new Error('Backend error'));

            const response = await request(app).get('/api/tasks');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('POST /api/tasks', () => {
        test('should create task via backend API', async () => {
            const newTask = {
                title: 'New Task',
                description: 'Test',
                status: 'TODO',
                dueDateTime: '2026-02-01T10:00:00'
            };

            const createdTask = { id: 1, ...newTask };
            axios.post.mockResolvedValue({ data: createdTask });

            const response = await request(app)
                .post('/api/tasks')
                .send(newTask);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdTask);
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/tasks', newTask);
        });

        test('should handle validation errors', async () => {
            const invalidTask = { title: '' };

            axios.post.mockRejectedValue({
                response: {
                    status: 400,
                    data: { message: 'Validation failed' }
                }
            });

            const response = await request(app)
                .post('/api/tasks')
                .send(invalidTask);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('DELETE /api/tasks/:id', () => {
        test('should delete task via backend API', async () => {
            axios.delete.mockResolvedValue({});

            const response = await request(app).delete('/api/tasks/1');

            expect(response.status).toBe(204);
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/tasks/1');
        });

        test('should handle not found errors', async () => {
            axios.delete.mockRejectedValue({
                response: {
                    status: 404
                },
                message: 'Task not found'
            });

            const response = await request(app).delete('/api/tasks/999');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error');
        });
    });
});
