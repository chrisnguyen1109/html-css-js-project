const $ = document.querySelector.bind(document);

const speed = 200;

const counterUp = (type, to) => {
    const el = $(`.counter-${type} h2`);
    let from = 0;
    const step = Math.ceil(to / speed);
    const counter = setInterval(() => {
        from += step;
        if (from <= to) {
            el.innerHTML = from;
        } else {
            el.innerHTML = to;
            clearInterval(counter);
        }
    }, 1);
};

counterUp('facebook', 3300);
counterUp('youtube', 1000);
counterUp('tiktok', 9900);
