const Ship = {}

Ship.new = (length) => {
  const obj = {}
  obj.length = length
  obj.hits = 0
  obj.sunk = false

  obj.hit = () => {
    obj.hits++
  }

  obj.isSunk = () => {
    return obj.hits >= obj.length
  }

  return obj
}

export { Ship }
