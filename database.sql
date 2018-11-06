CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE planned_meals (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    planned_day DATE
);