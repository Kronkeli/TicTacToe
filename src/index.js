import "./styles.css";

document.getElementById("app").innerHTML = `
  <h1>Ebins tic tac an toe!</h1>
  <p id="turnIndicator">
  First to reach 5 in a row wins!
  </p>
  <table id="board" border="1" padding="150px">
  </table>
`;

// BoardData to save the current state of Board
var boardData = [];
var playerTurn = 1;

var BOARDSIZE = 5;
var PADDING = "5px";
var CELLSIZE = "30px";

var boord = document.getElementById("board");
boord.style.padding = PADDING;

function initBoardData() {
  for (let i = 0; i < BOARDSIZE; i++) {
    var rowData = [];
    for (let j = 0; j < BOARDSIZE; j++) {
      rowData.push("");
    }
    boardData.push(rowData);
  }
}

var createClickHandler = function(cell, rowNum, colNum) {
  return function() {
    // Cell has to be empty!
    if (cell.innerHTML === "") {
      var sign;
      if (playerTurn === 1) {
        sign = "X";
      } else {
        sign = "O";
      }
      cell.innerHTML = sign;
      boardData[rowNum][colNum] = sign;
      if (checkWinningCondition() === true) {
        alert("Player " + playerTurn + " won!");
      } else {
        if (boardTooSmall() === true) {
          console.log("on liian pieni");
        }
        switchTurn();
      }
    }
  };
};

function renderTable() {
  for (let i = 0; i < boardData.length; i++) {
    var row = boord.insertRow(i);
    row.style.height = CELLSIZE;
    for (let j = 0; j < boardData[0].length; j++) {
      var cell = row.insertCell(j);
      cell.style.width = CELLSIZE;
      cell.style.textAlign = "center";
      cell = row.getElementsByTagName("td")[j];
      cell.onclick = createClickHandler(cell, i, j);
      cell.innerHTML = boardData[i][j];
    }
  }
  return;
}

initBoardData();
renderTable();

function switchTurn() {
  playerTurn = (playerTurn % 2) + 1;
  var message;
  if (playerTurn === 1) {
    message = "First persons turn";
  } else {
    message = "Second persons turn";
  }
  document.getElementById("turnIndicator").innerHTML = message;
}

function clearBoard() {
  for (let i = 0; i < boardData.length; i++) {
    boord.deleteRow(-1);
  }
}

function checkWinHorizontal() {
  var counterX;
  var lastSignX;
  var currentSign;
  for (let i = 0; i < boardData.length; i++) {
    counterX = 1;
    lastSignX = boardData[i][0];
    for (let j = 1; j < boardData[0].length; j++) {
      currentSign = boardData[i][j];
      if ((currentSign === lastSignX) & (currentSign !== "")) {
        counterX++;
      } else {
        lastSignX = currentSign;
        counterX = 1;
      }
      if (counterX === 5) {
        return true;
      }
    }
  }
  return false;
}

function checkWinVertical() {
  var counterY;
  var lastSignY;
  var currentSign;
  for (let i = 0; i < boardData[0].length; i++) {
    counterY = 1;
    lastSignY = boardData[0][i];
    for (let j = 1; j < boardData.length; j++) {
      currentSign = boardData[j][i];
      if ((currentSign === lastSignY) & (currentSign !== "")) {
        counterY++;
      } else {
        lastSignY = currentSign;
        counterY = 1;
      }
      if (counterY === 5) {
        return true;
      }
    }
  }
  return false;
}

function checkWinDiagonal1() {
  // Tarkastetaan diagonaalisesti
  let j;
  var lastSign;
  var currentSign;
  for (let i = 0; i < boardData.length; i++) {
    j = 1;
    var counter = 1;
    lastSign = boardData[i][0];
    //console.log("lastSign: " + lastSign);
    while (j + i < boardData[0].length) {
      currentSign = boardData[i + j][j];
      //console.log("currentSign: " + currentSign);
      if ((currentSign === lastSign) & (currentSign !== "")) {
        counter++;
      } else {
        counter = 1;
        lastSign = currentSign;
      }
      if (counter === 5) {
        return true;
      }
      j++;
    }
  }
  return false;
}

function checkWinningCondition() {
  if (checkWinHorizontal() === true) {
    console.log("horizontalWin");
    return true;
  } else if (checkWinVertical() === true) {
    console.log("VerticalWin");
    return true;
  } /* else if (checkWinDiagonal1() === true) {
    console.log("diagonalWin");
    return true;
  } */
  return false;
}

function addTopRow() {
  var rowData = [];
  for (let i = 0; i < boardData[0].length; i++) {
    rowData.push("");
  }
  boardData.unshift(rowData);
  console.log("unshiftin jälkeen 2. ylin rivi datasta: ");
  var MESSAGE;
  for (let i = 0; i < boardData[1].length; i++) {
    MESSAGE += " " + boardData[1][i];
  }
  console.log(MESSAGE);
}

function addBottomRow() {
  var rowData = [];
  for (let i = 0; i < boardData[0].length; i++) {
    console.log("JUUUU");
    rowData.push("");
  }
  boardData.push(rowData);
}

function addRightColumn() {
  for (let i = 0; i < boardData.length; i++) {
    boardData[i].push("");
  }
}

function addLeftColumn() {
  for (let i = 0; i < boardData.length; i++) {
    boardData[i].unshift("");
  }
}

function boardHeightTooSmall() {
  var heightSizeCheck = { bottom: false, top: false };
  for (let i = 0; i < boardData.length; i++) {
    for (let j = 0; j < boardData[0].length; j++) {
      if (i < 3) {
        if (boardData[i][j] !== "") {
          heightSizeCheck.top = true;
        }
      }
      if (i > boardData.length - 4) {
        if (boardData[i][j] !== "") {
          heightSizeCheck.bottom = true;
        }
      }
    }
  }
  return heightSizeCheck;
}

function boardWidthTooSmall() {
  var widthSizeCheck = { left: false, right: false };
  for (let j = 0; j < boardData[0].length; j++) {
    for (let i = 0; i < boardData.length; i++) {
      if (j < 3) {
        if (boardData[i][j] !== "") {
          widthSizeCheck.left = true;
        }
      }
      if (j > boardData[0].length - 4) {
        if (boardData[i][j] !== "") {
          widthSizeCheck.right = true;
        }
      }
    }
  }
  return widthSizeCheck;
}

function boardTooSmall() {
  var isSmall = true;

  while (isSmall === true) {
    var heightCheck = boardHeightTooSmall();
    var widthCheck = boardWidthTooSmall();
    isSmall = false;

    if (heightCheck.top === true) {
      isSmall = true;
      console.log("ylhäältä pieni");
      addTopRow();
    }
    if (heightCheck.bottom === true) {
      isSmall = true;
      console.log("alhaalta pieni");
      addBottomRow();
    }
    if (widthCheck.left === true) {
      isSmall = true;
      console.log("vasemmalta pieni");
      addLeftColumn();
    }
    if (widthCheck.right === true) {
      isSmall = true;
      console.log("oikealta pieni");
      addRightColumn();
    }
  }
  clearBoard();
  renderTable();
  return false;
}
