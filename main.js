const instruction = document.querySelector('.instruction');
const optionsPanel = document.querySelector('.options-wrapper');
const playerIcon = document.querySelector('.fa-user');
const aiIcon = document.querySelector('.fa-robot');
const opponentDescriptions = document.querySelectorAll('.icon__description');

const inputsWrapper = document.querySelector('.inputs-wrapper');
const firstGroupInput = document.querySelector('.input_1-group');
const secondGroupInput = document.querySelector('.input_2-group');
const firstPlayerNameInput = document.querySelector('.player_1-name');
const secondPlayerNameInput = document.querySelector('.player_2-name');
const firstPlayerNameError = document.querySelector('.name-1-input_error');
const secondPlayerNameError = document.querySelector('.name-2-input_error');
const checkFirstNameIcon = document.querySelector('.check-name_1');
const checkSecondNameIcon = document.querySelector('.check-name_2');
const iconsPanel = document.querySelector('.icons-wrapper');

const optionCircleIcon = document.querySelector('.option-circle');
const optionTimesIcon = document.querySelector('.option-times');
const optionRandomIcon = document.querySelector('.option-random');

const board = document.querySelector('.board');
const bgcDisabled = document.querySelector('.bgc-disabled');
const squares = document.querySelectorAll('.square');

const resetOptionsPanel = document.querySelector('.reset');
const playAgainOptionIcon = document.querySelector('.reset__option-1');
const changeNamesOptionIcon = document.querySelector('.reset__option-2');
const playWithComputerOptionIcon = document.querySelector('.reset__option-3');

const gameInfo = {
  opponent: '',
  firstPlayerName: '',
  secondPlayerName: '',
  firstPlayerOption: '',
  secondPlayerOption: '',
  actualOption: true,
  turn: 0,
  isWinner: false,
}

let boardAreas = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function showResults() {
  resetOptionsPanel.classList.add('active');

  if(gameInfo.isWinner === true && gameInfo.actualOption !== gameInfo.firstPlayerOption) {
    instruction.innerHTML = `<p>WINNER: <span class="info-name">${gameInfo.firstPlayerName}!</span></p>`;
    bgcDisabled.style.display = 'block';
    gameInfo.turn = 0;
    return;
  } else if(gameInfo.isWinner === true && gameInfo.actualOption === gameInfo.firstPlayerOption){
    instruction.innerHTML = `<p>WINNER: <span class="info-name">${gameInfo.secondPlayerName}!</span></p>`;
    bgcDisabled.style.display = 'block';
    gameInfo.turn = 0;
    return;
  } else if(gameInfo.isWinner === false && gameInfo.turn === 9) {
    instruction.innerHTML = `<p>DRAW!</p>`;
    bgcDisabled.style.display = 'block';
    resetOptionsPanel.classList.add('active');
    gameInfo.turn = 0;
  }
}

