
SET GLOBAL local_infile = 1;

CREATE DATABASE IF NOT EXISTS SDC;
USE SDC;

CREATE TABLE products (
  id INTEGER  AUTO_INCREMENT,
  name VARCHAR(50),
  slogan VARCHAR(150),
  description VARCHAR(550),
  category VARCHAR(25),
  default_price VARCHAR(25),
  PRIMARY KEY(id)
);

CREATE TABLE questions (
  id INTEGER AUTO_INCREMENT,
  product_id INTEGER NOT NULL,
  body VARCHAR(500),
  date_written TIMESTAMP,
  asker_name VARCHAR (50),
  asker_email VARCHAR(50),
  reported INTEGER,
  helpful INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE answers (
  id INTEGER AUTO_INCREMENT,
  question_id INTEGER NOT NULL,
  body VARCHAR(500),
  date_written TIMESTAMP,
  answerer_name VARCHAR (50),
  answerer_email VARCHAR (50),
  reported INTEGER,
  helpful INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON DELETE CASCADE
);

CREATE TABLE answers_photos (
  id INTEGER AUTO_INCREMENT,
  answer_id INTEGER NOT NULL,
  url VARCHAR(250),
  PRIMARY KEY(id),
  FOREIGN KEY (answer_id)
        REFERENCES answers(id)
        ON DELETE CASCADE
);

LOAD DATA INFILE '/var/lib/mysql-files/products.csv'
INTO TABLE products
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA INFILE '/var/lib/mysql-files/questions.csv'
INTO TABLE questions
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/answers.csv'
INTO TABLE answers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/answers_photos.csv '
INTO TABLE  answers_photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
