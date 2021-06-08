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

const circleSign = `<i class="fas fa-times icon option-circle"></i>`;
const timesSign = `<i class="fas fa-times icon option-times"></i>`;

const sq_1 = document.querySelector('.sq_1');
const sq_2 = document.querySelector('.sq_2');
const sq_3 = document.querySelector('.sq_3');
const sq_4 = document.querySelector('.sq_4');
const sq_5 = document.querySelector('.sq_5');
const sq_6 = document.querySelector('.sq_6');
const sq_7 = document.querySelector('.sq_7');
const sq_8 = document.querySelector('.sq_8');
const sq_9 = document.querySelector('.sq_9');

const squaresArray = [sq_1, sq_2, sq_3, sq_4, sq_5, sq_6, sq_7, sq_8, sq_9];
let humanPlayerSignIndexesArray = [];

// aside panel with options after game with other human player
const resetOptionsPanel = document.querySelector('.reset');
const playAgainOptionIcon = document.querySelector('.reset__option-1');
const changeNamesOptionIcon = document.querySelector('.reset__option-2');
const playWithComputerOptionIcon = document.querySelector('.reset__option-3');

// aside panel with options after game with AI
const resetOptionsPanelAfterGameWithAI = document.querySelector('.reset__ai-game');
const playAgainWithAIOptionIcon = document.querySelector('.reset__ai-game-option-1');
const playWithHumanOptionIcon = document.querySelector('.reset__ai-game-option-2');

const gameInfo = {
  opponentIsHuman: '',
  firstPlayerName: '',
  secondPlayerName: '',
  firstPlayerOption: '',
  secondPlayerOption: '',
  aiOption: '',
  nextOption: true,
  turn: 0,
  isWinner: false,
}

let boardAreas = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function showGameInfo() {
  if(gameInfo.opponentIsHuman) {
    console.log("opponentIsHuman: " + gameInfo.opponentIsHuman);
    console.log("firstPlayerName: " + gameInfo.firstPlayerName);
    console.log("secondPlayerName: " + gameInfo.secondPlayerName);
    console.log("firstPlayerOption: " + gameInfo.firstPlayerOption);
    console.log("secondPlayerOption: " + gameInfo.secondPlayerOption);
    console.log("nextOption: " + gameInfo.nextOption);
    console.log("turn: " + gameInfo.turn);
    console.log("isWinner: " + gameInfo.isWinner);
    console.log("");
  } else {
    console.log("opponentIsHuman: " + gameInfo.opponentIsHuman);
    console.log("firstPlayerOption: " + gameInfo.firstPlayerOption);
    console.log("aiOption: " + gameInfo.aiOption);
    console.log("nextOption: " + gameInfo.nextOption);
    console.log("turn: " + gameInfo.turn);
    console.log("isWinner: " + gameInfo.isWinner);
    console.log("");
  }
}

function fillBoardAreasAfterAIMovement(randomIndexOfSquare) {
  switch (randomIndexOfSquare) {
    case 0: 
      boardAreas[0][0] = 0;
      break;
    case 1: 
      boardAreas[0][1] = 0;
      break;
    case 2: 
      boardAreas[0][2] = 0;
      break;
    case 3: 
      boardAreas[1][0] = 0;
      break;
    case 4: 
      boardAreas[1][1] = 0;
      break;
    case 5: 
      boardAreas[1][2] = 0;
      break;
    case 6: 
      boardAreas[2][0] = 0;
      break;
    case 7: 
      boardAreas[2][1] = 0;
      break;
    case 8: 
      boardAreas[2][2] = 0;
      break;
    default:
      return;
  }
}

