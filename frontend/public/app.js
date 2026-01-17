// State
let tasks = [];
let editingTaskId = null;

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const errorContainer = document.getElementById('error-container');
const successContainer = document.getElementById('success-container');
const loadingDiv = document.getElementById('loading');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const taskCount = document.getElementById('task-count');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    taskForm.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', handleCancel);
});

// API Functions
async function loadTasks() {
    try {
        showLoading(true);
        hideError();
        const response = await fetch('/api/tasks');

        if (!response.ok) {
            throw new Error('Failed to load tasks');
        }

        tasks = await response.json();
        renderTasks();
    } catch (error) {
        showError('Failed to load tasks. Please ensure the backend server is running.');
        console.error('Error loading tasks:', error);
    } finally {
        showLoading(false);
    }
}

async function createTask(taskData) {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw error;
    }

    return response.json();
}

async function updateTask(id, taskData) {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw error;
    }

    return response.json();
}

async function updateTaskStatus(id, status) {
    const response = await fetch(`/api/tasks/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    });

    if (!response.ok) {
        throw new Error('Failed to update task status');
    }

    return response.json();
}

async function deleteTask(id) {
    const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
}

// Event Handlers
async function handleSubmit(e) {
    e.preventDefault();
    hideError();
    hideSuccess();

    const formData = new FormData(taskForm);
    const taskData = {
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status'),
        dueDateTime: formData.get('dueDateTime')
    };

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving...';

        if (editingTaskId) {
            await updateTask(editingTaskId, taskData);
            showSuccess('Task updated successfully!');
        } else {
            await createTask(taskData);
            showSuccess('Task created successfully!');
        }

        taskForm.reset();
        editingTaskId = null;
        updateFormUI();
        await loadTasks();
    } catch (error) {
        console.error('Error saving task:', error);

        if (error.validationErrors) {
            const errorMessages = Object.entries(error.validationErrors)
                .map(([field, message]) => `${field}: ${message}`)
                .join('<br>');
            showError(`Validation failed:<br>${errorMessages}`);
        } else {
            showError(error.message || 'Failed to save task. Please try again.');
        }
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = editingTaskId ? 'Update Task' : 'Create Task';
    }
}

function handleCancel() {
    taskForm.reset();
    editingTaskId = null;
    updateFormUI();
    hideError();
    hideSuccess();
}

function handleEdit(task) {
    editingTaskId = task.id;
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description || '';
    document.getElementById('status').value = task.status;
    document.getElementById('dueDateTime').value = formatDateTimeForInput(task.dueDateTime);

    updateFormUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function handleStatusChange(id, status) {
    try {
        hideError();
        await updateTaskStatus(id, status);
        await loadTasks();
        showSuccess('Task status updated successfully!');
    } catch (error) {
        showError('Failed to update task status. Please try again.');
        console.error('Error updating status:', error);
    }
}

async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        hideError();
        await deleteTask(id);
        await loadTasks();
        showSuccess('Task deleted successfully!');
    } catch (error) {
        showError('Failed to delete task. Please try again.');
        console.error('Error deleting task:', error);
    }
}

// UI Functions
function updateFormUI() {
    if (editingTaskId) {
        formTitle.textContent = 'Edit Task';
        submitBtn.textContent = 'Update Task';
        cancelBtn.style.display = 'inline-block';
    } else {
        formTitle.textContent = 'Create New Task';
        submitBtn.textContent = 'Create Task';
        cancelBtn.style.display = 'none';
    }
}

function renderTasks() {
    taskCount.textContent = `(${tasks.length})`;

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <p>No tasks found. Create your first task to get started.</p>
            </div>
        `;
        return;
    }

    taskList.innerHTML = tasks.map(task => `
        <div class="task-item">
            <div class="task-header">
                <h3 class="task-title">${escapeHtml(task.title)}</h3>
                <span class="task-status status-${task.status}">
                    ${formatStatus(task.status)}
                </span>
            </div>

            ${task.description ? `
                <p class="task-description">${escapeHtml(task.description)}</p>
            ` : ''}

            <div class="task-meta">
                <div><strong>Due:</strong> ${formatDateTime(task.dueDateTime)}</div>
                <div><strong>Created:</strong> ${formatDateTime(task.createdAt)}</div>
            </div>

            <div class="task-actions">
                <button class="btn btn-primary btn-small" onclick="handleEdit(${JSON.stringify(task).replace(/"/g, '&quot;')})">
                    Edit
                </button>

                ${task.status !== 'COMPLETED' ? `
                    <button class="btn btn-secondary btn-small" onclick="handleStatusChange(${task.id}, 'COMPLETED')">
                        Mark Complete
                    </button>
                ` : ''}

                ${task.status !== 'IN_PROGRESS' && task.status !== 'COMPLETED' ? `
                    <button class="btn btn-secondary btn-small" onclick="handleStatusChange(${task.id}, 'IN_PROGRESS')">
                        Start
                    </button>
                ` : ''}

                <button class="btn btn-danger btn-small" onclick="handleDelete(${task.id})">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

function showError(message) {
    errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
    errorContainer.style.display = 'block';
}

function hideError() {
    errorContainer.innerHTML = '';
    errorContainer.style.display = 'none';
}

function showSuccess(message) {
    successContainer.innerHTML = `<div class="success-message">${message}</div>`;
    successContainer.style.display = 'block';
    setTimeout(() => hideSuccess(), 3000);
}

function hideSuccess() {
    successContainer.innerHTML = '';
    successContainer.style.display = 'none';
}

function showLoading(show) {
    loadingDiv.style.display = show ? 'block' : 'none';
}

// Utility Functions
function formatDateTime(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return dateString;
    }
}

function formatDateTimeForInput(dateString) {
    try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
        return '';
    }
}

function formatStatus(status) {
    return status.replace('_', ' ');
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
