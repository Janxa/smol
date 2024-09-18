from flask import request

def validate_request_data(required_fields: list[str]):
    """
        Validates and parses JSON request data.
        Args:
            required_fields (list[str]): A list of required fields in the request data.
        Returns:
            dict: The parsed request data.
        Raises:
            KeyError: If the request data is invalid or missing, or if a required field is missing.
    """

    request_data = request.get_json()
    if not request_data:
        raise KeyError("Invalid or missing JSON in request")

    for field in required_fields:
        if field not in request_data:
            raise KeyError(f"Missing field: {field}")

    return request_data