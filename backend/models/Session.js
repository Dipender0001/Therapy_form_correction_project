const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        exerciseId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Exercise',
        },
        startTime: {
            type: Date,
            required: true,
            default: Date.now,
        },
        endTime: {
            type: Date,
        },
        reps: {
            type: Number,
            required: true,
            default: 0,
        },
        avgAccuracy: {
            type: Number,
            required: true,
            default: 0,
        },
        mistakes: [{
            type: String,
        }],
        feedbackHistory: [{
            type: String,
        }],
        frameCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
