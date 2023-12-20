import { Gameboard } from '../src/gameboard'
import { Ship } from '../src/ship'

test('add ship horizontally', () => {
  const gameboard = Gameboard.new()
  const ship = Ship.new(2)
  let placed = gameboard.placeShip(3, 2, Gameboard.HORIZONTAL, ship)
  expect(placed).toBe(true)

  const returnShip = gameboard.get(3, 3)
  expect(returnShip).toBeTruthy()
  expect(returnShip.length).toBe(2)
})

test('add ship vertically', () => {
  const gameboard = Gameboard.new()
  const ship = Ship.new(3)
  let placed = gameboard.placeShip(1, 5, Gameboard.VERTICAL, ship)
  expect(placed).toBe(true)

  const returnShip = gameboard.get(3, 5)
  expect(returnShip).toBeTruthy()
  expect(returnShip.length).toBe(3)
})

test('does not add ship horizontally that goes overboard', () => {
  const gameboard = Gameboard.new()
  const ship = Ship.new(4)
  let placed = gameboard.placeShip(4, 7, Gameboard.HORIZONTAL, ship)
  expect(placed).toBe(false)
})

test('does not add ship vertically that goes overboard', () => {
  const gameboard = Gameboard.new()
  const ship = Ship.new(4)
  let placed = gameboard.placeShip(8, 3, Gameboard.VERTICAL, ship)
  expect(placed).toBe(false)
})

test('does not add ship vertically that overlaps another', () => {
  const gameboard = Gameboard.new()
  const ship1 = Ship.new(3)
  const ship2 = Ship.new(3)
  gameboard.placeShip(2, 2, Gameboard.HORIZONTAL, ship1)
  let placed = gameboard.placeShip(2, 3, Gameboard.VERTICAL, ship2)
  expect(placed).toBe(false)
})

test('does not add ship horizontally that overlaps another', () => {
  const gameboard = Gameboard.new()
  const ship1 = Ship.new(3)
  const ship2 = Ship.new(3)
  gameboard.placeShip(1, 2, Gameboard.VERTICAL, ship1)
  let placed = gameboard.placeShip(2, 2, Gameboard.HORIZONTAL, ship2)
  expect(placed).toBe(false)
})

test('ship hit', () => {
  const gameboard = Gameboard.new()
  const ship = Ship.new(3)
  gameboard.placeShip(1, 5, Gameboard.VERTICAL, ship)
  let hit = gameboard.receiveAttack(1, 5)
  expect(hit).toBe(true)
  expect(ship.hits).toBe(1)
})

test('no ship hit', () => {
  const gameboard = Gameboard.new()
  let hit = gameboard.receiveAttack(3, 0)
  expect(hit).toBe(false)
})

test('tracks hits', () => {
  const gameboard = Gameboard.new()
  const ship = Ship.new(3)
  gameboard.placeShip(1, 5, Gameboard.VERTICAL, ship)
  gameboard.receiveAttack(3, 0)
  gameboard.receiveAttack(1, 5)

  expect(gameboard.hasHit(3, 0)).toBe(true)
  expect(gameboard.hasHit(1, 5)).toBe(true)
  expect(gameboard.hasHit(6, 7)).toBe(false)
})

test('all ships sunk', () => {
  const gameboard = Gameboard.new()
  const ship1 = Ship.new(2)
  const ship2 = Ship.new(2)

  gameboard.placeShip(0, 0, Gameboard.HORIZONTAL, ship1)
  gameboard.placeShip(1, 0, Gameboard.HORIZONTAL, ship2)

  gameboard.receiveAttack(0, 0)
  gameboard.receiveAttack(0, 1)
  expect(gameboard.allSunk()).toBe(false)
  gameboard.receiveAttack(1, 0)
  gameboard.receiveAttack(1, 1)

  expect(gameboard.allSunk()).toBe(true)
})
