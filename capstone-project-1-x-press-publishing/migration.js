const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(
db.run(`CREATE TABLE IF NOT EXISTS Artists (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    biography TEXT NOT NULL,
    is_currently_exployed INTERGER DEFAULT 1)`),


db.run(`CREATE TABLE IF NOT EXISTS Series (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL
)`),

db.run(`CREATE TABLE IF NOT EXISTS Issues (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    issue_number INTEGER NOT NULL,
    publication_date TEXT NOT NULL,
    artist_id INTEGER FOREIGN KEY REFERENCES Artists NOT NULL,
    series_id INTEGER FOREIGN KEY REFERENCES Series NOT NULL
)`)
)

