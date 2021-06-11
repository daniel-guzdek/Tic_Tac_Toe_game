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

const circleSign = `<i class="far fa-circle icon option-circle"></i>`;
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

function bestMoveAi() {
  checkBoardAndFillAiIndexesArray();
  let differenceAIArray = aiSignIndexesArray.sort((a, b) => {
    return b - a;
  });
  differenceAIArray = differenceAIArray.join("-");
  differenceAIArray = eval(differenceAIArray);
  console.log("difference: " + differenceAIArray);

  // horizontally 6, 7, 8
  if((differenceAIArray === 1 && aiSignIndexesArray[1] === 7) && sq_7.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_7.innerHTML = timesSign;
      boardAreas[2][0] = 0;
    } else {
      sq_7.innerHTML = circleSign;
      boardAreas[2][0] = 1;
    }
    return;
  }
  // horizontally 4, 5, 6
  if((differenceAIArray === 1 && aiSignIndexesArray[1] === 4) && sq_4.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_4.innerHTML = timesSign;
      boardAreas[1][0] = 0;
    } else {
      sq_4.innerHTML = circleSign;
      boardAreas[1][0] = 1;
    }
    return;
  }
  // horizontally 1, 2, 3
  if((differenceAIArray === 1 && aiSignIndexesArray[1] === 1) && sq_1.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_1.innerHTML = timesSign;
      boardAreas[0][0] = 0;
    } else {
      sq_1.innerHTML = circleSign;
      boardAreas[0][0] = 1;
    }
    return;
  }
  // vertically 1, 4, 7
  if((differenceAIArray === 3 && aiSignIndexesArray[1] === 4) && sq_1.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_1.innerHTML = timesSign;
      boardAreas[0][0] = 0;
    } else {
      sq_1.innerHTML = circleSign;
      boardAreas[0][0] = 1;
    }
    return;
  }
  // vertically 2, 5, 8
  if((differenceAIArray === 3 && aiSignIndexesArray[1] === 4) && sq_2.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_2.innerHTML = timesSign;
      boardAreas[0][1] = 0;
    } else {
      sq_2.innerHTML = circleSign;
      boardAreas[0][1] = 1;
    }
    return;
  }
  // vertically 3, 6, 9
  if((differenceAIArray === 3 && aiSignIndexesArray[1] === 5) && sq_3.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_3.innerHTML = timesSign;
      boardAreas[0][2] = 0;
    } else {
      sq_3.innerHTML = circleSign;
      boardAreas[0][2] = 1;
    }
    return;
  }
  // diagonal 1, 5, 9
  if((differenceAIArray === 4 && aiSignIndexesArray[0] === 9) && sq_1.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_1.innerHTML = timesSign;
      boardAreas[0][0] = 0;
    } else {
      sq_1.innerHTML = circleSign;
      boardAreas[0][0] = 1;
    }
    return;
  }
  // diagonal 7, 5, 3
  if((differenceAIArray === 4 && aiSignIndexesArray[0] === 7) && sq_3.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_3.innerHTML = timesSign;
      boardAreas[0][2] = 0;
    } else {
      sq_3.innerHTML = circleSign;
      boardAreas[0][2] = 1;
    }
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

  bestMoveAi();

  // diagonal circle on [3, 5] and [7, 5]
  if(difference === 2 && (humanPlayerSignIndexesArray[0] === 2 || humanPlayerSignIndexesArray[0] === 4)) {
    if(gameInfo.aiOption === false) {
      sq_7.innerHTML = timesSign;
      boardAreas[2][0] = 0;
    } else {
      sq_7.innerHTML = circleSign;
      boardAreas[2][0] = 1;
    }
  }
  else if(difference === 2 && (humanPlayerSignIndexesArray[0] === 2 || humanPlayerSignIndexesArray[0] === 6)) {
    if(gameInfo.aiOption === false) {
      sq_3.innerHTML = timesSign;
      boardAreas[0][2] = 0;
    } else {
      sq_3.innerHTML = circleSign;
      boardAreas[0][2] = 1;
    }
  }

  // diagonal circle on [1, 5] and [9, 5]
  else if(difference === 4 && (humanPlayerSignIndexesArray[0] === 0 || humanPlayerSignIndexesArray[0] === 4)) {
    if(gameInfo.aiOption === false) {
      sq_9.innerHTML = timesSign;
      boardAreas[2][2] = 0;
    } else {
      sq_9.innerHTML = circleSign;
      boardAreas[2][2] = 1;
    }
  }
  else if(difference === 4 && (humanPlayerSignIndexesArray[0] === 4 || humanPlayerSignIndexesArray[0] === 8)) {
    if(gameInfo.aiOption === false) {
      sq_1.innerHTML = timesSign;
      boardAreas[0][0] = 0;
    } else {
      sq_1.innerHTML = circleSign;
      boardAreas[0][0] = 1;
    }
  }

  // overhead circle on [1, 2] and [3, 2] first line
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 0 || humanPlayerSignIndexesArray[0] === 1)) {
    if(gameInfo.aiOption === false) {
      sq_3.innerHTML = timesSign;
      boardAreas[0][2] = 0;
    } else {
      sq_3.innerHTML = circleSign;
      boardAreas[0][2] = 1;
    }
  }
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 1 || humanPlayerSignIndexesArray[0] === 2)) {
    if(gameInfo.aiOption === false) {
      sq_1.innerHTML = timesSign;
      boardAreas[0][0] = 0;
    } else {
      sq_1.innerHTML = circleSign;
      boardAreas[0][0] = 1;
    }
  }

  // overhead circle on [4, 5] and [5, 4] second line
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 3 || humanPlayerSignIndexesArray[0] === 4)) {
    if(gameInfo.aiOption === false) {
      sq_6.innerHTML = timesSign;
      boardAreas[1][2] = 0;
    } else {
      sq_6.innerHTML = circleSign;
      boardAreas[1][2] = 1;
    }
  }
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 5 || humanPlayerSignIndexesArray[0] === 4)) {
    if(gameInfo.aiOption === false) {
      sq_4.innerHTML = timesSign;
      boardAreas[1][0] = 0;
    } else {
      sq_4.innerHTML = circleSign;
      boardAreas[1][0] = 1;
    }
  }

  // overhead circle on [7, 8] and [9, 8] third line
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 6 || humanPlayerSignIndexesArray[0] === 7)) {
    if(gameInfo.aiOption === false) {
      sq_9.innerHTML = timesSign;
      boardAreas[2][2] = 0;
    } else {
      sq_9.innerHTML = circleSign;
      boardAreas[2][2] = 1;
    }
  }
  else if(difference === 1 && (humanPlayerSignIndexesArray[0] === 8 || humanPlayerSignIndexesArray[0] === 7)) {
    if(gameInfo.aiOption === false) {
      sq_7.innerHTML = timesSign;
      boardAreas[0][2] = 0;
    } else {
      sq_7.innerHTML = circleSign;
      boardAreas[0][2] = 1;
    }
  }

  // upright circle on [1, 4] and [7, 4] first column
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 0 || humanPlayerSignIndexesArray[0] === 3)) {
    if(gameInfo.aiOption === false) {
      sq_7.innerHTML = timesSign;
      boardAreas[0][2] = 0;
    } else {
      sq_7.innerHTML = circleSign;
      boardAreas[0][2] = 1;
    }
  }
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 6 || humanPlayerSignIndexesArray[0] === 3)) {
    if(gameInfo.aiOption === false) {
      sq_1.innerHTML = timesSign;
      boardAreas[0][0] = 0;
    } else {
      sq_1.innerHTML = circleSign;
      boardAreas[0][0] = 1;
    }
  }

  // upright circle on [2, 5] and [8, 5] second column
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 1 || humanPlayerSignIndexesArray[0] === 4)) {
    if(gameInfo.aiOption === false) {
      sq_8.innerHTML = timesSign;
      boardAreas[2][1] = 0;
    } else {
      sq_8.innerHTML = circleSign;
      boardAreas[2][1] = 1;
    }
  }
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 7 || humanPlayerSignIndexesArray[0] === 4)) {
    if(gameInfo.aiOption === false) {
      sq_2.innerHTML = timesSign;
      boardAreas[0][1] = 0;
    } else {
      sq_2.innerHTML = circleSign;
      boardAreas[0][1] = 1;
    }
  }

  // upright circle on [3, 6] and [9, 6] third column
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 2 || humanPlayerSignIndexesArray[0] === 5)) {
    if(gameInfo.aiOption === false) {
      sq_9.innerHTML = timesSign;
      boardAreas[2][2] = 0;
    } else {
      sq_9.innerHTML = circleSign;
      boardAreas[2][2] = 1;
    }
  }
  else if(difference === 3 && (humanPlayerSignIndexesArray[0] === 8 || humanPlayerSignIndexesArray[0] === 5)) {
    if(gameInfo.aiOption === false) {
      sq_3.innerHTML = timesSign;
      boardAreas[0][2] = 0;
    } else {
      sq_3.innerHTML = circleSign;
      boardAreas[0][2] = 1;
    }
  }

  // sq_5 has cross and circles are on sq_2 & sq_4 || sq_2 & sq_6 || sq_4 & sq_8 || sq_8 & sq_6
  else if(difference === 2 || difference === 4) {
    if(difference === 2 && (humanPlayerSignIndexesArray.includes(3) || humanPlayerSignIndexesArray.includes(5))) {
      if(gameInfo.aiOption === false) {
        sq_7.innerHTML = timesSign;
        boardAreas[2][0] = 0;
      } else {
        sq_7.innerHTML = circleSign;
        boardAreas[2][0] = 1;
      }
    } else {
      if(gameInfo.aiOption === false) {
        sq_3.innerHTML = timesSign;
        boardAreas[0][2] = 0;
      } else {
        sq_3.innerHTML = circleSign;
        boardAreas[0][2] = 1;
      }
    }
  }

  // circles on sq_1 & sq_7 || sq_3 & sq_9
  else if(difference === 6) {
    if(humanPlayerSignIndexesArray.includes(0) || humanPlayerSignIndexesArray.includes(5)) {
      if(gameInfo.aiOption === false) {
        sq_4.innerHTML = timesSign;
        boardAreas[1][0] = 0;
      } else {
        sq_4.innerHTML = circleSign;
        boardAreas[1][0] = 1;
      }
    } else {
      if(gameInfo.aiOption === false) {
        sq_6.innerHTML = timesSign;
        boardAreas[1][2] = 0;
      } else {
        sq_6.innerHTML = circleSign;
        boardAreas[1][2] = 1;
      }
    }
  }
  else {
    getRandomSquare();
  }
}

