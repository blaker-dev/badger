const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());

// Connect to the SQLite file (it creates it if it doesn't exist!)
const db = new sqlite3.Database('./badger.db');

// Create your table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS badges (
    id INTEGER PRIMARY KEY,
    title TEXT,
    text TEXT,
    isBadge BOOLEAN,
    isCompleted BOOLEAN
  )`);
});

// Create an API route for React to fetch the badges
app.get('/api/badges', (req, res) => {
  db.all("SELECT * FROM badges", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});