import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ship } from './ship'

test('new player', ()=> {
  const playerBoard = Gameboard.new()
  playerBoard.placeShip(1, 2, Gameboard.VERTICAL, Ship.new(2))
  const player = Player.new(playerBoard)
  
  expect(player.board.get(2,2)).toBeTruthy()
})

test('players atack', () => {
  const player1Board = Gameboard.new()
  const player1Ship = Ship.new(2)
  player1Board.placeShip(1, 2, Gameboard.VERTICAL, player1Ship)
  const player1 = Player.new(player1Board)

  const player2Board = Gameboard.new()
  const player2Ship = Ship.new(2)
  player2Board.placeShip(1, 2, Gameboard.VERTICAL, player2Ship)
  const player2 = Player.new(player2Board)

  let hit = player1.attack(1, 2, player2)
  expect(hit).toBeTruthy()
  expect(player2.board.hasHit(1,2)).toBeTruthy()
  expect(player2Ship.hits).toBe(1)

  hit = player2.attack(0,0, player1)
  expect(hit).not.toBeTruthy()
  expect(player1.board.hasHit(0,0)).toBeTruthy()
  expect(player1.board.hasHit(1,2)).not.toBeTruthy()
  expect(player1Ship.hits).toBe(0)
})

test('random valid attack', () => {
  const player1Board = Gameboard.new()
  const player1Ship = Ship.new(2)
  player1Board.placeShip(1, 2, Gameboard.VERTICAL, player1Ship)
  const player1 = Player.new(player1Board)

  const player2Board = Gameboard.new()
  const player2Ship = Ship.new(2)
  player2Board.placeShip(1, 2, Gameboard.VERTICAL, player2Ship)
  const player2 = Player.new(player2Board)
  
  for (let i = 0; i < 50; i++) {
    let [row, col] = Player.randomValidCell(player2)
    expect(player2.board.hasHit(row, col)).not.toBeTruthy()
    player1.attack(row, col, player2)
    expect(player2.board.hasHit(row, col)).toBeTruthy()
  }
})