function checkBoardAndFillHumanIndexesArray() {
  humanPlayerSignIndexesArray = [];

  if(gameInfo.firstPlayerOption === true) {
    if(boardAreas[0][0] === 1) {
      humanPlayerSignIndexesArray.push(0);
   } if(boardAreas[0][1] === 1) {
     humanPlayerSignIndexesArray.push(1);
   } if(boardAreas[0][2] === 1) {
     humanPlayerSignIndexesArray.push(2);
   } if(boardAreas[1][0] === 1) {
     humanPlayerSignIndexesArray.push(3);
   } if(boardAreas[1][1] === 1) {
     humanPlayerSignIndexesArray.push(4);
   } if(boardAreas[1][2] === 1) {
     humanPlayerSignIndexesArray.push(5);
   } if(boardAreas[2][0] === 1) {
     humanPlayerSignIndexesArray.push(6);
   } if(boardAreas[2][1] === 1) {
     humanPlayerSignIndexesArray.push(7);
   } if(boardAreas[2][2] === 1) {
     humanPlayerSignIndexesArray.push(8);
   }
  } else {
    if(boardAreas[0][0] === 0) {
      humanPlayerSignIndexesArray.push(0);
   } if(boardAreas[0][1] === 0) {
     humanPlayerSignIndexesArray.push(1);
   } if(boardAreas[0][2] === 0) {
     humanPlayerSignIndexesArray.push(2);
   } if(boardAreas[1][0] === 0) {
     humanPlayerSignIndexesArray.push(3);
   } if(boardAreas[1][1] === 0) {
     humanPlayerSignIndexesArray.push(4);
   } if(boardAreas[1][2] === 0) {
     humanPlayerSignIndexesArray.push(5);
   } if(boardAreas[2][0] === 0) {
     humanPlayerSignIndexesArray.push(6);
   } if(boardAreas[2][1] === 0) {
     humanPlayerSignIndexesArray.push(7);
   } if(boardAreas[2][2] === 0) {
     humanPlayerSignIndexesArray.push(8);
   }
  }
  
  // sort this values (b - a)
  humanPlayerSignIndexesArray.sort((a, b) => {
    return b - a;
  })
}