function moveAIXTurn4() {
  let difference = humanPlayerSignIndexesArray.sort((a, b) => {
    return b - a;
  });
  difference = difference.join("-");
  difference = eval(difference);
  console.log("difference: " + difference);

  // diagonal circle on [3, 5] and [7, 5]
  if(difference === 2 && (humanPlayerSignIndexesArray[0] === 2 || humanPlayerSignIndexesArray[0] === 4)) {
    sq_7.innerHTML = timesSign;
    boardAreas[2][0] = 0;
  }
  else if(difference === 2 && (humanPlayerSignIndexesArray[0] === 2 || humanPlayerSignIndexesArray[0] === 6)) {
    sq_3.innerHTML = timesSign;
    boardAreas[0][2] = 0;
  }

  // diagonal circle on [1, 5] and [9, 5]
  else if(difference === 4 && (humanPlayerSignIndexesArray[0] === 0 || humanPlayerSignIndexesArray[0] === 4)) {
    sq_9.innerHTML = timesSign;
    boardAreas[2][2] = 0;
  }
  else if(difference === 4 && (humanPlayerSignIndexesArray[0] === 4 || humanPlayerSignIndexesArray[0] === 8)) {
    sq_1.innerHTML = timesSign;
    boardAreas[0][0] = 0;
  }

  // overhead circle on [1, 2] and [3, 2] first line
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 0 || humanPlayerSignIndexesArray[0] === 1)) {
    sq_3.innerHTML = timesSign;
    boardAreas[0][2] = 0;
  }
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 1 || humanPlayerSignIndexesArray[0] === 2)) {
    sq_1.innerHTML = timesSign;
    boardAreas[0][0] = 0;
  }

  // overhead circle on [4, 5] and [5, 4] second line
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 3 || humanPlayerSignIndexesArray[0] === 4)) {
    sq_6.innerHTML = timesSign;
    boardAreas[1][2] = 0;
  }
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 5 || humanPlayerSignIndexesArray[0] === 4)) {
    sq_4.innerHTML = timesSign;
    boardAreas[1][0] = 0;
  }

  // overhead circle on [7, 8] and [9, 8] third line
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 6 || humanPlayerSignIndexesArray[0] === 7)) {
    sq_9.innerHTML = timesSign;
    boardAreas[2][2] = 0;
  }
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 8 || humanPlayerSignIndexesArray[0] === 7)) {
    sq_7.innerHTML = timesSign;
    boardAreas[0][2] = 0;
  }

  // upright circle on [1, 4] and [7, 4] first column
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 0 || humanPlayerSignIndexesArray[0] === 3)) {
    sq_7.innerHTML = timesSign;
    boardAreas[0][2] = 0;
  }
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 6 || humanPlayerSignIndexesArray[0] === 3)) {
    sq_1.innerHTML = timesSign;
    boardAreas[0][0] = 0;
  }

  // upright circle on [2, 5] and [8, 5] second column
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 1 || humanPlayerSignIndexesArray[0] === 4)) {
    sq_8.innerHTML = timesSign;
    boardAreas[2][1] = 0;
  }
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 7 || humanPlayerSignIndexesArray[0] === 4)) {
    sq_2.innerHTML = timesSign;
    boardAreas[0][1] = 0;
  }

  // upright circle on [3, 6] and [9, 6] third column
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 2 || humanPlayerSignIndexesArray[0] === 5)) {
    sq_9.innerHTML = timesSign;
    boardAreas[2][2] = 0;
  }
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 8 || humanPlayerSignIndexesArray[0] === 5)) {
    sq_3.innerHTML = timesSign;
    boardAreas[0][2] = 0;
  }

  // sq_5 has cross and circles are on sq_2 & sq_4 || sq_2 & sq_6 || sq_4 & sq_8 || sq_8 & sq_6
  else if(difference === 2 || difference === 4) {
    // difference === 2 ? sq_7.innerHTML = timesSign : sq_3.innerHTML = timesSign;
    if(difference === 2 && (humanPlayerSignIndexesArray.includes(3) || humanPlayerSignIndexesArray.includes(5))) {
      sq_7.innerHTML = timesSign;
      boardAreas[2][0] = 0;
    } else {
      sq_3.innerHTML = timesSign;
      boardAreas[0][2] = 0;
    }
  }

  // circles on sq_1 & sq_7 || sq_3 & sq_9
  else if(difference === 6) {
    if(humanPlayerSignIndexesArray.includes(0) || humanPlayerSignIndexesArray.includes(5)) {
      sq_4.innerHTML = timesSign;
      boardAreas[1][0] = 0;
    } else {
      sq_6.innerHTML = timesSign;
      boardAreas[1][2] = 0;
    }
  }
}

