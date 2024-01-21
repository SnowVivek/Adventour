CREATE DATABASE USERS;

USE USERS;

CREATE TABLE User_Info (
    UserID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PasswordHash VARCHAR(255),
    RegistrationDate DATE
);