function checkBoardAndFillAiIndexesArray() {
  aiSignIndexesArray = [];

  if(gameInfo.aiOption === false) {
    if(boardAreas[0][0] === 0) {
      aiSignIndexesArray.push(0);
    } if(boardAreas[0][1] === 0) {
      aiSignIndexesArray.push(1);
    } if(boardAreas[0][2] === 0) {
      aiSignIndexesArray.push(2);
    } if(boardAreas[1][0] === 0) {
      aiSignIndexesArray.push(3);
    } if(boardAreas[1][1] === 0) {
      aiSignIndexesArray.push(4);
    } if(boardAreas[1][2] === 0) {
      aiSignIndexesArray.push(5);
    } if(boardAreas[2][0] === 0) {
      aiSignIndexesArray.push(6);
    } if(boardAreas[2][1] === 0) {
      aiSignIndexesArray.push(7);
    } if(boardAreas[2][2] === 0) {
      aiSignIndexesArray.push(8);
    }  
  } else {
    if(boardAreas[0][0] === 1) {
      aiSignIndexesArray.push(0);
    } if(boardAreas[0][1] === 1) {
      aiSignIndexesArray.push(1);
    } if(boardAreas[0][2] === 1) {
      aiSignIndexesArray.push(2);
    } if(boardAreas[1][0] === 1) {
      aiSignIndexesArray.push(3);
    } if(boardAreas[1][1] === 1) {
      aiSignIndexesArray.push(4);
    } if(boardAreas[1][2] === 1) {
      aiSignIndexesArray.push(5);
    } if(boardAreas[2][0] === 1) {
      aiSignIndexesArray.push(6);
    } if(boardAreas[2][1] === 1) {
      aiSignIndexesArray.push(7);
    } if(boardAreas[2][2] === 1) {
      aiSignIndexesArray.push(8);
    }  
  }
  
  // sort this values (b - a)
  aiSignIndexesArray.sort((a, b) => {
    return b - a;
  })
}

