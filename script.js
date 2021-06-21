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

const timesSign = `<i class="fas fa-times icon option-times"></i>`;
const circleSign = `<i class="far fa-circle icon option-circle"></i>`;

let squares = [...document.querySelectorAll('.square')];

let humanPlayerSignIndexesArray = [];
let aiSignIndexesArray = [];

// aside panel with options after game with other human player
const resetOptionsPanel = document.querySelector('.reset');
const playAgainOptionIcon = document.querySelector('.reset__option-1');
const changeNamesOptionIcon = document.querySelector('.reset__option-2');
const backToMainMenuIcons = document.querySelectorAll('.reset__option-3');

// aside panel with options after game with AI
const resetOptionsPanelAfterGameWithAI = document.querySelector('.reset__ai-game');
const playAgainWithAIOptionIcon = document.querySelector('.reset__ai-game-option-1');

const gameInfo = {
  opponentIsHuman: '',
  firstPlayerName: '',
  secondPlayerName: '',
  firstPlayerOption: '',
  secondPlayerOption: '',
  aiOption: '',
  nextOption: true,
  turn: 0,
  dangerForAI: false,
  isWinner: false,
}

let boardAreas = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

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

function showResults() {
  bgcDisabled.style.display = 'block';
  
  // results after game with other human player
  if(gameInfo.opponentIsHuman) {
    resetOptionsPanel.classList.add('active');
    if(gameInfo.isWinner === true && gameInfo.nextOption !== gameInfo.firstPlayerOption) {
      instruction.innerHTML = `<p>WINNER: <span class="info-name">${gameInfo.firstPlayerName}!</span></p>`;
      return;
    } else if(gameInfo.isWinner === true && gameInfo.nextOption === gameInfo.firstPlayerOption){
      instruction.innerHTML = `<p>WINNER: <span class="info-name">${gameInfo.secondPlayerName}!</span></p>`;
      return;
    } else if(gameInfo.isWinner === false && gameInfo.turn === 9) {
      instruction.innerHTML = `<p>TIE!</p>`;
      return;
    }
  } 
  // results after game with AI
  else {
    resetOptionsPanelAfterGameWithAI.classList.add('active');
    if(gameInfo.isWinner === true && gameInfo.nextOption !== gameInfo.firstPlayerOption) {
      instruction.innerHTML = `<p>WINNER: <span class="info-name">YOU!</span></p>`;
      return;
    } else if(gameInfo.isWinner === true && gameInfo.nextOption === gameInfo.firstPlayerOption){
      instruction.innerHTML = `<p>WINNER: <span class="info-name">COMPUTER</span></p>`;
      return;
    } else if(gameInfo.isWinner === false && (gameInfo.turn === 9 || gameInfo.turn === 10)) {
      instruction.innerHTML = `<p>TIE!</p>`;
      return;
    }
  }
  gameInfo.nextOption = '';
  gameInfo.turn = 0;
}

function check() {
  // overhead
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

  // upright
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

  // diagonal
  else if((boardAreas[0][0] === 0 && boardAreas[1][1] === 0 && boardAreas[2][2] === 0) || (boardAreas[0][0] === 1 && boardAreas[1][1] === 1 && boardAreas[2][2] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }
  else if((boardAreas[2][0] === 0 && boardAreas[1][1] === 0 && boardAreas[0][2] === 0) || (boardAreas[2][0] === 1 && boardAreas[1][1] === 1 && boardAreas[0][2] === 1)) {
    gameInfo.isWinner = true;
    showResults();
  }

  // draw condition
  else if(gameInfo.isWinner === false && (gameInfo.turn === 9 || gameInfo.turn === 10)) {
    showResults();
  }
}

function infoNextAIOrSecondPlayer() {
  gameInfo.opponentIsHuman ? instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span>'s turn:</p>` : instruction.innerHTML = `<p><span class="info-name">AI's</span> turn:</p>`;
}

function infoNextFirstPlayer() {
  gameInfo.opponentIsHuman ? instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span>'s turn:</p>` : instruction.innerHTML = `<p><span class="info-name">Your</span> turn:</p>`;
}

function aiTakeOrTryTakeMiddleSquare() {
  if(squares[4].innerHTML === '') {
    gameInfo.aiOption ? squares[4].innerHTML = timesSign : squares[4].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][1] = 1 : boardAreas[1][1] = 0;
    gameInfo.nextOption = !gameInfo.nextOption;
    gameInfo.turn++;
    check();
    playWithAI();
    return;
  }
}

