const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        bodyPart: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        targetAngles: {
            type: Map,
            of: Number,
        },
        instructions: [{
            type: String,
        }],
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium',
        },
    },
    {
        timestamps: true,
    }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
