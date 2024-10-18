# Project: smartobit_backend
# Author: Donis Abraham
# Date: 18-10-2024
# Description: Authentication and Authorization
"""
File: middleware/authentication
Purpose: This module handles all authentication-related functionalities. It accept username and password as input in json format
        {
            "username": "user",
            "password": "password"
        }
        Then create jwt token for authentication and authorise the user.
"""



from app.schemas.schema import login_Data
from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from app.services.authentication import Authentication
router = APIRouter()
auth_service = Authentication()


@router.post('/login_action')
async def login_action(data: login_Data):
    """
    This function handles the login action for the application. It validates the provided username and password against the database, and upon successful validation, it generates a JSON Web Token (JWT) for the user and updates the user's JWT token in the database. If the user's unit ID is not 1, it returns an appropriate error message. If the user's account is disabled, it also returns an appropriate error message. If the validation fails, it returns an error message prompting the user to try again or contact the administrator.

    Args:
        data (login_Data): A dictionary containing the username and password of the user attempting to log in.

    Returns:
        dict: A dictionary containing the generated JWT token, the username of the logged-in user, the user's first name, the user's last name, the user's unit code, and the user's bureau code.

    Raises:
        Exception: If an error occurs during the JWT generation process.
    """

    try:
        dict_data = jsonable_encoder(data)
        _username = dict_data['username']
        _password = dict_data['password']
        if _username and _password is None:
            raise HTTPException(status_code=400, detail="Username and password are required.")
        if _username and _password is not None:
            fetch_user = auth_service.authenticate_user(_username,_password)
            if fetch_user.status == "disabled":
                raise HTTPException(status_code=401, detail="Your account is disabled. Please contact your administrator.")
            if fetch_user.status == "authenticated":
                token = auth_service.create_jwt_token(_username)
                if fetch_user.unit_id!= 1:
                    raise HTTPException(status_code=401, detail="You are not authorized to access this unit.")
                return {
                    "token": token,
                    "username": fetch_user.u_username,
                    "firstname": fetch_user.u_firstname,
                    "lastname": fetch_user.u_lastname,
                    "unit_code": fetch_user.unit.unit_code,
                    "bureau_code": fetch_user.bureau.b_code
                }

    except Exception as e:
        return {"message": f"Invalid credentials! Try again or contact your Administrator {e}"}
