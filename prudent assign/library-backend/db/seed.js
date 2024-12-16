const db = require('./database');

const authors = ['Author A', 'Author B', 'Author C'];
const genres = ['Fiction', 'Non-Fiction', 'Sci-Fi'];

authors.forEach((author) => {
  db.run(`INSERT INTO Authors (Name) VALUES (?)`, [author]);
});

genres.forEach((genre) => {
  db.run(`INSERT INTO Genres (Name, Description) VALUES (?, ?)`, [genre, `${genre} Description`]);
});

console.log('Sample data inserted.');
