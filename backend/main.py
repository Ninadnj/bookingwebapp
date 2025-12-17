from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine

models.Base.metadata.create_all(bind=engine)

from .routers import public, admin

app = FastAPI(
    title="Ethereal Booking API",
    description="Luxury appointment booking API",
    version="0.1.0"
)

app.include_router(public.router)
app.include_router(admin.router)

# CORS Setup
origins = [
    "http://localhost:5173", # Vite default
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Ethereal. The luxury booking experience."}
