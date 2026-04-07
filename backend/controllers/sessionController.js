const Session = require('../models/Session');
const axios = require('axios');

// @desc    Start exercise session
// @route   POST /api/session/start
// @access  Private
const startSession = async (req, res) => {
    try {
        const { exerciseId } = req.body;
        const session = await Session.create({
            userId: req.user._id,
            exerciseId,
            startTime: Date.now(),
        });
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Analyze frame by bridging to Python AI Service
// @route   POST /api/session/analyze-frame
// @access  Private
const analyzeFrame = async (req, res) => {
    try {
        const { frame, exerciseId, sessionId } = req.body;

        // Forward to Python AI service
        // Assuming AI service runs on localhost:5001
        const aiResponse = await axios.post(process.env.AI_SERVICE_URL || 'http://127.0.0.1:5001/analyze', {
            frame,
            exerciseId
        });

        res.json(aiResponse.data);
    } catch (error) {
        console.error('AI Service Error:', error.message);
        res.status(500).json({ message: 'Failed to analyze frame' });
    }
};

// @desc    End exercise session
// @route   POST /api/session/end
// @access  Private
const endSession = async (req, res) => {
    try {
        const { sessionId, reps, avgAccuracy, mistakes, feedbackHistory, frameCount } = req.body;
        const session = await Session.findOneAndUpdate(
            { _id: sessionId, userId: req.user._id },
            {
                endTime: Date.now(),
                reps: reps || 0,
                avgAccuracy: avgAccuracy || 0,
                mistakes: mistakes || [],
                feedbackHistory: feedbackHistory || [],
                frameCount: frameCount || 0
            },
            { new: true }
        );
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get session history
// @route   GET /api/session/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user._id })
            .populate('exerciseId', 'name')
            .sort({ createdAt: -1 });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get session by ID
// @route   GET /api/session/:id
// @access  Private
const getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).populate('exerciseId', 'name');
        if (session && session.userId.toString() === req.user._id.toString()) {
            res.json(session);
        } else {
            res.status(404).json({ message: 'Session not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { startSession, analyzeFrame, endSession, getHistory, getSessionById };
