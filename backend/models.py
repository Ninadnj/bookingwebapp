from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship, declarative_base
import datetime

Base = declarative_base()

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, nullable=True)
    duration_minutes = Column(Integer)
    price = Column(String) # Text to allow currency symbols e.g. "$150"
    is_active = Column(Boolean, default=True)

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String, index=True)
    client_email = Column(String, index=True)
    client_phone = Column(String)
    service_id = Column(Integer, ForeignKey("services.id"))
    booking_time = Column(DateTime)
    notes = Column(Text, nullable=True)
    status = Column(String, default="pending") # pending, accepted, rejected, cancelled
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    service = relationship("Service")
