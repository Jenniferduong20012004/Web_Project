create database taskmanagement;
use taskmanagement;
CREATE TABLE User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name varchar (100) not null,
    email VARCHAR(100) UNIQUE NOT NULL,
	password varchar (100) not null   
);
CREATE TABLE WorkSpace (
    WorkSpace INT AUTO_INCREMENT PRIMARY KEY,
    workspacename varchar (100) not null,
    dateCreate date not null,
    description  varchar (500) not null
);
CREATE TABLE Task (
    TaskId INT AUTO_INCREMENT PRIMARY KEY,
    taskname varchar (100) not null,
    WorkSpace INT not null,
    priority int not null,
    dateBegin date not null,
    dateEnd date not null,
    StateCompletion int not null,
    description  varchar (500) not null.
    FOREIGN KEY (WorkSpace) REFERENCES WorkSpace(WorkSpace) ON DELETE CASCADE,
);
CREATE TABLE joinWorkSpace (
    joinWorkSpace INT AUTO_INCREMENT PRIMARY KEY,
    isPending bool not null,
    isManager bool not null,
	dateJoin date not null,
    userId INT not null,
    WorkSpace int not null,
    FOREIGN KEY (WorkSpace) REFERENCES WorkSpace(WorkSpace) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE
);
CREATE TABLE AssignTask (
    AssignId INT AUTO_INCREMENT PRIMARY KEY,
	joinWorkSpace INT not null,
    TaskId INT not null,
    FOREIGN KEY (joinWorkSpace) REFERENCES joinWorkSpace(joinWorkSpace) ON DELETE CASCADE,
    FOREIGN KEY (TaskId) REFERENCES Task(TaskId) ON DELETE CASCADE
);
CREATE TABLE SubTask (
	SubTakId INT AUTO_INCREMENT PRIMARY KEY,
	subtaskName varchar (100) not null,
    TaskId INT not null,
    status bool not null,
    FOREIGN KEY (TaskId) REFERENCES Task(TaskId) ON DELETE CASCADE
);

	