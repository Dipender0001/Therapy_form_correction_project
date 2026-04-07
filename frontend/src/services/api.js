import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};

export const authService = {
    register: async (userData) => {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        if (response.data.token) localStorage.setItem('userToken', response.data.token);
        return response.data;
    },
    login: async (userData) => {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        if (response.data.token) localStorage.setItem('userToken', response.data.token);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('userToken');
    },
    getProfile: async () => {
        const response = await axios.get(`${API_URL}/user/profile`, getAuthHeaders());
        return response.data;
    }
};

export const exerciseService = {
    getAll: async () => {
        const response = await axios.get(`${API_URL}/exercises`, getAuthHeaders());
        return response.data;
    },
    getById: async (id) => {
        const response = await axios.get(`${API_URL}/exercises/${id}`, getAuthHeaders());
        return response.data;
    }
};

export const sessionService = {
    start: async (exerciseId) => {
        const response = await axios.post(`${API_URL}/session/start`, { exerciseId }, getAuthHeaders());
        return response.data;
    },
    analyzeFrame: async (frame, exerciseId, sessionId) => {
        const response = await axios.post(`${API_URL}/session/analyze-frame`, { frame, exerciseId, sessionId }, getAuthHeaders());
        return response.data;
    },
    end: async (sessionData) => {
        const response = await axios.post(`${API_URL}/session/end`, sessionData, getAuthHeaders());
        return response.data;
    },
    getHistory: async () => {
        const response = await axios.get(`${API_URL}/session/history`, getAuthHeaders());
        return response.data;
    },
    getById: async (id) => {
        const response = await axios.get(`${API_URL}/session/${id}`, getAuthHeaders());
        return response.data;
    }
};

export const progressService = {
    getSummary: async () => {
        const response = await axios.get(`${API_URL}/progress/summary`, getAuthHeaders());
        return response.data;
    },
    getReport: async () => {
        const response = await axios.get(`${API_URL}/progress/report`, getAuthHeaders());
        return response.data;
    }
};
