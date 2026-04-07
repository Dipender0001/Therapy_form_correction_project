import axios from 'axios';

// Assuming the Node.js backend is running on port 5000
const API_URL = 'http://localhost:5000/api';

/**
 * Configure axios instance with common headers (e.g., JWT auth token)
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken'); // Or from your auth context
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};

/**
 * Sends pose landmarks to the Node.js backend which then forwards to Python AI.
 * The backend then auto-saves the exercise result to MongoDB.
 * 
 * @param {Array} landmarks - The 33 pose landmarks detected by MediaPipe JS
 * @returns {Promise<Object>} API response including accuracy, feedback, and angles
 */
export const analyzePoseData = async (landmarks) => {
    try {
        // Send to backend route POST /api/pose/analyze
        const response = await axios.post(
            `${API_URL}/pose/analyze`,
            { poseData: landmarks },
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error('Error analyzing pose data:', error);
        throw error.response?.data || error.message;
    }
};

/**
 * Fetches the user's historical exercise progression from MongoDB.
 * 
 * @returns {Promise<Array>} List of past exercises
 */
export const getExerciseHistory = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/exercise/history`,
            getAuthHeaders()
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching exercise history:', error);
        throw error.response?.data || error.message;
    }
};
