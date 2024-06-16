const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'antares',
  'arquiteto',
  'baek',
  'baran',
  'cha hae in',
  'choi',
  'kang',
  'igris',
  'sung jin woo',
  'thomas andre',
  'bellion',
  'beru',
  'yoo jin hoo',
  'gun hee go',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 28) {
    clearInterval(this.loop);
    const playerName = spanPlayer.innerHTML;
    const playerTime = timer.innerHTML;
    const existingData = JSON.parse(localStorage.getItem('gameData')) || [];
    existingData.push({ name: playerName, time: playerTime });
    localStorage.setItem('gameData', JSON.stringify(existingData));
    alert(`Congratulations, ${spanPlayer.innerHTML}! Your time was: ${timer.innerHTML}`);
  }
}


const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}

const backButton = document.querySelector('.back');

backButton.addEventListener('click', () => {
  window.location.href = '../index.html';
});

const restartButton = document.querySelector('.restart');

const restartGame = () => {
  grid.innerHTML = '';
  let seconds = 0;
  timer.innerHTML = `00`;
  clearInterval(this.loop); 
  this.loop = setInterval(() => {
    seconds++;
    timer.innerHTML = seconds < 10? `0${seconds}` : seconds;
  }, 1000);
  spanPlayer.innerHTML = localStorage.getItem('player');
  loadGame();
  isPaused = false;
  pauseTime = 0; 
}
const pauseButton = document.querySelector('.pause');

let isPaused = false;
let pauseTime = 0;

const pauseGame = () => {
  if (!isPaused) {
    isPaused = true;
    pauseTime = +timer.innerHTML;
    clearInterval(this.loop);
    const pauseMessage = document.createElement('div');
    pauseMessage.className = 'pause-message';
    pauseMessage.innerHTML = 'Game paused. Click "Resume" to continue.';
    grid.appendChild(pauseMessage);
    grid.classList.add('paused'); 
  }
}

const resumeGame = () => {
  if (isPaused) {
    isPaused = false;
    this.loop = setInterval(() => {
      pauseTime++;
      timer.innerHTML = pauseTime < 10 ? `0${pauseTime}` : pauseTime;
    }, 1000);
    const pauseMessage = document.querySelector('.pause-message');
    pauseMessage.remove();
    grid.classList.remove('paused');
  }
}