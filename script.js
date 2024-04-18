const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(cell, index) {
    if (gameState[index] !== '' || !gameActive) return;
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin()) {
        gameActive = false;
        alert(`${currentPlayer} wins!`);
    } else if (!gameState.includes('')) {
        gameActive = false;
        alert('It\'s a draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}


function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

resetBtn.addEventListener('click', resetGame);
