import os
import uuid
from loguru import logger
from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Request, status
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import PlainTextResponse
from sqlalchemy.orm import Session
from typing import List

from src.database import get_db, Base, engine
from src.schemas import (
    ChatCreate,
    ChatUpdate,
    ChatResponse,
    ChatDelete,
    FeedbackCreate,
    FeedbackResponse,
)
from src import services
from src.config import Settings, setup_logging

Base.metadata.create_all(bind=engine)
setup_logging()

app = FastAPI(
    title="API for storing conversation examples for training AI models",
    version="1.0",
    root_path="/api/v1",
)

allow_origins = [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:80",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response: {response.status_code}")
    return response


@app.get(
    "/healthcheck", status_code=status.HTTP_200_OK, response_class=PlainTextResponse
)
def healthcheck() -> PlainTextResponse:
    return PlainTextResponse(content="OK")


@app.get("/chat/all/{user_uuid}", response_model=List[ChatResponse])
def get_all_chats(user_uuid: str, db: Session = Depends(get_db)):
    return services.get_all_chats(db, user_uuid)


@app.post("/chat/new", response_model=ChatResponse)
def create_chat(chat: ChatCreate, db: Session = Depends(get_db)):
    return services.create_chat(db, chat)


@app.put("/chat/update")
def update_chat(chat: ChatUpdate, db: Session = Depends(get_db)) -> ChatResponse:
    return services.update_chat(db, chat)


@app.delete("/chat/delete", status_code=status.HTTP_204_NO_CONTENT)
def delete_chat(chat: ChatDelete, db: Session = Depends(get_db)):
    services.delete_chat(db, chat.chat_uuid, chat.user_uuid)
    return {"ok": True}


@app.post("/feedback", response_model=FeedbackResponse)
async def create_feedback(
    feedback: FeedbackCreate = Depends(),
    screenshot: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    db_feedback = services.create_feedback(db, feedback)

    if screenshot:  # Only process the screenshot if it's provided
        file_extension = os.path.splitext(screenshot.filename)[1]
        file_name = f"{uuid.uuid4()}-{db_feedback.id}-{file_extension}"
        file_path = os.path.join(Settings.FILE_STORAGE_PATH, file_name)

        try:
            with open(file_path, "wb") as buffer:
                content = await screenshot.read()
                buffer.write(content)
        except IOError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save screenshot",
            )

    return db_feedback
