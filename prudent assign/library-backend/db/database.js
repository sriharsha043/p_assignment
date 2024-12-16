const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./bookManagement.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Books (
    BookID INTEGER PRIMARY KEY,
    Title TEXT NOT NULL,
    AuthorID INTEGER,
    GenreID INTEGER,
    Pages INTEGER,
    PublishedDate TEXT,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Authors (
    AuthorID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Genres (
    GenreID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT
  )`);
});

module.exports = db;
