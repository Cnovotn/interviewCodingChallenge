/**
 * B-I-N-G-O
 *
 * A Bingo card contain 25 squares arranged in a 5x5 grid (five columns
 * and five rows). Each space in the grid contains a number between 1
 * and 75. The center space is marked "FREE" and is automatically filled.
 *
 * As the game is played, numbers are drawn. If the player's card has
 * that number, that space on the grid is filled.
 *
 * A player wins BINGO by completing a row, column, or diagonal of filled
 * spaces.
 *
 * Your job is to complete the function that takes a bingo card and array
 * of drawn numbers and return 'true' if that card has achieved a win.
 *
 * A bingo card will be 25 element array. With the string 'FREE' as the
 * center element (index 12). Although developers are unscrupulous, they
 * will pass valid data to your function.
 */


class GameBoard {
  arrayBoard = [[],[],[],[],[]];
  winningPieces = [];

  constructor(bingoBoard, picked) {
    for(var i = 0; i < bingoBoard.length; i++) {
      let row = Math.floor(i/5);
      this.arrayBoard[row].push(bingoBoard[i]);
    }
    this.winningPieces = picked;
  }
  
  addPiece(piece){
    this.winningPieces.push(piece);
  }

  printBoard() {
    console.log(this.arrayBoard);
  }

  printWinningBoard() {
    for(var i = 0; i < this.arrayBoard.length; i++){
      let thisRow = this.arrayBoard[i];
      for(var j = 0; j < thisRow.length; j++) {
        if(!this.checkPiece(this.arrayBoard[i][j])) {
          this.arrayBoard[i][j] = "__";
        }
      }
    }
    console.log("Congrats on winning bingo! Your winning board and pieces are:");
    this.printBoard();
  }

  checkPiece(piece) {
    if(!this.winningPieces.includes(piece) && piece != 'FREE') {
      return false;
    }
    return true;
  }

  checkRow(pieces) {
    for(var j = 0; j < pieces.length; j++) {
      if(!this.checkPiece(pieces[j])) {
        return false;
      }
    }
    return true;
  }

  checkRows(){
    for(var i = 0; i < this.arrayBoard.length; i++) {
      let thisRow = this.arrayBoard[i];
      if(!this.checkRow(thisRow)) {
        return false;
      }
    }
    return true;
  }
  
  checkColumns() {
    for(var i = 0; i < this.arrayBoard.length; i++) {
      let thisColumn = []
      for(var j = 0; j< this.arrayBoard.length; j++) {
        thisColumn.push(this.arrayBoard[j][i]);
      }
      if(!this.checkRow(thisColumn)) {
        return false;
      }
    }
    return true;
  }
  checkLeftDiagonal() {
    for(var i = 0; i < this.arrayBoard.length; i++){
      let topLeftStart = this.arrayBoard[i][i];
      if(!this.checkPiece(topLeftStart)) {
        return false;
      }
    }
    return true;
  }
  checkRightDiagonal() {
    for(var i = 0; i < this.arrayBoard.length; i++){
      let topRightStart = this.arrayBoard[i][this.arrayBoard.length-i-1];
      if(!this.checkPiece(topRightStart)) {
        return false;
      }
    }
    return true;
  }
}


function checkForBingo (bingoCard, drawnNumbers) {
  // this code for debug purposes, you can remove.
  let game = new GameBoard(bingoCard, drawnNumbers);
  // game.printBoard();
  if(game.checkRows() || game.checkColumns() || game.checkLeftDiagonal() || game.checkRightDiagonal()) {
    game.printWinningBoard();
    return true;
  }  
  console.log("Not a winning gameboard:(");
  game.printBoard();
  return false;
}

module.exports = checkForBingo;

// here are some samples


// this should return true with vertical without free
// checkForBingo(
//   [
//     8, 29, 35, 54, 65,
//     13, 24, 44, 48, 67,
//     9, 21, 'FREE', 59, 63,
//     7, 19, 34, 53, 61,
//     1, 20, 33, 46, 72
//   ],
//   [
//     8, 13, 9, 7, 1
//   ]
// );

// this should return true with vertical + free
// checkForBingo(
//   [
//     8, 29, 35, 54, 65,
//     13, 24, 44, 48, 67,
//     9, 21, 'FREE', 59, 63,
//     7, 19, 34, 53, 61,
//     1, 20, 33, 46, 72
//   ],
//   [
//     35, 44, 34, 33
//   ]
// );

// this should return true with horizontal without free
// checkForBingo(
//   [
//     8, 29, 35, 54, 65,
//     13, 24, 44, 48, 67,
//     9, 21, 'FREE', 59, 63,
//     7, 19, 34, 53, 61,
//     1, 20, 33, 46, 72
//   ],
//   [
//     8, 29, 35, 65, 54
//   ]
// );

// // this should return true with horizontal + free
// checkForBingo(
//   [
//     8, 29, 35, 54, 65,
//     13, 24, 44, 48, 67,
//     9, 21, 'FREE', 59, 63,
//     7, 19, 34, 53, 61,
//     1, 20, 33, 46, 72
//   ],
//   [
//     9, 21, 59, 63
//   ]
// );

// this should return true with top left start diagonal + free
checkForBingo(
  [
    8, 29, 35, 54, 65,
    13, 24, 44, 48, 67,
    9, 21, 'FREE', 59, 63,
    7, 19, 34, 53, 61,
    1, 20, 33, 46, 72
  ],
  [
    8, 24, 53, 72
  ]
);
// this should return true with top right start diagonal + free
checkForBingo(
  [
    8, 29, 35, 54, 65,
    13, 24, 44, 48, 67,
    9, 21, 'FREE', 59, 63,
    7, 19, 34, 53, 61,
    1, 20, 33, 46, 72
  ],
  [
    65, 48, 19, 1
  ]
);

// // this should return false
checkForBingo(
  [
   8, 29, 35, 54, 65,
   13, 24, 44, 48, 67,
   9, 21, 'FREE', 59, 63,
   7, 19, 34, 53, 61,
   1, 20, 33, 46, 72
  ],
  [
    1, 33, 53, 65, 29, 75
  ]
);
