# Project: smartobit_backend
# Author: Donis Abraham
# Date: 18-10-2024
# Description: This file is a router and main entry to microservices

"""
File: /main.py
Purpose: To manage full microservices this is main entry to microservices
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from app.middlewares.authentication import router as auth_router

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the FastAPI app
app = FastAPI()

# Configure CORS
origins = ["*"]  # Consider restricting this in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router, prefix="/api", tags=["User Authentication"])

# Application startup and shutdown event handlers
@app.on_event("startup")
async def startup_event():
    logger.info("Application starting up...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutting down...")
