import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, TrendingUp, Play } from 'lucide-react';
import Button from '../components/Button/Button';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <div className="container flex justify-between items-center py-md">
                    <div className="logo-container">
                        <Activity className="logo-icon text-primary" size={32} />
                        <h1 className="logo-text text-secondary m-0">Move To Heal</h1>
                    </div>
                    <div className="nav-actions flex gap-sm">
                        <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
                        <Button variant="primary" onClick={() => navigate('/login')}>Get Started</Button>
                    </div>
                </div>
            </nav>

            <header className="hero-section container text-center animate-fade-in mt-xl">
                <div className="hero-badge text-primary bg-primary-light inline-block px-sm py-xs rounded-full mb-md font-medium text-sm border border-primary-light">
                    Real-Time AI Physical Therapy
                </div>
                <h1 className="hero-title text-secondary mb-md">Perfect Your Form. <br /> Accelerate Your Healing.</h1>
                <p className="hero-subtitle text-muted max-w-2xl mx-auto mb-lg text-lg">
                    Advanced AI tracks your body posture in real-time to provide instant feedback, helping you perform physical therapy exercises correctly from the comfort of your home.
                </p>
                <div className="hero-cta flex justify-center gap-md">
                    <Button variant="primary" size="lg" icon={<Play size={20} />} onClick={() => navigate('/login')}>
                        Start Healing Now
                    </Button>
                </div>
            </header>

            <section className="features-section container mt-xxl mb-xxl">
                <h2 className="text-secondary text-center mb-xl">Why Move To Heal?</h2>

                <div className="features-grid">
                    <div className="feature-card text-center p-lg bg-surface rounded-xl shadow-sm border border-gray-100 hover-shadow transition-all">
                        <div className="feature-icon-wrapper bg-primary-light text-primary mx-auto mb-md flex items-center justify-center rounded-full">
                            <Activity size={32} />
                        </div>
                        <h3 className="feature-title text-secondary mb-sm">Real-Time Detection</h3>
                        <p className="feature-text text-muted">Instant posture analysis using your device's camera. No extra hardware required.</p>
                    </div>

                    <div className="feature-card text-center p-lg bg-surface rounded-xl shadow-sm border border-gray-100 hover-shadow transition-all">
                        <div className="feature-icon-wrapper bg-primary-light text-primary mx-auto mb-md flex items-center justify-center rounded-full">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="feature-title text-secondary mb-sm">Form Correction</h3>
                        <p className="feature-text text-muted">Get immediate feedback to correct your form and prevent secondary injuries.</p>
                    </div>

                    <div className="feature-card text-center p-lg bg-surface rounded-xl shadow-sm border border-gray-100 hover-shadow transition-all">
                        <div className="feature-icon-wrapper bg-primary-light text-primary mx-auto mb-md flex items-center justify-center rounded-full">
                            <TrendingUp size={32} />
                        </div>
                        <h3 className="feature-title text-secondary mb-sm">Progress Tracking</h3>
                        <p className="feature-text text-muted">Monitor your recovery journey with detailed analytics and historical data.</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Landing;
