const ProgressReport = require('../models/ProgressReport');
const Session = require('../models/Session');

// @desc    Get progress summary
// @route   GET /api/progress/summary
// @access  Private
const getSummary = async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.user._id });
        if (!sessions || sessions.length === 0) {
            return res.json({ totalSessions: 0, totalReps: 0, averageAccuracy: 0 });
        }

        const totalSessions = sessions.length;
        const totalReps = sessions.reduce((acc, curr) => acc + curr.reps, 0);
        const averageAccuracy = sessions.reduce((acc, curr) => acc + curr.avgAccuracy, 0) / totalSessions;

        res.json({
            totalSessions,
            totalReps,
            averageAccuracy: averageAccuracy.toFixed(2),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get progress report
// @route   GET /api/progress/report
// @access  Private
const getReport = async (req, res) => {
    try {
        let report = await ProgressReport.findOne({ userId: req.user._id });
        if (!report) {
            const sessions = await Session.find({ userId: req.user._id });
            const totalReps = sessions.reduce((acc, curr) => acc + curr.reps, 0);
            const averageAccuracy = sessions.length > 0
                ? sessions.reduce((acc, curr) => acc + curr.avgAccuracy, 0) / sessions.length
                : 0;

            report = await ProgressReport.create({
                userId: req.user._id,
                totalSessions: sessions.length,
                totalReps,
                averageAccuracy,
                lastSessionDate: sessions.length > 0 ? sessions[sessions.length - 1].createdAt : null
            });
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSummary, getReport };
