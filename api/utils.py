from flask import request

def validate_request_data(required_fields):
    """Helper function to validate and parse JSON request data."""
    request_data = request.get_json()
    if not request_data:
        raise KeyError("Invalid or missing JSON in request")

    for field in required_fields:
        if field not in request_data:
            raise KeyError(f"Missing field: {field}")

    return request_data