import React from 'react';
import { Download, TrendingUp, Calendar, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import './Progress.css';

const ProgressTracking = () => {
    // Dummy data
    const weeklyData = [
        { day: 'Mon', score: 85, color: 'var(--color-primary)' },
        { day: 'Tue', score: 88, color: 'var(--color-primary)' },
        { day: 'Wed', score: 82, color: 'var(--color-warning)' },
        { day: 'Thu', score: 91, color: 'var(--color-success)' },
        { day: 'Fri', score: 95, color: 'var(--color-success)' },
        { day: 'Sat', score: 94, color: 'var(--color-success)' },
        { day: 'Sun', score: 0, color: '#e5e7eb' }, // Missed/Future
    ];

    const historyData = [
        { id: 1, date: 'Oct 26, 2023', exercise: 'Squats', duration: '15m', sets: '3x15', score: 95, status: 'excellent' },
        { id: 2, date: 'Oct 25, 2023', exercise: 'Lunges', duration: '12m', sets: '3x12', score: 88, status: 'good' },
        { id: 3, date: 'Oct 24, 2023', exercise: 'Plank', duration: '5m', sets: '3', score: 91, status: 'excellent' },
        { id: 4, date: 'Oct 22, 2023', exercise: 'Squats', duration: '10m', sets: '2x15', score: 82, status: 'needs-work' },
        { id: 5, date: 'Oct 20, 2023', exercise: 'Deadlifts', duration: '20m', sets: '4x10', score: 94, status: 'excellent' },
    ];

    return (
        <div className="progress-page animate-fade-in">
            <div className="dashboard-header flex justify-between items-center mb-xl">
                <div>
                    <h1 className="text-secondary mb-xs">Progress Tracking</h1>
                    <p className="text-muted m-0">Detailed analysis of your physical therapy journey.</p>
                </div>
                <div className="flex gap-sm">
                    <Button variant="outline" icon={<Calendar size={18} />}>This Month <ChevronDown size={14} className="ml-xs" /></Button>
                    <Button variant="primary" icon={<Download size={18} />}>Export Report</Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-lg mb-xl">
                <div className="col-span-2">
                    <Card title="Weekly Improvement" className="h-full border-none">
                        <div className="weekly-chart flex items-end justify-between h-48 mt-lg pt-md px-md border-b border-gray-100 pb-sm relative">
                            {/* Dummy horizontal grid lines */}
                            <div className="absolute w-full border-b border-gray-100 border-dashed top-1/4 opacity-50"></div>
                            <div className="absolute w-full border-b border-gray-100 border-dashed top-2/4 opacity-50"></div>
                            <div className="absolute w-full border-b border-gray-100 border-dashed top-3/4 opacity-50"></div>

                            {weeklyData.map((data, index) => (
                                <div key={index} className="flex flex-col items-center gap-sm z-10">
                                    <span className="text-xs font-medium text-muted">{data.score > 0 ? `${data.score}%` : '-'}</span>
                                    <div
                                        className="w-12 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                                        style={{
                                            height: data.score > 0 ? `${data.score}%` : '10%',
                                            backgroundColor: data.color
                                        }}
                                    ></div>
                                    <span className="text-sm font-medium text-secondary">{data.day}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="col-span-1">
                    <Card className="h-full border-none flex flex-col justify-center">
                        <h3 className="text-center text-muted text-sm uppercase tracking-wider mb-sm">Current Streak</h3>
                        <div className="text-center text-7xl font-black text-primary mb-xs">5</div>
                        <p className="text-center text-secondary font-medium m-0">Days in a row</p>

                        <div className="mt-xl flex flex-col gap-sm">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Longest Streak</span>
                                <span className="font-semibold text-secondary">14 Days</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted">Total Sessions</span>
                                <span className="font-semibold text-secondary">42</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Card title="Exercise History" className="border-none">
                <div className="history-table overflow-x-auto mt-md">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-muted text-sm">
                                <th className="pb-sm font-medium">Date</th>
                                <th className="pb-sm font-medium">Exercise</th>
                                <th className="pb-sm font-medium">Duration</th>
                                <th className="pb-sm font-medium">Sets</th>
                                <th className="pb-sm font-medium">Avg. Score</th>
                                <th className="pb-sm font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map(row => (
                                <tr key={row.id} className="border-b border-gray-100 border-dashed hover:bg-background transition-colors">
                                    <td className="py-md text-sm text-secondary">{row.date}</td>
                                    <td className="py-md text-sm font-semibold text-secondary">{row.exercise}</td>
                                    <td className="py-md text-sm text-muted">{row.duration}</td>
                                    <td className="py-md text-sm text-muted">{row.sets}</td>
                                    <td className="py-md text-sm font-medium text-secondary">{row.score}%</td>
                                    <td className="py-md text-sm">
                                        <div className={`inline-flex items-center gap-xs px-sm py-xs rounded-full text-xs font-medium ${row.status === 'excellent' ? 'bg-success-light text-success' :
                                                row.status === 'good' ? 'bg-primary-light text-primary-dark' :
                                                    'bg-warning-light text-warning'
                                            }`}>
                                            {row.status === 'excellent' ? <CheckCircle2 size={12} /> :
                                                row.status === 'good' ? <TrendingUp size={12} /> :
                                                    <AlertCircle size={12} />}
                                            {row.status.charAt(0).toUpperCase() + row.status.slice(1).replace('-', ' ')}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ProgressTracking;
