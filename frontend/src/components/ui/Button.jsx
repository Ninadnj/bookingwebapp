import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "font-sans uppercase tracking-[0.2em] text-xs py-4 px-10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-ethereal-dark text-white hover:bg-ethereal-gold",
        secondary: "bg-transparent border border-ethereal-dark text-ethereal-dark hover:bg-ethereal-dark hover:text-white",
        ghost: "text-ethereal-muted hover:text-ethereal-dark"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
