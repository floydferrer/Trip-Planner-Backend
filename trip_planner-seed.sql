--  test user has the password "password"

INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('tester',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'tester@gmail.com'
        -- ARRAY ["location1: {name: 'Disneyland Park', address: 'Anaheim, CA 92802, USA', lat: 33.8120918, lng: -117.9189742}"]
        );
