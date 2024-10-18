# Project: smartobit_backend
# Author: Donis Abraham
# Date: 18-10-2024
# Description: Authentication and Authorization
"""
File: services/authentication
Purpose: This module handles all authentication-related functionalities. It accept username and password as input in json format
        {
            "username": "user",
            "password": "password"
        }
        Then create jwt token for authentication and authorise the user.
"""
from datetime import datetime, timedelta
from typing import Any
from sqlalchemy.orm import Session
from app.models.auth_models import User  # Import the User model
from app.config.db import get_db  # Import your database session generator
from fastapi import HTTPException, status, FastAPI
import jwt




class Authentication:
    def __init__(self):
        self.db: Session = next(get_db())
        self.SECRET_KEY = "DAK"
        self.ALGORITHM = "HS256"
        self.ACCESS_TOKEN_EXPIRE_MINUTES = 30

    def authenticate_user(self, username: str, password: str) -> str | Any:
        """
        Authenticate a user by their username and password.

        Args:
            username (str): The username of the user.
            password (str): The password of the user.

        Returns:
            User: The authenticated User object if authentication is successful.

        Raises:
            HTTPException: If authentication fails.
        """
        user = self.db.query(User).filter(User.u_username == username).first()

        if not user:
            return "not authenticated"
        if user.u_password != password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        return user

    def create_jwt_token(self, username):
        """
        Generates a JSON Web Token (JWT) for the provided data.

        Args:
            data (dict): A dictionary containing the data to be included in the JWT.

        Returns:
            str: A string representing the generated JWT.

        Raises:
            Exception: If an error occurs while generating the JWT.

        This function uses the `jwt` library to create a JWT with a specified expiration time. The expiration time is calculated based on the `ACCESS_TOKEN_EXPIRE_MINUTES` constant. The generated JWT is then returned as a string.

        The function first creates a copy of the input data. It then updates the copy with an "exp" key containing the expiration time. Finally, it uses the `jwt.encode` function to generate the JWT from the updated data, using the `SECRET_KEY` and `ALGORITHM` constants as the signing key and algorithm, respectively.

        If an error occurs during the JWT generation process, the function raises an `Exception`.
        :param username:
        """
        expires = datetime.utcnow() + timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode = username
        to_encode.update({"exp": expires})
        encoded_jwt = jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
        return encoded_jwt