const $ = document.querySelector.bind(document);

const showBtn = $('.show-modal');
const modal = $('.modal');
const overlay = $('.overlay');
const closeBtn = $('.close-modal');

const toggleModal = () => {
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
};

showBtn.addEventListener('click', toggleModal);

closeBtn.addEventListener('click', toggleModal);

overlay.addEventListener('click', toggleModal);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        toggleModal();
    }
});
