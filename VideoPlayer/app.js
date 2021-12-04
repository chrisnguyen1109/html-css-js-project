const $ = document.querySelector.bind(document);

const player = $('.player');
const playerVideo = $('.player-video');
const playerControl = $('.player-control');
const toggleBtn = $('.player-control__toggle');
const playerTime = $('.player-control__time');
const backBtn = $('.player-control__back');
const nextBtn = $('.player-control__next');
const inputVolume = $('.player-control__volume input');

let beforeVolume = 1;
let timer;

function debounce(func, timeout = 300) {
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

const togglePlay = () => {
    if (playerVideo.paused) {
        playerVideo.play();
    } else {
        playerVideo.pause();
    }
};

const setPlayIcon = () => {
    toggleBtn.innerHTML = `<i class="bx bx-pause"></i>`;
};

const setPauseIcon = () => {
    toggleBtn.innerHTML = `<i class="bx bx-play"></i>`;
};

const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    let minuteValue, secondValue;

    minuteValue = minutes < 10 ? '0' + minutes : minutes;
    secondValue = seconds < 10 ? '0' + seconds : seconds;

    return minuteValue + ':' + secondValue;
};

function handleProgress() {
    const progress = this.currentTime / this.duration;
    $('.player-control__progress--filled').style.width = `${progress * 100}%`;
    playerTime.innerHTML = `${formatTime(this.currentTime)} / ${formatTime(this.duration)}`;
}

function handleTime() {
    playerVideo.currentTime += +this.dataset.time;
    playerVideo.currentTime === playerVideo.duration && playerVideo.paused && playerVideo.play();
}

function setVolumeIcon() {
    if (playerVideo.volume === 0) {
        $('.player-control__volume i').classList.remove('bxs-volume-full');
        $('.player-control__volume i').classList.add('bxs-volume-mute');
    } else {
        $('.player-control__volume i').classList.remove('bxs-volume-mute');
        $('.player-control__volume i').classList.add('bxs-volume-full');
    }
}

const objKeyCode = {
    39: handleTime.bind(nextBtn),
    37: handleTime.bind(backBtn),
    32: togglePlay,
    38: () => {
        inputVolume.value = +inputVolume.value + 0.1;
        playerVideo.volume = inputVolume.value;
    },
    40: () => {
        inputVolume.value = +inputVolume.value - 0.1;
        playerVideo.volume = inputVolume.value;
    },
};

player.addEventListener('mouseover', e => {
    !playerControl.classList.contains('active') && playerControl.classList.add('active');
});

player.addEventListener('mouseout', e => {
    playerControl.classList.contains('active') && playerControl.classList.remove('active');
});

playerVideo.addEventListener('click', togglePlay);
toggleBtn.addEventListener('click', togglePlay);
playerVideo.addEventListener('ended', setPauseIcon);
playerVideo.addEventListener('pause', setPauseIcon);
playerVideo.addEventListener('play', setPlayIcon);

playerVideo.addEventListener('timeupdate', handleProgress);
playerVideo.addEventListener('volumechange', setVolumeIcon);

$('.player-control__progress').addEventListener('click', function (e) {
    playerVideo.currentTime = (e.offsetX / this.offsetWidth) * playerVideo.duration;
});

backBtn.addEventListener('click', handleTime);

nextBtn.addEventListener('click', handleTime);

inputVolume.addEventListener('change', function (e) {
    playerVideo.volume = this.value;
});

$('.player-control__volume i').addEventListener('click', e => {
    if (playerVideo.volume === 0) {
        inputVolume.value = beforeVolume;
        playerVideo.volume = inputVolume.value;
    } else {
        beforeVolume = playerVideo.volume;
        inputVolume.value = 0;
        playerVideo.volume = inputVolume.value;
    }
    setVolumeIcon();
});

document.addEventListener('keydown', e => {
    objKeyCode[e.keyCode] && objKeyCode[e.keyCode]();
    !playerControl.classList.contains('active') && playerControl.classList.add('active');
    debounce(() => {
        playerControl.classList.contains('active') && playerControl.classList.remove('active');
    }, 1000)();
});
