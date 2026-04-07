const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        startTime: {
            type: Date,
            required: true,
            default: Date.now,
        },
        endTime: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
