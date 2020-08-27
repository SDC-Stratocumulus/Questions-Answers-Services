CREATE DATABASE IF NOT EXISTS SDC;
USE SDC;

CREATE TABLE products (
  id INTEGER NOT NULL,
  name VARCHAR(50),
  slogan VARCHAR(150),
  description VARCHAR(550),
  category VARCHAR(25),
  default_price VARCHAR(25),
  PRIMARY KEY(id)
);


CREATE TABLE questions (
  id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  body VARCHAR(500),
  date_written TIMESTAMP,
  asker_name VARCHAR (50),
  reported INTEGER,
  helpful INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE answers (
  id INTEGER NOT NULL,
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

CREATE TABLE answers_photo (
  id INTEGER NOT NULL,
  answer_id INTEGER NOT NULL,
  url VARCHAR(250),
  PRIMARY KEY(id),
  FOREIGN KEY (answer_id)
        REFERENCES answers(id)
        ON DELETE CASCADE
);
