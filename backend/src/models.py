from sqlalchemy import Column, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum

from src.database import Base


class SubmissionType(enum.Enum):
    internal = "internal"
    external = "external"


class MessageRole(enum.Enum):
    user = "user"
    bot = "bot"


class Chat(Base):
    __tablename__ = "chats"

    chat_uuid = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_uuid = Column(UUID(as_uuid=True), index=True)
    title = Column(String)
    submission_type = Column(Enum(SubmissionType), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    messages = relationship("Message", back_populates="chat", cascade="all, delete-orphan")


class Message(Base):
    __tablename__ = "messages"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chat_uuid = Column(UUID(as_uuid=True), ForeignKey("chats.chat_uuid"))
    content = Column(Text)
    role = Column(Enum(MessageRole), nullable=False)

    chat = relationship("Chat", back_populates="messages")


class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_uuid = Column(UUID(as_uuid=True), index=True)
    feedback = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
