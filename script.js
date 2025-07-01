const tiles = document.querySelectorAll(".tile");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const resetScoresBtn = document.getElementById("resetScoresBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let score = {
  X: parseInt(localStorage.getItem("scoreX")) || 0,
  O: parseInt(localStorage.getItem("scoreO")) || 0
};

updateScoreboard();

tiles.forEach(tile => tile.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
resetScoresBtn.addEventListener("click", resetScores);

function handleClick() {
  const index = this.getAttribute("data-index");
  if (board[index] !== "" || !running) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  checkWinner();
}

function checkWinner() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWin(combo);
      statusText.textContent = `Player ${currentPlayer} Wins!`;
      updateScore(currentPlayer);
      running = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    running = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function highlightWin(combo) {
  combo.forEach(index => tiles[index].classList.add("winning-tile"));
}

function updateScore(player) {
  score[player]++;
  localStorage.setItem(`score${player}`, score[player]);
  updateScoreboard();
}

function updateScoreboard() {
  scoreX.textContent = `X: ${score.X}`;
  scoreO.textContent = `O: ${score.O}`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  tiles.forEach(tile => {
    tile.textContent = "";
    tile.classList.remove("winning-tile");
  });
}

function resetScores() {
  score.X = 0;
  score.O = 0;
  localStorage.setItem("scoreX", "0");
  localStorage.setItem("scoreO", "0");
  updateScoreboard();
}
