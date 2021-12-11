const $ = document.querySelector.bind(document);

const newBtn = $('.btn--new');
const rollBtn = $('.btn--roll');
const holdBtn = $('.btn--hold');
const dice = $('.dice');

const goal = 20;
let winner;
let over;

const switchActive = user => {
    $('.player--active').classList.remove('player--active');
    user.classList.add('player--active');
};

const start = () => {
    over = false;
    dice.classList.add('hidden');
    $('#score--0').textContent = '0';
    $('#score--1').textContent = '0';
    $('#current--0').textContent = '0';
    $('#current--1').textContent = '0';

    if (winner) {
        winner.classList.remove('player--winner');
        switchActive(winner);
    } else {
        $('.player--0').classList.add('player--active');
    }
};

rollBtn.addEventListener('click', () => {
    if (over) return;

    const random = Math.floor(Math.random() * 6) + 1;
    const player = $('.player--active');
    const playerNumber = player === $('.player--0') ? 0 : 1;
    const currentScore = $(`#current--${playerNumber}`);

    dice.src = `dice-${random}.png`;
    dice.classList.contains('hidden') && dice.classList.remove('hidden');

    if (random === 1) {
        currentScore.textContent = 0;
        switchActive($(`.player--${+!playerNumber}`));
        return;
    }

    currentScore.textContent = +currentScore.textContent + random;
});

holdBtn.addEventListener('click', () => {
    if (over) return;

    const player = $('.player--active');
    const playerNumber = player === $('.player--0') ? 0 : 1;
    const score = $(`#score--${playerNumber}`);
    const currentScore = $(`#current--${playerNumber}`);

    score.textContent = +score.textContent + +currentScore.textContent;
    currentScore.textContent = 0;

    if (score.textContent >= goal) {
        over = true;
        winner = player;
        winner.classList.add('player--winner');
    }

    const otherPlayer = $(`.player--${+!playerNumber}`);
    switchActive(otherPlayer);
});

newBtn.addEventListener('click', start);

start();
