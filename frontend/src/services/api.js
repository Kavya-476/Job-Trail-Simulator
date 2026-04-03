import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (email, password, rememberMe = false) => {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        const response = await api.post('/login', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // Handling token storage based on rememberMe
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        
        if (rememberMe) {
            localStorage.setItem('token', response.data.access_token);
        } else {
            sessionStorage.setItem('token', response.data.access_token);
        }

        return response.data;
    },
    signup: async (name, email, password, education) => {
        const response = await api.post('/signup', { name, email, password, education });
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    },
    getProfile: async () => {
        const response = await api.get('/users/me');
        return response.data;
    },
    updateProfile: async (profileData) => {
        const response = await api.patch('/users/me', profileData);
        return response.data;
    },
    getTotalUsers: async () => {
        const response = await api.get('/stats/total-users');
        return response.data;
    },
    forgotPassword: async (email) => {
        const response = await api.post('/forgot-password', { email });
        return response.data;
    },
    resetPassword: async (email, token, newPassword) => {
        const response = await api.post('/reset-password', { email, token, new_password: newPassword });
        return response.data;
    },
    googleLogin: async (token) => {
        const response = await api.post('/auth/google', { token });
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.setItem('token', response.data.access_token);
        return response.data;
    },
    linkedinLogin: async () => {
        const response = await api.post('/auth/linkedin');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.setItem('token', response.data.access_token);
        return response.data;
    }
};

export const jobService = {
    getJobs: async () => {
        const response = await api.get('/jobs');
        return response.data;
    },
    getJob: async (jobId) => {
        const response = await api.get(`/jobs/${jobId}`);
        return response.data;
    },
    getTasks: async (jobId, level) => {
        const response = await api.get(`/jobs/${jobId}/tasks`, { params: { level } });
        return response.data;
    }
};

export const simulationService = {
    submitTask: async (taskId, content) => {
        const response = await api.post('/submit', { task_id: taskId, content });
        return response.data;
    },
    getSubmissions: async () => {
        const response = await api.get('/submissions/me');
        return response.data;
    }
};

export const notificationService = {
    getNotifications: async () => {
        const response = await api.get('/notifications');
        return response.data;
    },
    markAsRead: async (notificationId) => {
        const response = await api.patch(`/notifications/${notificationId}/read`);
        return response.data;
    }
};

export const wishlistService = {
    toggleWishlist: async (jobId) => {
        const response = await api.post(`/wishlist/toggle/${jobId}`);
        return response.data;
    },
    getWishlist: async () => {
        const response = await api.get('/wishlist');
        return response.data;
    }
};

export default api;
