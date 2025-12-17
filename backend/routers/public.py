from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/v1", tags=["public"])

@router.get("/services", response_model=List[schemas.Service])
def read_services(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    services = crud.get_services(db, skip=skip, limit=limit)
    return services

@router.post("/bookings", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    # In a real app, validation of availability would happen here
    new_booking = crud.create_booking(db=db, booking=booking)
    try:
        # Import inside function to avoid circular imports if any, simple stub here
        from .. import integration
        integration.notify_owner_new_booking(new_booking)
    except Exception as e:
        print(f"Notification failed: {e}")
    return new_booking
