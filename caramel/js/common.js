var claces = document.querySelector('.glaces .open-popup-container');
var line = document.querySelector('.glaces line');
var openPopupBtn = document.querySelector('.btn_open-popup');
var closePopupBtn = document.querySelector('.popup-desc__close-btn');

configureClaces();

window.addEventListener('resize', configureClaces);

openPopupBtn.addEventListener('click', function (event) {
    openPopup(event.target.dataset.for);
});

closePopupBtn.addEventListener('click', function (event) {
    closePopup(event.target.parentNode);
});

function openPopup(id) {
    document.querySelector("#" + id).classList.remove('hidden');
    document.querySelector("#" + id).classList.remove('animation-close');
    document.querySelector("#" + id).classList.add('animation-open');
}

function closePopup(element) {
    element.classList.remove('animation-open');
    element.classList.add('animation-close');

    setTimeout(function () {
        element.classList.add('hidden');
    }, 500)
}

function configureClaces() {
    line.setAttribute('x1', '10');
    line.setAttribute('y1', '13');
    line.setAttribute('y2', (claces.clientHeight - 20) + '');
    line.setAttribute('x2', (claces.clientWidth - 20) + '');
}