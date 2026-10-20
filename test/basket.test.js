const basket = require('../src/basket');

const books = [
  { id: 1, title: 'Book A', price: 10.0 },
  { id: 2, title: 'Book B', price: 5.5 },
];

describe('basket', () => {
  test('counts items across lines', () => {
    expect(basket.itemCount([{ bookId: 1, quantity: 2 }, { bookId: 2, quantity: 1 }])).toBe(3);
  });

  test('adds up the subtotal', () => {
    expect(basket.subtotal([{ bookId: 1, quantity: 2 }, { bookId: 2, quantity: 1 }], books)).toBe(25.5);
  });

  test('no discount for 2 books', () => {
    const result = basket.total([{ bookId: 1, quantity: 2 }], books);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(20);
  });

  test('10% off when buying exactly 3 books', () => {
    const result = basket.total([{ bookId: 1, quantity: 3 }], books);
    expect(result.subtotal).toBe(30);
    expect(result.discount).toBe(3);
    expect(result.total).toBe(27);
  });

  test('10% off when buying more than 3 books', () => {
    const result = basket.total([{ bookId: 1, quantity: 4 }], books);
    expect(result.discount).toBe(4);
    expect(result.total).toBe(36);
  });

  test('rejects an unknown book', () => {
    expect(() => basket.total([{ bookId: 99, quantity: 1 }], books)).toThrow('Unknown book: 99');
  });
});
