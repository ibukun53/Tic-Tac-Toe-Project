// selecting required element
const selectBox = document.querySelector('.select-box');
const selectXBtn = selectBox.querySelector('.playerX');
const selectOBtn = selectBox.querySelector('.playerY');
const playBoard = document.querySelector('.play-board');
const allBox = document.querySelectorAll('tr td');
const players = document.querySelector('.players');

window.onload = () => { // once window load
  for (let i = 0; i < allBox.length; i += 1) { // add onclick attribute to all section table
    allBox[i].setAttribute('onclick', 'clickedCell(this)');
  }

  selectXBtn.addEventListener('click', () => {
    selectBox.classList.add('hide');// hide the select box
    playBoard.classList.add('show');// show the select button
  });
  selectOBtn.addEventListener('click', () => {
    selectBox.classList.add('hide');
    playBoard.classList.add('show');
    players.setAttribute('class', 'players active player');
  });
};

const playerXIcon = 'fa fa-times';
const playerOIcon = 'fa fa-circle';
let playerSign = 'X'; // suppose player will be X

// bot click function
function bot() {
  playerSign = 'O';
  // if user has X value in id then bot will have O
  const array = []; // creating an empty array
  for (let i = 0; i < allBox.length; i += 1) {
    if (allBox[i].childElementCount === 0) { // if td has no any child element
      array.push(i);// inserting unselected or unclicked cells indide array section
      // console.log(`${i}`+ '  ' + 'no child element');
    }
  }
  const randomCell = array[Math.floor(Math.random() * array.length)];
  // getting random indexes from array to bot
  if (array.length > 0) {
    if (players.classList.contains('player')) {
      allBox[randomCell].innerHTML += `<i class="${playerXIcon}"></i>`;// adding circle icon tag inside user clicked element
      players.classList.add('active');
      playerSign = 'X';
      allBox[randomCell].setAttribute('id', playerSign);
    } else {
      allBox[randomCell].innerHTML += `<i class="${playerOIcon}"></i>`;
      players.classList.add('active');
      allBox[randomCell].setAttribute('id', playerSign);
    }
  }
  allBox[randomCell].style.pointerEvents = 'none';
  players.style.pointerEvents = 'auto';
}

function selectWinner() {
  const cell0 = document.querySelector('.b0').id;
  const cell1 = document.querySelector('.b1').id;
  const cell2 = document.querySelector('.b2').id;
  const cell3 = document.querySelector('.b3').id;
  const cell4 = document.querySelector('.b4').id;
  const cell5 = document.querySelector('.b5').id;
  const cell6 = document.querySelector('.b6').id;
  const cell7 = document.querySelector('.b7').id;
  const cell8 = document.querySelector('.b8').id;
  if ((cell0 === playerSign && cell1 === playerSign && cell2 === playerSign)
  || (cell3 === playerSign && cell4 === playerSign && cell5 === playerSign)
  || (cell6 === playerSign && cell7 === playerSign && cell8 === playerSign)
  || (cell0 === playerSign && cell4 === playerSign && cell8 === playerSign)
  || (cell2 === playerSign && cell4 === playerSign && cell6 === playerSign)
  || (cell0 === playerSign && cell3 === playerSign && cell6 === playerSign)
  || (cell1 === playerSign && cell4 === playerSign && cell7 === playerSign)
  || (cell2 === playerSign && cell5 === playerSign && cell8 === playerSign)) {
    console.log(`${playerSign}   is the won`);
  }
}
// user click function
function clickedCell(element) {
  playerSign = 'X';
  // player element has contains .player
  if (players.classList.contains('player')) {
    // adding circle icon tag inside user clicked element
    element.innerHTML += `<i class="${playerOIcon}"></i>`;
    players.classList.remove('active');
    playerSign = 'O';
    element.setAttribute('id', playerSign);
  // if player select O then we'll change the playerSign value to O
  } else {
    element.innerHTML += `<i class="${playerXIcon}"></i>`;
    players.classList.remove('active');
    element.setAttribute('id', playerSign);
  }
  selectWinner(); // calling the winner
  // disabling the cell to unclickable after a click
  
  element.style.pointerEvents = 'none';
  // generate randomtime delay so as to delay randoml to select cell
  const randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
  setTimeout(() => {
    bot();// calling bot function
  }, randomDelayTime);// passing random delay time;
}
clickedCell();
