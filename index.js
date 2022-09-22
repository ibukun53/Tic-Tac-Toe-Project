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

section.addEventListener('click', () => { // once window load
  for (let i = 0; i < allBox.length; i += 1) { // add onclick attribute to all section table
    // eslint-disable-next-line no-use-before-define
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
let randomCell;
const playerXIcon = 'fa fa-times';
const playerOIcon = 'fa fa-circle';
let playerSign = 'X'; // suppose player will be X
let runBot = true;

// bot click function
const bot = (runBot) => {
  if (runBot) {
    playerSign = 'O';
    // if user has X value in id then bot will have O
    const array = []; // creating an empty array
    for (let i = 0; i < allBox.length; i += 1) {
      if (allBox[i].childElementCount === 0) { // if td has no any child element
        array.push(i);// inserting unselected or unclicked cells indide array section
      // console.log(`${i}`+ '  ' + 'no child element');
      }
    }
    randomCell = array[Math.floor(Math.random() * array.length)];
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
};

const selectWinner = () => {
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
  // console.log(`${playerSign}   is the won`);
    runBot = false;
    bot(runBot);
    setTimeout(() => { // delay the show result box
      playBoard.classList.remove('show');
      resultBox.classList.add('show');
    }, 700);
    // result box with winner sign
    wonText.innerHTML = `Player  <p>${playerSign}</p>  won the game`;
  } else if (cell0 !== '' && cell1 !== '' && cell2 !== '' && cell3 !== '' && cell4 !== '' && cell5 !== '' && cell6 !== '' && cell7 !== '' && cell8 !== '') {
    runBot = false;
    bot(runBot);
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
  // disabling the cell to unclick after a click
  element.style.pointerEvents = 'none';
  players.style.pointerEvents = 'none';
  // generate randomtime delay so as to delay randoml to select cell
  const randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
  setTimeout(() => {
    bot(runBot);// calling bot function
  }, randomDelayTime);// passing random delay time;
};

replayBtn.addEventListener('click', () => { // relaod the current page
  resultBox.classList.remove('show');
  playBoard.classList.add('show');
  for (let i = 0; i < allBox.length; i += 1) {
    allBox[i].innerHTML = '';
    allBox[i].style.pointerEvents = 'auto';
  }
});