DROP TABLE IF EXISTS complaints CASCADE;
DROP TABLE IF EXISTS recycling CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS userEvents CASCADE;
DROP TABLE IF EXISTS binColl CASCADE;


CREATE TABLE complaints (
    comp_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    post_date VARCHAR(10) NOT NULL,
    content VARCHAR (500) NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (comp_id)
);

CREATE TABLE events (
    event_id INT GENERATED ALWAYS AS IDENTITY,
    event_title VARCHAR (100) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_date VARCHAR(10) NOT NULL,
    event_content VARCHAR (500) NOT NULL,
    attendance INT DEFAULT 1,
    PRIMARY KEY (event_id)
);

CREATE TABLE binColl (
    bin_id INT GENERATED ALWAYS AS IDENTITY,
    bin_coll VARCHAR (50) NOT NULL,
    PRIMARY KEY (bin_id)
);

INSERT INTO binColl (bin_coll) 
VALUES ('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday');

CREATE TABLE recycling (
    recy_id INT GENERATED ALWAYS AS IDENTITY,
    recy_title VARCHAR (100) NOT NULL,
    recy_type VARCHAR (100) NOT NULL,
    post_date VARCHAR(10) NOT NULL,
    bin_id INT,
    img VARCHAR(50),
    info VARCHAR (500) NOT NULL,
    PRIMARY KEY (recy_id),
    FOREIGN KEY (bin_id) REFERENCES binColl(bin_id)
);


CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(30) UNIQUE NOT NULL,
    user_email VARCHAR(120) UNIQUE NOT NULL,
    comp_id INT,
    event_id INT,
    recy_id INT  REFERENCES recycling(recy_id),
    bin_id INT REFERENCES binColl(bin_id),
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (comp_id) REFERENCES complaints(comp_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE userEvents ( 
    user_event_id INT GENERATED ALWAYS AS IDENTITY,
    event_id INT NOT NULL,
    PRIMARY KEY (user_event_id),
    FOREIGN KEY (event_id) REFERENCES events("event_id")
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

INSERT INTO userEvents
  (event_id)
  VALUES
  ('1'),
  ('2');


