
from datetime import UTC, datetime
import secrets

from flask import current_app
from api.errors import DBError
from api.extensions import db



def generate_alias(custom_alias: str, collection, allow_modification: bool, domain_name: str) -> str:
    """
    Generates a short alias for a custom alias.

    Args:
        custom_alias (str): Custom alias given by the user.
        collection (pymongo.collection.Collection): Collection to check for duplicate aliases.
        allow_modification (bool): Whether to modify the alias to make it unique.
        domain_name (str): Domain name to prepend to the short alias.

    Returns:
        str: A unique short alias.

    Raises:
        RuntimeError: If a unique alias cannot be generated after 10 attempts.
        DBError: If there is an error while accessing the database.
        NameError: If the custom alias is already in use and modification is not allowed.
    """
    for _ in range(10):
        if not custom_alias:
            short_alias = secrets.token_urlsafe(7)
        elif allow_modification:
            short_alias = f"{custom_alias}/{secrets.token_urlsafe(7)}"
        else:
            short_alias = custom_alias

        try:
            alias_exists = collection.find_one({"short": f"{domain_name}/{short_alias}"})
        except Exception as e:
            raise DBError(f"Error while trying to access the database: {e}")

        if alias_exists is None:
            return short_alias
        elif custom_alias and  not allow_modification:
            raise NameError(f"Alias '{short_alias}' is already taken.")

    raise RuntimeError("Unable to generate a unique alias after multiple attempts.")


def generate_url(long_url: str, custom_alias: str, allow_modification: bool) -> dict:
    """
    Generate a short URL for a long URL. If the custom alias is empty,
    generate a random one. If the custom alias is not empty, use it.
    If the custom alias is already in use and modification is not allowed,
    raise a NameError.

    Args:
        long_url (str): Long URL to be shortened.
        custom_alias (str): Custom alias given by the user.
        allow_modification (bool): Whether to modify the alias to make it unique.
        timestamp (int): Timestamp of the creation of the URL.

    Returns:
        dict: Dictionary containing the short and long URLs.

    Raises:
        DBError: If there is an error while accessing the database.
    """
    collection = db["shortner"]
    domain_name = current_app.config["DOMAIN_NAME"]

    short_alias = generate_alias(custom_alias, collection, allow_modification, domain_name)

    short_url = f"{current_app.config['DOMAIN_NAME']}/{short_alias}"

    try:
        collection.insert_one({"short": short_url, "long": long_url, "time": datetime.now(UTC)})
    except Exception as e:
        raise DBError(f"Error while trying to access the database: {e}")

    return {"short": short_url, "long": long_url}



def delete_url(short):
    url_collection = db['shortner']
    try:
        url = url_collection.find_one_and_delete({"short": short})
        return url is not None
    except Exception as error:
        raise DBError(f"Error while trying to access the database: {error}") from error

