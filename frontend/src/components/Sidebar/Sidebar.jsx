import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, LineChart, LogOut, Settings, User } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const navItems = [
        { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/exercise', name: 'Exercise', icon: <Activity size={20} /> },
        { path: '/progress', name: 'Progress', icon: <LineChart size={20} /> },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-container">
                    <Activity className="logo-icon" size={28} />
                    <h2 className="logo-text">Move To Heal</h2>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li key={item.path} className="nav-item">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-text">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link">
                            <span className="nav-icon"><User size={20} /></span>
                            <span className="nav-text">Profile</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/settings" className="nav-link">
                            <span className="nav-icon"><Settings size={20} /></span>
                            <span className="nav-text">Settings</span>
                        </NavLink>
                    </li>
                    <li className="nav-item logout-item">
                        <NavLink to="/login" className="nav-link logout-link">
                            <span className="nav-icon"><LogOut size={20} /></span>
                            <span className="nav-text">Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
