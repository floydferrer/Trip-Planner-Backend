CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);


CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25),
  stops VARCHAR(5000) [] NOT NULL,
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE
);