function checkDangerForAIXIn3Turn() {
  // horizontally
  if((humanPlayerSignIndexesArray[0] === 8 && humanPlayerSignIndexesArray[1] === 6) && sq_8.innerHTML === '') {
    gameInfo.dangerForAI = true;
  } 
  else if(((humanPlayerSignIndexesArray[0] === 2 || humanPlayerSignIndexesArray[1] === 2) && (humanPlayerSignIndexesArray[1] === 0 || humanPlayerSignIndexesArray[2] === 0)) && sq_2.innerHTML === '') {
    gameInfo.dangerForAI = true;
  }
}

function cancelDangerForAIXIn3Turn() {
  // for the situation when the circle is e.g. on boxes 1 and 3 and box 2 is empty and we have an AI move

  // horizontally
  if((humanPlayerSignIndexesArray[0] === 8 && humanPlayerSignIndexesArray[1] === 6) && sq_8.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_8.innerHTML = timesSign;
      boardAreas[2][1] = 0;
    } else {
      sq_8.innerHTML = circleSign;
      boardAreas[2][1] = 1;
    }
    check();
    return;
  } 
  if(((humanPlayerSignIndexesArray[0] === 2 || humanPlayerSignIndexesArray[1] === 2) && (humanPlayerSignIndexesArray[1] === 0 || humanPlayerSignIndexesArray[2] === 0)) && sq_2.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_2.innerHTML = timesSign;
      boardAreas[0][1] = 0;
    } else {
      sq_2.innerHTML = circleSign;
      boardAreas[0][1] = 1;
    }
    check();
    return;
  }
  // vertically
  if((humanPlayerSignIndexesArray[0] === 8 && (humanPlayerSignIndexesArray[1] === 2 || humanPlayerSignIndexesArray[2] === 2)) && sq_6.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_6.innerHTML = timesSign;
      boardAreas[1][2] = 0;
    } else {
      sq_6.innerHTML = circleSign;
      boardAreas[1][2] = 1;
    }
    check();
    return;
  } 
  if(((humanPlayerSignIndexesArray[0] === 6 || humanPlayerSignIndexesArray[1] === 6) && (humanPlayerSignIndexesArray[1] === 0 || humanPlayerSignIndexesArray[2] === 0)) && sq_4.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_4.innerHTML = timesSign;
      boardAreas[1][0] = 0;
    } else {
      sq_4.innerHTML = circleSign;
      boardAreas[1][0] = 1;
    }
    check();
    return;
  } 
  else {
    return;
  }
}

