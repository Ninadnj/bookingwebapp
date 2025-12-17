from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/v1/admin", tags=["admin"])

@router.get("/bookings", response_model=List[schemas.Booking])
def read_bookings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bookings = crud.get_bookings(db, skip=skip, limit=limit)
    return bookings

@router.put("/bookings/{booking_id}/status", response_model=schemas.Booking)
def update_booking_status(booking_id: int, status: str, db: Session = Depends(get_db)):
    valid_statuses = ["pending", "accepted", "rejected", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    booking = crud.update_booking_status(db, booking_id=booking_id, status=status)
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    try:
        from .. import integration
        integration.notify_client_status_change(booking, status)
        if status == "accepted":
            integration.sync_to_google_calendar(booking)
    except Exception as e:
        print(f"Integration failed: {e}")
        
    return booking
