import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock } from 'lucide-react';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dummy authentication
        navigate('/dashboard');
    };

    return (
        <div className="auth-page flex justify-center items-center">
            <div className="auth-container animate-fade-in">
                <div className="text-center mb-lg">
                    <div className="logo-container justify-center mb-sm cursor-pointer" onClick={() => navigate('/')}>
                        <Activity className="text-primary" size={36} />
                    </div>
                    <h2 className="text-secondary">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
                    <p className="text-muted text-sm mt-xs">
                        {isLogin ? 'Login to continue your healing journey' : 'Sign up to start your real-time physical therapy'}
                    </p>
                </div>

                <Card className="auth-card border-none shadow-floating">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-md">

                        {!isLogin && (
                            <div className="form-group">
                                <label className="form-label text-sm text-secondary font-medium">Full Name</label>
                                <div className="input-wrapper">
                                    <input type="text" className="form-input" placeholder="John Doe" required />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label text-sm text-secondary font-medium">Email Address</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon text-muted" size={18} />
                                <input type="email" className="form-input with-icon" placeholder="you@example.com" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label text-sm text-secondary font-medium flex justify-between">
                                Password
                                {isLogin && <a href="#" className="text-primary text-xs font-normal hover-underline">Forgot?</a>}
                            </label>
                            <div className="input-wrapper">
                                <Lock className="input-icon text-muted" size={18} />
                                <input type="password" className="form-input with-icon" placeholder="••••••••" required />
                            </div>
                        </div>

                        <Button type="submit" variant="primary" fullWidth className="mt-sm py-md font-semibold text-md">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </form>
                </Card>

                <p className="text-center text-sm text-muted mt-md">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        className="text-primary font-medium border-none bg-transparent cursor-pointer hover-underline p-0"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
