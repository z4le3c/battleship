const Player = {}

Player.new = (board) => {
  const obj = {}
  obj.board = board

  obj.attack = (row, col, player) => {
    return player.board.receiveAttack(row, col)
  }
  return obj
}

Player.randomValidCell = (player) => {
  let validCells = Player.validCells(player)

  return validCells[Math.floor(Math.random() * validCells.length)]
}

Player.validCells = (player) => {
  let validCells = []
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (!player.board.hasHit(row, col)) {
        validCells.push([row, col])
      }
    }
  }

  return validCells
}

export { Player }
