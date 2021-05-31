const instruction = document.querySelector('.instruction');
const optionsPanel = document.querySelector('.options-wrapper');
const playerIcon = document.querySelector('.fa-user');
const aiIcon = document.querySelector('.fa-robot');
const opponentDescriptions = document.querySelectorAll('.opponent__description');
const inputsWrapper = document.querySelector('.inputs-wrapper');
const firstGroupInput = document.querySelector('.input_1-group');
const secondGroupInput = document.querySelector('.input_2-group');
const firstPlayerNameInput = document.querySelector('.player_1-name');
const secondPlayerNameInput = document.querySelector('.player_2-name');
const firstPlayerNameError = document.querySelector('.name-1-input_error');
const secondPlayerNameError = document.querySelector('.name-2-input_error');
const checkFirstName = document.querySelector('.check-name_1');
const checkSecondName = document.querySelector('.check-name_2');
const iconsPanel = document.querySelector('.icons-wrapper');

const optionCircleIcon = document.querySelector('.option-circle');
const optionTimesIcon = document.querySelector('.option-times');
const optionRandomIcon = document.querySelector('.option-random');

const board = document.querySelector('.board');
const squares = document.querySelectorAll('.square');

const gameInfo = {
  options: [0, 1],
  firstPlayerName: '',
  secondPlayerName: '',
  firstPlayerOption: '',
  secondPlayerOption: '',
  actualOption: ''
}

function play() {
  squares.forEach(square => {
    square.addEventListener('click', function() {
      gameInfo.actualOption = !gameInfo.actualOption;
      if(gameInfo.actualOption === true) {
        if(square.innerHTML !== '') {
          return;
        } else {
          square.innerHTML = `<i class="far fa-circle icon option-circle"></i>`
        }
      } else {
        if(square.innerHTML !== '') {
          console.log("NIEEEE")
          return;
        } else {
          square.innerHTML = `<i class="fas fa-times icon option-times"></i>`
        }
      }
      console.log(gameInfo.actualOption);
    })
  })
}

playerIcon.addEventListener('click', function() {
  instruction.textContent = `Insert first Player's name`;
  playerIcon.style.transform = 'scale(0)';
  aiIcon.style.transform = 'scale(0)';

  opponentDescriptions.forEach(description => {
    description.style.transform = 'scale(0)';
  })

  inputsWrapper.style.display = 'block';
  inputsWrapper.style.transform = 'scale(1)';

  checkFirstName.addEventListener('click', function(e) {
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
  })

  checkSecondName.addEventListener('click', function(e) {
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
  })

  optionCircleIcon.addEventListener('click', function() {
    gameInfo.firstPlayerOption = false;
    gameInfo.secondPlayerOption = true;
    gameInfo.actualOption = false;

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
  })

  optionTimesIcon.addEventListener('click', function() {
    gameInfo.firstPlayerOption = true;
    gameInfo.secondPlayerOption = false;
    gameInfo.actualOption = true;

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
  })

  optionRandomIcon.addEventListener('click', function() {
    const max = 1;
    const min = 0;
    const number = Math.floor(Math.random()*(max - min + 1) + min);
    if(number === 1) {
      gameInfo.firstPlayerOption = true;
      gameInfo.secondPlayerOption = false;
      gameInfo.actualOption = true;
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
    // console.log(gameInfo.firstPlayerOption);
  })
})

