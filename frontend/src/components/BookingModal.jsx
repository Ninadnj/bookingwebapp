import React, { useState } from 'react';
import { format } from 'date-fns';
// Removed unused HeadlessUI import
import { DatePicker } from './DatePicker';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export const BookingModal = ({ service, onClose, onConfirm }) => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });

    const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

    const handleNext = () => {
        if (step === 1 && selectedDate && selectedTime) setStep(2);
        else if (step === 2 && formData.name && formData.email) setStep(3);
    };

    const handleSubmit = () => {
        onConfirm({
            ...formData,
            service_id: service.id,
            booking_time: `${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}:00`
        });
    };

    if (!service) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-ethereal-dark/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-lg shadow-2xl overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="bg-ethereal-light p-6 border-b border-ethereal-taupe/30 flex justify-between items-center">
                    <div>
                        <h3 className="font-serif text-xl">{service.name}</h3>
                        <p className="text-xs text-ethereal-muted uppercase tracking-widest">{service.duration_minutes} MIN • {service.price}</p>
                    </div>
                    <button onClick={onClose} className="text-ethereal-muted hover:text-ethereal-dark transition-colors">&times;</button>
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-sm font-sans uppercase tracking-widest text-ethereal-muted">Select Date</p>
                                <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                            </div>

                            {selectedDate && (
                                <div className="space-y-4 animate-fade-in">
                                    <p className="text-sm font-sans uppercase tracking-widest text-ethereal-muted">Select Time</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-2 border font-sans text-sm transition-all duration-300
                          ${selectedTime === time
                                                        ? 'bg-ethereal-dark text-white border-ethereal-dark'
                                                        : 'border-ethereal-taupe text-ethereal-dark hover:border-ethereal-gold'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end pt-4">
                                <Button onClick={handleNext} disabled={!selectedDate || !selectedTime}>Next</Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <Input
                                id="name" label="Full Name" placeholder="Jane Doe"
                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                            <Input
                                id="email" label="Email" type="email" placeholder="jane@example.com"
                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                            <Input
                                id="phone" label="Phone" type="tel" placeholder="+1 234 567 890"
                                value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                            <Input
                                id="notes" label="Special Requests (Optional)" placeholder="Allergies, preferences..."
                                value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            />

                            <div className="flex justify-between pt-8">
                                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                <Button onClick={handleSubmit}>Request Booking</Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center space-y-6 py-8 animate-fade-in">
                            <div className="w-16 h-16 bg-ethereal-gold/10 text-ethereal-gold rounded-full flex items-center justify-center mx-auto text-2xl">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-serif text-2xl mb-2">Request Received</h3>
                                <p className="text-ethereal-muted text-sm px-8">
                                    Reviewing your request for {service.name} on <br />
                                    <span className="text-ethereal-dark font-semibold">
                                        {selectedDate && format(selectedDate, 'MMM d')} at {selectedTime}
                                    </span>.
                                </p>
                            </div>
                            <Button onClick={onClose} variant="secondary">Close</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
