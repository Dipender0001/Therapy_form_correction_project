const Exercise = require('../models/Exercise');

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get exercise by ID
// @route   GET /api/exercises/:id
// @access  Public
const getExerciseById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (exercise) {
            res.json(exercise);
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getExercises, getExerciseById };
