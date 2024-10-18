# Project: smartobit_backend
# Author: Donis Abraham
# Date: 18-10-2024
# Description:  This code defines the database schema for the smartobit_backend application. It includes classes for User, Unit, Bureau, and Role, which are mapped to their respective tables in the database. The User class has relationships with the other three classes, which are represented by the back_populates attribute in the relationship function.
"""
File: auth_models
Purpose: This module defines the structure of the database tables and their relationships for the smartobit_backend application.
This will be used to create and manage the database schema for the application.
"""

from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.config.db import Base


class User(Base):
    """
    Represents the User table in the database schema for the smartobit_backend application.

    Attributes:
        __tablename__ (str): The name of the table in the database.
        id (Column): The primary key for each user.
        u_username (Column): The username, unique for each user.
        u_password (Column): The user's password.
        u_firstname (Column): The user's first name.
        u_lastname (Column): The user's last name.
        u_unit (Column): Foreign key referencing the unit_id in the Unit table.
        u_bureau (Column): Foreign key referencing the b_id in the Bureau table.
        u_role (Column): Foreign key referencing the id in the Role table.
        status (Column): User's status, default is True.
        jwt_token (Column): User's JWT token.

    Relationships:
        unit (relationship): Relationship to Unit table.
        bureau (relationship): Relationship to Bureau table.
        role (relationship): Relationship to Role table.
    """
    __tablename__ = "tbl_users"

    id = Column(Integer, primary_key=True, index=True)
    u_username = Column(String(255), unique=True, index=True, nullable=False)
    u_password = Column(String(255), nullable=False)
    u_firstname = Column(String(255), nullable=False)
    u_lastname = Column(String(255), nullable=False)
    u_unit = Column(Integer, ForeignKey("tbl_units.unit_id"), nullable=False)
    u_bureau = Column(Integer, ForeignKey("tbl_bureaus.b_id"), nullable=False)
    u_role = Column(Integer, ForeignKey("tbl_roles.id"), nullable=False)
    status = Column(Boolean, default=True)
    jwt_token = Column(String(255))

    unit = relationship("Unit", back_populates="users")
    bureau = relationship("Bureau", back_populates="users")
    role = relationship("Role", back_populates="users")


class Unit(Base):
    """
    Represents the Unit table in the database schema for the smartobit_backend application.

    Attributes:
        __tablename__ (str): The name of the table in the database.
        unit_id (Column): The primary key for each unit.
        unit_code (Column): The code for the unit.

    Relationships:
        users (relationship): Relationship to User table.
    """
    __tablename__ = "tbl_units"

    unit_id = Column(Integer, primary_key=True, index=True)
    unit_code = Column(String(255), nullable=False)
    users = relationship("User", back_populates="unit")


class Bureau(Base):
    """
    Represents the Bureau table in the database schema for the smartobit_backend application.

    Attributes:
        __tablename__ (str): The name of the table in the database.
        b_id (Column): The primary key for each bureau.
        b_code (Column): The code for the bureau.

    Relationships:
        users (relationship): Relationship to User table.
    """
    __tablename__ = "tbl_bureaus"

    b_id = Column(Integer, primary_key=True, index=True)
    b_code = Column(String(255), nullable=False)
    users = relationship("User", back_populates="bureau")


class Role(Base):
    """
    Represents the Role table in the database schema for the smartobit_backend application.

    Attributes:
        __tablename__ (str): The name of the table in the database.
        id (Column): The primary key for each role.
        g_name (Column): The name of the role.

    Relationships:
        users (relationship): Relationship to User table.
    """
    __tablename__ = "tbl_roles"

    id = Column(Integer, primary_key=True, index=True)
    g_name = Column(String(255), nullable=False)
    users = relationship("User", back_populates="role")
