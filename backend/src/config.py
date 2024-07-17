import os
import sys
from dataclasses import dataclass
from dotenv import load_dotenv
from loguru import logger

# Load environment variables from .env file
load_dotenv()


@dataclass
class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    FILE_STORAGE_PATH: str = os.getenv("FILE_STORAGE_PATH")


def setup_logging():
    logger.configure(
        handlers=[
            {
                "sink": sys.stdout,
                "level": os.getenv("LOG_LEVEL", "INFO"),
            },
            {
                "sink": os.getenv("LOG_FILE", "logs/app.log"),
                "rotation": os.getenv("LOG_FILE_ROTATION", "5 MB"),
                "retention": "10 days",
                "level": os.getenv("LOG_LEVEL", "INFO"),
                "compression": "zip",
                "serialize": True,
                "format": "{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}"
            }
        ]
    )
