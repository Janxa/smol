class DBError(Exception):
    """Error raised when there is a problem with the database"""

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class AliasAlreadyExistsError(Exception):
    """Raised when a custom alias is already taken and modification is not allowed."""
    def __init__(self, alias):
        self.alias = alias
        super().__init__(f"Alias '{alias}' is already taken.")

class MailTooLongError(Exception):
    """Raised when a mail exceed the maximum size"""
    def __init__(self, size_limit):
        self.size_limit = size_limit
        super().__init__(f"Mail is too long, max {size_limit}.")