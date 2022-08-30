// list of indexes of empty spots on the board
const emptyIndexies = (board) => board.filter(s => s !== 'O' && s !== 'X');
emptyIndexies();