# Project: smartobit_backend
# Author: Donis Abraham
# Date: 18-10-2024
# Description:  This file defines the data models and validation schemas used within the SmartObit Backend project.
#               The schemas, built with Pydantic, ensure the integrity and correctness of the data exchanged between different components of the backend, such as API requests, responses, and database entries.
#               These models serve as a contract that specifies the expected structure, types, and constraints of the data, improving consistency and reducing errors throughout the system.

"""
File: schema
Purpose:  The primary purpose of this schema file is to:

    Validate incoming data: Ensure that the data received by the backend services (e.g., via API calls) meets predefined criteria, including data types, formats, and constraints.
    Serialize and deserialize data: Convert between raw data formats (like JSON) and Python objects, facilitating smooth communication between the frontend, database, and other external services.
    Enforce data integrity: Prevent invalid data from being processed by catching potential errors early in the request lifecycle, enhancing the overall reliability of the system.
    Maintain clear documentation: By using Pydantic, the schema serves as a self-documenting source, clearly defining the data structure and validation rules for other developers or system components to understand.
"""

# Import statement for the Pydantic library's BaseModel class.
# This class is used to define data models and validation schemas in the project.
# It ensures the integrity and correctness of the data exchanged between different components of the backend, such as API requests, responses, and database entries.
# The schemas serve as a contract that specifies the expected structure, types, and constraints of the data, improving consistency and reducing errors throughout the system.

from pydantic import BaseModel

# Definition of the login_Data class, which is a data model for handling user login data.
# It inherits from the Pydantic library's BaseModel class and ensures the integrity and correctness of the data exchanged between different components of the backend, such as API requests, responses, and database entries.
# The class serves as a contract that specifies the expected structure, types, and constraints of the login data, improving consistency and reducing errors throughout the system.
class login_Data(BaseModel):
    username: str
    password: str