function getRandomSquare() {
  if(boardAreas[0][0] === '') {
    if(gameInfo.aiOption === false) {
      sq_1.innerHTML = timesSign;
      boardAreas[0][0] = 0;
    } else {
      sq_1.innerHTML = circleSign;
      boardAreas[0][0] = 1;
    }
    return;
  }
  if(boardAreas[0][1] === '') {
    if(gameInfo.aiOption === false) {
      sq_2.innerHTML = timesSign;
      boardAreas[0][1] = 0;
    } else {
      sq_2.innerHTML = circleSign;
      boardAreas[0][1] = 1;
    }
    return;
  }
  if(boardAreas[0][2] === '') {
    if(gameInfo.aiOption === false) {
      sq_3.innerHTML = timesSign;
      boardAreas[0][2] = 0;
    } else {
      sq_3.innerHTML = circleSign;
      boardAreas[0][2] = 1;
    }
    return;
  }
  if(boardAreas[1][0] === '') {
    if(gameInfo.aiOption === false) {
      sq_4.innerHTML = timesSign;
      boardAreas[1][0] = 0;
    } else {
      sq_4.innerHTML = circleSign;
      boardAreas[1][0] = 1;
    }
    return;
  }
  if(boardAreas[1][1] === '') {
    if(gameInfo.aiOption === false) {
      sq_5.innerHTML = timesSign;
      boardAreas[1][1] = 0;
    } else {
      sq_5.innerHTML = circleSign;
      boardAreas[1][1] = 1;
    }
    return;
  }
  if(boardAreas[1][2] === '') {
    if(gameInfo.aiOption === false) {
      sq_6.innerHTML = timesSign;
      boardAreas[1][2] = 0;
    } else {
      sq_6.innerHTML = circleSign;
      boardAreas[1][2] = 1;
    }
    return;
  }
  if(boardAreas[2][0] === '') {
    if(gameInfo.aiOption === false) {
      sq_7.innerHTML = timesSign;
      boardAreas[2][0] = 0;
    } else {
      sq_7.innerHTML = circleSign;
      boardAreas[2][0] = 1;
    }
    return;
  }
  if(boardAreas[2][1] === '') {
    if(gameInfo.aiOption === false) {
      sq_8.innerHTML = timesSign;
      boardAreas[2][1] = 0;
    } else {
      sq_8.innerHTML = circleSign;
      boardAreas[2][1] = 1;
    }
    return;
  }
  if(boardAreas[2][2] === '') {
    if(gameInfo.aiOption === false) {
      sq_9.innerHTML = timesSign;
      boardAreas[2][2] = 0;
    } else {
      sq_9.innerHTML = circleSign;
      boardAreas[2][2] = 1;
    }
    return;
  }
}

