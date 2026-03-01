import React from 'react';
import { Play, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    // Dummy data
    const stats = [
        { label: 'Overall Accuracy', value: '92%', icon: <CheckCircle className="text-success" size={24} /> },
        { label: 'Total Sessions', value: '24', icon: <TrendingUp className="text-primary" size={24} /> },
        { label: 'Time Active', value: '12h 45m', icon: <Clock className="text-secondary" size={24} /> },
    ];

    const recentActivity = [
        { id: 1, name: 'Squat Form Correction', date: 'Today, 10:00 AM', accuracy: 95 },
        { id: 2, name: 'Lunge Assessment', date: 'Yesterday, 4:30 PM', accuracy: 88 },
        { id: 3, name: 'Plank Hold', date: 'Oct 24, 8:15 AM', accuracy: 91 },
    ];

    return (
        <div className="dashboard-page animate-fade-in">
            <div className="dashboard-header flex justify-between items-center mb-xl">
                <div>
                    <h1 className="text-secondary mb-xs">Welcome Back, John</h1>
                    <p className="text-muted m-0">Here's your progress overview for this week.</p>
                </div>
                <Button
                    variant="primary"
                    icon={<Play fill="currentColor" size={18} />}
                    onClick={() => navigate('/exercise')}
                    className="shadow-md"
                >
                    Start New Session
                </Button>
            </div>

            <div className="stats-grid grid mb-xl">
                {stats.map((stat, index) => (
                    <Card key={index} className="stat-card border-none flex items-center gap-md">
                        <div className="stat-icon-wrapper bg-primary-light p-sm rounded-lg flex items-center justify-center">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-muted text-sm font-medium m-0 mb-xs">{stat.label}</p>
                            <h2 className="text-secondary m-0">{stat.value}</h2>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="dashboard-content grid grid-cols-3 gap-lg">
                <div className="col-span-2">
                    <Card title="Progress Overview" className="h-full border-none">
                        <div className="progress-chart-placeholder bg-background rounded-lg flex items-center justify-center text-muted">
                            {/* Dummy chart placeholder */}
                            <div className="text-center">
                                <TrendingUp size={48} className="mx-auto mb-sm opacity-50" />
                                <p>Improvement over last 30 days</p>
                                <div className="dummy-chart mt-md flex items-end gap-sm justify-center h-32 px-md">
                                    {[40, 55, 60, 45, 70, 85, 92].map((height, i) => (
                                        <div
                                            key={i}
                                            className="chart-bar bg-primary rounded-t-sm w-8 transition-all duration-500 hover:bg-primary-dark cursor-pointer"
                                            style={{ height: `${height}%` }}
                                            title={`${height}% accuracy`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="col-span-1">
                    <Card title="Recent Activity" className="h-full border-none">
                        <div className="activity-list flex flex-col gap-md">
                            {recentActivity.map(activity => (
                                <div key={activity.id} className="activity-item flex justify-between items-center p-sm hover:bg-background rounded-md transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div>
                                        <h4 className="text-sm font-semibold text-secondary m-0">{activity.name}</h4>
                                        <p className="text-xs text-muted m-0 mt-xs">{activity.date}</p>
                                    </div>
                                    <div className={`accuracy-badge text-xs font-medium px-sm py-xs rounded-full ${activity.accuracy >= 90 ? 'bg-success-light text-success' : 'bg-warning-light text-warning'
                                        }`}>
                                        {activity.accuracy}%
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" fullWidth className="mt-md text-sm">View All History</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
