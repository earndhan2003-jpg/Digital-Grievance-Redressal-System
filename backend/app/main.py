import logging

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from .db import engine, get_db
from .models import Base, Complaint, User
from .schemas import (
    AuthResponse,
    ComplaintResponse,
    CreateComplaintRequest,
    LoginRequest,
    RegisterUserRequest,
    UserResponse,
)

app = FastAPI(title="Grievance Portal API", version="0.1.0")
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    try:
        Base.metadata.create_all(bind=engine)
    except SQLAlchemyError as exc:
        logger.warning("SQL database unavailable at startup: %s", exc)


def as_user_response(user: User) -> UserResponse:
    return UserResponse(id=str(user.id), name=user.name, email=user.email, role=user.role)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/auth/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    user = (
        db.query(User)
        .filter(func.lower(User.email) == payload.email.lower(), User.password == payload.password)
        .first()
    )
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return AuthResponse(ok=True, message="Login successful", user=as_user_response(user))


@app.post("/auth/admin/login", response_model=AuthResponse)
def admin_login(payload: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    user = (
        db.query(User)
        .filter(
            func.lower(User.email) == payload.email.lower(),
            User.password == payload.password,
            User.role == "admin",
        )
        .first()
    )
    if not user:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    return AuthResponse(ok=True, message="Admin login successful", user=as_user_response(user))


@app.post("/auth/register", response_model=AuthResponse)
def register_user(payload: RegisterUserRequest, db: Session = Depends(get_db)) -> AuthResponse:
    existing = db.query(User).filter(func.lower(User.email) == payload.email.lower()).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already exists")

    user = User(
        name=payload.name,
        email=payload.email,
        role="user",
        password=payload.password,
        mobile=payload.mobile,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return AuthResponse(ok=True, message="User registered", user=as_user_response(user))


@app.get("/users", response_model=list[UserResponse])
def list_users(db: Session = Depends(get_db)) -> list[UserResponse]:
    all_users = db.query(User).order_by(User.id.asc()).all()
    return [as_user_response(user) for user in all_users]


@app.get("/complaints", response_model=list[ComplaintResponse])
def list_complaints(db: Session = Depends(get_db)) -> list[ComplaintResponse]:
    rows = db.query(Complaint).order_by(Complaint.id.desc()).all()
    return [
        ComplaintResponse(
            id=str(row.id),
            ticket_id=row.ticket_id,
            title=row.title,
            description=row.description,
            category=row.category,
            priority=row.priority,
            status=row.status,
            user_id=str(row.user_id),
            user_name=row.user_name,
            is_anonymous=row.is_anonymous,
        )
        for row in rows
    ]


@app.post("/complaints", response_model=ComplaintResponse)
def create_complaint(
    payload: CreateComplaintRequest, db: Session = Depends(get_db)
) -> ComplaintResponse:
    citizen = None
    if payload.user_email:
        citizen = (
            db.query(User)
            .filter(func.lower(User.email) == payload.user_email.lower(), User.role == "user")
            .first()
        )
    if not citizen:
        citizen = db.query(User).filter(User.role == "user").order_by(User.id.asc()).first()
    if not citizen:
        raise HTTPException(status_code=400, detail="No citizen user found")

    last_id = db.query(func.count(Complaint.id)).scalar() or 0
    ticket_id = f"GRV-2026-{str(last_id + 1).zfill(4)}"
    complaint = Complaint(
        ticket_id=ticket_id,
        title=payload.title,
        description=payload.description,
        category=payload.category,
        priority=payload.priority,
        status="pending",
        user_id=int(citizen.id),
        user_name="Anonymous" if payload.is_anonymous else citizen.name,
        is_anonymous=payload.is_anonymous,
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    return ComplaintResponse(
        id=str(complaint.id),
        ticket_id=complaint.ticket_id,
        title=complaint.title,
        description=complaint.description,
        category=complaint.category,
        priority=complaint.priority,
        status=complaint.status,
        user_id=str(complaint.user_id),
        user_name=complaint.user_name,
        is_anonymous=complaint.is_anonymous,
    )
