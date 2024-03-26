import shipFactory from './shipFactory.js';

test('hit function contributes to sinking', () => {
  const ship = shipFactory(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('isSunk reports unsunken ship', () => {
  expect(shipFactory(3).isSunk()).toBe(false);
});

test('isSunk reports unsunken ship that has been hit', () => {
  const ship = shipFactory(4);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('ship length is reported accurately', () => {
  expect(shipFactory(2).getLength()).toBe(2);
});

test('ship length is reported accurately', () => {
  expect(shipFactory(4).getLength()).toBe(4);
});

test('throws error when length argument is not a number', () => {
  expect(() => {
    shipFactory('five');
  }).toThrow('Invalid ship length.');
});

test('throws error when length argument is too small', () => {
  expect(() => {
    shipFactory(1);
  }).toThrow('Invalid ship length.');
});

test('throws error when length argument is too big', () => {
  expect(() => {
    shipFactory(6);
  }).toThrow('Invalid ship length.');
});
