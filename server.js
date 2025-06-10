const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON } = require('./db');

const SECRET = 'SUPER_SECRET_KEY';
const PORT = 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Auth: Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readJSON('users.json');
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: '2h' });
    res.json({ token, role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Auth middleware
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Get all books (+ search)
app.get('/api/books', authenticate, (req, res) => {
  let books = readJSON('books.json');
  const { q, genre, author } = req.query;

  if (q && q.trim() !== '') {
    books = books.filter(b =>
      b.title.toLowerCase().includes(q.toLowerCase())
    );
  }
  if (genre && genre.trim() !== '') {
    books = books.filter(b =>
      b.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }
  if (author && author.trim() !== '') {
    books = books.filter(b =>
      b.authors.some(a =>
        a.toLowerCase().includes(author.toLowerCase())
      )
    );
  }
  res.json(books);
});

// Get one book
app.get('/api/books/:id', authenticate, (req, res) => {
  const books = readJSON('books.json');
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// Add book (Admin only)
app.post('/api/books', authenticate, (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });
  const books = readJSON('books.json');
  const { title, authors, year, genre } = req.body;
  const newBook = {
    id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
    title, authors, year, genre, comments: []
  };
  books.push(newBook);
  writeJSON('books.json', books);
  logAction(`${req.user.username} added book "${title}"`);
  res.status(201).json(newBook);
});

// Edit book (Admin only)
app.put('/api/books/:id', authenticate, (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });
  const books = readJSON('books.json');
  const idx = books.findIndex(b => b.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });
  books[idx] = { ...books[idx], ...req.body, id: books[idx].id, comments: books[idx].comments };
  writeJSON('books.json', books);
  logAction(`${req.user.username} edited book "${books[idx].title}"`);
  res.json(books[idx]);
});

// Delete book (Admin only)
app.delete('/api/books/:id', authenticate, (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });
  let books = readJSON('books.json');
  const idx = books.findIndex(b => b.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });
  const deleted = books.splice(idx, 1)[0];
  writeJSON('books.json', books);
  logAction(`${req.user.username} deleted book "${deleted.title}"`);
  res.json({ message: 'Deleted', book: deleted });
});

// Add comment (User or Admin)
app.post('/api/books/:id/comments', authenticate, (req, res) => {
  if (!['User', 'Admin'].includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  const books = readJSON('books.json');
  const idx = books.findIndex(b => b.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Book not found' });
  const comment = { user: req.user.username, text: req.body.text, date: new Date() };
  books[idx].comments.push(comment);
  writeJSON('books.json', books);
  logAction(`${req.user.username} commented on "${books[idx].title}"`);
  res.json(comment);
});

// Logs
function logAction(msg) {
  const logs = readJSON('logs.json');
  logs.push({ msg, date: new Date() });
  writeJSON('logs.json', logs);
}

// Get logs (Admin only)
app.get('/api/logs', authenticate, (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });
  res.json(readJSON('logs.json'));
});

app.listen(PORT, () => console.log('Backend running on port', PORT));