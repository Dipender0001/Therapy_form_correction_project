const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        exerciseName: {
            type: String,
            required: true,
        },
        accuracy: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        reps: {
            type: Number,
            required: true,
            default: 0,
        },
        feedback: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
