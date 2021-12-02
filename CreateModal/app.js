const $ = document.querySelector.bind(document);

const modal = $('.modal');

const actionModal = (el, action) => {
    $(`.${el}`).addEventListener('click', e => {
        e.stopPropagation();
        modal.classList[action]('hide');
    });
};

actionModal('btn-open-modal', 'remove');
actionModal('modal__header svg', 'add');
actionModal('modal__footer button', 'add');

$('body').addEventListener('click', e => {
    !e.target.closest('.modal__inner') &&
        !modal.classList.contains('hide') &&
        modal.classList.add('hide');
});
