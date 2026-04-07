const mongoose = require('mongoose');

const progressReportSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        totalSessions: {
            type: Number,
            default: 0,
        },
        totalReps: {
            type: Number,
            default: 0,
        },
        averageAccuracy: {
            type: Number,
            default: 0,
        },
        improvementTrend: {
            type: String,
            default: 'static',
        },
        lastSessionDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const ProgressReport = mongoose.model('ProgressReport', progressReportSchema);
module.exports = ProgressReport;
