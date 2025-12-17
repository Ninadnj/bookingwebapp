from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Service Schemas
class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    duration_minutes: int
    price: str
    is_active: bool = True

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    
    class Config:
        orm_mode = True

# Booking Schemas
class BookingBase(BaseModel):
    client_name: str
    client_email: str
    client_phone: str
    notes: Optional[str] = None
    service_id: int
    booking_time: datetime

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    status: str
    created_at: datetime
    service: Service

    class Config:
        orm_mode = True
