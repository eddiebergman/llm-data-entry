import uuid
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException, status

from src.models import Chat, Message, Feedback
from src.schemas import ChatCreate, ChatUpdate, FeedbackCreate


def get_all_chats(db: Session, user_uuid: str):
    try:
        return db.query(Chat).filter(Chat.user_uuid == user_uuid).all()
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


def create_chat(db: Session, chat: ChatCreate):
    try:
        db_chat = Chat(
            user_uuid=chat.user_uuid,
            chat_uuid=chat.chat_uuid,
            title=chat.title,
            submission_type=chat.submission_type,
            created_at=chat.created_at if chat.created_at else datetime.utcnow(),
        )
        db.add(db_chat)
        db.flush()

        for msg in chat.messages:
            db_message = Message(
                chat_uuid=db_chat.chat_uuid, content=msg.content, role=msg.role
            )
            db.add(db_message)

        db.commit()
        db.refresh(db_chat)
        return db_chat
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


def update_chat(db: Session, chat: ChatUpdate):
    try:
        db_chat = (
            db.query(Chat)
            .filter(Chat.chat_uuid == chat.chat_uuid, Chat.user_uuid == chat.user_uuid)
            .first()
        )

        if not db_chat:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Chat not found"
            )

        db_chat.title = chat.title
        db_chat.submission_type = chat.submission_type

        db.query(Message).filter(Message.chat_uuid == chat.chat_uuid).delete()

        for msg in chat.messages:
            db_message = Message(
                chat_uuid=db_chat.chat_uuid, content=msg.content, role=msg.role
            )
            db.add(db_message)

        db.commit()
        db.refresh(db_chat)
        return db_chat
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


def delete_chat(db: Session, chat_uuid: uuid.UUID, user_uuid: str):
    try:
        db_chat = (
            db.query(Chat)
            .filter(Chat.chat_uuid == chat_uuid, Chat.user_uuid == user_uuid)
            .first()
        )
        if not db_chat:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Chat not found"
            )

        db.delete(db_chat)
        db.commit()
        return True
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


def create_feedback(db: Session, feedback: FeedbackCreate):
    try:
        db_feedback = Feedback(
            id=uuid.uuid4(), user_uuid=feedback.user_uuid, feedback=feedback.feedback
        )
        db.add(db_feedback)
        db.commit()
        db.refresh(db_feedback)
        return db_feedback
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
