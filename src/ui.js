const UI = {}

UI.renderBoard = (board, divId, computer = false) => {
  const divBoard = document.querySelector(`#${divId}`)
  const size = 500
  divBoard.style.height = `${size}px`
  divBoard.style.width = `${size}px`
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const gridCell = document.createElement('div')
      gridCell.classList.add('grid-cell')
      gridCell.style.height = `${(size/10)-1}px`
      gridCell.style.width = `${(size/10)-1}px`
      if (!computer && board.get(row, col)) {
        gridCell.style.backgroundColor = 'rgb(143, 240, 240)'
      }
      gridCell.addEventListener('click', () => {
        if (!board.hasHit(row, col)) {
          board.receiveAttack(row, col)
          console.log(board.get(row, col))
        }
      })
      divBoard.appendChild(gridCell)
    }
  }
}

export { UI }
