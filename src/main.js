import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ship } from './ship'
import { UI } from './ui'

const genericBoard = () => {
  const board = Gameboard.new()
  board.placeShip(1, 2, Gameboard.VERTICAL, Ship.new(2))
  board.placeShip(2, 4, Gameboard.HORIZONTAL, Ship.new(5))
  board.placeShip(4, 3, Gameboard.HORIZONTAL, Ship.new(4))
  board.placeShip(6, 3, Gameboard.VERTICAL, Ship.new(3))
  board.placeShip(6, 8, Gameboard.VERTICAL, Ship.new(2))

  return board
}

const player1 = Player.new(genericBoard())
const computer = Player.new(genericBoard())

UI.renderBoard(player1.board, "b-player")
UI.renderBoard(computer.board, "b-computer", true)
