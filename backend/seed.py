from sqlalchemy.orm import Session
from . import crud, schemas, models
from .database import SessionLocal, engine

# Create tables
models.Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # Check if services exist
    if db.query(models.Service).first():
        print("Data already seeded.")
        return

    services = [
        schemas.ServiceCreate(
            name="The Signature Facial",
            description="Our world-renowned facial treatment using rare botanical extracts to rejuvenate and illuminate.",
            duration_minutes=60,
            price="$150",
            is_active=True
        ),
        schemas.ServiceCreate(
            name="Deep Tissue Therapy",
            description="Intensive muscle relief focusing on chronic tension. Includes hot stones.",
            duration_minutes=90,
            price="$180",
            is_active=True
        ),
        schemas.ServiceCreate(
            name="Executive Manicure",
            description="Precision nail care, exfoliation, and hand massage using our house-blend oils.",
            duration_minutes=45,
            price="$75",
            is_active=True
        ),
        schemas.ServiceCreate(
            name="Evening Glow Makeup",
            description="Professional application for red carpet events and special occasions.",
            duration_minutes=60,
            price="$120",
            is_active=True
        )
    ]

    for service in services:
        crud.create_service(db, service)
        print(f"Created service: {service.name}")

    db.close()

if __name__ == "__main__":
    seed_data()