function aiTakeEmptyRandomCornerSquare() {
  let cornerSquares = [squares[0], squares[2], squares[6], squares[8]];
  let freeCornerSquares = [];
  
  cornerSquares.map(sq => {
    if(sq.innerHTML === '') {
      freeCornerSquares.push(sq);
    }
  }) 

  // draw one of the four corners
  let randomCornerSquareIndex = Math.floor(Math.random() * freeCornerSquares.length);
  gameInfo.aiOption ? freeCornerSquares[randomCornerSquareIndex].innerHTML = timesSign : freeCornerSquares[randomCornerSquareIndex].innerHTML = circleSign;

  switch(true) {
    case (freeCornerSquares[randomCornerSquareIndex].dataset.row === "0" && freeCornerSquares[randomCornerSquareIndex].dataset.column === "0"): {
      gameInfo.aiOption ? boardAreas[0][0] = 1 : boardAreas[0][0] = 0;
      gameInfo.nextOption = !gameInfo.nextOption;
      gameInfo.turn++;
      check();
      playWithAI();
      break;
    }
    case (freeCornerSquares[randomCornerSquareIndex].dataset.row === "0" && freeCornerSquares[randomCornerSquareIndex].dataset.column === "2"): {
      gameInfo.aiOption ? boardAreas[0][2] = 1 : boardAreas[0][2] = 0;
      gameInfo.nextOption = !gameInfo.nextOption;
      gameInfo.turn++;
      check();
      playWithAI();
      break;
    }
    case (freeCornerSquares[randomCornerSquareIndex].dataset.row === "2" && freeCornerSquares[randomCornerSquareIndex].dataset.column === "0"): {
      gameInfo.aiOption ? boardAreas[2][0] = 1 : boardAreas[2][0] = 0;
      gameInfo.nextOption = !gameInfo.nextOption;
      gameInfo.turn++;
      check();
      playWithAI();
      break;
    }
    default: {
      gameInfo.aiOption ? boardAreas[2][2] = 1 : boardAreas[2][2] = 0;
      gameInfo.nextOption = !gameInfo.nextOption;
      gameInfo.turn++;
      check();
      playWithAI();
      break;
    }
  }
}

function getIndexesOfHuman() {
  humanPlayerSignIndexesArray = [];

  squares.forEach(sq => {
    if(gameInfo.firstPlayerOption ? sq.innerHTML === timesSign : sq.innerHTML === circleSign) {
      const indexOfHumanSign = squares.indexOf(sq);
      humanPlayerSignIndexesArray.push(indexOfHumanSign);
    } 
  })
}

function getIndexesOfAI() {
  aiSignIndexesArray = [];

  squares.forEach(sq => {
    if(gameInfo.aiOption ? sq.innerHTML === timesSign : sq.innerHTML === circleSign) {
      const indexOfAISign = squares.indexOf(sq);
      aiSignIndexesArray.push(indexOfAISign);
    } 
  })
}

function performActionsToGiveMoveToOpponent() {
  gameInfo.dangerForAI = false;
  gameInfo.nextOption = !gameInfo.nextOption;
  gameInfo.turn++;
  check();
  playWithAI();
}

function getRandomSquare() {
  if(boardAreas[0][0] === '') {
    if(gameInfo.aiOption === false) {
      squares[0].innerHTML = circleSign;
      boardAreas[0][0] = 0;
    } else {
      squares[0].innerHTML = timesSign;
      boardAreas[0][0] = 1;
    }
    return;
  }
  if(boardAreas[0][1] === '') {
    if(gameInfo.aiOption === false) {
      squares[1].innerHTML = circleSign;
      boardAreas[0][1] = 0;
    } else {
      squares[1].innerHTML = timesSign;
      boardAreas[0][1] = 1;
    }
    return;
  }
  if(boardAreas[0][2] === '') {
    if(gameInfo.aiOption === false) {
      squares[2].innerHTML = circleSign;
      boardAreas[0][2] = 0;
    } else {
      squares[2].innerHTML = timesSign;
      boardAreas[0][2] = 1;
    }
    return;
  }
  if(boardAreas[1][0] === '') {
    if(gameInfo.aiOption === false) {
      squares[3].innerHTML = circleSign;
      boardAreas[1][0] = 0;
    } else {
      squares[3].innerHTML = timesSign;
      boardAreas[1][0] = 1;
    }
    return;
  }
  if(boardAreas[1][1] === '') {
    if(gameInfo.aiOption === false) {
      squares[4].innerHTML = circleSign;
      boardAreas[1][1] = 0;
    } else {
      squares[4].innerHTML = timesSign;
      boardAreas[1][1] = 1;
    }
    return;
  }
  if(boardAreas[1][2] === '') {
    if(gameInfo.aiOption === false) {
      squares[5].innerHTML = circleSign;
      boardAreas[1][2] = 0;
    } else {
      squares[5].innerHTML = timesSign;
      boardAreas[1][2] = 1;
    }
    return;
  }
  if(boardAreas[2][0] === '') {
    if(gameInfo.aiOption === false) {
      squares[6].innerHTML = circleSign;
      boardAreas[2][0] = 0;
    } else {
      squares[6].innerHTML = timesSign;
      boardAreas[2][0] = 1;
    }
    return;
  }
  if(boardAreas[2][1] === '') {
    if(gameInfo.aiOption === false) {
      squares[7].innerHTML = circleSign;
      boardAreas[2][1] = 0;
    } else {
      squares[7].innerHTML = timesSign;
      boardAreas[2][1] = 1;
    }
    return;
  }
  if(boardAreas[2][2] === '') {
    if(gameInfo.aiOption === false) {
      squares[8].innerHTML = circleSign;
      boardAreas[2][2] = 0;
    } else {
      squares[8].innerHTML = timesSign;
      boardAreas[2][2] = 1;
    }
    return;
  }
}

