CREATE TABLE poc_request (
    id SERIAL PRIMARY KEY,
    request_date TIMESTAMP NOT NULL,
    "user" VARCHAR(50) NOT NULL,
    tokens INTEGER,
    comment TEXT,
    app VARCHAR(50) NOT NULL
);

INSERT INTO poc_request (request_date, "user", tokens, comment, app) VALUES
    ('2021-01-01 00:00:00', 'user1', 100, 'comment1', 'app1'),
    ('2021-01-02 00:00:00', 'user2', 200, 'comment2', 'app2'),
    ('2021-01-03 00:00:00', 'user3', 300, 'comment3', 'app3');
```
