import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config'
import { ServiceCard } from '../components/ServiceCard'
import { BookingModal } from '../components/BookingModal'

export const ClientHome = () => {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedService, setSelectedService] = useState(null)

    useEffect(() => {
        console.log("Fetching services from:", `${API_BASE_URL}/api/v1/services`);
        fetch(`${API_BASE_URL}/api/v1/services`)
            .then(res => {
                console.log("Response status:", res.status);
                return res.json();
            })
            .then(data => {
                console.log("Data received:", data);
                setServices(data)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch services", err)
                setLoading(false)
            })
    }, [])

    const handleBook = (service) => {
        setSelectedService(service)
    }

    const handleCloseModal = () => {
        setSelectedService(null)
    }

    const handleConfirmBooking = (bookingData) => {
        fetch(`${API_BASE_URL}/api/v1/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        })
            .then(res => {
                if (!res.ok) throw new Error("Booking failed")
                return res.json()
            })
            .then(data => {
                console.log("Booking success:", data)
                // Success is handled in Modal Step 3
            })
            .catch(err => {
                console.error("Error submitting booking:", err)
                alert("Something went wrong. Please try again.")
            })
    }

    return (
        <div className="min-h-screen bg-ethereal-light selection:bg-ethereal-gold/20">
            {/* Hero Section */}
            <header className="py-20 px-4 text-center space-y-8 animate-fade-in">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-serif text-ethereal-dark tracking-tight">
                        Ethereal
                    </h1>
                    <p className="text-ethereal-muted font-sans text-xs md:text-sm tracking-[0.3em] uppercase">
                        Curated Beauty & Wellness
                    </p>
                </div>
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-ethereal-gold to-transparent mx-auto"></div>
            </header>

            {/* Services Grid */}
            <main className="max-w-6xl mx-auto px-4 pb-20">
                {loading ? (
                    <div className="text-center font-serif text-ethereal-muted animate-pulse">Loading experiences...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map(service => (
                            <ServiceCard key={service.id} service={service} onBook={handleBook} />
                        ))}
                    </div>
                )}
            </main>

            {/* Booking Modal */}
            {selectedService && (
                <BookingModal
                    service={selectedService}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmBooking}
                />
            )}

            {/* Footer */}
            <footer className="text-center py-10 border-t border-ethereal-taupe/20">
                <p className="font-serif italic text-ethereal-muted text-sm">
                    Created by The DNJ&trade; with &#129293; & &#9749; &bull; Paris
                </p>
            </footer>
        </div>
    )
}
