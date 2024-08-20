class DBError(Exception):
    """Error raised when there is a problem with the database"""

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
