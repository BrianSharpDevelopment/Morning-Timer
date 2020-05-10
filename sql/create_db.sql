USE morning_timer;

CREATE TABLE User (
	user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(125) NOT NULL,
    email VARCHAR(125) NOT NULL,
    password_hash VARCHAR(125) NOT NULL,
    password_salt VARCHAR(125) NOT NULL,
    date_created DATE NOT NULL,
    date_updated DATE NOT NULL,
    date_deleted DATE,
    PRIMARY KEY(user_id)
);

CREATE TABLE Routine (
	routine_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
	routine_date DATE NOT NULL,
    date_created DATE NOT NULL,
    date_updated DATE NOT NULL,
    date_deleted DATE,
    PRIMARY KEY(routine_id)
);

CREATE TABLE Task (
	task_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    routine_id INT NOT NULL,
	date_created DATE NOT NULL,
    date_updated DATE NOT NULL,
    date_deleted DATE,
	PRIMARY KEY(task_id)
)
