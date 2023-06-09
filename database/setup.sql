DROP TABLE IF EXISTS complaints CASCADE;
DROP TABLE IF EXISTS recycling CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS tokens CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS userEvents CASCADE;
DROP TABLE IF EXISTS binColl CASCADE;


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
    img VARCHAR(255),
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
    bin_id INT REFERENCES binColl(bin_id),
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE complaints (
    comp_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    post_date VARCHAR(10) NOT NULL,
    content VARCHAR (500) NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    user_id INT NOT NULL,
    PRIMARY KEY (comp_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE userEvents ( 
    user_event_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (user_event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
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
  ('Kickboxing', 'mentoring', '2023-05-10', 'Kickboxing lesson'),
  ('Community cleanup', 'enviromental', '2023-05-19', 'Picking up litter around the community'),
  ('Community hike', 'exploration', '2023-05-20', 'Hike around the sites of legendary historical events');

INSERT INTO users
  (user_name, user_email, password, bin_id)
VALUES
  ('nicole','nicole@lfa.com','$2b$10$8iH0KEalDAUWnV.68fWm/evTcbWYCK6C0DwMMv4HgVIF5zWVjYmSW','1'),
  ('kenen','kenen@lfa.com','$2b$10$mwQMIKhtSt6dSnB4K/X1YucDSmXlaRv3k7pg4nv.13b2GUkgee1Jq','2'),
  ('doheee','dohee@lfa.com','$2b$10$Qcfc41s6J0NabSFLBDSMYeav0KOwn/TuVbqmSBNyl9WJqb/jtdrZG','3');


-- INSERT INTO userEvents
--   (user_id, event_id)
--   VALUES
--   ('2','1'),
--   ('2','2'),
--   ('1','2');

-- INSERT INTO tokens
--   (user_id, token)
--   VALUES
--   ('2','9d8a4b6e-ed83-4f90-8731-df9fcb384748');



