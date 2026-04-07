const axios = require('axios');
const Exercise = require('../models/Exercise');

// @desc    Analyze pose data
// @route   POST /api/pose/analyze
// @access  Private
const analyzePose = async (req, res) => {
    try {
        const { poseData } = req.body;

        if (!poseData) {
            return res.status(400).json({ message: 'Please provide pose data' });
        }

        // Send data to the Python AI service
        // Forward direct landmarks array to /analyze_pose
        const response = await axios.post('http://localhost:5000/analyze_pose', {
            landmarks: poseData,
        });

        const { accuracy, feedback, angles } = response.data;

        // Auto-save the results to MongoDB as an exercise log
        try {
            await Exercise.create({
                userId: req.user._id,
                exerciseName: 'Real-Time Pose Analysis',
                accuracy: accuracy,
                reps: 1, // Defaulting to 1 rep for a single posture check
                feedback: feedback,
            });
        } catch (dbError) {
            console.error('Failed to save exercise to database:', dbError);
        }

        res.json({
            success: true,
            accuracy,
            feedback,
            angles
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    analyzePose
};
