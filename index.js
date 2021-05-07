/**
  * Clayton Novotney
  * Coding Interview for Hoyla 
  * Positon: Software Engineer
  * 05/01/21
  * Javascript Bingo
  * Using Classes and functions, I have created a javascript tool that will check whether or not
  * a bingo gameboard is a winner or loser based on the given parameters of game pieces and winning pieces.
  * I definitiely overcomplicated this solution by using classes and have multiple functions that could have 
  * been a lot smaller, but for the sake of demonstrating my knowledge, I wanted to implement as many different
  * features as possible.
*/

// Gameboard class used for storing all of the bingo information and handling checks for a winning board or not.
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
  
  // function that isn't used in this specific instance, but if we wanted to use this software for a running
  // game of bingo, we could add more pieces to the winning pieces and continue to check to see if it is a winning
  // board or not. 
  addPiece(piece){
    this.winningPieces.push(piece);
  }

  printBoard() {
    console.log(this.arrayBoard);
  }

  // Changing all of the pieces on the gameboard to easily display the winning pieces of the gameboard
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

  // Helper function to check if the piece is in the winning board or not.
  checkPiece(piece) {
    if(!this.winningPieces.includes(piece) && piece != 'FREE') {
      return false;
    }
    return true;
  }

  // Checking an entire array of pieces to see if the full row/column/diagonal have 5 pieces in the winning array.
  checkRow(pieces) {
    for(var j = 0; j < pieces.length; j++) {
      if(!this.checkPiece(pieces[j])) {
        return false;
      }
    }
    return true;
  }

  // Checking all of the rows to see if the board is a winner.
  checkRows(){
    for(var i = 0; i < this.arrayBoard.length; i++) {
      let thisRow = this.arrayBoard[i];
      if(this.checkRow(thisRow)) {
        return true;
      }
    }
    return false;
  }

  // Checking all of the columns to see if it is a winning board.
  checkColumns() {
    for(var i = 0; i < this.arrayBoard.length; i++) {
      let thisColumn = []
      for(var j = 0; j< this.arrayBoard.length; j++) {
        thisColumn.push(this.arrayBoard[j][i]);
      }
      if(this.checkRow(thisColumn)) {
        return true;
      }
    }
    return false;
  }

  // Checking the top left to bottom right diagonal pieces
  checkLeftDiagonal() {
    for(var i = 0; i < this.arrayBoard.length; i++){
      let topLeftStart = this.arrayBoard[i][i];
      if(!this.checkPiece(topLeftStart)) {
        return false;
      }
    }
    return true;
  }

  // Checking the top right to bottom left diagonal pieces
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
  let game = new GameBoard(bingoCard, drawnNumbers);
  if(game.checkRows() || game.checkColumns() || game.checkLeftDiagonal() || game.checkRightDiagonal()) {
    game.printWinningBoard();
    return true;
  }
  console.log("Not a winning gameboard:(");
  game.printBoard();
  return false;
}

module.exports = checkForBingo;

// Testing different winning numbers with the same gameboard to see if it returns the proper boolean
function testFunctions() {
  const gameboard = [8, 29, 35, 54, 65, 13, 24, 44, 48, 67, 9, 21, 'FREE', 59, 63, 7, 19, 34, 53, 61, 1, 20, 33, 46, 72];
  const verticalNoFree = [8, 13, 9, 7, 1];
  const verticalNoFreeTwo = [54, 48, 59, 53, 46];
  const verticalWithFree = [35, 44, 34, 33];
  const horizontalNoFree = [8, 29, 35, 65, 54];
  const horizontalNoFreeTwo = [7, 19, 34, 53, 61];
  const horizontalWithFree = [9, 21, 59, 63];
  const topLeftDiagonal = [8, 24, 53, 72];
  const topRightDiagonal = [65, 48, 19, 1];
  const loser = [1, 33, 53, 65, 29, 75];
  const testCases = [verticalNoFree, verticalNoFreeTwo , verticalWithFree, horizontalNoFree, horizontalNoFreeTwo, horizontalWithFree, topLeftDiagonal, topRightDiagonal, loser];
  testCases.forEach(element => {
    console.log("Returns the boolean value of: " + checkForBingo(gameboard, element));
    console.log("");
  });
}

testFunctions();

