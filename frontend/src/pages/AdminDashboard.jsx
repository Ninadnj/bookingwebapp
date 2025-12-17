import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config'
import { format, parseISO } from 'date-fns'
import { Button } from '../components/ui/Button'

export const AdminDashboard = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchBookings = () => {
        fetch(`${API_BASE_URL}/api/v1/admin/bookings`)
            .then(res => res.json())
            .then(data => {
                setBookings(data)
                setLoading(false)
            })
            .catch(err => console.error("Failed to fetch bookings", err))
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    const handleStatusUpdate = (id, status) => {
        fetch(`${API_BASE_URL}/api/v1/admin/bookings/${id}/status?status=${status}`, {
            method: 'PUT'
        })
            .then(res => {
                if (res.ok) fetchBookings()
            })
            .catch(err => console.error("Update failed", err))
    }

    return (
        <div className="min-h-screen bg-ethereal-light p-8">
            <header className="mb-12 flex justify-between items-center">
                <h1 className="text-3xl font-serif text-ethereal-dark">Admin Dashboard</h1>
                <Button variant="secondary" onClick={fetchBookings}>Refresh</Button>
            </header>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="bg-white border border-ethereal-taupe/30 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-ethereal-light border-b border-ethereal-taupe/30">
                            <tr>
                                <th className="p-4 font-sans text-xs uppercase tracking-wider text-ethereal-muted">Client</th>
                                <th className="p-4 font-sans text-xs uppercase tracking-wider text-ethereal-muted">Service</th>
                                <th className="p-4 font-sans text-xs uppercase tracking-wider text-ethereal-muted">Date & Time</th>
                                <th className="p-4 font-sans text-xs uppercase tracking-wider text-ethereal-muted">Status</th>
                                <th className="p-4 font-sans text-xs uppercase tracking-wider text-ethereal-muted">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ethereal-taupe/10">
                            {bookings.map(booking => (
                                <tr key={booking.id} className="hover:bg-ethereal-light/50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-serif font-medium">{booking.client_name}</div>
                                        <div className="text-xs text-ethereal-muted">{booking.client_email}</div>
                                    </td>
                                    <td className="p-4 font-serif">{booking.service?.name}</td>
                                    <td className="p-4 font-sans text-sm">
                                        {format(parseISO(booking.booking_time), 'MMM d, yyyy')}<br />
                                        {format(parseISO(booking.booking_time), 'HH:mm')}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs uppercase tracking-wider border 
                      ${booking.status === 'accepted' ? 'border-green-200 text-green-700 bg-green-50' :
                                                booking.status === 'rejected' ? 'border-red-200 text-red-700 bg-red-50' :
                                                    'border-yellow-200 text-yellow-700 bg-yellow-50'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4 space-x-2">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleStatusUpdate(booking.id, 'accepted')} className="text-xs font-sans uppercase hover:text-green-600 transition-colors">Accept</button>
                                                <span className="text-ethereal-taupe">|</span>
                                                <button onClick={() => handleStatusUpdate(booking.id, 'rejected')} className="text-xs font-sans uppercase hover:text-red-600 transition-colors">Reject</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {bookings.length === 0 && (
                        <div className="p-8 text-center text-ethereal-muted">No booking requests found.</div>
                    )}
                </div>
            )}
        </div>
    )
}
