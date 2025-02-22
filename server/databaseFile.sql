create database taskmanagement;
use taskmanagement;
CREATE TABLE User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name varchar (100) not null,
    email VARCHAR(100) UNIQUE NOT NULL,
	password varchar (100) not null   
);
CREATE TABLE joinWorkSpave (
    joinWorkSpace INT AUTO_INCREMENT PRIMARY KEY,
    isPending bool not null,
    isManager bool not null,
	dateJoin date not null   
);
CREATE TABLE WorkSpace (
    WorkSpace INT AUTO_INCREMENT PRIMARY KEY,
    workspacename varchar (100) not null,
    dateCreate date not null      
);
CREATE TABLE AssignTask (
    AssignId INT AUTO_INCREMENT PRIMARY KEY,
    dateAssign date not null      
);
