// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameStatus = 'Game On';

// DOM variables
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('#message');

// Helper functions
const displayBoard = () => {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWinner = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
    ) {
      highlightWinner(combo[0], combo[1], combo[2]);
      gameStatus = `Player ${currentPlayer} wins with ${board[combo[0]]}'s!`;
      return true;
    }
  }

  if (board.every(cell => cell !== '')) {
    gameStatus = "It's a tie!";
    return true;
  }

  return false;
};

const handleClick = event => {
  const cellIndex = parseInt(event.target.id.slice(-1));
  if (board[cellIndex] || gameStatus !== 'Game On') return;
  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  if (checkWinner()) {
    message.textContent = gameStatus;
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
  } else {
    switchPlayer();
  }
};

const highlightWinner = (index1, index2, index3) => {
  cells[index1].classList.add('winner');
  cells[index2].classList.add('winner');
  cells[index3].classList.add('winner');
};

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));