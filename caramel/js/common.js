var openPopupBtns = document.querySelectorAll('.btn_open-popup');
var closePopupBtns = document.querySelectorAll('.popup-desc__close-btn');

configureClaces();

window.addEventListener('resize', configureClaces);

openPopupBtns.forEach(function (p1, p2, p3) {
    p1.addEventListener('click', function (event) {
        openPopup(event.target.dataset.for);
    });
});

closePopupBtns.forEach(function (item, p1, p2) {
    item.addEventListener('click', function (event) {
        closePopup(event.target.parentNode);
    });
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
    var glacesLine = document.querySelector('.glaces line');
    var sodasLine = document.querySelector('.sodas line');
    var laitiersLine = document.querySelector('.produits-laitiers line');
    var chocolatsLine = document.querySelector('.chocolats line');
    var biersLine = document.querySelector('.biers line');
    var soupesLine = document.querySelector('.soupes-and-sauces line');
    var biscuitLine = document.querySelector('.biscuits line');
    var boissonsLine = document.querySelector('.boissons-energisantes line');


    var claces = document.querySelector('.glaces .open-popup-container');
    var boissons = document.querySelector('.boissons-energisantes .open-popup-container');
    var sodas = document.querySelector('.sodas .open-popup-container');
    var chocolats = document.querySelector('.chocolats .open-popup-container');
    var biers = document.querySelector('.biers .open-popup-container');
    var biscuit = document.querySelector('.biscuits .open-popup-container');
    var soupes = document.querySelector('.soupes-and-sauces .open-popup-container');
    var laitiers = document.querySelector('.produits-laitiers .open-popup-container');


    glacesLine.setAttribute('x1', '10');
    glacesLine.setAttribute('y1', '13');
    glacesLine.setAttribute('y2', (claces.clientHeight - 20) + '');
    glacesLine.setAttribute('x2', (claces.clientWidth - 20) + '');

    sodasLine.setAttribute('x1', '10');
    sodasLine.setAttribute('y1', '45');
    sodasLine.setAttribute('y2', (sodas.clientHeight - 18) + '');
    sodasLine.setAttribute('x2', (sodas.clientWidth - 20) + '');

    laitiersLine.setAttribute('x1', '375');
    laitiersLine.setAttribute('y1', '-10');
    laitiersLine.setAttribute('y2', '120');
    laitiersLine.setAttribute('x2', '10');

    chocolatsLine.setAttribute('x1', '10');
    chocolatsLine.setAttribute('y1', '13');
    chocolatsLine.setAttribute('y2', '211');
    chocolatsLine.setAttribute('x2', '475');

    biersLine.setAttribute('x1', '10');
    biersLine.setAttribute('y1', '13');
    biersLine.setAttribute('y2', '75');
    biersLine.setAttribute('x2', '275');

    biscuitLine.setAttribute('x1', '275');
    biscuitLine.setAttribute('y1', '13');
    biscuitLine.setAttribute('y2', '120');
    biscuitLine.setAttribute('x2', '10');

    soupesLine.setAttribute('x1', '10');
    soupesLine.setAttribute('y1', '13');
    soupesLine.setAttribute('y2', '200');
    soupesLine.setAttribute('x2', '275');

    boissonsLine.setAttribute('x1', '10');
    boissonsLine.setAttribute('y1', '13');
    boissonsLine.setAttribute('y2', '136');
    boissonsLine.setAttribute('x2', '275');

    if (window.matchMedia('(min-width: 960px)')) {
        laitiersLine.setAttribute('x1', '250');
        laitiersLine.setAttribute('y1', '10');
        laitiersLine.setAttribute('y2', '120');
        laitiersLine.setAttribute('x2', '10');

        chocolatsLine.setAttribute('x1', '10');
        chocolatsLine.setAttribute('y1', '13');
        chocolatsLine.setAttribute('x2', '275');
        chocolatsLine.setAttribute('y2', '100');

        biscuitLine.setAttribute('x1', '215');
        biscuitLine.setAttribute('y1', '13');
        biscuitLine.setAttribute('y2', '120');
        biscuitLine.setAttribute('x2', '10');

        soupesLine.setAttribute('x1', '10');
        soupesLine.setAttribute('y1', '13');
        soupesLine.setAttribute('y2', '120');
        soupesLine.setAttribute('x2', '175');

        boissonsLine.setAttribute('x1', '250');
        boissonsLine.setAttribute('y1', '13');
        boissonsLine.setAttribute('y2', '120');
        boissonsLine.setAttribute('x2', '10');
    }
}