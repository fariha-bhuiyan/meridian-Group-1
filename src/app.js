const path = require('path');
const express = require('express');
const books = require('../data/books.json');
const basket = require('./basket');
const config = require('./config');

const app = express(;
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/books', (req, res) => {
  const { genre } = req.query;
  const result = genre ? books.filter((b) => b.genre.toLowerCase() === genre.toLowerCase()) : books;
  res.json(result);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

app.post('/api/basket/total', (req, res) => {
  const items = req.body && req.body.items;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Send an items array, e.g. [{ "bookId": 1, "quantity": 2 }]' });
  }
  try {
    res.json(basket.total(items, books));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/info', (req, res) => {
  res.json({ shop: config.shopName, books: books.length });
});

module.exports = app;
