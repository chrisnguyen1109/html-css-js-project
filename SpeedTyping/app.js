const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const workspace = $('.workspace');
const typeInput = $('input');
const timer = $('.timer');

let count;
let countBefore;
let countText;
let workspaceArr;
let quoteArr;
let correctWords;
let startTime;
let timeInterval;

const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    let minuteValue, secondValue;

    minuteValue = minutes < 10 ? '0' + minutes : minutes;
    secondValue = seconds < 10 ? '0' + seconds : seconds;

    return minuteValue + ':' + secondValue;
};

const getTimerTime = () => {
    return Math.floor((new Date() - startTime) / 1000);
};

const startCounter = () => {
    startTime = new Date();
    timeInterval = setInterval(() => {
        timer.textContent = formatTime(getTimerTime());
    }, 1000);
};

const initialValues = () => {
    count = 0;
    countBefore = 0;
    countText = 0;
    correctWords = 0;
    workspaceArr = null;
    quoteArr = null;
    clearInterval(timeInterval);
    timeInterval = null;
    timer.textContent = '00:00';
};

const renderUnderline = () => {
    if (!quoteArr[countText]) {
        setTimeout(() => {
            alert(
                `Congratulations!!! You got ${correctWords}/${
                    quoteArr.length
                } word in ${getTimerTime()} seconds`
            );
            renderWorkspace();
        }, 1);
        return;
    }
    for (let i = 0; i < quoteArr[countText].length; i++) {
        workspaceArr[count + i].classList.add('underline');
    }
};

const renderWorkspace = async () => {
    initialValues();
    const quoteData = await fetch(RANDOM_QUOTE_API_URL);
    const quote = await quoteData.json();
    quoteArr = quote.content.split(' ');
    workspace.innerHTML = quote.content
        .split('')
        .map(char => {
            if (char.trim()) return `<span>${char}</span>`;
            return char;
        })
        .join('');

    workspaceArr = $$('.workspace span');
    renderUnderline();
};

const checkCorrect = () => {
    const wrong = $$('span.highlight--wrong');
    if (wrong.length > 0) {
        return false;
    }

    return true;
};

const convertCorrect = () => {
    correctWords++;
    $$('.underline').forEach(e => {
        const elClassList = e.classList;
        elClassList.remove(...elClassList);
        elClassList.add('correct');
    });
};

const convertWrong = () => {
    $$('.underline').forEach(e => {
        const elClassList = e.classList;
        elClassList.remove(...elClassList);
        elClassList.add('wrong');
    });
};

typeInput.addEventListener('input', e => {
    let quoteArrLength = quoteArr[countText].length;

    if (e.data === ' ') {
        if (typeInput.value.trim()) {
            if (quoteArrLength !== typeInput.value.length - 1 || !checkCorrect()) {
                convertWrong();
            } else {
                convertCorrect();
            }
            countBefore += quoteArrLength;
            count = countBefore;
            countText++;
            renderUnderline();
        }
        typeInput.value = '';
        return;
    }

    if (
        quoteArrLength < typeInput.value.length ||
        (e.inputType === 'deleteContentBackward' && quoteArrLength === typeInput.value.length)
    ) {
        return;
    }

    if (e.inputType === 'deleteContentBackward') {
        count--;
        workspaceArr[count].classList.remove('highlight--right', 'highlight--wrong');
        return;
    }

    if (!timeInterval) {
        startCounter();
    }

    if (e.data === workspaceArr[count].textContent) {
        workspaceArr[count].classList.add('highlight--right');
    } else {
        workspaceArr[count].classList.add('highlight--wrong');
    }

    count++;
});

renderWorkspace();
