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
let playerSign = 'X';

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
}

// winner result
function getId(idname) {
  return document.querySelector(`#cell${idname}.id`); // returning id names
}
// checking id names
function checkIds(val0, val1, val2, sign) {
  if (getId(val0) === sign && getId(val1) === sign && getId(val2) === sign) {
    return true;
  }
  return false;
}

function selectWinner() {
  if (checkIds(0, 1, 2, playerSign)
  || checkIds(3, 4, 5, playerSign)
  || checkIds(6, 7, 8, playerSign)
  || checkIds(0, 3, 6, playerSign)
  || checkIds(1, 4, 7, playerSign)
  || checkIds(2, 5, 8, playerSign)
  || checkIds(0, 4, 8, playerSign)
  || checkIds(2, 4, 6, playerSign)) {
    console.log(`${playerSign} ` + 'is the winner');
  }
  //
}

// user click function
function clickedCell(element) {
  if (players.classList.contains('player')) {
    // adding circle icon tag inside user clicked element
    element.innerHTML += `<i class="${playerOIcon}"></i>`;
    players.classList.remove('active');
    // if player select O then we'll change the playerSign value to O
    playerSign = 'O';
    element.setAttribute('id', playerSign);
  } else {
    element.innerHTML += `<i class="${playerXIcon}"></i>`;
    players.classList.remove('active');
    element.setAttribute('id', playerSign);
  }
  selectWinner();
  // disabling the cell to unclickable after a click
  element.style.pointerEvents = 'none';
  // generate randomtime delay so as to delay randoml to select cell
  const randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
  setTimeout(() => {
    bot();// calling bot function
  }, randomDelayTime);// passing random delay time;
}
clickedCell();
