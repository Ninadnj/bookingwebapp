import React from 'react';
import { format, addDays, isSameDay } from 'date-fns';

export const DatePicker = ({ selectedDate, onSelectDate }) => {
    const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

    return (
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-4">
                {dates.map((date) => {
                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                    return (
                        <button
                            key={date.toString()}
                            onClick={() => onSelectDate(date)}
                            className={`
                flex flex-col items-center justify-center min-w-[4rem] h-20 border transition-all duration-300
                ${isSelected
                                    ? 'border-ethereal-gold bg-ethereal-gold text-white shadow-md'
                                    : 'border-ethereal-taupe/50 text-ethereal-muted hover:border-ethereal-gold hover:text-ethereal-dark'
                                }
              `}
                        >
                            <span className="text-xs uppercase tracking-wider font-sans mb-1">
                                {format(date, 'EEE')}
                            </span>
                            <span className="text-xl font-serif">
                                {format(date, 'd')}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
