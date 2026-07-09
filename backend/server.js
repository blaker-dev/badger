const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json({ limit: '10mb' }));

const db = new sqlite3.Database('./badger.db', (err) => {
    db.run("PRAGMA foreign_keys = ON");
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Badges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        boardID INTEGER,
        title TEXT,
        text TEXT,
        isBadge BOOLEAN,
        isCompleted BOOLEAN,
        x REAL,
        y REAL,
        zIndex INTEGER,
        shape TEXT,
        rotation TEXT,
        drawing TEXT
        -- FOREIGN KEY (boardID) REFERENCES Boards(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Boards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        desc TEXT,
        image TEXT
    )`);
});

// Create an API route for React to fetch the badges
// fetch badges from a specific board
app.get('/api/badges/:boardID', (req, res) => {
    const inputBoardID = req.params.boardID;
    db.all("SELECT * FROM Badges WHERE boardID = ?", [inputBoardID], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// get all boards in the db
app.get('/api/boards', (req, res) => {
    db.all("SELECT * FROM Boards", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message});
        res.json(rows)
    });
});

// Add a new badge to the database
app.post('/api/badges/:boardID', (req, res) => {
    const inputBoardID = req.params.boardID;
    const { title, text, isBadge, isCompleted, x, y, zIndex, shape, rotation, drawing } = req.body;
    
    db.run(
        'INSERT INTO badges (title, boardID, text, drawing, isBadge, isCompleted, x, y, zIndex, shape, rotation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, inputBoardID, text, drawing, isBadge, isCompleted, x, y, zIndex, shape, rotation],
        function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to add badge' });
            }
            res.json({ id: this.lastID, title, text, drawing, isBadge, isCompleted, x, y, zIndex, shape, rotation });
        }
    );
});

// Add a new board to the database
app.post('/api/boards', (req, res) => {
    const { title, desc, image } = req.body;
    const query = `INSERT INTO Boards (title, desc, image) VALUES (?, ?, ?)`;

    db.run(query, [title, desc, image], function (err) {
        if (err) {
            console.error("Database insertion error:", err.message);
            return res.status(500).json({ error: 'Failed to create new board' });
        }

        res.status(201).json({
            id: this.lastID, 
            title,
            desc,
            image
        });
    }); 
});

// Update board
app.put('/api/board/:id', (req, res) => {
    const { id } = req.params;
    const { title, desc, image } = req.body;

    const query = `UPDATE Boards SET title = ?, desc = ? WHERE id = ?`; // TODO: ADD IMAGES
    db.run(query, [title, desc, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        return res.json({ message: "Board content updated successfully", changes: this.changes});
    });
});


// Update badegs position or info
app.put('/api/badges/:id', (req, res) => {
  const { id } = req.params;
  const { x, y, zIndex, title, text, drawing, isBadge } = req.body;
  
  // Check if this request is a position drag update
  if (x !== undefined && y !== undefined && zIndex !== undefined && title === undefined) {
    const query = `UPDATE Badges SET x = ?, y = ?, zIndex = ? WHERE id = ?`;
    db.run(query, [x, y, zIndex, id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ message: "Position saved successfully", changes: this.changes });
    });
  } 
  // Otherwise, it's a content edit update from the modal!
  else {
    const query = `UPDATE Badges SET title = ?, text = ?, drawing = ?, isBadge = ? WHERE id = ?`;
    const isBadgeValue = isBadge ? 1 : 0; 

    db.run(query, [title, text, drawing, isBadgeValue, id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ message: "Badge content updated successfully", changes: this.changes });
    });
  }
});

// DELETE Route: Remove a badge
app.delete('/api/badges/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM Badges WHERE id = ?', [id], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete badge' });
        }
        res.json({ message: 'Badge deleted successfully' });
    });
});

// DELETE board
app.delete('/api/board/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM Boards WHERE id = ?', [id], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete badge' });
        }
        
        res.json({ message: 'Board deleted successfully' });
    });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});