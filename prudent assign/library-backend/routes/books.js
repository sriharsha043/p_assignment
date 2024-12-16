const express = require('express');
const db = require('../db/database');
const router = express.Router();

// Get all books
router.get('/', (req, res) => {
  db.all(`SELECT * FROM Books`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a book
router.post('/', (req, res) => {
  const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
  const sql = `INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [Title, AuthorID, GenreID, Pages, PublishedDate], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ BookID: this.lastID });
  });
});

// Update a book
router.put('/:id', (req, res) => {
  const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
  const sql = `UPDATE Books SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ? WHERE BookID = ?`;
  db.run(sql, [Title, AuthorID, GenreID, Pages, PublishedDate, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updatedRows: this.changes });
  });
});

// Delete a book
router.delete('/:id', (req, res) => {
  const sql = `DELETE FROM Books WHERE BookID = ?`;
  db.run(sql, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deletedRows: this.changes });
  });
});

module.exports = router;
