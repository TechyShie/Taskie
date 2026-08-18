const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Something went wrong");
  }

  if (response.status === 204) return null;
  return response.json();
}

export function getTask({ date, category } = {}) {
  const params = new URLSearchParams();
  if (date) params.append("date", date);
  if (category) params.append("category", category);

  const query = params.toString() ? `?${params.toString()}` : "";
  return apiRequest(`/tasks${query}`);
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