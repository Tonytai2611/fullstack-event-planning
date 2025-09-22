// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8800';
// export const API_BASE_URL = 'https://fullstack-event-planning-production.up.railway.app';

// Helper function to create API URLs
export const createApiUrl = (endpoint) => {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${API_BASE_URL}/${cleanEndpoint}`;
};
