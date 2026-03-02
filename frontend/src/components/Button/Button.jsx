import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    icon = null
}) => {
    const baseClasses = 'btn';
    const variantClasses = `btn-${variant}`;
    const sizeClasses = `btn-${size}`;
    const widthClass = fullWidth ? 'btn-full' : '';

    return (
        <button
            type={type}
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
