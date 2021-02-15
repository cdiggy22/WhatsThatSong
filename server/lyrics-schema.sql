CREATE TABLE artists (
  artist_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE tracks (
  track_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  artist_id INTEGER 
    REFERENCES artists ON DELETE CASCADE,
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE
);