function moveAIXTurn6() {
  checkBoardAndFillHumanIndexesArray();
  checkBoardAndFillAiIndexesArray();
  console.log("human indexes: " + humanPlayerSignIndexesArray);
  console.log("ai indexes: " + aiSignIndexesArray);

  bestMoveAi();

  // horizontally
  if((humanPlayerSignIndexesArray[0] === 8 && humanPlayerSignIndexesArray[1] === 6) && sq_8.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_8.innerHTML = timesSign;
      boardAreas[2][1] = 0;
    } else {
      sq_8.innerHTML = circleSign;
      boardAreas[2][1] = 1;
    }
    check();
    return;
  } 
  if(((humanPlayerSignIndexesArray[0] === 2 || humanPlayerSignIndexesArray[1] === 2) && (humanPlayerSignIndexesArray[1] === 0 || humanPlayerSignIndexesArray[2] === 0)) && sq_2.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_2.innerHTML = timesSign;
      boardAreas[2][1] = 0;
    } else {
      sq_2.innerHTML = circleSign;
      boardAreas[2][1] = 1;
    }
    check();
    return;
  }
  // horizontally
  if((humanPlayerSignIndexesArray[0] === 8 && (humanPlayerSignIndexesArray[1] === 2 || humanPlayerSignIndexesArray[2] === 2)) && sq_6.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_6.innerHTML = timesSign;
      boardAreas[1][2] = 0;
    } else {
      sq_6.innerHTML = circleSign;
      boardAreas[1][2] = 1;
    }
    check();
    return;
  } 
  if(((humanPlayerSignIndexesArray[0] === 6 || humanPlayerSignIndexesArray[1] === 6) && (humanPlayerSignIndexesArray[1] === 0 || humanPlayerSignIndexesArray[2] === 0)) && sq_4.innerHTML === '') {
    if(gameInfo.aiOption === false) {
      sq_4.innerHTML = timesSign;
      boardAreas[1][0] = 0;
    } else {
      sq_4.innerHTML = circleSign;
      boardAreas[1][0] = 1;
    }
    check();
    return;
  } 

  // horizontally - difference 1
  if(((Math.abs(humanPlayerSignIndexesArray[0] - humanPlayerSignIndexesArray[1]) === 1) || (Math.abs(humanPlayerSignIndexesArray[2] - humanPlayerSignIndexesArray[1]) === 1)) || (Math.abs(humanPlayerSignIndexesArray[0] - humanPlayerSignIndexesArray[2]) === 1)) {

    if(humanPlayerSignIndexesArray[1] === 1 && sq_1.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_1.innerHTML = timesSign;
        boardAreas[0][0] = 0;
      } else {
        sq_1.innerHTML = circleSign;
        boardAreas[0][0] = 1;
      }
      return;
    } if((humanPlayerSignIndexesArray[1] === 3 || (humanPlayerSignIndexesArray[2] === 3 && humanPlayerSignIndexesArray[1] === 4)) && sq_6.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_6.innerHTML = timesSign;
        boardAreas[1][2] = 0;
      } else {
        sq_6.innerHTML = circleSign;
        boardAreas[1][2] = 1;
      }
      return;
    } if(((humanPlayerSignIndexesArray[1] === 4 && sq_4.innerHTML === '') || (humanPlayerSignIndexesArray[2] === 4 && humanPlayerSignIndexesArray[1] === 5)) && sq_4.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_4.innerHTML = timesSign;
        boardAreas[1][0] = 0;
      } else {
        sq_4.innerHTML = circleSign;
        boardAreas[1][0] = 1;
      }
      return;
    } if(humanPlayerSignIndexesArray[1] === 6 && sq_9.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_9.innerHTML = timesSign;
        boardAreas[2][2] = 0;
      } else {
        sq_9.innerHTML = circleSign;
        boardAreas[2][2] = 1;
      }
      return;
    } if(humanPlayerSignIndexesArray[1] === 7 && sq_7.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_7.innerHTML = timesSign;
        boardAreas[2][0] = 0;
      } else {
        sq_7.innerHTML = circleSign;
        boardAreas[2][0] = 1;
      }
      return;
    } if((humanPlayerSignIndexesArray[0] === 7 && humanPlayerSignIndexesArray[2] === 4) && sq_3.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_3.innerHTML = timesSign;
        boardAreas[0][2] = 0;
      } else {
        sq_3.innerHTML = circleSign;
        boardAreas[0][2] = 1;
      }
      return;
    } if((humanPlayerSignIndexesArray[0] === 8 && boardAreas[1][1] === 1) && sq_2.innerHTML === '') {
      if(sq_2.innerHTML === '') {
        if(gameInfo.aiOption === false) {
          sq_2.innerHTML = timesSign;
          boardAreas[0][1] = 0;
        } else {
          sq_2.innerHTML = circleSign;
          boardAreas[0][1] = 1;
        }
        return;
      } else {
        if(gameInfo.aiOption === false) {
          sq_3.innerHTML = timesSign;
          boardAreas[0][2] = 0;
        } else {
          sq_3.innerHTML = circleSign;
          boardAreas[0][2] = 1;
        }
        return;
      }
    } 
    check();
  }

  // vertically
  if(((Math.abs(humanPlayerSignIndexesArray[0] - humanPlayerSignIndexesArray[1]) === 3) || (Math.abs(humanPlayerSignIndexesArray[2] - humanPlayerSignIndexesArray[1]) === 3)) || (Math.abs(humanPlayerSignIndexesArray[0] - humanPlayerSignIndexesArray[2]) === 3)) {

    if(((humanPlayerSignIndexesArray[1] === 3 || (humanPlayerSignIndexesArray[2] === 3 && humanPlayerSignIndexesArray[0] === 6)) || (humanPlayerSignIndexesArray[2] === 3 && humanPlayerSignIndexesArray[1] === 6)) && sq_1.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_1.innerHTML = timesSign;
        boardAreas[0][0] = 0;
      } else {
        sq_1.innerHTML = circleSign;
        boardAreas[0][0] = 1;
      }
      return;
    }
     if(((humanPlayerSignIndexesArray[0] === 4 || humanPlayerSignIndexesArray[1] === 4) && (humanPlayerSignIndexesArray[0] > 4 || (aiSignIndexesArray[0] === 3 || aiSignIndexesArray[1] === 3 || aiSignIndexesArray[2] === 3))) && sq_8.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_8.innerHTML = timesSign;
        boardAreas[2][1] = 0;
      } else {
        sq_8.innerHTML = circleSign;
        boardAreas[2][1] = 1;
      }
      return;
    }
    
    if(((humanPlayerSignIndexesArray[2] === 4 || humanPlayerSignIndexesArray[1] === 4) && (humanPlayerSignIndexesArray[1] === 7 || humanPlayerSignIndexesArray[0] === 7))  && sq_2.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_2.innerHTML = timesSign;
        boardAreas[0][1] = 0;
      } else {
        sq_2.innerHTML = circleSign;
        boardAreas[0][1] = 1;
      }
      return;
    }
    if(((humanPlayerSignIndexesArray[0] === 4 && humanPlayerSignIndexesArray[1] === 1) && sq_8.innerHTML === '')) {
      if(gameInfo.aiOption === false) {
        sq_8.innerHTML = timesSign;
        boardAreas[0][1] = 0;
      } else {
        sq_8.innerHTML = circleSign;
        boardAreas[0][1] = 1;
      }
      return;
    }
    if((((humanPlayerSignIndexesArray[1] === 5 || humanPlayerSignIndexesArray[2] === 5 || humanPlayerSignIndexesArray[0] === 5) && humanPlayerSignIndexesArray[0] === 8)) && sq_3.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_3.innerHTML = timesSign;
        boardAreas[0][2] = 0;
      } else {
        sq_3.innerHTML = circleSign;
        boardAreas[0][2] = 1;
      }
      return;
    } if((((humanPlayerSignIndexesArray[0] === 5 || humanPlayerSignIndexesArray[1] === 5) && (humanPlayerSignIndexesArray[1] === 2 || humanPlayerSignIndexesArray[2] === 2))) && sq_9.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_9.innerHTML = timesSign;
        boardAreas[0][2] = 0;
      } else {
        sq_9.innerHTML = circleSign;
        boardAreas[0][2] = 1;
      }
      return;
    }
    check();
  }

  // diagonal 7, 5, 3
  if((Math.abs(humanPlayerSignIndexesArray[0] - humanPlayerSignIndexesArray[1]) === 2) || (Math.abs(humanPlayerSignIndexesArray[2] - humanPlayerSignIndexesArray[1]) === 2) || (Math.abs(humanPlayerSignIndexesArray[0] - humanPlayerSignIndexesArray[2]) === 2)) {

    if(((humanPlayerSignIndexesArray[0] === 4 || humanPlayerSignIndexesArray[1] === 4 || humanPlayerSignIndexesArray[2] === 4) && (humanPlayerSignIndexesArray[0] === 6 || humanPlayerSignIndexesArray[1] === 6)) && sq_3.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_3.innerHTML = timesSign;
        boardAreas[0][2] = 0;
      } else {
        sq_3.innerHTML = circleSign;
        boardAreas[0][2] = 1;
      }
      return;
    }
    if(humanPlayerSignIndexesArray[1] === 4 && sq_3.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_3.innerHTML = timesSign;
        boardAreas[0][2] = 0;
      } else {
        sq_3.innerHTML = circleSign;
        boardAreas[0][2] = 1;
      }
      return;
    }
    if(((humanPlayerSignIndexesArray[0] === 4 || humanPlayerSignIndexesArray[1] === 4) && (humanPlayerSignIndexesArray[1] === 2 || humanPlayerSignIndexesArray[2] === 2)) && sq_7.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_7.innerHTML = timesSign;
        boardAreas[0][2] = 0;
      } else {
        sq_7.innerHTML = circleSign;
        boardAreas[0][2] = 1;
      }
      return;
    }
    check();
  }

  // diagonal 1, 5, 9
  if(((Math.abs(humanPlayerSignIndexesArray[0] - humanPlayerSignIndexesArray[1]) === 4) || (Math.abs(humanPlayerSignIndexesArray[2] - humanPlayerSignIndexesArray[1]) === 4)) || (Math.abs(humanPlayerSignIndexesArray[2] - humanPlayerSignIndexesArray[0]) === 4)) {

    if(humanPlayerSignIndexesArray[1] === 4 && sq_1.innerHTML === '') {
      if(gameInfo.aiOption === false) {
        sq_1.innerHTML = timesSign;
        boardAreas[0][0] = 0;
      } else {
        sq_1.innerHTML = circleSign;
        boardAreas[0][0] = 1;
      }
      check();
      return;
    } else {
      if(gameInfo.aiOption === false) {
        sq_9.innerHTML = timesSign;
        boardAreas[2][2] = 0;
      } else {
        sq_9.innerHTML = circleSign;
        boardAreas[2][2] = 1;
      }
      check();
      return;
    }
  }
  else {
    getRandomSquare();
  }
}

