from pydantic import BaseModel, EmailStr
from typing import Literal


Category = Literal["complaint", "query", "support"]
Priority = Literal["low", "medium", "high"]
Status = Literal["pending", "in-progress", "resolved"]


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterUserRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    mobile: str | None = None


class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str


class AuthResponse(BaseModel):
    ok: bool
    message: str
    user: UserResponse | None = None


class CreateComplaintRequest(BaseModel):
    title: str
    description: str
    category: Category
    priority: Priority = "medium"
    is_anonymous: bool = False
    user_email: EmailStr | None = None


class ComplaintResponse(BaseModel):
    id: str
    ticket_id: str
    title: str
    description: str
    category: Category
    priority: Priority
    status: Status
    user_id: str
    user_name: str
    is_anonymous: bool
