INSERT INTO category (name) VALUES
('Eurogames'), ('Ameritrash'), ('Familiar');

INSERT INTO author(name, nationality) VALUES
('Alan R. Moon', 'US'), ('Vital Lacerda', 'PT'), ('Simone Luciani', 'IT'), ('Perepau Llistosella', 'ES'),
('Michael Kiesling', 'DE'), ('Phil Walker-Harding', 'US');

INSERT INTO game(title, age, category_id, author_id) VALUES
('On Mars', '14', 1, 2), ('Aventureros al tren', '8', 3, 1), ('1920: Wall Street', '12', 1, 4),
('Barrage', '14', 1, 3), ('Los viajes de Marco Polo', '12', 1, 3),('Azul', '8', 3, 5);

INSERT INTO client(name) VALUES
('Juan'), ('Mario'), ('Luigi');

-- Inserta múltiples préstamos en una sola consulta
INSERT INTO loan (date_start, date_end, client_id, game_id) VALUES
('2023-10-01', '2023-10-08', 1, 1),
('2023-11-15', '2023-11-20', 2, 3),
('2023-12-01', '2023-12-10', 3, 2),
('2024-01-05', '2024-01-12', 1, 4),
('2024-02-14', '2024-02-21', 2, 5),
('2024-03-01', '2024-03-08', 3, 6),
('2024-04-10', '2024-04-17', 1, 5),
('2024-05-05', '2024-05-12', 2, 4),
('2024-06-15', '2024-06-22', 3, 3),
('2024-07-01', '2024-07-08', 1, 6);
