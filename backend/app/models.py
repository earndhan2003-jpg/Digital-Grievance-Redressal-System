from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import declarative_base, relationship


Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    role = Column(String(20), nullable=False, default="user")
    password = Column(String(255), nullable=False)
    mobile = Column(String(20), nullable=True)

    complaints = relationship("Complaint", back_populates="user")


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String(40), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(20), nullable=False)
    priority = Column(String(20), nullable=False, default="medium")
    status = Column(String(20), nullable=False, default="pending")
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user_name = Column(String(120), nullable=False)
    is_anonymous = Column(Boolean, nullable=False, default=False)

    user = relationship("User", back_populates="complaints")
