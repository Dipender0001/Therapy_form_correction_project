import React, { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { sessionService } from '../services/api';
import './Exercise.css';

const ExerciseSession = () => {
    const webcamRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [reps, setReps] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [feedbackText, setFeedbackText] = useState('Stand in front of the camera to begin.');
    const [status, setStatus] = useState('idle'); // idle, good, bad
    const [errors, setErrors] = useState({});

    // Demo exerciseId, replace with actual selection in production
    const exerciseId = 'demo-squat-123';

    const captureAndAnalyze = useCallback(async () => {
        if (webcamRef.current && isActive) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                try {
                    const result = await sessionService.analyzeFrame(imageSrc, exerciseId, sessionId);

                    if (result.error) {
                        console.error(result.error);
                        return;
                    }

                    // Update metrics
                    setAccuracy(result.accuracy);
                    setReps(result.repCount);

                    if (result.feedback && result.feedback.length > 0) {
                        setFeedbackText(result.feedback.join('. '));
                        // basic heuristic for status color:
                        if (result.accuracy < 70) setStatus('bad');
                        else setStatus('good');
                    }

                    setErrors(result.errors || {});
                } catch (error) {
                    console.error("Analysis Failed:", error);
                }
            }
        }
    }, [isActive, exerciseId, sessionId]);

    useEffect(() => {
        let interval;
        if (isActive) {
            // Setup session on backend first if not exists
            if (!sessionId) {
                sessionService.start(exerciseId).then(res => setSessionId(res._id)).catch(console.error);
            }
            // Capture frames every 500ms
            interval = setInterval(captureAndAnalyze, 500);
        } else {
            clearInterval(interval);
            setStatus('idle');
            setFeedbackText('Session paused. Ready when you are.');
        }
        return () => clearInterval(interval);
    }, [isActive, captureAndAnalyze, sessionId, exerciseId]);

    const handleStartStop = async () => {
        if (isActive && sessionId) {
            // End session
            await sessionService.end({
                sessionId,
                reps,
                avgAccuracy: accuracy, // simplified average
                mistakes: Object.keys(errors),
                feedbackHistory: [feedbackText]
            }).catch(console.error);
            setSessionId(null);
        }
        setIsActive(!isActive);
    };

    return (
        <div className="exercise-page animate-fade-in">
            <div className="dashboard-header flex justify-between items-center mb-md">
                <div>
                    <h1 className="text-secondary mb-xs">Live Exercise Session</h1>
                    <p className="text-muted m-0">Target: 15 Reps | Focus: Real-time Form Correction</p>
                </div>
                <Button
                    variant={isActive ? 'danger' : 'primary'}
                    onClick={handleStartStop}
                    className={isActive ? 'bg-danger text-white' : ''}
                >
                    {isActive ? 'End Session' : 'Start Camera'}
                </Button>
            </div>

            <div className="exercise-grid grid grid-cols-3 gap-lg h-[calc(100vh-180px)]">
                {/* Main Camera View */}
                <div className="col-span-2 h-full flex flex-col">
                    <Card className="camera-card h-full flex-1 border-none bg-secondary overflow-hidden relative p-0">
                        {isActive ? (
                            <div className="camera-active-view w-full h-full relative flex items-center justify-center bg-gray-900">
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={{ facingMode: "user" }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div className="absolute top-4 right-4 flex gap-sm">
                                    <div className="live-indicator flex items-center gap-xs bg-black bg-opacity-50 text-white px-sm py-xs rounded-md text-sm font-medium backdrop-blur-sm">
                                        <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
                                        LIVE
                                    </div>
                                </div>
                                {errors.noPerson && (
                                    <div className="absolute top-10 flex gap-sm bg-danger text-white p-2 rounded">
                                        No person detected in frame.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="camera-offline-view w-full h-full flex flex-col items-center justify-center text-white opacity-50">
                                <Camera size={64} className="mb-md" />
                                <p>Camera is currently off</p>
                                <p className="text-sm">Click 'Start Camera' to begin your session</p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Feedback Panel */}
                <div className="col-span-1 h-full flex flex-col gap-md">
                    <Card className="metrics-card border-none text-center py-xl">
                        <h3 className="text-muted text-sm uppercase tracking-wider mb-xs">Repetitions</h3>
                        <div className="text-6xl font-black text-secondary">{reps}<span className="text-2xl text-muted font-medium">/15</span></div>
                    </Card>

                    <Card className="metrics-card border-none text-center py-xl">
                        <h3 className="text-muted text-sm uppercase tracking-wider mb-xs">Accuracy Score</h3>
                        <div className={`text-5xl font-black transition-colors duration-300 ${status === 'bad' ? 'text-warning' : 'text-primary'}`}>
                            {accuracy}%
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full mt-md overflow-hidden">
                            <div
                                className={`h-full transition-all duration-300 ${status === 'bad' ? 'bg-warning' : 'bg-primary'}`}
                                style={{ width: `${accuracy}%` }}
                            ></div>
                        </div>
                    </Card>

                    <Card className={`feedback-card border-none flex-1 flex flex-col transition-colors duration-300 ${status === 'bad' ? 'bg-danger-light border-l-4 border-danger' :
                        status === 'good' ? 'bg-primary-light border-l-4 border-primary' : ''
                        }`}>
                        <h3 className="text-secondary text-lg mb-md flex items-center gap-sm">
                            {status === 'bad' ? <AlertCircle className="text-danger" /> :
                                status === 'good' ? <CheckCircle2 className="text-primary" /> :
                                    <AlertCircle className="text-muted" />}
                            Real-Time Feedback
                        </h3>
                        <div className="feedback-content flex-1 flex flex-col items-center justify-center text-center p-md">
                            <p className={`text-lg font-medium m-0 ${status === 'bad' ? 'text-danger' :
                                status === 'good' ? 'text-primary-dark' : 'text-muted'
                                }`}>
                                {feedbackText}
                            </p>
                            {Object.keys(errors).length > 0 && !errors.noPerson && (
                                <ul className="text-danger mt-2 text-sm italic">
                                    {Object.entries(errors).map(([k, v]) => v ? <li key={k}>{k}</li> : null)}
                                </ul>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ExerciseSession;