function moveAIXTurn2() {
  if(gameInfo.nextOption === false && gameInfo.turn === 1) {
    // board is blocked for 500ms
    bgcDisabled.style.display = 'block';
    if(sq_5.innerHTML === circleSign) {
      let randomIndexOfSquare = Math.floor(Math.random() * squaresArray.length);
      if(randomIndexOfSquare < 0 || randomIndexOfSquare === 4) {
        randomIndexOfSquare = Math.floor(Math.random() * squaresArray.length);
        if(randomIndexOfSquare === 4) {
          sq_7.innerHTML = timesSign;
        }
      }
      fillBoardAreasAfterAIMovement(randomIndexOfSquare);
      setTimeout(() => {
      squaresArray[randomIndexOfSquare].innerHTML = timesSign;
      gameInfo.turn++;
      bgcDisabled.style.display = 'none';
      check();
      }, 500)
    } else {
      setTimeout(() => {
        sq_5.innerHTML = timesSign;
        boardAreas[1][1] = 0;
        instruction.innerHTML = `<p><span class="info-name">YOUR</span> turn:</p>`;
        gameInfo.turn++;
        bgcDisabled.style.display = 'none';
        check();
      }, 500);
    }
  }

  squaresArray.forEach(sq => {
    if((sq.innerHTML === circleSign) && gameInfo.turn === 3) {
      console.log(squaresArray.indexOf(sq))
      const indexOfHumanSign = squaresArray.indexOf(sq);
      humanPlayerSignIndexesArray.push(indexOfHumanSign);
    } 
  })
}

