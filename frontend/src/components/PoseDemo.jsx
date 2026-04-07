import React, { useState, useEffect } from 'react';
import { analyzePoseData, getExerciseHistory } from '../services/poseService';

const PoseDemo = () => {
    const [accuracy, setAccuracy] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [angles, setAngles] = useState({});
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Example function simulating receiving landmarks from MediaPipe in the browser
    const handleSimulatePose = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Simulated 33 landmarks from MediaPipe logic (e.g. [[0, 150, 200], ...])
            const mockLandmarks = Array.from({ length: 33 }, (_, i) => [
                i,
                Math.random() * 500, // x
                Math.random() * 500  // y
            ]);

            // Call our service which hits Node.js -> hits Python -> Saves Mongo -> Returns
            const result = await analyzePoseData(mockLandmarks);

            if (result.success) {
                setAccuracy(result.accuracy);
                setFeedback(result.feedback);
                setAngles(result.angles);

                // Refresh the history dashboard after saving the new result automatically
                fetchHistory();
            }
        } catch (err) {
            setError(err.message || 'Failed to analyze pose');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchHistory = async () => {
        try {
            const data = await getExerciseHistory();
            setHistory(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // Load initial dashboard history
        fetchHistory();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Move To Heal - Real-Time Dashboard</h2>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleSimulatePose} disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Simulate Webcam Pose Read'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            {accuracy !== null && (
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Live AI Feedback</h3>
                    <p><strong>Accuracy:</strong> <span style={{ color: accuracy > 85 ? 'green' : 'red' }}>{accuracy}%</span></p>
                    <p><strong>Feedback:</strong> {feedback}</p>
                    <p><strong>Current Form Angles:</strong></p>
                    <ul>
                        {Object.entries(angles).map(([joint, angle]) => (
                            <li key={joint}>{joint}: {angle}°</li>
                        ))}
                    </ul>
                </div>
            )}

            <div style={{ marginTop: '40px' }}>
                <h3>Recent AI Sessions (Saved to MongoDB)</h3>
                <ul>
                    {history.map((session, index) => (
                        <li key={index}>
                            {new Date(session.date).toLocaleString()} - Accuracy: {session.accuracy}% - Feedback: {session.feedback}
                        </li>
                    ))}
                    {history.length === 0 && <p>No history yet. Start analyzing!</p>}
                </ul>
            </div>
        </div>
    );
};

export default PoseDemo;