function checkForDanger() {
  getIndexesOfAI();

  // check horizontal (1, 2, 3) to disable the threat from the enemy
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(1)) && squares[2].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(2)) && squares[1].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(1) && aiSignIndexesArray.includes(2)) && squares[0].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }

  // check horizontal (4, 5, 6) to disable the threat from the enemy
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(3) && aiSignIndexesArray.includes(4)) && squares[5].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(3) && aiSignIndexesArray.includes(5)) && squares[4].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(5)) && squares[3].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }

  // check horizontal (7, 8, 9) to disable the threat from the enemy
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(6) && aiSignIndexesArray.includes(7)) && squares[8].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(6) && aiSignIndexesArray.includes(8)) && squares[7].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(7) && aiSignIndexesArray.includes(8)) && squares[6].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }

  // check vertically (1, 4, 7) to disable the threat from the enemy
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(3)) && squares[6].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(6)) && squares[3].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(3) && aiSignIndexesArray.includes(6)) && squares[0].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }

  // check vertically (2, 5, 8) to disable the threat from the enemy
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(1) && aiSignIndexesArray.includes(4)) && squares[7].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(1) && aiSignIndexesArray.includes(7)) && squares[4].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(7)) && squares[1].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }

  // check vertically (3, 6, 9) to disable the threat from the enemy
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(2) && aiSignIndexesArray.includes(5)) && squares[8].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(2) && aiSignIndexesArray.includes(8)) && squares[5].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(5) && aiSignIndexesArray.includes(8)) && squares[2].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }

  // check diagonally (1, 5, 9) to disable the threat from the enemy
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(4)) && squares[8].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(8)) && squares[0].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }

  // check diagonally (3, 5, 7) to disable the threat from the enemy
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(2) && aiSignIndexesArray.includes(4)) && squares[6].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }
  if(((gameInfo.aiOption && gameInfo.nextOption) || (!gameInfo.aiOption && !gameInfo.nextOption)) && (aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(6)) && squares[2].innerHTML === '') {
    gameInfo.dangerForAI = false;
    return;
  }

  // check horizontal (1, 2, 3)
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(1)) && squares[2].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(2)) && squares[1].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(1) && humanPlayerSignIndexesArray.includes(2)) && squares[0].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }

  // // check horizontal (4, 5, 6)
  if((humanPlayerSignIndexesArray.includes(3) && humanPlayerSignIndexesArray.includes(4)) && squares[5].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(3) && humanPlayerSignIndexesArray.includes(5)) && squares[4].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(4) && humanPlayerSignIndexesArray.includes(5)) && squares[3].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }

  // // check horizontal (7, 8, 9)
  if((humanPlayerSignIndexesArray.includes(6) && humanPlayerSignIndexesArray.includes(7)) && squares[8].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(6) && humanPlayerSignIndexesArray.includes(8)) && squares[7].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(7) && humanPlayerSignIndexesArray.includes(8)) && squares[6].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }

  // // check vertically (1, 4, 7)
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(3)) && squares[6].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(6)) && squares[3].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(3) && humanPlayerSignIndexesArray.includes(6)) && squares[0].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }

  // check vertically (2, 5, 8)
  if((humanPlayerSignIndexesArray.includes(1) && humanPlayerSignIndexesArray.includes(4)) && squares[7].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(1) && humanPlayerSignIndexesArray.includes(7)) && squares[4].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(4) && humanPlayerSignIndexesArray.includes(7)) && squares[1].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }

  // check vertically (3, 6, 9)
  if((humanPlayerSignIndexesArray.includes(2) && humanPlayerSignIndexesArray.includes(5)) && squares[8].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(2) && humanPlayerSignIndexesArray.includes(8)) && squares[5].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(5) && humanPlayerSignIndexesArray.includes(8)) && squares[2].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }

  // diagonally (1, 5, 9)
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(4)) && squares[8].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(8)) && squares[4].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(4) && humanPlayerSignIndexesArray.includes(8)) && squares[0].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  // diagonally (3, 5, 7)
  if((humanPlayerSignIndexesArray.includes(2) && humanPlayerSignIndexesArray.includes(4)) && squares[6].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(2) && humanPlayerSignIndexesArray.includes(6)) && squares[4].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
  if((humanPlayerSignIndexesArray.includes(4) && humanPlayerSignIndexesArray.includes(6)) && squares[2].innerHTML === '') {
    gameInfo.dangerForAI = true;
    return;
  }
}

