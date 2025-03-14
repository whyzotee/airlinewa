import logging
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any

from dateutil import parser

# from app.core import security
# from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def is_valid_date(date: str):
    if not date:
        return False
    try:
        parser.parse(date)
        return True
    except parser.ParserError:
        return False
