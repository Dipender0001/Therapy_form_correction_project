const Exercise = require('../models/Exercise');
const Session = require('../models/Session');
const crypto = require('crypto');

// @desc    Start exercise session
// @route   POST /api/exercise/start
// @access  Private
const startSession = async (req, res) => {
    try {
        const sessionId = crypto.randomUUID();

        const session = await Session.create({
            sessionId,
            userId: req.user._id,
            startTime: Date.now(),
        });

        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Save exercise results
// @route   POST /api/exercise/save
// @access  Private
const saveResults = async (req, res) => {
    try {
        const { exerciseName, accuracy, reps, feedback, sessionId } = req.body;

        if (!exerciseName || accuracy === undefined || reps === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const exercise = await Exercise.create({
            userId: req.user._id,
            exerciseName,
            accuracy,
            reps,
            feedback,
        });

        // Optionally, close a session if sessionId is provided
        if (sessionId) {
            await Session.findOneAndUpdate(
                { sessionId, userId: req.user._id },
                { endTime: Date.now() }
            );
        }

        res.status(201).json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get exercise history
// @route   GET /api/exercise/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const exercises = await Exercise.find({ userId: req.user._id }).sort({ date: -1 });
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get progress analytics
// @route   GET /api/exercise/progress
// @access  Private
const getProgress = async (req, res) => {
    try {
        const exercises = await Exercise.find({ userId: req.user._id });

        if (!exercises || exercises.length === 0) {
            return res.status(404).json({ message: 'No exercises found to calculate progress.' });
        }

        const totalReps = exercises.reduce((acc, curr) => acc + curr.reps, 0);
        const averageAccuracy = exercises.reduce((acc, curr) => acc + curr.accuracy, 0) / exercises.length;

        // More complex analytics can be aggregated here
        const analytics = {
            totalExercises: exercises.length,
            totalReps,
            averageAccuracy: averageAccuracy.toFixed(2),
        };

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    startSession,
    saveResults,
    getHistory,
    getProgress,
};
