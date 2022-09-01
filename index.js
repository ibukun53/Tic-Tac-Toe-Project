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
// bot click function
function bot() {
  const array = []; // creating an empty array
  for (let i = 0; i < allBox.length; i += 1) {
    if (allBox[i].childElementCount === 0) { // if td has no any child element
      array.push(i);// inserting unselected or unclicked cells indide array section
      // console.log(`${i}`+ '  ' + 'no child element');
    }
  }
  const randomCell = array[Math.floor(Math.random() * array.length)];
  // getting random indexes from array to bot
  console.log(randomCell);
  if (array.length > 0) {
    if (players.classList.contains('player')) {
      allBox[randomCell].innerHTML += `<i class="${playerXIcon}"></i>`;// adding circle icon tag inside user clicked element
      players.classList.add('active');
    } else {
      allBox[randomCell].innerHTML += `<i class="${playerOIcon}"></i>`;
      players.classList.add('active');
    }
  }
  allBox[randomCell].style.pointerEvents = 'none';
  //
}

// user click function
function clickedCell(element) {
  if (players.classList.contains('player')) {
    element.innerHTML += `<i class="${playerOIcon}"></i>`;// adding circle icon tag inside user clicked element
    players.classList.add('active');
  } else {
    element.innerHTML += `<i class="${playerXIcon}"></i>`;
    players.classList.add('active');
  }
  element.style.pointerEvents = 'none';//
  // generate randomtimedelay so as to delay randoml to select cell
  const randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
  console.log(randomDelayTime);
  setTimeout(() => {
    bot();// calling bot function
  }, randomDelayTime);// passing random delay time;
}
clickedCell();
