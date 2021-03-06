import "./styles.css";

document.getElementById("app").innerHTML = `
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  
  <h1>Ebin tic tac toe!</h1>
  <p id="turnIndicator">
  First to reach 5 in a row wins!
  </p>

  <table id="board" border="1" padding="150px">
    </table>

  <p>
  <div class="w3-light-grey" style ="width:300px" >
  <div id="myBar" class="w3-container w3-green" style="height:30px;width:10%"<></div>
  </div>
  </p>
`;

// BoardData to save the current state of Board
var boardData = [];
var playerTurn = 1;

var BOARDSIZE = 5;
var PADDING = "5px";
var CELLSIZE = "59px";
var progressBarTimer;
var boord;

if (document.readyState !== "loading") {
  console.log("Document read, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    console.log("Document ready, executing after a wait");
  });
  initializeCode();
}

function initializeCode() {
  console.log("Initializing");
  boord = document.getElementById("board");
  boord.style.border = "1px solid black";
  boord.style.borderCollapse = "collapse";
  boord.style.padding = PADDING;

  initBoardData();
  renderTable();
}

function initBoardData() {
  for (let i = 0; i < BOARDSIZE; i++) {
    var rowData = [];
    for (let j = 0; j < BOARDSIZE; j++) {
      rowData.push("");
    }
    boardData.push(rowData);
  }
}

function renderTable() {
  var createClickHandler = function(cell, rowNum, colNum) {
    return function() {
      // Cell has to be empty!
      if (cell.innerHTML === "") {
        var sign;
        var color;
        if (playerTurn === 1) {
          sign = "x";
          color = "rgb(124, 252, 0)";
        } else {
          sign = "o";
          color = "rgb(250, 128, 114)";
        }
        cell.innerHTML = sign;
        cell.style.backgroundColor = color;
        boardData[rowNum][colNum] = sign;
        if (checkWinningCondition() === true) {
          alert("Player " + playerTurn + " won!");
        } else {
          //  fixBoardSize();
          switchTurn();
        }
      }
    };
  };
  for (let i = 0; i < boardData.length; i++) {
    var row = boord.insertRow(i);
    row.style.height = CELLSIZE;
    for (let j = 0; j < boardData[0].length; j++) {
      var cell = row.insertCell(j);
      cell.style.width = CELLSIZE;
      cell.style.textAlign = "center";
      cell.style.verticalAlign = "middle";
      cell.style.fontFamily = "helvetica;";
      cell.style.fontSize = "30px";
      cell.onclick = createClickHandler(cell, i, j);
      //cell.addEventListener("click", function() {return moveBar(i, j)});
      cell.addEventListener("click", moveBar);
      cell.innerHTML = boardData[i][j];
      if (boardData[i][j] === "x") {
        cell.style.backgroundColor = "rgb(124, 252, 0)";
      } else if (boardData[i][j] === "o") {
        cell.style.backgroundColor = "rgb(250, 128, 114)";
      }
    }
  }
  return;
}

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

function moveBar(/* rowNum, colNum */) {
  // Cell has to be empty!
  //console.log("ruutu on: " + boardData[rowNum][colNum]);
  //if (boardData[rowNum][colNum] === "") {
  clearInterval(progressBarTimer);
  var elem = document.getElementById("myBar");
  var event = document.createEvent("Event");
  event.initEvent("barCompleted", true, true);
  elem.addEventListener("barCompleted", switchTurn);
  //elem.addEventListener("barCompleted", moveBar);
  var width = 10;
  progressBarTimer = setInterval(frame, 50);
  function frame() {
    if (width >= 100) {
      elem.dispatchEvent(event);
      clearInterval(progressBarTimer);
    } else {
      width++;
      elem.style.width = width + "%";
    }
  }
  //}
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
  let j;
  var lastSign;
  var currentSign;
  for (let i = 0; i < boardData.length; i++) {
    j = 1;
    var counter = 1;
    lastSign = boardData[i][0];
    while ((j + i < boardData.length) & (j < boardData[0].length)) {
      currentSign = boardData[i + j][j];
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

function checkWinDiagonal2() {
  let i;
  var lastSign;
  var currentSign;
  for (let j = boardData[0].length - 1; j > 0; j--) {
    i = 1;
    var counter = 1;
    lastSign = boardData[0][j];
    while ((j + i < boardData[0].length) & (i < boardData.length)) {
      currentSign = boardData[i][i + j];
      if ((currentSign === lastSign) & (currentSign !== "")) {
        counter++;
      } else {
        counter = 1;
        lastSign = currentSign;
      }
      if (counter === 5) {
        return true;
      }
      i++;
    }
  }
  return false;
}

function checkWinDiagonal3() {
  let j;
  var lastSign;
  var currentSign;
  var counter;
  for (let i = 0; i < boardData.length; i++) {
    j = 1;
    counter = 1;
    lastSign = boardData[i][0];
    while ((i - j > -1) & (j < boardData[0].length)) {
      currentSign = boardData[i - j][j];
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
}

function checkWinDiagonal4() {
  let i;
  var lastSign;
  var currentSign;
  var counter;
  for (let j = boardData[0].length - 1; j > 0; j--) {
    i = 1;
    counter = 1;
    lastSign = boardData[boardData.length - 1][j];
    while ((i + j < boardData[0].length) & (i < boardData.length)) {
      currentSign = boardData[boardData.length - 1 - i][j + i];
      if ((currentSign === lastSign) & (currentSign !== "")) {
        counter++;
      } else {
        counter = 1;
        lastSign = currentSign;
      }
      if (counter === 5) {
        return true;
      }
      i++;
    }
  }
}

function checkWinningCondition() {
  if (checkWinHorizontal() === true) {
    return true;
  } else if (checkWinVertical() === true) {
    return true;
  } else if (checkWinDiagonal1() === true) {
    return true;
  } else if (checkWinDiagonal2() === true) {
    return true;
  } else if (checkWinDiagonal3() === true) {
    return true;
  } else if (checkWinDiagonal4() === true) {
    return true;
  }
  return false;
}

function addTopRow() {
  var rowData = [];
  for (let i = 0; i < boardData[0].length; i++) {
    rowData.push("");
  }
  boardData.unshift(rowData);
}

function addBottomRow() {
  var rowData = [];
  for (let i = 0; i < boardData[0].length; i++) {
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

function fixBoardSize() {
  var isSmall = true;

  while (isSmall === true) {
    var heightCheck = boardHeightTooSmall();
    var widthCheck = boardWidthTooSmall();
    isSmall = false;

    if (heightCheck.top === true) {
      isSmall = true;
      addTopRow();
    }
    if (heightCheck.bottom === true) {
      isSmall = true;
      addBottomRow();
    }
    if (widthCheck.left === true) {
      isSmall = true;
      addLeftColumn();
    }
    if (widthCheck.right === true) {
      isSmall = true;
      addRightColumn();
    }
  }
  clearBoard();
  renderTable();
}
