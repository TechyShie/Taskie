const API_url = import.meta.env.VITE_API_URL;

export async function apiRequest(path, options = {} ) {
    const token = localStorage.getItem("token");

    const headers = {
        "content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (!resposnse.ok){
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.detail || "SOmething went wrong");
    }

    return response.json();cd 
}