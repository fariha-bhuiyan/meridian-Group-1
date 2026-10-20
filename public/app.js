const booksList = document.getElementById('books');
const genreSelect = document.getElementById('genre');
const basketList = document.getElementById('basket');
const summary = document.getElementById('summary');

const basket = new Map(); // bookId -> { book, quantity }

function formatPrice(value) {
  return `£${value.toFixed(2)}`;
}

async function loadBooks(genre = '') {
  const url = genre ? `/api/books?genre=${encodeURIComponent(genre)}` : '/api/books';
  const res = await fetch(url);
  const books = await res.json();
  booksList.innerHTML = '';
  books.forEach((book) => {
    const li = document.createElement('li');
    const inStock = book.stock > 0;
    li.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${formatPrice(book.price)} · ${inStock ? `${book.stock} in stock` : 'Out of stock'}</p>
    `;
    const button = document.createElement('button');
    button.textContent = inStock ? 'Add to basket' : 'Out of stock';
    button.disabled = !inStock;
    button.addEventListener('click', () => addToBasket(book));
    li.appendChild(button);
    booksList.appendChild(li);
  });
  return books;
}

async function loadGenres() {
  const res = await fetch('/api/books');
  const books = await res.json();
  [...new Set(books.map((b) => b.genre))].sort().forEach((genre) => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

function addToBasket(book) {
  const line = basket.get(book.id) || { book, quantity: 0 };
  line.quantity += 1;
  basket.set(book.id, line);
  renderBasket();
}

async function renderBasket() {
  basketList.innerHTML = '';
  if (basket.size === 0) {
    summary.textContent = 'Your basket is empty.';
    return;
  }
  basket.forEach(({ book, quantity }) => {
    const li = document.createElement('li');
    li.textContent = `${quantity} × ${book.title}`;
    basketList.appendChild(li);
  });
  const items = [...basket.values()].map(({ book, quantity }) => ({ bookId: book.id, quantity }));
  const res = await fetch('/api/basket/total', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  const totals = await res.json();
  summary.textContent = `Subtotal ${formatPrice(totals.subtotal)} · Discount ${formatPrice(totals.discount)} · Total ${formatPrice(totals.total)}`;
}

genreSelect.addEventListener('change', () => loadBooks(genreSelect.value));

loadGenres();
loadBooks();
