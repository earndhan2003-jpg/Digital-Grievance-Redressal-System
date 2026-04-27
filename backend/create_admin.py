#!/usr/bin/env python3

from app.db import SessionLocal
from app.models import User

def create_admin():
    db = SessionLocal()
    try:
        # Check if admin already exists
        existing = db.query(User).filter(User.email == "admin@gov.in").first()
        if existing:
            print("Admin user already exists!")
            return

        # Create admin user
        admin = User(
            name="Admin Officer",
            email="admin@gov.in",
            role="admin",
            password="admin123",  # Plain text - in real app, hash this!
            mobile="1234567890"
        )
        db.add(admin)
        db.commit()
        print("Admin user created successfully!")
        print("Email: admin@gov.in")
        print("Password: admin123")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()