const Gameboard = {}

Gameboard.VERTICAL = 'v'
Gameboard.HORIZONTAL = 'h'

const valid = (row, col) => {
  return 0 <= row && row < 10 && 0 <= col && col < 10
}

Gameboard.new = () => {
  const obj = {}
  const board = []
  const hits = []
  const ships = []

  for (let i = 0; i < 10; i++) {
    board.push(new Array(10).fill(0))
    hits.push(new Array(10).fill(0))
  }

  obj.placeShip = (row, col, dir, ship) => {
    if (dir === Gameboard.HORIZONTAL) {
      let lastCol = col + ship.length - 1
      if (!valid(row, lastCol)) return false
      for (let i = 0; i < ship.length; i++) {
        if (board[row][col + i]) return false
      }

      for (let i = 0; i < ship.length; i++) {
        board[row][col + i] = ship
      }
    } else if (dir === Gameboard.VERTICAL) {
      let lastRow = row + ship.length - 1
      if (!valid(lastRow, col)) return false

      for (let i = 0; i < ship.length; i++) {
        if (board[row + i][col]) return false
      }

      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship
      }
    } else return false

    ships.push(ship)

    return true
  }

  obj.get = (row, col) => {
    return board[row][col]
  }

  obj.receiveAttack = (row, col) => {
    hits[row][col] = 1
    if (board[row][col]) {
      board[row][col].hit()
      return true
    }
    return false
  }

  obj.hasHit = (row, col) => {
    return hits[row][col] == 1
  }

  obj.allSunk = () => {
    for (const ship of ships) {
      if (!ship.isSunk()) return false
    }
    return true
  }

  return obj
}

export { Gameboard }
