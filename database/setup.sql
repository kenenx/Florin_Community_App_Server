DROP TABLE IF EXISTS complaints CASCADE;
DROP TABLE IF EXISTS recycling CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE complaints (
    comp_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    post_date DATE NOT NULL,
    content VARCHAR (500) NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (comp_id)
);

CREATE TABLE events (
    event_id INT GENERATED ALWAYS AS IDENTITY,
    event_title VARCHAR (100) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_date DATE NOT NULL,
    event_content VARCHAR (500) NOT NULL,
    attendance INT DEFAULT 1,
    PRIMARY KEY (event_id)
);

CREATE TABLE recycling (
    recy_id INT GENERATED ALWAYS AS IDENTITY,
    recy_type VARCHAR (100) NOT NULL,
    post_date DATE NOT NULL,
    img VARCHAR(50),
    info VARCHAR (500) NOT NULL,
    PRIMARY KEY (recy_id)
);

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(30) UNIQUE NOT NULL,
    user_email VARCHAR(120) UNIQUE NOT NULL,
    comp_id INT NOT NULL,
    event_id INT NOT NULL,
    recy_id INT NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (comp_id) REFERENCES complaints("comp_id"),
    FOREIGN KEY (recy_id) REFERENCES recycling("recy_id"),
    FOREIGN KEY (event_id) REFERENCES events("event_id")
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);


-- event type 

/* 
    commmunity events:  
        - mentoring
        - envoirmental 
        - exploration
        - arts&crafts
        - activities 
        - vol jobs
        - bin collection
*/

INSERT INTO events
  (event_title, event_type, event_date, event_content)
VALUES
  ('kickboxing', 'mentoring', '2023-05-04', 'kickboxing lesson'),
  ('community cleanup', 'enviromental', '2023-05-08', 'picking up litter around the community');