function aiTakeDefense() {
  // check horizontal (1, 2, 3)
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(1)) && squares[2].innerHTML === '') {
    gameInfo.aiOption ? squares[2].innerHTML = timesSign : squares[2].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][2] = 1 : boardAreas[0][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(1) && humanPlayerSignIndexesArray.includes(2)) && squares[0].innerHTML === '') {
    gameInfo.aiOption ? squares[0].innerHTML = timesSign : squares[0].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][0] = 1 : boardAreas[0][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(2)) && squares[1].innerHTML === '') {
    gameInfo.aiOption ? squares[1].innerHTML = timesSign : squares[1].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][1] = 1 : boardAreas[0][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // check horizontal (4, 5, 6)
  if((humanPlayerSignIndexesArray.includes(3) && humanPlayerSignIndexesArray.includes(4)) && squares[5].innerHTML === '') {
    gameInfo.aiOption ? squares[5].innerHTML = timesSign : squares[5].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][2] = 1 : boardAreas[1][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(4) && humanPlayerSignIndexesArray.includes(5)) && squares[3].innerHTML === '') {
    gameInfo.aiOption ? squares[3].innerHTML = timesSign : squares[3].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][0] = 1 : boardAreas[1][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // check horizontal (7, 8, 9)
  if((humanPlayerSignIndexesArray.includes(6) && humanPlayerSignIndexesArray.includes(7)) && squares[8].innerHTML === '') {
    gameInfo.aiOption ? squares[8].innerHTML = timesSign : squares[8].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][2] = 1 : boardAreas[2][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(6) && humanPlayerSignIndexesArray.includes(8)) && squares[7].innerHTML === '') {
    gameInfo.aiOption ? squares[7].innerHTML = timesSign : squares[7].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][1] = 1 : boardAreas[2][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(7) && humanPlayerSignIndexesArray.includes(8)) && squares[6].innerHTML === '') {
    gameInfo.aiOption ? squares[6].innerHTML = timesSign : squares[6].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][0] = 1 : boardAreas[2][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // check vertically (1, 4, 7)
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(3)) && squares[6].innerHTML === '') {
    gameInfo.aiOption ? squares[6].innerHTML = timesSign : squares[6].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][0] = 1 : boardAreas[2][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(6)) && squares[3].innerHTML === '') {
    gameInfo.aiOption ? squares[3].innerHTML = timesSign : squares[3].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][0] = 1 : boardAreas[1][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(3) && humanPlayerSignIndexesArray.includes(6)) && squares[0].innerHTML === '') {
    gameInfo.aiOption ? squares[0].innerHTML = timesSign : squares[0].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][0] = 1 : boardAreas[0][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // check vertically (2, 5, 8)
  if((humanPlayerSignIndexesArray.includes(1) && humanPlayerSignIndexesArray.includes(4)) && squares[7].innerHTML === '') {
    gameInfo.aiOption ? squares[7].innerHTML = timesSign : squares[7].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][1] = 1 : boardAreas[2][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(4) && humanPlayerSignIndexesArray.includes(7)) && squares[1].innerHTML === '') {
    gameInfo.aiOption ? squares[1].innerHTML = timesSign : squares[1].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][1] = 1 : boardAreas[0][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // check vertically (3, 6, 9)
  if((humanPlayerSignIndexesArray.includes(2) && humanPlayerSignIndexesArray.includes(5)) && squares[8].innerHTML === '') {
    gameInfo.aiOption ? squares[8].innerHTML = timesSign : squares[8].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][2] = 1 : boardAreas[2][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(2) && humanPlayerSignIndexesArray.includes(8)) && squares[5].innerHTML === '') {
    gameInfo.aiOption ? squares[5].innerHTML = timesSign : squares[5].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][2] = 1 : boardAreas[1][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(5) && humanPlayerSignIndexesArray.includes(8)) && squares[2].innerHTML === '') {
    gameInfo.aiOption ? squares[2].innerHTML = timesSign : squares[2].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][2] = 1 : boardAreas[0][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // diagonally (1, 5, 9)
  if((humanPlayerSignIndexesArray.includes(0) && humanPlayerSignIndexesArray.includes(4)) && squares[8].innerHTML === '') {
    gameInfo.aiOption ? squares[8].innerHTML = timesSign : squares[8].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][2] = 1 : boardAreas[2][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(4) && humanPlayerSignIndexesArray.includes(8)) && squares[0].innerHTML === '') {
    gameInfo.aiOption ? squares[0].innerHTML = timesSign : squares[0].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][0] = 1 : boardAreas[0][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // diagonally (3, 5, 7)
  if((humanPlayerSignIndexesArray.includes(2) && humanPlayerSignIndexesArray.includes(4)) && squares[6].innerHTML === '') {
    gameInfo.aiOption ? squares[6].innerHTML = timesSign : squares[6].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][0] = 1 : boardAreas[2][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((humanPlayerSignIndexesArray.includes(4) && humanPlayerSignIndexesArray.includes(6)) && squares[2].innerHTML === '') {
    gameInfo.aiOption ? squares[2].innerHTML = timesSign : squares[2].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][2] = 1 : boardAreas[0][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
}

function aiTakeYourBestMove() {
  getIndexesOfAI();

  // attack horizontal (1, 2, 3)
  if((aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(1)) && squares[2].innerHTML === '') {
    gameInfo.aiOption ? squares[2].innerHTML = timesSign : squares[2].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][2] = 1 : boardAreas[0][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(1) && aiSignIndexesArray.includes(2)) && squares[0].innerHTML === '') {
    gameInfo.aiOption ? squares[0].innerHTML = timesSign : squares[0].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][0] = 1 : boardAreas[0][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(2)) && squares[1].innerHTML === '') {
    gameInfo.aiOption ? squares[1].innerHTML = timesSign : squares[1].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][1] = 1 : boardAreas[0][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // attack horizontal (4, 5, 6)
  if((aiSignIndexesArray.includes(3) && aiSignIndexesArray.includes(4)) && squares[5].innerHTML === '') {
    gameInfo.aiOption ? squares[5].innerHTML = timesSign : squares[5].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][2] = 1 : boardAreas[1][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(5)) && squares[3].innerHTML === '') {
    gameInfo.aiOption ? squares[3].innerHTML = timesSign : squares[3].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][0] = 1 : boardAreas[1][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // attack horizontal (7, 8, 9)
  if((aiSignIndexesArray.includes(6) && aiSignIndexesArray.includes(7)) && squares[8].innerHTML === '') {
    gameInfo.aiOption ? squares[8].innerHTML = timesSign : squares[8].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][2] = 1 : boardAreas[2][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(6) && aiSignIndexesArray.includes(8)) && squares[7].innerHTML === '') {
    gameInfo.aiOption ? squares[7].innerHTML = timesSign : squares[7].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][1] = 1 : boardAreas[2][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(7) && aiSignIndexesArray.includes(8)) && squares[6].innerHTML === '') {
    gameInfo.aiOption ? squares[6].innerHTML = timesSign : squares[6].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][0] = 1 : boardAreas[2][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // attack vertically (1, 4, 7)
  if((aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(3)) && squares[6].innerHTML === '') {
    gameInfo.aiOption ? squares[6].innerHTML = timesSign : squares[6].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][0] = 1 : boardAreas[2][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(6)) && squares[3].innerHTML === '') {
    gameInfo.aiOption ? squares[3].innerHTML = timesSign : squares[3].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][0] = 1 : boardAreas[1][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(3) && aiSignIndexesArray.includes(6)) && squares[0].innerHTML === '') {
    gameInfo.aiOption ? squares[0].innerHTML = timesSign : squares[0].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][0] = 1 : boardAreas[0][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // attack vertically (2, 5, 8)
  if((aiSignIndexesArray.includes(1) && aiSignIndexesArray.includes(4)) && squares[7].innerHTML === '') {
    gameInfo.aiOption ? squares[7].innerHTML = timesSign : squares[7].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][1] = 1 : boardAreas[2][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(7)) && squares[1].innerHTML === '') {
    gameInfo.aiOption ? squares[1].innerHTML = timesSign : squares[1].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][1] = 1 : boardAreas[0][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // attack vertically (3, 6, 9)
  if((aiSignIndexesArray.includes(2) && aiSignIndexesArray.includes(5)) && squares[8].innerHTML === '') {
    gameInfo.aiOption ? squares[8].innerHTML = timesSign : squares[8].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][2] = 1 : boardAreas[2][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(2) && aiSignIndexesArray.includes(8)) && squares[5].innerHTML === '') {
    gameInfo.aiOption ? squares[5].innerHTML = timesSign : squares[5].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][2] = 1 : boardAreas[1][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(5) && aiSignIndexesArray.includes(8)) && squares[2].innerHTML === '') {
    gameInfo.aiOption ? squares[2].innerHTML = timesSign : squares[2].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][2] = 1 : boardAreas[0][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // attack diagonally (1, 5, 9)
  if((aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(4)) && squares[8].innerHTML === '') {
    gameInfo.aiOption ? squares[8].innerHTML = timesSign : squares[8].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][2] = 1 : boardAreas[2][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(8)) && squares[0].innerHTML === '') {
    gameInfo.aiOption ? squares[0].innerHTML = timesSign : squares[0].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][0] = 1 : boardAreas[0][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // attack diagonally (3, 5, 7)
  if((aiSignIndexesArray.includes(2) && aiSignIndexesArray.includes(4)) && squares[6].innerHTML === '') {
    gameInfo.aiOption ? squares[6].innerHTML = timesSign : squares[6].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][0] = 1 : boardAreas[2][0] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }
  if((aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(6)) && squares[2].innerHTML === '') {
    gameInfo.aiOption ? squares[2].innerHTML = timesSign : squares[2].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][2] = 1 : boardAreas[0][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  // other conditions
  if((aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(8)) && squares[7].innerHTML === '') {
    gameInfo.aiOption ? squares[7].innerHTML = timesSign : squares[7].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][1] = 1 : boardAreas[2][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  if((aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(8)) && squares[5].innerHTML === '') {
    gameInfo.aiOption ? squares[5].innerHTML = timesSign : squares[5].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[1][2] = 1 : boardAreas[1][2] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  if((aiSignIndexesArray.includes(4) && aiSignIndexesArray.includes(6)) && squares[7].innerHTML === '') {
    gameInfo.aiOption ? squares[7].innerHTML = timesSign : squares[7].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[2][1] = 1 : boardAreas[2][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  if((aiSignIndexesArray.includes(2) && aiSignIndexesArray.includes(4)) && squares[1].innerHTML === '') {
    gameInfo.aiOption ? squares[1].innerHTML = timesSign : squares[1].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][1] = 1 : boardAreas[0][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  if((aiSignIndexesArray.includes(0) && aiSignIndexesArray.includes(4)) && squares[1].innerHTML === '') {
    gameInfo.aiOption ? squares[1].innerHTML = timesSign : squares[1].innerHTML = circleSign;
    gameInfo.aiOption ? boardAreas[0][1] = 1 : boardAreas[0][1] = 0;
    performActionsToGiveMoveToOpponent()
    return;
  }

  else {
    getRandomSquare();
    performActionsToGiveMoveToOpponent();
    return;
  }
}

function moveAIStandardMove() {
  getIndexesOfHuman();
  checkForDanger();
  gameInfo.dangerForAI ? aiTakeDefense() : aiTakeYourBestMove();
}

function moveAISecondMove() {
  getIndexesOfHuman();
  checkForDanger();
  gameInfo.dangerForAI ? aiTakeDefense() : aiTakeEmptyRandomCornerSquare();
}

function moveAIFirstMove() {
  if(gameInfo.aiOption) {
    aiTakeOrTryTakeMiddleSquare();
  } else {
    if(squares[4].innerHTML !== '') {
      aiTakeEmptyRandomCornerSquare();
      playWithAI();
    } else {
      aiTakeOrTryTakeMiddleSquare();
    }
  }
  infoNextFirstPlayer();
  check();
}

function prepareGameWithOpponent() {
  if(gameInfo.opponentIsHuman) {
    play();
  } else {
    gameInfo.firstPlayerOption ? infoNextFirstPlayer() : infoNextAIOrSecondPlayer();
    gameInfo.turn++;
    playWithAI();
  }
}

function playWithAI() {
  // listening for an event that needs to happen without a click
  (!gameInfo.firstPlayerOption && gameInfo.turn === 1) && moveAIFirstMove();  

  squares.forEach(square => {
    square.addEventListener('click', function(event) {

      if(gameInfo.isWinner === true || gameInfo.isWinner === false && gameInfo.turn === 9) {
        gameInfo.turn = 0;
        return;
      }

      const { row, column } = event.target.dataset;
      
      if(square.innerHTML !== '') {
        gameInfo.nextOption = gameInfo.nextOption;
        return;
      } else {
        gameInfo.firstPlayerOption ? square.innerHTML = timesSign : square.innerHTML = circleSign;
        gameInfo.firstPlayerOption ? boardAreas[row][column] = 1 : boardAreas[row][column] = 0;
        gameInfo.firstPlayerOption ? infoNextAIOrSecondPlayer() : infoNextFirstPlayer();
        gameInfo.nextOption = !gameInfo.nextOption;

        if(gameInfo.turn === 1) {
          check();
          !gameInfo.isWinner && gameInfo.turn++;
          moveAIFirstMove();
          return;
        }
        if(gameInfo.turn === 2) {
          check();
          !gameInfo.isWinner && gameInfo.turn++;
          moveAISecondMove();
          return;
        }
        if(gameInfo.turn === 3) {
          check();
          !gameInfo.isWinner && gameInfo.turn++;
          !gameInfo.aiOption ? moveAISecondMove() : moveAIStandardMove();
          return;
        }
        if(gameInfo.turn === 4) {
          check();
          !gameInfo.isWinner && (gameInfo.turn++ &&  moveAIStandardMove());
          return;
        }
        if(gameInfo.turn === 5) {
          check();
          !gameInfo.isWinner && (gameInfo.turn++ &&  moveAIStandardMove());
          return;
        }
        if(gameInfo.turn === 6) {
          check();
          !gameInfo.isWinner && (gameInfo.turn++ &&  moveAIStandardMove());
          return;
        }
        if(gameInfo.turn === 7) {
          check();
          !gameInfo.isWinner && moveAIStandardMove();
          return;
        }
        if(gameInfo.turn === 8) {
          check();
          !gameInfo.isWinner && (gameInfo.turn++ &&  moveAIStandardMove());
          return;
        }
        if(gameInfo.turn === 9) {
          check();
          return;
        }
      }
    })
  })
}

function play() {
  squares.forEach(square => {
    square.addEventListener('click', function(event) {

      if(gameInfo.isWinner === true || gameInfo.isWinner === false && gameInfo.turn === 9) {
        gameInfo.turn = 0;
        return;
      }

      const { row, column } = event.target.dataset;
      
      if(square.innerHTML !== '') {
        gameInfo.nextOption = gameInfo.nextOption;
        return;
      } else if(gameInfo.firstPlayerOption) {
        gameInfo.nextOption ? square.innerHTML = timesSign : square.innerHTML = circleSign;
        gameInfo.nextOption ? boardAreas[row][column] = 1 : boardAreas[row][column] = 0;
        gameInfo.nextOption ? infoNextAIOrSecondPlayer() : infoNextFirstPlayer();
        
      } else if(!gameInfo.firstPlayerOption) {
        gameInfo.nextOption ? square.innerHTML = timesSign : square.innerHTML = circleSign;
        gameInfo.nextOption ? boardAreas[row][column] = 1 : boardAreas[row][column] = 0;
        gameInfo.nextOption ? infoNextFirstPlayer() : infoNextAIOrSecondPlayer();
      }
      gameInfo.nextOption = !gameInfo.nextOption;
      gameInfo.turn++;
      check();
    })
  }) 
} 

function playTimesWithOpponent() {
  gameInfo.firstPlayerOption = true;
  gameInfo.opponentIsHuman ? gameInfo.secondPlayerOption = false : gameInfo.aiOption = false;
  gameInfo.nextOption = true;
  iconsPanel.style.display = 'none';
  board.style.display = 'grid';
  gameInfo.opponentIsHuman && infoNextFirstPlayer();
  prepareGameWithOpponent();
}

function playCircleWithOpponent() {
  gameInfo.firstPlayerOption = false;
  gameInfo.opponentIsHuman ? gameInfo.secondPlayerOption = true : gameInfo.aiOption = true;
  // circle always starts game
  gameInfo.nextOption = true;
  iconsPanel.style.display = 'none';
  board.style.display = 'grid';
  gameInfo.opponentIsHuman && infoNextAIOrSecondPlayer();
  prepareGameWithOpponent();
}

function playRandomSignWithOpponent() {
  const max = 1;
  const min = 0;
  const number = Math.floor(Math.random()*(max - min + 1) + min);
  console.log(number);
  if(number === 1) {
    gameInfo.firstPlayerOption = true;
    gameInfo.opponentIsHuman ? gameInfo.secondPlayerOption = false : gameInfo.aiOption = false;
    gameInfo.opponentIsHuman && infoNextFirstPlayer();
    board.style.display = 'grid';
    prepareGameWithOpponent();
  } else {
    gameInfo.firstPlayerOption = false;
    gameInfo.opponentIsHuman ? gameInfo.secondPlayerOption = true : gameInfo.aiOption = true;
    gameInfo.opponentIsHuman && infoNextAIOrSecondPlayer();
    board.style.display = 'grid';
    prepareGameWithOpponent();
  }
  iconsPanel.style.display = 'none';
}

function resetGameInfo() {
  gameInfo.opponentIsHuman = '';
  gameInfo.firstPlayerName = '';
  gameInfo.secondPlayerName = '';
  gameInfo.firstPlayerOption = '';
  gameInfo.secondPlayerOption = '';
  gameInfo.nextOption = true;
  gameInfo.turn = 0;
  gameInfo.dangerForAI = false;

  humanPlayerSignIndexesArray = [];
  aiSignIndexesArray = [];

  resetOptionsPanel.classList.remove('active');
  resetOptionsPanelAfterGameWithAI.classList.remove('active');
  
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
}

function addListenerOnSigns() {
  optionTimesIcon.addEventListener('click', playTimesWithOpponent);
  optionCircleIcon.addEventListener('click', playCircleWithOpponent);
  optionRandomIcon.addEventListener('click', playRandomSignWithOpponent);
}

function showOptionsAndInterfaceForTwoPlayers() {
  gameInfo.opponentIsHuman = true;
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
  addListenerOnSigns();
}

function showOptionsAndInterfaceForGameWithAi() {
  resetGameInfo();
  gameInfo.opponentIsHuman = false;

  instruction.textContent = `Choose one option`;
  playerIcon.style.transform = 'scale(0)';
  aiIcon.style.transform = 'scale(0)';

  opponentDescriptions.forEach(description => {
    description.style.transform = 'scale(0)';
  })

  optionsPanel.style.display = 'none';
  iconsPanel.style.display = 'flex';

  // options CIRCLE, TIMES, RANDOM
  addListenerOnSigns();
}

playerIcon.addEventListener('click', showOptionsAndInterfaceForTwoPlayers);
aiIcon.addEventListener('click', showOptionsAndInterfaceForGameWithAi);

function playAgainTheSameGameWithSecondPlayer() {
  resetOptionsPanel.classList.remove('active');
  gameInfo.opponentIsHuman = true;
  gameInfo.nextOption = true;
  gameInfo.turn = 0;
  bgcDisabled.style.display = 'none';

  squares.forEach(square => {
    square.innerHTML = '';
  })
  
  gameInfo.isWinner = false;
  
  boardAreas = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  if(gameInfo.firstPlayerOption) {
    playTimesWithOpponent();
  } else {
    playCircleWithOpponent();
  }
}

function changeNamesChooseSignAndPlayWithSecondPlayer() {
  resetGameInfo();
  gameInfo.opponentIsHuman = true;
  optionsPanel.style.display = 'flex';
  inputsWrapper.style.display = 'block';
  inputsWrapper.style.transform = 'scale(1)';
  firstGroupInput.style.display = 'block';
  firstGroupInput.style.tranform = 'scale(1)';
  showOptionsAndInterfaceForTwoPlayers();
}

// aside panels after game with second player && after game with AI
playAgainOptionIcon.addEventListener('click', playAgainTheSameGameWithSecondPlayer);
changeNamesOptionIcon.addEventListener('click', changeNamesChooseSignAndPlayWithSecondPlayer);
playAgainWithAIOptionIcon.addEventListener('click', showOptionsAndInterfaceForGameWithAi);

function backToMainMenuFunction() {
  location.reload(true);
}

backToMainMenuIcons.forEach(icon => {
  icon.addEventListener('click', backToMainMenuFunction);
})