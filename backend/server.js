const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());

const db = new sqlite3.Database('./badger.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS badges (
    id INTEGER PRIMARY KEY,
    title TEXT,
    text TEXT,
    isBadge BOOLEAN,
    isCompleted BOOLEAN,
    x REAL,
    y REAL,
    zIndex INTEGER
  )`);
});

// Create an API route for React to fetch the badges
app.get('/api/badges', (req, res) => {
  db.all("SELECT * FROM badges", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new badge to the database
app.post('/api/badges', (req, res) => {
  const { title, text, isBadge, isCompleted, x, y, zIndex } = req.body;
  
  const query = `INSERT INTO badges (title, text, isBadge, isCompleted, x, y, zIndex) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(query, [title, text, isBadge, isCompleted, x, y, zIndex], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    
    res.json({ id: this.lastID, title, text, isBadge, isCompleted, x, y, zIndex });
  });
});

// Update a badge's position
app.put('/api/badges/:id', (req, res) => {
  const { id } = req.params;
  const { x, y, zIndex } = req.body;
  
  const query = `UPDATE badges SET x = ?, y = ?, zIndex = ? WHERE id = ?`;
  
  db.run(query, [x, y, zIndex, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Position saved successfully", changes: this.changes });
  });
});

// DELETE Route: Remove a badge
app.delete('/api/badges/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM badges WHERE id = ?', [id], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete badge' });
        }
        res.json({ message: 'Badge deleted successfully' });
    });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});