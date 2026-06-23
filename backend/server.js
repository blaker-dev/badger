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

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});