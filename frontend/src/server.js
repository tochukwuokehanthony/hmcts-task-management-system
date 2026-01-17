const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080/api/tasks';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// API proxy endpoints to handle CORS
app.get('/api/tasks', async (req, res) => {
    try {
        const response = await axios.get(API_BASE_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch tasks',
            message: error.message
        });
    }
});

app.get('/api/tasks/:id', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching task:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch task',
            message: error.message
        });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const response = await axios.post(API_BASE_URL, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to create task',
            message: error.response?.data?.message || error.message,
            validationErrors: error.response?.data?.validationErrors
        });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to update task',
            message: error.response?.data?.message || error.message,
            validationErrors: error.response?.data?.validationErrors
        });
    }
});

app.patch('/api/tasks/:id/status', async (req, res) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${req.params.id}/status`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error updating task status:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to update task status',
            message: error.message
        });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await axios.delete(`${API_BASE_URL}/${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to delete task',
            message: error.message
        });
    }
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`HMCTS Task Manager Frontend running on http://localhost:${PORT}`);
    console.log(`API Base URL: ${API_BASE_URL}`);
});

module.exports = app;
