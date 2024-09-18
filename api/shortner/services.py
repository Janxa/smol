
import secrets

from flask import current_app
from api.db import find_url, insert_url
from api.errors import AliasAlreadyExistsError


def generate_alias(custom_alias: str, allow_modification: bool, domain_name: str) -> str:
    """
    Generates a short alias for a custom alias.

    Args:
        custom_alias (str): Custom alias given by the user.
        allow_modification (bool): Whether to modify the alias to make it unique.
        domain_name (str): Domain name to prepend to the short alias.

    Returns:
        str: A unique short alias.

    Raises:
        RuntimeError: If a unique alias cannot be generated after 10 attempts.
        AliasAlreadyExistsError: If the custom alias is already in use and modification is not allowed.
    """
    for _ in range(10):
        if not custom_alias:
            short_alias = secrets.token_urlsafe(7)
        elif allow_modification:
            short_alias = f"{custom_alias}/{secrets.token_urlsafe(7)}"
        else:
            short_alias = custom_alias

        alias_exists = find_url(f"{domain_name}/{short_alias}")

        if not alias_exists:
            return short_alias
        elif custom_alias and not allow_modification:
            raise AliasAlreadyExistsError(f"Alias '{short_alias}' is already taken.")

    raise RuntimeError("Unable to generate a unique alias after multiple attempts.")


def generate_url(long_url: str, custom_alias: str, allow_modification: bool) -> dict:
    """
    Generates a shortened URL from a given long URL and custom alias.
    Args:
        long_url (str): The original long URL to be shortened.
        custom_alias (str): A custom alias for the shortened URL.
        allow_modification (bool): Whether to allow modification of the custom alias.
    Returns:
        dict: A dictionary containing the shortened URL and the original long URL.
    """
    domain_name = current_app.config["DOMAIN_NAME"]
    short_alias = generate_alias(custom_alias, allow_modification, domain_name)
    short_url = f"{domain_name}/{short_alias}"
    insert_url(short = short_url, long = long_url)

    return {"short": short_url, "long": long_url}

