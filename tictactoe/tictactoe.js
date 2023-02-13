const circle = document.getElementById("circle");
const statusText = document.getElementById("status");
const winCountP1 = document.getElementById("win-count-player1");
const winCountP2 = document.getElementById("win-count-player2");
const cells = document.querySelectorAll(".cell");
const startBtn = document.getElementById("start-btn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["","","","","","","","","",];
let currentPlayer = "Y";
let gameActive = false;
let xWins = 0;
let yWins = 0;

//track input and swap player after click
//compare inputs to win conditions
//if condition matches, finish game and add tally

function startGame() {
  changePlayer();
  cells.forEach(cell => {
    cell.addEventListener('click', selectCell);
    cell.innerText = '';
    cell.classList.remove("player1");
    cell.classList.remove("player2");
  });

  gameActive = true;
  statusText.innerText = `${currentPlayer}, its your turn!`;
  startBtn.innerText = "Restart";
  options = ["","","","","","","","","",];

  circle.classList.remove("bg-yellow");
  circle.classList.remove("bg-red");
}

function selectCell() {
  //checks if empty cell
  if (this.innerText != "") {
    return;
  };

  // adds color classes
  if (!this.classList.contains("player1") && !this.classList.contains("player2")) {
    if (currentPlayer == "X") {
      this.classList.add("player1");
    }else if (currentPlayer == "Y") {
      this.classList.add("player2");
    };
  };
  
  //sets index in storage array, checks win condition
  options[this.getAttribute("data-cellIndex")] = currentPlayer;
  this.innerText = currentPlayer;
  checkWin();
}

function checkWin() {
  let roundWin = false;

  for (i = 0; i < winConditions.length; i++) {
    let conditions = winConditions[i];
    let cell1 = options[conditions[0]];
    let cell2 = options[conditions[1]];
    let cell3 = options[conditions[2]];

    if (cell1 == "" || cell2 == "" || cell3 == "") {
      continue;
    } else if (cell1 == cell2 && cell2 == cell3) {
      roundWin = true;
      break;
    };
  };

  if (roundWin) {
    gameActive = false;
    statusText.innerText = `${currentPlayer} wins!`;
    if (currentPlayer == "X") {
      xWins += 1;
      winCountP1.innerText = xWins;
      circle.classList.add("bg-yellow");
    } else if (currentPlayer == "Y") {
      yWins += 1;
      winCountP2.innerText = yWins;
      circle.classList.add("bg-red");
    };
  } else if (!options.includes("")) {
    statusText.innerText = `It's a draw! Play again!`;
  } else {
    changePlayer();
  };

  if (gameActive == false) {
    cells.forEach(cell => cell.removeEventListener('click', selectCell));
  };
};

function changePlayer() {
  currentPlayer == "X" ? currentPlayer = "Y" : currentPlayer = "X";
  statusText.innerText = `${currentPlayer}, its your turn!`;
}



startBtn.addEventListener('click', startGame);