const request = require('supertest');
const app = require('../src/app');

describe('API', () => {
  test('GET /api/books returns all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(8);
  });

  test('GET /api/books?genre=technology filters by genre', async () => {
    const res = await request(app).get('/api/books?genre=technology');
    expect(res.status).toBe(200);
    expect(res.body.every((b) => b.genre === 'Technology')).toBe(true);
  });

  test('GET /api/books/:id returns one book', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('The Quiet Harbour');
  });

  test('GET /api/books/:id returns 404 for a missing book', async () => {
    const res = await request(app).get('/api/books/999');
    expect(res.status).toBe(404);
  });

  test('POST /api/basket/total applies the multi-buy discount at 3 books', async () => {
    const res = await request(app)
      .post('/api/basket/total')
      .send({ items: [{ bookId: 4, quantity: 3 }] });
    expect(res.status).toBe(200);
    expect(res.body.subtotal).toBe(29.97);
    expect(res.body.discount).toBe(3);
    expect(res.body.total).toBe(26.97);
  });

  test('POST /api/basket/total rejects an empty basket', async () => {
    const res = await request(app).post('/api/basket/total').send({ items: [] });
    expect(res.status).toBe(400);
  });
});