function check() {
  // cały poziomy wiersz
  if((boardAreas[0][0] === 0 && boardAreas[0][1] === 0 && boardAreas[0][2] === 0) || (boardAreas[0][0] === 1 && boardAreas[0][1] === 1 && boardAreas[0][2] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }
  else if((boardAreas[1][0] === 0 && boardAreas[1][1] === 0 && boardAreas[1][2] === 0) || (boardAreas[1][0] === 1 && boardAreas[1][1] === 1 && boardAreas[1][2] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }
  else if((boardAreas[2][0] === 0 && boardAreas[2][1] === 0 && boardAreas[2][2] === 0) || (boardAreas[2][0] === 1 && boardAreas[2][1] === 1 && boardAreas[2][2] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }

  // cała pionowa kolumna
  else if((boardAreas[0][0] === 0 && boardAreas[1][0] === 0 && boardAreas[2][0] === 0) || (boardAreas[0][0] === 1 && boardAreas[1][0] === 1 && boardAreas[2][0] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }
  else if((boardAreas[0][1] === 0 && boardAreas[1][1] === 0 && boardAreas[2][1] === 0) || (boardAreas[0][1] === 1 && boardAreas[1][1] === 1 && boardAreas[2][1] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }
  else if((boardAreas[0][2] === 0 && boardAreas[1][2] === 0 && boardAreas[2][2] === 0) || (boardAreas[0][2] === 1 && boardAreas[1][2] === 1 && boardAreas[2][2] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }

  // skosy
  else if((boardAreas[0][0] === 0 && boardAreas[1][1] === 0 && boardAreas[2][2] === 0) || (boardAreas[0][0] === 1 && boardAreas[1][1] === 1 && boardAreas[2][2] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }
  else if((boardAreas[2][0] === 0 && boardAreas[1][1] === 0 && boardAreas[0][2] === 0) || (boardAreas[2][0] === 1 && boardAreas[1][1] === 1 && boardAreas[0][2] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }

  else if(gameInfo.isWinner === false && gameInfo.turn === 9){
    gameInfo.isWinner = false;
    showResults();
    return;
  }
}

function play() {
  if(gameInfo.isWinner === true) {
    gameInfo.turn = 0;
    return;
  } else {
    squares.forEach(square => {
      square.addEventListener('click', function(event) {
        const { row, column } = event.target.dataset;

        if(gameInfo.actualOption === true) {
          if(square.innerHTML !== '') {
            gameInfo.actualOption = gameInfo.actualOption;
            return;
          } else {
            gameInfo.actualOption = !gameInfo.actualOption;
            square.innerHTML = `<i class="far fa-circle icon option-circle"></i>`;
            instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>`;
            boardAreas[row][column] = 1;
            gameInfo.turn++;
            check();
          }
        } else {
          if(square.innerHTML !== '') {
            gameInfo.actualOption = gameInfo.actualOption;
            return;
          } else {
            boardAreas[row][column] = 0;
            gameInfo.actualOption = !gameInfo.actualOption;
            square.innerHTML = `<i class="fas fa-times icon option-times"></i>`;
            instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span> turn:</p>`;
            gameInfo.turn++;
            check();
          }
        }
        console.log(gameInfo.turn);
      })
    })
  } 
}

function checkFirstPlayerName() {
  const firstPlayerNameInputValue = firstPlayerNameInput.value;
  if(firstPlayerNameInputValue === '') {
    firstPlayerNameError.style.transform = 'scale(1)';
    return;
  } else {
    instruction.textContent = `Insert second Player's name`;
    firstGroupInput.style.display = 'none';
    secondGroupInput.style.display = 'block';
    gameInfo.firstPlayerName = firstPlayerNameInputValue;
  }
}

function checkSecondPlayerName() {
  const secondPlayerNameInputValue = secondPlayerNameInput.value;
  if(secondPlayerNameInputValue === '') {
    secondPlayerNameError.style.transform = 'scale(1)';
    return;
  } else {
    instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> can choose one option</p>`;
    optionsPanel.style.display = 'none';
    secondGroupInput.style.display = 'none';
    gameInfo.secondPlayerName = secondPlayerNameInputValue;
    iconsPanel.style.display = 'flex';
  }
}

function playCircleWithSecondPlayer() {
  gameInfo.firstPlayerOption = true;
  gameInfo.secondPlayerOption = false;
  gameInfo.actualOption = true;
  gameInfo.opponent = 'player';

  iconsPanel.style.display = 'none';
  if(gameInfo.firstPlayerOption === true) {
    instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>`;
    board.style.display = 'grid';
    play();
  } else {
    instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span> turn:</p>`;
    board.style.display = 'grid';
    play();
  }
}

function playTimesWithSecondPlayer() {
  gameInfo.firstPlayerOption = false;
  gameInfo.secondPlayerOption = true;
  gameInfo.actualOption = false;
  gameInfo.opponent = 'player';

  board.style.display = 'grid';
  iconsPanel.style.display = 'none';
  if(gameInfo.firstPlayerOption === true) {
    instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>`;
    board.style.display = 'grid';
    play();
  } else {
    instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span> turn:</p>`;
    board.style.display = 'grid';
    play();
  }
}

function playRandomSignWithSecondPlayer() {
  const max = 1;
  const min = 0;
  const number = Math.floor(Math.random()*(max - min + 1) + min);
  if(number === 1) {
    gameInfo.firstPlayerOption = true;
    gameInfo.secondPlayerOption = false;
    gameInfo.actualOption = true;
    gameInfo.opponent = 'player';

    instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>`;
    board.style.display = 'grid';
    play();
  } else {
    gameInfo.firstPlayerOption = false;
    gameInfo.secondPlayerOption = true;
    gameInfo.actualOption = false;

    instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span> turn:</p>`;
    board.style.display = 'grid';
    play();
  }
  iconsPanel.style.display = 'none';
}

function showOptionsAndInterfaceForTwoPlayers() {
  instruction.textContent = `Insert first Player's name`;
  playerIcon.style.transform = 'scale(0)';
  aiIcon.style.transform = 'scale(0)';

  opponentDescriptions.forEach(description => {
    description.style.transform = 'scale(0)';
  })

  inputsWrapper.style.display = 'block';
  inputsWrapper.style.transform = 'scale(1)';

  // checking players' name and showing proper interface
  checkFirstNameIcon.addEventListener('click', checkFirstPlayerName);
  checkSecondNameIcon.addEventListener('click', checkSecondPlayerName);

  // options CIRCLE, TIMES, RANDOM
  optionTimesIcon.addEventListener('click', playTimesWithSecondPlayer);
  optionCircleIcon.addEventListener('click', playCircleWithSecondPlayer);
  optionRandomIcon.addEventListener('click', playRandomSignWithSecondPlayer);
}

function showOptionsAndInterfaceForGameWithComputer() {
  gameInfo.opponent = 'computer';
  playerIcon.style.transform = 'scale(0)';
  aiIcon.style.transform = 'scale(0)';

  opponentDescriptions.forEach(description => {
    description.style.transform = 'scale(0)';
  })

  instruction.innerHTML = `<p>You can choose one option</p>`;
  optionsPanel.style.display = 'none';
  iconsPanel.style.display = 'flex';

  // checking players' name and showing proper interface
  checkFirstNameIcon.addEventListener('click', checkFirstPlayerName);
  checkSecondNameIcon.addEventListener('click', checkSecondPlayerName);

  // options CIRCLE, TIMES, RANDOM
  optionTimesIcon.addEventListener('click', playTimesWithSecondPlayer);
  optionCircleIcon.addEventListener('click', playCircleWithSecondPlayer);
  optionRandomIcon.addEventListener('click', playRandomSignWithSecondPlayer);
}

playerIcon.addEventListener('click', showOptionsAndInterfaceForTwoPlayers);
aiIcon.addEventListener('click', showOptionsAndInterfaceForGameWithComputer);

function playAgainTheSameGameWithSecondPlayer() {
  resetOptionsPanel.classList.remove('active');
  gameInfo.opponent = 'player';
  
  squares.forEach(square => {
    square.innerHTML = '';
  })
  bgcDisabled.style.display = 'none';
  
  gameInfo.isWinner = false;
  
  boardAreas = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  if(gameInfo.firstPlayerOption === 1) {
    playTimesWithSecondPlayer();
  } else {
    playCircleWithSecondPlayer();
  }
}

function changeNamesChooseSignAndPlayWithSecondPlayer() {
  gameInfo.opponent = 'player';
  gameInfo.firstPlayerName = '';
  gameInfo.secondPlayerName = '';
  gameInfo.firstPlayerOption = '';
  gameInfo.secondPlayerOption = '';
  gameInfo.actualOption = true;

  resetOptionsPanel.classList.remove('active');
  
  squares.forEach(square => {
    square.innerHTML = '';
  })
  bgcDisabled.style.display = 'none';
  board.style.display = 'none';
  gameInfo.isWinner = false;

  boardAreas = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  optionsPanel.style.display = 'flex';
  inputsWrapper.style.display = 'block';
  inputsWrapper.style.transform = 'scale(1)';
  firstGroupInput.style.display = 'block';
  firstGroupInput.style.tranform = 'scale(1)';
  showOptionsAndInterfaceForTwoPlayers();
}

playAgainOptionIcon.addEventListener('click', playAgainTheSameGameWithSecondPlayer);
changeNamesOptionIcon.addEventListener('click', changeNamesChooseSignAndPlayWithSecondPlayer);