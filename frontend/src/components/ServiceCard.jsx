import React from 'react';
import { Button } from './ui/Button';

export const ServiceCard = ({ service, onBook }) => {
    return (
        <div className="group relative p-8 bg-white border border-ethereal-taupe/30 hover:border-ethereal-gold/50 transition-all duration-500 hover:shadow-lg flex flex-col items-center text-center space-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-0 bg-ethereal-gold group-hover:h-8 transition-all duration-500"></div>

            <h3 className="font-serif text-xl md:text-2xl text-ethereal-dark">{service.name}</h3>
            <div className="flex items-center gap-4 text-xs font-sans text-ethereal-muted uppercase tracking-widest">
                <span>{service.duration_minutes} MIN</span>
                <span className="w-1 h-1 bg-ethereal-gold rounded-full"></span>
                <span>{service.price}</span>
            </div>
            <p className="font-serif text-ethereal-dark/70 italic text-sm max-w-xs">
                {service.description}
            </p>

            <div className="pt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <Button variant="secondary" onClick={() => onBook(service)}>
                    Select
                </Button>
            </div>
        </div>
    );
};
