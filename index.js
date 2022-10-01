// selecting required element
const section = document.querySelector('section');
const selectBox = document.querySelector('.select-box');
const selectXBtn = selectBox.querySelector('.playerX');
const selectOBtn = selectBox.querySelector('.playerO');
const playBoard = document.querySelector('.play-board');
const allBox = document.querySelectorAll('tr td');
const players = document.querySelector('.players');
const resultBox = document.querySelector('.result-box');
const wonText = document.querySelector('.win-text');
const replayBtn = document.querySelector('.replay');
let element;

let randomCell;
const playerXIcon = 'fa fa-times';
const playerOIcon = 'fa fa-circle';
const runBot = true;
let playerSignO = 'O';// suppose player will be O
let playerSignX = 'X';// suppose player will be X

// bot click function
const bot = (runBot) => {
  if (runBot) {
    playerSignO = 'O';
    // if user has X value in id then bot will have O
    const array = []; // creating an empty array
    for (let i = 0; i < allBox.length; i += 1) {
      if (allBox[i].childElementCount === 0) { // if td has no any child element
        array.push(i);// inserting unselected or unclicked cells inside array section
      }
    }
    randomCell = array[Math.floor(Math.random() * array.length)];
    // getting random indexes from array to bot
    if (array.length > 0) {
      if (players.classList.contains('player')) {
        allBox[randomCell].innerHTML += `<i class="${playerXIcon}"></i>`;// adding circle icon tag inside user clicked element
        players.classList.add('active');
        playerSignX = 'X';
        allBox[randomCell].setAttribute('data-id', playerSignX);
      } else {
        allBox[randomCell].innerHTML += `<i class="${playerOIcon}"></i>`;
        players.classList.add('active');
        allBox[randomCell].setAttribute('data-id', playerSignO);
        console.log(playerSignO);
      }
    }
    allBox[randomCell].style.pointerEvents = 'none';
    players.style.pointerEvents = 'auto';
  }
};
const selectWinner = () => {
  const cell0 = document.querySelector('.b0').dataset.id;
  const cell1 = document.querySelector('.b1').dataset.id;
  const cell2 = document.querySelector('.b2').dataset.id;
  const cell3 = document.querySelector('.b3').dataset.id;
  const cell4 = document.querySelector('.b4').dataset.id;
  const cell5 = document.querySelector('.b5').dataset.id;
  const cell6 = document.querySelector('.b6').dataset.id;
  const cell7 = document.querySelector('.b7').dataset.id;
  const cell8 = document.querySelector('.b8').dataset.id;
  if ((cell0 === playerSignX && cell1 === playerSignX && cell2 === playerSignX)
  || (cell3 === playerSignX && cell4 === playerSignX && cell5 === playerSignX)
  || (cell6 === playerSignX && cell7 === playerSignX && cell8 === playerSignX)
  || (cell0 === playerSignX && cell4 === playerSignX && cell8 === playerSignX)
  || (cell2 === playerSignX && cell4 === playerSignX && cell6 === playerSignX)
  || (cell0 === playerSignX && cell3 === playerSignX && cell6 === playerSignX)
  || (cell1 === playerSignX && cell4 === playerSignX && cell7 === playerSignX)
  || (cell2 === playerSignX && cell5 === playerSignX && cell8 === playerSignX)) {
  // console.log(`${playerSign}   is the won`);
    setTimeout(() => { // delay the show result box
      playBoard.classList.remove('show');
      resultBox.classList.add('show');
    }, 700);
    // result box with winner sign
    wonText.innerHTML = `Player  <p>${playerSignX}</p>  won the game`;
  } else if ((cell0 === playerSignO && cell1 === playerSignO && cell2 === playerSignO)
  || (cell3 === playerSignO && cell4 === playerSignO && cell5 === playerSignO)
  || (cell6 === playerSignO && cell7 === playerSignO && cell8 === playerSignO)
  || (cell0 === playerSignO && cell4 === playerSignO && cell8 === playerSignO)
  || (cell2 === playerSignO && cell4 === playerSignO && cell6 === playerSignO)
  || (cell0 === playerSignO && cell3 === playerSignO && cell6 === playerSignO)
  || (cell1 === playerSignO && cell4 === playerSignO && cell7 === playerSignO)
  || (cell2 === playerSignO && cell5 === playerSignO && cell8 === playerSignO)) {
    console.log(`${playerSignO}   is the won`);
    setTimeout(() => { // delay the show result box
      playBoard.classList.remove('show');
      resultBox.classList.add('show');
    }, 700);
    // result box with winner sign
    wonText.innerHTML = `Player  <p>${playerSignO}</p>  won the game`;
  } else if (cell0 === '' && cell1 === '' && cell2 === '' && cell3 === '' && cell4 === '' && cell5 === '' && cell6 === '' && cell7 === '' && cell8 !== '') {
    setTimeout(() => { // delay the show result box
      playBoard.classList.remove('show');
      resultBox.classList.add('show');
    }, 700);
    wonText.textContent = 'Match has been drawn!';
  }
};

// user click function
const clickedCell = (event) => {
  element = event.target;
  playerSignX = 'X';
  // player element has contains .player
  if (players.classList.contains('player')) {
    // adding circle icon tag inside user clicked element
    element.innerHTML += `<i class="${playerOIcon}"></i>`;
    players.classList.remove('active');
    playerSignO = 'O';
    element.setAttribute('data-id', playerSignO);
  // if player select O then we'll change the playerSign value to O
  } else {
    element.innerHTML += `<i class="${playerXIcon}"></i>`;
    players.classList.remove('active');
    element.setAttribute('data-id', playerSignX);
  }
  selectWinner(); // calling the winner
  // disabling the cell to unclick after a click
  element.style.pointerEvents = 'none';
  players.style.pointerEvents = 'none';
  // generate randomtime delay so as to delay random to select cell
  const randomDelayTime = ((Math.random() * 200) + 200).toFixed();
  setTimeout(() => {
    bot(runBot);// calling bot function
  }, randomDelayTime);// passing random delay time;
};

section.addEventListener('click', () => { // once window load
  for (let i = 0; i < allBox.length; i += 1) { // add onclick attribute to all section table
    allBox[i].addEventListener('click', clickedCell);
  }

  selectXBtn.addEventListener('click', () => {
    selectBox.classList.add('hide');// hide the select box
    playBoard.classList.add('show');// show the select button
  });
  selectOBtn.addEventListener('click', () => {
    selectBox.classList.add('hide');
    playBoard.classList.add('show');
    players.classList.add('players', 'active', 'player');
  });
});

replayBtn.addEventListener('click', () => {
  resultBox.classList.remove('show');

  playBoard.classList.add('show');
  for (let i = 0; i < allBox.length; i += 1) {
    allBox[i].innerHTML = '';
    allBox[i].style.pointerEvents = 'auto';
    allBox[i].setAttribute('data-id', '');
  }
});