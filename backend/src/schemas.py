from pydantic import BaseModel, UUID4
from typing import List, Literal, Optional
from datetime import datetime


class Message(BaseModel):
    content: str
    role: Literal["user", "bot"]


class ChatBase(BaseModel):
    title: str
    messages: List[Message]
    submission_type: Literal["internal", "external"]


class ChatCreate(ChatBase):
    user_uuid: UUID4
    created_at: Optional[datetime] = None


class ChatUpdate(ChatBase):
    user_uuid: UUID4
    chat_uuid: UUID4


class ChatResponse(ChatBase):
    chat_uuid: UUID4
    created_at: datetime
    updated_at: datetime


class ChatDelete(BaseModel):
    user_uuid: UUID4
    chat_uuid: UUID4


class FeedbackCreate(BaseModel):
    user_uuid: UUID4
    feedback: str


class FeedbackResponse(FeedbackCreate):
    id: UUID4
    created_at: datetime
