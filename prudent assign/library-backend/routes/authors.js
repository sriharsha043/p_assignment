const express = require('express');
const router = express.Router();
const db = require('../db/database'); // Import database connection

// GET all authors
router.get('/', async (req, res) => {
    try {
        const authors = await db.all('SELECT * FROM authors');
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving authors', error });
    }
});

// GET a specific author by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const author = await db.get('SELECT * FROM authors WHERE AuthorID = ?', [id]);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving author', error });
    }
});

// POST a new author
router.post('/', async (req, res) => {
    try {
        const { Name } = req.body;
        if (!Name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        await db.run('INSERT INTO authors (Name) VALUES (?)', [Name]);
        res.status(201).json({ message: 'Author added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding author', error });
    }
});

// PUT (update) an author by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name } = req.body;
        if (!Name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const result = await db.run('UPDATE authors SET Name = ? WHERE AuthorID = ?', [Name, id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating author', error });
    }
});

// DELETE an author by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.run('DELETE FROM authors WHERE AuthorID = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting author', error });
    }
});

module.exports = router;
