const express = require('express');
const router = express.Router();
const db = require('../db/database'); // Import database connection

// GET all genres
router.get('/', async (req, res) => {
    try {
        const genres = await db.all('SELECT * FROM genres');
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving genres', error });
    }
});

// GET a specific genre by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const genre = await db.get('SELECT * FROM genres WHERE GenreID = ?', [id]);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving genre', error });
    }
});

// POST a new genre
router.post('/', async (req, res) => {
    try {
        const { Name, Description } = req.body;
        if (!Name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        await db.run('INSERT INTO genres (Name, Description) VALUES (?, ?)', [Name, Description]);
        res.status(201).json({ message: 'Genre added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding genre', error });
    }
});

// PUT (update) a genre by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Description } = req.body;
        if (!Name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const result = await db.run('UPDATE genres SET Name = ?, Description = ? WHERE GenreID = ?', [Name, Description, id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json({ message: 'Genre updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating genre', error });
    }
});

// DELETE a genre by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.run('DELETE FROM genres WHERE GenreID = ?', [id]);
        if (result.changes === 0) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json({ message: 'Genre deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting genre', error });
    }
});

module.exports = router;
