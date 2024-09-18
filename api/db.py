from datetime import UTC, datetime
from api.errors import DBError
from api.extensions.db import database

url_collection = database['shortner']

def delete_url(short: str):
    """
    Delete the document with the given short URL.

    Args:
        short (str): The short URL to delete.

    Returns:
        bool: Whether the document was deleted.

    Raises:
        DBError: If there is an error while accessing the database.
    """
    try:
        url = url_collection.find_one_and_delete({"short": short})
        return url is not None
    except Exception as error:
        raise DBError(f"Error while trying to access the database: {error}") from error

def insert_url(short: str, long: str):
    """
    Insert a new document with the given short and long URLs.

    Args:
        short (str): The short URL.
        long (str): The long URL.

    Raises:
        DBError: If there is an error while accessing the database.
    """
    try:
        url_collection.insert_one({"short": short, "long": long, "time": datetime.now(UTC)})
    except Exception as error:
        raise DBError(f"Error while trying to access the database: {error}") from error

def find_url(short: str):
    """
    Find the document with the given short URL.

    Args:
        short (str): The short URL to find.

    Returns:
        dict: The document found, or None if no document was found.

    Raises:
        DBError: If there is an error while accessing the database.
    """
    try:
        return url_collection.find_one({"short": short})
    except Exception as error:
        raise DBError(f"Error while trying to access the database: {error}") from error