function moveAIOTurn1() {
  // SECOND TURN
  if(gameInfo.nextOption === true && gameInfo.turn === 0) {
    // board is blocked for 500ms
    bgcDisabled.style.display = 'block';
    setTimeout(() => {
      sq_5.innerHTML = circleSign;
      boardAreas[1][1] = 1;
      instruction.innerHTML = `<p><span class="info-name">YOUR</span> turn:</p>`;
      gameInfo.turn++;
      bgcDisabled.style.display = 'none';
      check();
    }, 500);
  }
}



function playWithAI() {
  if(gameInfo.isWinner === true || gameInfo.isWinner === false && gameInfo.turn === 9) {
    gameInfo.nextOption = false;
    gameInfo.turn = 0;
    return;
  } else {

    gameInfo.aiOption === true ? moveAIOTurn1() : null;

    squares.forEach(square => {
      square.addEventListener('click', function(event) {
        const { row, column } = event.target.dataset;

        if(square.innerHTML !== '') {
          gameInfo.nextOption = gameInfo.nextOption;
          return;
        }

        else if(gameInfo.firstPlayerOption === true) {
          gameInfo.nextOption = !gameInfo.nextOption;
          boardAreas[row][column] = 1;
          square.innerHTML = circleSign;
          instruction.innerHTML = `<p><span class="info-name">AI's</span> turn:</p>`;
          gameInfo.turn++;
          
          moveAIXTurn2();
          if(gameInfo.turn === 3) {
            moveAIXTurn4();
          }
          else if(gameInfo.turn === 4) {
            gameInfo.turn++;
            moveAIXTurn6();
            
          }
          else if(gameInfo.turn === 6) {
            gameInfo.turn++;
            moveAIXTurn6();
          }
          else if(gameInfo.turn === 8) {
            gameInfo.turn++;
            moveAIXTurn6();
          }
          check();
          
          
          showGameInfo();
          console.log(boardAreas[0]);
          console.log(boardAreas[1]);
          console.log(boardAreas[2]);
        }
        else if(gameInfo.firstPlayerOption === false) {
          gameInfo.nextOption = !gameInfo.nextOption;
          square.innerHTML = timesSign;
          instruction.innerHTML = `<p><span class="info-name">AI's</span> turn:</p>`;
          boardAreas[row][column] = 0;
          gameInfo.turn++;
          moveAIOTurn1();
          if(gameInfo.turn === 2) {
            gameInfo.turn++;
            moveAIXTurn4();
          }
          if(gameInfo.turn === 4) {
            gameInfo.turn++;
            moveAIXTurn6();
            
          }
          else if(gameInfo.turn === 6) {
            gameInfo.turn++;
            moveAIXTurn6();
          }
          else if(gameInfo.turn === 8) {
            gameInfo.turn++;
            moveAIXTurn6();
          }

          check();
          showGameInfo();
          console.log(boardAreas[0]);
          console.log(boardAreas[1]);
          console.log(boardAreas[2]);
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
            square.innerHTML = circleSign;
            instruction.innerHTML = `<p><span class="info-name">${gameInfo.secondPlayerName}</span> turn:</p>`;
            boardAreas[row][column] = 1;
            gameInfo.turn++;
            check();
            showGameInfo();
          } else {
            gameInfo.nextOption = !gameInfo.nextOption;
            square.innerHTML = timesSign;
            instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>`;
            boardAreas[row][column] = 0;
            gameInfo.turn++;
            check();
            showGameInfo(); 
          }
        } else if(gameInfo.firstPlayerOption === false) {
          if(gameInfo.nextOption === true) {
            gameInfo.nextOption = !gameInfo.nextOption;
            square.innerHTML = circleSign;
            instruction.innerHTML = `<p><span class="info-name">${gameInfo.firstPlayerName}</span> turn:</p>`;
            boardAreas[row][column] = 1;
            gameInfo.turn++;
            check();
            showGameInfo();
          } else {
            gameInfo.nextOption = !gameInfo.nextOption;
            square.innerHTML = timesSign;
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
  gameInfo.opponentIsHuman = '';
  gameInfo.firstPlayerName = '';
  gameInfo.secondPlayerName = '';
  gameInfo.firstPlayerOption = '';
  gameInfo.secondPlayerOption = '';
  gameInfo.nextOption = true;
  gameInfo.turn = 0;

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
    playCircleWithOpponent();
  } else {
    playTimesWithOpponent();
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