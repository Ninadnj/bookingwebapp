def notify_owner_new_booking(booking):
    # Retrieve owner email from settings or env
    owner_email = "owner@ethereal.com"
    print(f"[EMAIL] To: {owner_email}")
    print(f"Subject: New Booking Request: {booking.service_id}")
    print(f"Client: {booking.client_name} requests {booking.booking_time}\n")

def notify_client_status_change(booking, status):
    print(f"[SMS/EMAIL] To: {booking.client_email}")
    print(f"Subject: Booking Update - {status.title()}")
    print(f"Dear {booking.client_name}, your appointment status is now: {status}.\n")

def sync_to_google_calendar(booking):
    if booking.status == "accepted":
        print(f"[GCAL] Creating event: {booking.service_id} for {booking.client_name} at {booking.booking_time}")
        # Here we would use google-auth and google-api-python-client
    elif booking.status == "cancelled":
        print(f"[GCAL] Removing event for booking {booking.id}")
