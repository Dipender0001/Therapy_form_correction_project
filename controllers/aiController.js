const axios = require('axios');

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
        const response = await axios.post('http://localhost:5000/analyze', {
            poseData
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    analyzePose
};
