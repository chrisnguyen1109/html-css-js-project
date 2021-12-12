const $ = document.querySelector.bind(document);

const range = $('.between');
const againBtn = $('.again');
const secretNumber = $('.number');
const guessNumber = $('.guess');
const checkBtn = $('.check');
const message = $('.message');
const score = $('.score');
const highscore = $('.highscore');

let minRange;
let maxRange;
let secret;
let checkOver;

const renderMessage = (classElement, context) => {
    classElement.textContent = context;
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

const start = () => {
    checkOver = false;
    minRange = Math.floor(Math.random() * 90);
    maxRange = minRange + 10;
    secret = getRandomInt(minRange, maxRange);
    console.log(secret);
    $('body').style.backgroundColor = '#222';
    renderMessage(range, `(Between ${minRange} and ${maxRange})`);
    renderMessage(secretNumber, '?');
    renderMessage(message, 'Start guessing...');
    renderMessage(score, '10');
    guessNumber.value = '';
};

againBtn.addEventListener('click', () => {
    start();
});

checkBtn.addEventListener('click', () => {
    let myScore = +score.textContent;
    try {
        if (checkOver) {
            alert('The game is over. Please try again!');
            return;
        }
        if (myScore <= 0) {
            alert('You lost the game. Please try again!');
            return;
        }
        const guess = guessNumber.value;

        if (!guess) throw new Error('No answer');

        if (guess < minRange || guess > maxRange) throw new Error('Out of range');

        if (guess - secret > 3) throw new Error('Too high');
        if (guess - secret > 1) throw new Error('High');

        if (secret - guess > 3) throw new Error('Too low');
        if (secret - guess > 1) throw new Error('Low');

        if (+guess === secret) {
            checkOver = true;
            $('body').style.backgroundColor = '#60b347';
            renderMessage(secretNumber, secret);
            renderMessage(message, 'Correct!');

            if (myScore > highscore.textContent) {
                renderMessage(highscore, myScore);
            }

            return;
        }

        throw new Error('Almost');
    } catch (err) {
        renderMessage(message, err.message);
        renderMessage(score, --myScore);
    }
});

start();
