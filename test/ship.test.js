import { Ship } from "../src/ship"

const ship = Ship.new(3)
test('Correct ship', () => {
  expect(ship.length).toBe(3)
  expect(ship.hits).toBe(0)
})

test('Hit function', () => {
  ship.hit()
  ship.hit()
  expect(ship.hits).toBe(2)
})

test('isSunk function', () => {
  expect(ship.isSunk()).toBe(false)
  ship.hit()
  expect(ship.isSunk()).toBe(true)
})