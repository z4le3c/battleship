/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });
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

  // returns true if there was a hit with a ship, false otherwise
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




/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
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




/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
const Ship = {}

Ship.new = (length) => {
  const obj = {}
  obj.length = length
  obj.hits = 0

  obj.hit = () => {
    obj.hits++
  }

  obj.isSunk = () => {
    return obj.hits >= obj.length
  }

  return obj
}




/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UI: () => (/* binding */ UI)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./src/ui.js");





const genericBoard = () => {
  const board = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.new()
  board.placeShip(1, 2, _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.VERTICAL, _ship__WEBPACK_IMPORTED_MODULE_2__.Ship.new(2))
  board.placeShip(2, 4, _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.HORIZONTAL, _ship__WEBPACK_IMPORTED_MODULE_2__.Ship.new(5))
  board.placeShip(4, 3, _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.HORIZONTAL, _ship__WEBPACK_IMPORTED_MODULE_2__.Ship.new(4))
  board.placeShip(6, 3, _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.VERTICAL, _ship__WEBPACK_IMPORTED_MODULE_2__.Ship.new(3))
  board.placeShip(6, 8, _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.VERTICAL, _ship__WEBPACK_IMPORTED_MODULE_2__.Ship.new(2))

  return board
}

const player1 = _player__WEBPACK_IMPORTED_MODULE_1__.Player.new(genericBoard())
const computer = _player__WEBPACK_IMPORTED_MODULE_1__.Player.new(genericBoard())

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
    const [row, col] = _player__WEBPACK_IMPORTED_MODULE_1__.Player.randomValidCell(computer)
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
_ui__WEBPACK_IMPORTED_MODULE_3__.UI.renderBoard(player1.board, 'b-player', gameManager)
_ui__WEBPACK_IMPORTED_MODULE_3__.UI.renderBoard(computer.board, 'b-computer', gameManager, true)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLG1DQUFFO0FBQ0YsbUNBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEdhbWVib2FyZCA9IHt9XG5cbkdhbWVib2FyZC5WRVJUSUNBTCA9ICd2J1xuR2FtZWJvYXJkLkhPUklaT05UQUwgPSAnaCdcblxuY29uc3QgdmFsaWQgPSAocm93LCBjb2wpID0+IHtcbiAgcmV0dXJuIDAgPD0gcm93ICYmIHJvdyA8IDEwICYmIDAgPD0gY29sICYmIGNvbCA8IDEwXG59XG5cbkdhbWVib2FyZC5uZXcgPSAoKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9XG4gIGNvbnN0IGJvYXJkID0gW11cbiAgY29uc3QgaGl0cyA9IFtdXG4gIGNvbnN0IHNoaXBzID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBib2FyZC5wdXNoKG5ldyBBcnJheSgxMCkuZmlsbCgwKSlcbiAgICBoaXRzLnB1c2gobmV3IEFycmF5KDEwKS5maWxsKDApKVxuICB9XG5cbiAgb2JqLnBsYWNlU2hpcCA9IChyb3csIGNvbCwgZGlyLCBzaGlwKSA9PiB7XG4gICAgaWYgKGRpciA9PT0gR2FtZWJvYXJkLkhPUklaT05UQUwpIHtcbiAgICAgIGxldCBsYXN0Q29sID0gY29sICsgc2hpcC5sZW5ndGggLSAxXG4gICAgICBpZiAoIXZhbGlkKHJvdywgbGFzdENvbCkpIHJldHVybiBmYWxzZVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtyb3ddW2NvbCArIGldKSByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvYXJkW3Jvd11bY29sICsgaV0gPSBzaGlwXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkaXIgPT09IEdhbWVib2FyZC5WRVJUSUNBTCkge1xuICAgICAgbGV0IGxhc3RSb3cgPSByb3cgKyBzaGlwLmxlbmd0aCAtIDFcbiAgICAgIGlmICghdmFsaWQobGFzdFJvdywgY29sKSkgcmV0dXJuIGZhbHNlXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbcm93ICsgaV1bY29sXSkgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBib2FyZFtyb3cgKyBpXVtjb2xdID0gc2hpcFxuICAgICAgfVxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcblxuICAgIHNoaXBzLnB1c2goc2hpcClcblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBvYmouZ2V0ID0gKHJvdywgY29sKSA9PiB7XG4gICAgcmV0dXJuIGJvYXJkW3Jvd11bY29sXVxuICB9XG5cbiAgLy8gcmV0dXJucyB0cnVlIGlmIHRoZXJlIHdhcyBhIGhpdCB3aXRoIGEgc2hpcCwgZmFsc2Ugb3RoZXJ3aXNlXG4gIG9iai5yZWNlaXZlQXR0YWNrID0gKHJvdywgY29sKSA9PiB7XG4gICAgaGl0c1tyb3ddW2NvbF0gPSAxXG4gICAgaWYgKGJvYXJkW3Jvd11bY29sXSkge1xuICAgICAgYm9hcmRbcm93XVtjb2xdLmhpdCgpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIG9iai5oYXNIaXQgPSAocm93LCBjb2wpID0+IHtcbiAgICByZXR1cm4gaGl0c1tyb3ddW2NvbF0gPT0gMVxuICB9XG5cbiAgb2JqLmFsbFN1bmsgPSAoKSA9PiB7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIG9ialxufVxuXG5leHBvcnQgeyBHYW1lYm9hcmQgfVxuIiwiY29uc3QgUGxheWVyID0ge31cblxuUGxheWVyLm5ldyA9IChib2FyZCkgPT4ge1xuICBjb25zdCBvYmogPSB7fVxuICBvYmouYm9hcmQgPSBib2FyZFxuXG4gIG9iai5hdHRhY2sgPSAocm93LCBjb2wsIHBsYXllcikgPT4ge1xuICAgIHJldHVybiBwbGF5ZXIuYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbClcbiAgfVxuICByZXR1cm4gb2JqXG59XG5cblBsYXllci5yYW5kb21WYWxpZENlbGwgPSAocGxheWVyKSA9PiB7XG4gIGxldCB2YWxpZENlbGxzID0gUGxheWVyLnZhbGlkQ2VsbHMocGxheWVyKVxuXG4gIHJldHVybiB2YWxpZENlbGxzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhbGlkQ2VsbHMubGVuZ3RoKV1cbn1cblxuUGxheWVyLnZhbGlkQ2VsbHMgPSAocGxheWVyKSA9PiB7XG4gIGxldCB2YWxpZENlbGxzID0gW11cbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgMTA7IGNvbCsrKSB7XG4gICAgICBpZiAoIXBsYXllci5ib2FyZC5oYXNIaXQocm93LCBjb2wpKSB7XG4gICAgICAgIHZhbGlkQ2VsbHMucHVzaChbcm93LCBjb2xdKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWxpZENlbGxzXG59XG5cbmV4cG9ydCB7IFBsYXllciB9XG4iLCJjb25zdCBTaGlwID0ge31cblxuU2hpcC5uZXcgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9XG4gIG9iai5sZW5ndGggPSBsZW5ndGhcbiAgb2JqLmhpdHMgPSAwXG5cbiAgb2JqLmhpdCA9ICgpID0+IHtcbiAgICBvYmouaGl0cysrXG4gIH1cblxuICBvYmouaXNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBvYmouaGl0cyA+PSBvYmoubGVuZ3RoXG4gIH1cblxuICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydCB7IFNoaXAgfVxuIiwiY29uc3QgVUkgPSB7fVxuXG5VSS5yZW5kZXJCb2FyZCA9IChib2FyZCwgZGl2SWQsIGdhbWVNYW5hZ2VyLCBjb21wdXRlckJvYXJkID0gZmFsc2UpID0+IHtcbiAgY29uc3QgZGl2Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtkaXZJZH1gKVxuICBjb25zdCBzaXplID0gNTAwXG4gIGRpdkJvYXJkLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgXG4gIGRpdkJvYXJkLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGBcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgMTA7IGNvbCsrKSB7XG4gICAgICBjb25zdCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKVxuICAgICAgaWYgKCFjb21wdXRlckJvYXJkKSB7XG4gICAgICAgIGdyaWRDZWxsLmlkID0gYCR7cm93fS0ke2NvbH1gXG4gICAgICB9XG4gICAgICBncmlkQ2VsbC5zdHlsZS5oZWlnaHQgPSBgJHtzaXplIC8gMTB9cHhgXG4gICAgICBncmlkQ2VsbC5zdHlsZS53aWR0aCA9IGAke3NpemUgLyAxMH1weGBcbiAgICAgIGlmICghY29tcHV0ZXJCb2FyZCAmJiBib2FyZC5nZXQocm93LCBjb2wpKSB7XG4gICAgICAgIGdyaWRDZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMTQzLCAyNDAsIDI0MCknXG4gICAgICB9XG4gICAgICBncmlkQ2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKCFnYW1lTWFuYWdlci5nYW1lT24pIHJldHVyblxuICAgICAgICBpZiAoXG4gICAgICAgICAgIShjb21wdXRlckJvYXJkICYmIGdhbWVNYW5hZ2VyLnBsYXllclR1cm4pIFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWJvYXJkLmhhc0hpdChyb3csIGNvbCkpIHtcbiAgICAgICAgICBsZXQgaGl0ID0gYm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbClcbiAgICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgICBncmlkQ2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuICAgICAgICAgICAgaWYgKGJvYXJkLmFsbFN1bmsoKSkge1xuICAgICAgICAgICAgICBnYW1lTWFuYWdlci5nYW1lT24gPSBmYWxzZVxuICAgICAgICAgICAgICBnYW1lTWFuYWdlci5lbmRHYW1lKClcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICBncmlkQ2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDIwMiwgMjAyLCAyMDIpJ1xuICAgICAgICAgICAgZ2FtZU1hbmFnZXIucGxheWVyVHVybiA9ICFnYW1lTWFuYWdlci5wbGF5ZXJUdXJuXG4gICAgICAgICAgICBnYW1lTWFuYWdlci5jb21wdXRlclBsYXkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGRpdkJvYXJkLmFwcGVuZENoaWxkKGdyaWRDZWxsKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBVSSB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xuaW1wb3J0IHsgVUkgfSBmcm9tICcuL3VpJ1xuXG5jb25zdCBnZW5lcmljQm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gR2FtZWJvYXJkLm5ldygpXG4gIGJvYXJkLnBsYWNlU2hpcCgxLCAyLCBHYW1lYm9hcmQuVkVSVElDQUwsIFNoaXAubmV3KDIpKVxuICBib2FyZC5wbGFjZVNoaXAoMiwgNCwgR2FtZWJvYXJkLkhPUklaT05UQUwsIFNoaXAubmV3KDUpKVxuICBib2FyZC5wbGFjZVNoaXAoNCwgMywgR2FtZWJvYXJkLkhPUklaT05UQUwsIFNoaXAubmV3KDQpKVxuICBib2FyZC5wbGFjZVNoaXAoNiwgMywgR2FtZWJvYXJkLlZFUlRJQ0FMLCBTaGlwLm5ldygzKSlcbiAgYm9hcmQucGxhY2VTaGlwKDYsIDgsIEdhbWVib2FyZC5WRVJUSUNBTCwgU2hpcC5uZXcoMikpXG5cbiAgcmV0dXJuIGJvYXJkXG59XG5cbmNvbnN0IHBsYXllcjEgPSBQbGF5ZXIubmV3KGdlbmVyaWNCb2FyZCgpKVxuY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIubmV3KGdlbmVyaWNCb2FyZCgpKVxuXG5jb25zdCBnYW1lTWFuYWdlciA9IHt9XG5nYW1lTWFuYWdlci5wbGF5ZXJUdXJuID0gdHJ1ZVxuZ2FtZU1hbmFnZXIuZ2FtZU9uID0gdHJ1ZVxuZ2FtZU1hbmFnZXIuZW5kR2FtZSA9ICgpID0+IHtcbiAgY29uc29sZS5sb2coXG4gICAgYGdhbWUgb3ZlcjogJHtnYW1lTWFuYWdlci5wbGF5ZXJUdXJuID8gJ3RoZSBwbGF5ZXIgd29uJyA6ICd0aGUgY29tcHV0ZXIgd29uJ31gXG4gIClcbiAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZXNzYWdlJylcbiAgbWVzc2FnZS50ZXh0Q29udGVudCA9IGdhbWVNYW5hZ2VyLnBsYXllclR1cm4gPyAndGhlIHBsYXllciB3b24nIDogJ3RoZSBjb21wdXRlciB3b24nXG59XG5nYW1lTWFuYWdlci5jb21wdXRlclBsYXkgPSAoKSA9PiB7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBjb25zdCBbcm93LCBjb2xdID0gUGxheWVyLnJhbmRvbVZhbGlkQ2VsbChjb21wdXRlcilcbiAgICBjb25zb2xlLmxvZyhyb3csIGNvbClcbiAgICBjb25zdCBncmlkQ2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Jvd30tJHtjb2x9YClcbiAgICBsZXQgaGl0ID0gY29tcHV0ZXIuYXR0YWNrKHJvdywgY29sLCBwbGF5ZXIxKVxuICAgIGlmIChoaXQpIHtcbiAgICAgIGdyaWRDZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgICBpZiAocGxheWVyMS5ib2FyZC5hbGxTdW5rKCkpIHtcbiAgICAgICAgZ2FtZU1hbmFnZXIuZ2FtZU9uID0gZmFsc2VcbiAgICAgICAgZ2FtZU1hbmFnZXIuZW5kR2FtZSgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgZ2FtZU1hbmFnZXIuY29tcHV0ZXJQbGF5KClcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JpZENlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyMDIsIDIwMiwgMjAyKSdcbiAgICAgIGdhbWVNYW5hZ2VyLnBsYXllclR1cm4gPSAhZ2FtZU1hbmFnZXIucGxheWVyVHVyblxuICAgIH1cbiAgfSwgMTAwMCk7XG59XG5VSS5yZW5kZXJCb2FyZChwbGF5ZXIxLmJvYXJkLCAnYi1wbGF5ZXInLCBnYW1lTWFuYWdlcilcblVJLnJlbmRlckJvYXJkKGNvbXB1dGVyLmJvYXJkLCAnYi1jb21wdXRlcicsIGdhbWVNYW5hZ2VyLCB0cnVlKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9