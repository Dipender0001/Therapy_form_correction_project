import React, { useState, useEffect } from 'react';
import { Camera, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import './Exercise.css';

const ExerciseSession = () => {
    const [isActive, setIsActive] = useState(false);
    const [reps, setReps] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [feedback, setFeedback] = useState('Stand in front of the camera to begin.');
    const [status, setStatus] = useState('idle'); // idle, good, bad

    // Simulate real-time feedback
    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                const rand = Math.random();
                if (rand > 0.7) {
                    setStatus('bad');
                    setFeedback('Keep your back straight. Do not lean forward.');
                    setAccuracy(prev => Math.max(60, prev - 5));
                } else {
                    setStatus('good');
                    setFeedback('Perfect form! Keep it up.');
                    setAccuracy(prev => Math.min(100, prev + 2));
                    if (rand < 0.2) setReps(prev => prev + 1);
                }
            }, 3000);
        } else {
            clearInterval(interval);
            setStatus('idle');
            setFeedback('Session paused. Ready when you are.');
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const handleStartStop = () => {
        if (!isActive && accuracy === 0) setAccuracy(100);
        setIsActive(!isActive);
    };

    return (
        <div className="exercise-page animate-fade-in">
            <div className="dashboard-header flex justify-between items-center mb-md">
                <div>
                    <h1 className="text-secondary mb-xs">Squat Session</h1>
                    <p className="text-muted m-0">Target: 15 Reps | Focus: Lower Body</p>
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
                                {/* Simulated Skeleton Overlay */}
                                <div className="skeleton-overlay absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
                                    <svg width="200" height="400" viewBox="0 0 200 400" className={`stroke-current ${status === 'bad' ? 'text-danger' : 'text-primary'}`}>
                                        <circle cx="100" cy="50" r="20" fill="none" strokeWidth="4" />
                                        <line x1="100" y1="70" x2="100" y2="200" strokeWidth="4" />
                                        <line x1="100" y1="100" x2="40" y2="150" strokeWidth="4" />
                                        <line x1="100" y1="100" x2="160" y2="150" strokeWidth="4" />
                                        <line x1="100" y1="200" x2="60" y2="350" strokeWidth="4" />
                                        <line x1="100" y1="200" x2="140" y2="350" strokeWidth="4" />
                                        {/* Highlight problem area if bad */}
                                        {status === 'bad' && <circle cx="100" cy="150" r="30" fill="rgba(226, 76, 76, 0.3)" stroke="none" className="animate-pulse" />}
                                    </svg>
                                </div>
                                <div className="absolute top-4 right-4 flex gap-sm">
                                    <div className="live-indicator flex items-center gap-xs bg-black bg-opacity-50 text-white px-sm py-xs rounded-md text-sm font-medium backdrop-blur-sm">
                                        <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
                                        LIVE
                                    </div>
                                </div>
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
                        {/* Simple progress bar */}
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
                        <div className="feedback-content flex-1 flex items-center justify-center text-center p-md">
                            <p className={`text-lg font-medium m-0 ${status === 'bad' ? 'text-danger' :
                                    status === 'good' ? 'text-primary-dark' : 'text-muted'
                                }`}>
                                {feedback}
                            </p>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default ExerciseSession;
