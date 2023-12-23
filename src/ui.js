const UI = {}

UI.renderBoard = (board, divId, gameManager, computerBoard = false) => {
  const divBoard = document.querySelector(`#${divId}`)
  const size = 500
  divBoard.style.height = `${size}px`
  divBoard.style.width = `${size}px`
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const gridCell = document.createElement('div')
      gridCell.classList.add('grid-cell')
      if (!computerBoard) {
        gridCell.id = `${row}-${col}`
      }
      gridCell.style.height = `${size / 10}px`
      gridCell.style.width = `${size / 10}px`
      if (!computerBoard && board.get(row, col)) {
        gridCell.style.backgroundColor = 'rgb(143, 240, 240)'
      }
      gridCell.addEventListener('click', () => {
        if (!gameManager.gameOn) return
        if (
          !(computerBoard && gameManager.playerTurn) 
        ) {
          return
        }
        if (!board.hasHit(row, col)) {
          let hit = board.receiveAttack(row, col)
          if (hit) {
            gridCell.style.backgroundColor = 'red'
            if (board.allSunk()) {
              gameManager.gameOn = false
              gameManager.endGame()
              return
            }
          } else  {
            gridCell.style.backgroundColor = 'rgb(202, 202, 202)'
            gameManager.playerTurn = !gameManager.playerTurn
            gameManager.computerPlay()
          }
        }
      })
      divBoard.appendChild(gridCell)
    }
  }
}

export { UI }
