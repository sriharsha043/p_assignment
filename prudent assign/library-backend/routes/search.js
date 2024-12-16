const express = require('express');
const router = express.Router();
const db = require('../db/database'); // Import database connection

router.get('/api/books', (req, res) => {
    const search = req.query.search || '';
    const query = `
      SELECT Books.BookID, Books.Title, Authors.Name AS Author, Genres.Name AS Genre, Books.Pages, Books.PublishedDate
      FROM Books
      JOIN Authors ON Books.AuthorID = Authors.AuthorID
      JOIN Genres ON Books.GenreID = Genres.GenreID
      WHERE Books.Title LIKE ? OR Authors.Name LIKE ? OR Genres.Name LIKE ?;
    `;
    db.all(query, [`%${search}%`, `%${search}%`, `%${search}%`], (err, rows) => {
      if (err) {
        res.status(500).json({ message: 'Database error' });
      } else {
        res.json(rows);
      }
    });
  });