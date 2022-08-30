const user = 'O';
const computer = 'X';
// list of indexes of empty spots on the board
const avail = (reboard) => reboard.filter(s => s !== 'O' && s !== 'X');

// winning combinations using the board indexes
const winning = (board, player) => {
  if (
    (board[0] === player && board[1] === player && board[2] === player)
        || (board[3] === player && board[4] === player && board[5] === player)
        || (board[6] === player && board[7] === player && board[8] === player)
        || (board[0] === player && board[3] === player && board[6] === player)
        || (board[1] === player && board[4] === player && board[7] === player)
        || (board[2] === player && board[5] === player && board[8] === player)
        || (board[0] === player && board[4] === player && board[8] === player)
        || (board[2] === player && board[4] === player && board[6] === player)
  ) {
    return true;
  }
  return false;
};
winning();
user();
avail();
computer();