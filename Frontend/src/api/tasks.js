import { apiRequest } from "./client";

export function getTasks({ date, category } = {}) {
  const params = new URLSearchParams();
  if (date) params.append("date", date);
  if (category) params.append("category", category);

  const query = params.toString() ? `?${params.toString()}` : "";
  return apiRequest(`/tasks/${query}`);
}

export function createTask(taskData) {
  return apiRequest("/tasks/", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export function updateTask(taskId, updates) {
  return apiRequest(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export function deleteTask(taskId) {
  return apiRequest(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}