function moveAIXTurn6() {
  
    console.log("HURAAAAAAAAAAAAAAAA")

  // humanPlayerSignIndexesArray = [];

  // squaresArray.forEach(sq => {
  //   if((sq.innerHTML === `<i class="far fa-circle icon option-circle"></i>`) && gameInfo.turn === 5) {
  //     console.log(squaresArray.indexOf(sq)) // DZIAŁA !!!! :)
  //     const indexOfHumanSign = squaresArray.indexOf(sq);
  //     humanPlayerSignIndexesArray.push(indexOfHumanSign);
  //   } 
  // })

  // difference już tutaj nie zadziała

  // 0. jeśli komp ma już dwa krzyżyki po diagonalu lun indeksy dwóch obok siebie i ma turę i wolne miejsce, to niech postawi trzeci krzyżyk i wygra

  // 1. tutaj trzeba już sprawdzać czy te 3 liczby (3 Kółka) w tablicy mają indeksy obok siebie np. 4, 0, 1. Jeśli tak to postawić tam krzyżyk, który przeszkodzi wygranej. 
  
  // 2. A jeśli nie ma takich indeksów obok siebie to postawić tam krzyżyk gdzie są dwa krzyżyki z indeksami obok siebie albo po diagonalu.


  // obok siebie wertykalnie - różnica 1
  // if((Math.abs(humanPlayerSignIndexesArray[0] - humanPlayerSignIndexesArray[1]) === 1) || (Math.abs(humanPlayerSignIndexesArray[2] - humanPlayerSignIndexesArray[1]) === 1) || (Math.abs(humanPlayerSignIndexesArray[0] - humanPlayerSignIndexesArray[2]) === 1)) {
  //   console.log("GGGGGGGGGGGGGGGGG")
    
  //   // i jeśli postawiony tam krzyżyk nie istnieje (czyli nie był dany wcześniej)
  // }
  
  console.log(boardAreas);
  
  
}

function moveAIXTurn2() {
  // SECOND TURN
  if(gameInfo.nextOption === false && gameInfo.turn === 1) {
    // board is blocked for 500ms
    bgcDisabled.style.display = 'block';
    if(sq_5.innerHTML === `<i class="far fa-circle icon option-circle"></i>`) {
      // wybierz losowo z pól  0, 1, 2, 3, 5, 6, 7, 8, 9 i postaw na jednym z tych pól krzyżyk
      let randomIndexOfSquare = Math.floor(Math.random() * squaresArray.length);
      if(randomIndexOfSquare < 0 || randomIndexOfSquare === 4) {
        randomIndexOfSquare = Math.floor(Math.random() * squaresArray.length);
        if(randomIndexOfSquare === 4) {
          sq_7.innerHTML = `<i class="fas fa-times icon option-times"></i>`;
        }
      }
      fillBoardAreasAfterAIMovement(randomIndexOfSquare);
      setTimeout(() => {
      squaresArray[randomIndexOfSquare].innerHTML = `<i class="fas fa-times icon option-times"></i>`;
      gameInfo.turn++;
      bgcDisabled.style.display = 'none';
      check();
      // checkPositions();
      }, 500)
    } else {
      setTimeout(() => {
        sq_5.innerHTML = `<i class="fas fa-times icon option-times"></i>`;
        boardAreas[1][1] = 0;
        instruction.innerHTML = `<p><span class="info-name">YOUR</span> turn:</p>`;
        gameInfo.turn++;
        bgcDisabled.style.display = 'none';
        check();
        // checkPositions();
      }, 500);
    }
  }

  // znajdź wszystkie kółka i przekaż ich indeksy do tablicy humanPlayerSignIndexesArray. Zrób to w 3 turze.
  squaresArray.forEach(sq => {
    if((sq.innerHTML === `<i class="far fa-circle icon option-circle"></i>`) && gameInfo.turn === 3) {
      console.log(squaresArray.indexOf(sq)) // DZIAŁA !!!! :)
      const indexOfHumanSign = squaresArray.indexOf(sq);
      humanPlayerSignIndexesArray.push(indexOfHumanSign);
    } 
  })
  
  // gameInfo.turn += 1;
  console.log(humanPlayerSignIndexesArray);
}

