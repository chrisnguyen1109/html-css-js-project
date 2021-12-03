const $ = document.querySelector.bind(document);

const setRangeSlider = percent => {
    if (percent < 0 || percent > 100) return;
    const percentRound = Math.round(+percent);
    const percentSlider = percentRound / 100;
    $('.range-bar').style.width = `${percentRound}%`;
    $('body').style.backgroundColor = `rgba(0, 0, 0, ${percentSlider})`;
    $('.range-bar span').innerHTML = `${percentRound}%`;
};

setRangeSlider(100);

$('.range__body').addEventListener('mousemove', function (e) {
    const percent = (e.pageX - this.offsetLeft) / this.offsetWidth;
    setRangeSlider(percent * 100);
});
