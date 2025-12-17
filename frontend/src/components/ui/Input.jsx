import React from 'react';

export const Input = ({ label, id, type = "text", ...props }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label htmlFor={id} className="text-xs uppercase tracking-widest text-ethereal-muted font-sans">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className="border-b border-ethereal-taupe bg-transparent py-2 text-ethereal-dark font-serif text-lg focus:outline-none focus:border-ethereal-gold transition-colors duration-300 placeholder-ethereal-muted/30"
                {...props}
            />
        </div>
    );
};