function playWithAI() {
  if(gameInfo.isWinner === true || gameInfo.isWinner === false && gameInfo.turn === 9) {
    gameInfo.nextOption = false;
    gameInfo.turn = 0;
    return;
  } else {
    squares.forEach(square => {
      square.addEventListener('click', function(event) {
        const { row, column } = event.target.dataset;

        if(square.innerHTML !== '') {
          gameInfo.nextOption = gameInfo.nextOption;
          return;
        }

        // jeśli player ma kółko i AI ma krzyżyk i WŁAŚNIE KLIKA  PLAYER!!!!!!!!
        else if(gameInfo.firstPlayerOption === true) {
          gameInfo.nextOption = !gameInfo.nextOption;
          boardAreas[row][column] = 1;
          square.innerHTML = `<i class="far fa-circle icon option-circle"></i>`;
          instruction.innerHTML = `<p><span class="info-name">AI's</span> turn:</p>`;
          gameInfo.turn++;
          check();

          moveAIXTurn2();
          if(gameInfo.turn === 3) {
            moveAIXTurn4();
            // gameInfo.turn++;
          }
          else if(gameInfo.turn === 4) {
            gameInfo.turn++; // turn 5
            moveAIXTurn6();
          }
          
          
          
          showGameInfo();
        }
        // jeśli player ma krzyżyk i AI ma kółko i WŁAŚNIE KLIKA  PLAYER!!!!!!!!
        else if(gameInfo.firstPlayerOption === false) {
          gameInfo.nextOption = !gameInfo.nextOption;
          square.innerHTML = `<i class="far fa-circle icon option-times"></i>`;
          instruction.innerHTML = `<p><span class="info-name">AI's</span> turn:</p>`;
          boardAreas[row][column] = 0;
          gameInfo.turn++;
          check();

          checkPositionsAndMoveAI();
          moveAIXTurn2();
          showGameInfo();
        }
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

function showResults() {
  bgcDisabled.style.display = 'block';
  console.log("WIN!!!!!");
  
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
      instruction.innerHTML = `<p>DRAW!</p>`;
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
    } else if(gameInfo.isWinner === false && gameInfo.turn === 9) {
      instruction.innerHTML = `<p>DRAW!</p>`;
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
  else if(gameInfo.isWinner === false && gameInfo.turn === 9) {
    showResults();
  }
}

function play() {
  if(gameInfo.isWinner === true || gameInfo.isWinner === false && gameInfo.turn === 9) {
    gameInfo.turn = 0;
    return;
  } else {
    squares.forEach(square => {
      square.addEventListener('click', function(event) {
        const { row, column } = event.target.dataset;
        
        if(square.innerHTML !== '') {
          gameInfo.nextOption = gameInfo.nextOption;
          return;
        } else if(gameInfo.firstPlayerOption === true) {
          if(gameInfo.nextOption === true) {
            gameInfo.nextOption = !gameInfo.nextOption;
            square.innerHTML = `<i class="far fa-circle icon option-circle"></i>`;
            instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span> turn:</p>`;
            boardAreas[row][column] = 1;
            gameInfo.turn++;
            check();
            showGameInfo();
          } else {
            gameInfo.nextOption = !gameInfo.nextOption;
            square.innerHTML = `<i class="fas fa-times icon option-times"></i>`;
            instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>`;
            boardAreas[row][column] = 0;
            gameInfo.turn++;
            check();
            showGameInfo(); 
          }
        } else if(gameInfo.firstPlayerOption === false) {
          if(gameInfo.nextOption === true) {
            gameInfo.nextOption = !gameInfo.nextOption;
            square.innerHTML = `<i class="far fa-circle icon option-circle"></i>`;
            instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>`;
            boardAreas[row][column] = 1;
            gameInfo.turn++;
            check();
            showGameInfo();
          } else {
            gameInfo.nextOption = !gameInfo.nextOption;
            square.innerHTML = `<i class="fas fa-times icon option-times"></i>`;
            instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span> turn:</p>`;
            boardAreas[row][column] = 0;
            gameInfo.turn++;
            check();
            showGameInfo();  
          }
        }
      })
    })
  } 
}

function playCircleWithOpponent() {
  gameInfo.firstPlayerOption = true;
  gameInfo.opponentIsHuman ? gameInfo.secondPlayerOption = false : gameInfo.aiOption = false;
  gameInfo.nextOption = true;
  iconsPanel.style.display = 'none';
  board.style.display = 'grid';
  gameInfo.opponentIsHuman ?  instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>` : instruction.innerHTML = `<p><span class="info-name">Your</span> turn:</p>`;
  gameInfo.opponentIsHuman ? play() : playWithAI();
}

function playTimesWithOpponent() {
  gameInfo.firstPlayerOption = false;
  gameInfo.opponentIsHuman ? gameInfo.secondPlayerOption = true : gameInfo.aiOption = true;
  // circle always starts game
  gameInfo.nextOption = true;
  iconsPanel.style.display = 'none';
  board.style.display = 'grid';
  gameInfo.opponentIsHuman ?  instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span> turn:</p>` : instruction.innerHTML = `<p><span class="info-name">AI's</span> turn:</p>`;
  gameInfo.opponentIsHuman ? play() : playWithAI();
}

function playRandomSignWithOpponent() {
  const max = 1;
  const min = 0;
  const number = Math.floor(Math.random()*(max - min + 1) + min);
  console.log(number);
  if(number === 1) {
    gameInfo.firstPlayerOption = true;
    gameInfo.opponentIsHuman ? gameInfo.secondPlayerOption = false : gameInfo.aiOption = false;
    gameInfo.opponentIsHuman ? instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>` : instruction.innerHTML = `<p><span class="info-name">Your</span> turn:</p>`;
    board.style.display = 'grid';
    gameInfo.opponentIsHuman ? play() : playWithAI();
  } else {
    gameInfo.firstPlayerOption = false;
    gameInfo.opponentIsHuman ? gameInfo.secondPlayerOption = true : gameInfo.aiOption = true;
    gameInfo.opponentIsHuman ? instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span> turn:</p>` : instruction.innerHTML = `<p><span class="info-name">AI's</span> turn:</p>`;
    board.style.display = 'grid';
    gameInfo.opponentIsHuman ? play() : playWithAI();
  }
  iconsPanel.style.display = 'none';
}

function resetGameInfo() {
  gameInfo.opponentIsHuman = true;
  gameInfo.firstPlayerName = '';
  gameInfo.secondPlayerName = '';
  gameInfo.firstPlayerOption = '';
  gameInfo.secondPlayerOption = '';
  gameInfo.nextOption = true;
  gameInfo.turn = 0;

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
    playCircleWithOpponent();
  } else {
    playTimesWithOpponent();
  }
}

function changeNamesChooseSignAndPlayWithSecondPlayer() {
  resetGameInfo();
  optionsPanel.style.display = 'flex';
  inputsWrapper.style.display = 'block';
  inputsWrapper.style.transform = 'scale(1)';
  firstGroupInput.style.display = 'block';
  firstGroupInput.style.tranform = 'scale(1)';
  showOptionsAndInterfaceForTwoPlayers();
}

playAgainOptionIcon.addEventListener('click', playAgainTheSameGameWithSecondPlayer);
changeNamesOptionIcon.addEventListener('click', changeNamesChooseSignAndPlayWithSecondPlayer);
playWithComputerOptionIcon.addEventListener('click', showOptionsAndInterfaceForGameWithAi);
playAgainWithAIOptionIcon.addEventListener('click', showOptionsAndInterfaceForGameWithAi);
playWithHumanOptionIcon.addEventListener('click', changeNamesChooseSignAndPlayWithSecondPlayer);