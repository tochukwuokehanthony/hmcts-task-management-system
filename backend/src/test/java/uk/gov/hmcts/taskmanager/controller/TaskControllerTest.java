package uk.gov.hmcts.taskmanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import uk.gov.hmcts.taskmanager.dto.TaskRequest;
import uk.gov.hmcts.taskmanager.dto.TaskResponse;
import uk.gov.hmcts.taskmanager.exception.ResourceNotFoundException;
import uk.gov.hmcts.taskmanager.model.TaskStatus;
import uk.gov.hmcts.taskmanager.service.TaskService;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TaskService taskService;

    private TaskRequest taskRequest;
    private TaskResponse taskResponse;

    @BeforeEach
    void setUp() {
        LocalDateTime dueDate = LocalDateTime.of(2026, 2, 1, 10, 0);

        taskRequest = new TaskRequest();
        taskRequest.setTitle("Test Task");
        taskRequest.setDescription("Test Description");
        taskRequest.setStatus(TaskStatus.TODO);
        taskRequest.setDueDateTime(dueDate);

        taskResponse = new TaskResponse();
        taskResponse.setId(1L);
        taskResponse.setTitle("Test Task");
        taskResponse.setDescription("Test Description");
        taskResponse.setStatus(TaskStatus.TODO);
        taskResponse.setDueDateTime(dueDate);
        taskResponse.setCreatedAt(LocalDateTime.now());
        taskResponse.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void createTask_ShouldReturn201Created() throws Exception {
        when(taskService.createTask(any(TaskRequest.class))).thenReturn(taskResponse);

        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(taskRequest)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.title").value("Test Task"))
            .andExpect(jsonPath("$.status").value("TODO"));

        verify(taskService, times(1)).createTask(any(TaskRequest.class));
    }

    @Test
    void createTask_WithInvalidData_ShouldReturn400() throws Exception {
        TaskRequest invalidRequest = new TaskRequest();

        mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest)))
            .andExpect(status().isBadRequest());

        verify(taskService, never()).createTask(any(TaskRequest.class));
    }

    @Test
    void getTaskById_WhenTaskExists_ShouldReturn200() throws Exception {
        when(taskService.getTaskById(1L)).thenReturn(taskResponse);

        mockMvc.perform(get("/api/tasks/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.title").value("Test Task"));

        verify(taskService, times(1)).getTaskById(1L);
    }

    @Test
    void getTaskById_WhenTaskNotFound_ShouldReturn404() throws Exception {
        when(taskService.getTaskById(1L)).thenThrow(new ResourceNotFoundException("Task not found"));

        mockMvc.perform(get("/api/tasks/1"))
            .andExpect(status().isNotFound());

        verify(taskService, times(1)).getTaskById(1L);
    }

    @Test
    void getAllTasks_ShouldReturn200WithList() throws Exception {
        TaskResponse task2 = new TaskResponse();
        task2.setId(2L);
        task2.setTitle("Task 2");
        task2.setStatus(TaskStatus.IN_PROGRESS);
        task2.setDueDateTime(LocalDateTime.now().plusDays(2));

        List<TaskResponse> tasks = Arrays.asList(taskResponse, task2);
        when(taskService.getAllTasks()).thenReturn(tasks);

        mockMvc.perform(get("/api/tasks"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].title").value("Test Task"))
            .andExpect(jsonPath("$[1].title").value("Task 2"));

        verify(taskService, times(1)).getAllTasks();
    }

    @Test
    void updateTaskStatus_ShouldReturn200() throws Exception {
        taskResponse.setStatus(TaskStatus.COMPLETED);
        when(taskService.updateTaskStatus(eq(1L), any(TaskStatus.class))).thenReturn(taskResponse);

        Map<String, String> statusUpdate = Map.of("status", "COMPLETED");

        mockMvc.perform(patch("/api/tasks/1/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(statusUpdate)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("COMPLETED"));

        verify(taskService, times(1)).updateTaskStatus(eq(1L), any(TaskStatus.class));
    }

    @Test
    void updateTask_ShouldReturn200() throws Exception {
        when(taskService.updateTask(eq(1L), any(TaskRequest.class))).thenReturn(taskResponse);

        mockMvc.perform(put("/api/tasks/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(taskRequest)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1));

        verify(taskService, times(1)).updateTask(eq(1L), any(TaskRequest.class));
    }

    @Test
    void deleteTask_ShouldReturn204() throws Exception {
        doNothing().when(taskService).deleteTask(1L);

        mockMvc.perform(delete("/api/tasks/1"))
            .andExpect(status().isNoContent());

        verify(taskService, times(1)).deleteTask(1L);
    }

    @Test
    void deleteTask_WhenTaskNotFound_ShouldReturn404() throws Exception {
        doThrow(new ResourceNotFoundException("Task not found")).when(taskService).deleteTask(1L);

        mockMvc.perform(delete("/api/tasks/1"))
            .andExpect(status().isNotFound());

        verify(taskService, times(1)).deleteTask(1L);
    }
}
