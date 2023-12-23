import { Gameboard } from './gameboard'
import { Player } from './player'
import { Ship } from './ship'
import { UI } from './ui'

const genericBoard = () => {
  const board = Gameboard.new()
  board.placeShip(1, 2, Gameboard.VERTICAL, Ship.new(2))
  // board.placeShip(2, 4, Gameboard.HORIZONTAL, Ship.new(5))
  // board.placeShip(4, 3, Gameboard.HORIZONTAL, Ship.new(4))
  // board.placeShip(6, 3, Gameboard.VERTICAL, Ship.new(3))
  // board.placeShip(6, 8, Gameboard.VERTICAL, Ship.new(2))

  return board
}

const player1 = Player.new(genericBoard())
const computer = Player.new(genericBoard())

const gameManager = {}
gameManager.playerTurn = true
gameManager.gameOn = true
gameManager.endGame = () => {
  console.log(
    `game over: ${gameManager.playerTurn ? 'the player won' : 'the computer won'}`
  )
  const message = document.querySelector('.message')
  message.textContent = gameManager.playerTurn ? 'the player won' : 'the computer won'
}
gameManager.computerPlay = () => {
  setTimeout(function(){
    const [row, col] = Player.randomValidCell(computer)
    console.log(row, col)
    const gridCell = document.getElementById(`${row}-${col}`)
    let hit = computer.attack(row, col, player1)
    if (hit) {
      gridCell.style.backgroundColor = 'red'
      if (player1.board.allSunk()) {
        gameManager.gameOn = false
        gameManager.endGame()
        return
      }
      gameManager.computerPlay()
    } else {
      gridCell.style.backgroundColor = 'rgb(202, 202, 202)'
      gameManager.playerTurn = !gameManager.playerTurn
    }
  }, 1000);
}
UI.renderBoard(player1.board, 'b-player', gameManager)
UI.renderBoard(computer.board, 'b-computer', gameManager, true)
