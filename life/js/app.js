(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _SecondaryFunctions = require('./utils/SecondaryFunctions');

var _MainForm = require('./components/MainForm');

var _MainForm2 = _interopRequireDefault(_MainForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainForm = new _MainForm2.default();
mainForm.createForm();

document.addEventListener('click', _SecondaryFunctions.addRippleEffect);

},{"./components/MainForm":2,"./utils/SecondaryFunctions":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SecondaryFunctions = require('../utils/SecondaryFunctions');

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainForm = function () {
    function MainForm() {
        _classCallCheck(this, MainForm);

        this._form = document.querySelector('.enter-date-of-birth');
        this._selectDays = new _Select2.default('days');
        this._selectMonths = new _Select2.default('months');
        this._selectYears = new _Select2.default('years');

        saveDate = saveDate.bind(this);
        initializationSelect = initializationSelect.bind(this);
    }

    _createClass(MainForm, [{
        key: 'createForm',
        value: function createForm() {
            initializationSelect();
            var formBtn = (0, _SecondaryFunctions.createElement)('button', { class: 'btn btn_save', type: 'submit' }, 'Save');

            this._form.appendChild(this._selectDays.createSelect('Select days'));
            this._form.appendChild(this._selectMonths.createSelect('Select months'));
            this._form.appendChild(this._selectYears.createSelect('Select years'));
            this._form.appendChild(formBtn);

            this._form.addEventListener('submit', function (event) {
                event.preventDefault();
                saveDate();
            });
        }
    }]);

    return MainForm;
}();

exports.default = MainForm;


function saveDate() {
    var yearOfBirth = this._selectYears.getValue() === undefined ? 1998 : +this._selectYears.getValue();
    var monthOfBirth = this._selectMonths.getValue() === undefined ? 4 : +this._selectMonths.getValue();
    var dayOfBirth = this._selectDays.getValue() === undefined ? 7 : +this._selectDays.getValue();

    var yearNow = new Date().getFullYear();
    var monthNow = new Date().getMonth() + 1;
    var dayNow = new Date().getDate();

    var yearInLife = yearNow - yearOfBirth;
    var weekInYear = void 0;

    var DAYS_IN_MONTH = 31;
    var MONTHS_IN_YEAR = 12;
    var WEEKS_IN_MONTH = 4.35;
    var DAYS_IN_WEEK = 7;

    if (monthNow > monthOfBirth) {
        var days = DAYS_IN_MONTH - dayNow + dayOfBirth;
        var months = MONTHS_IN_YEAR - monthNow + monthOfBirth - 1;

        weekInYear = days / 7 + months * WEEKS_IN_MONTH;
    } else if (monthNow < monthOfBirth) {
        var _days = DAYS_IN_MONTH - dayNow + dayOfBirth;
        var _months = +monthOfBirth - monthNow - 1;

        weekInYear = _days / 7 + _months * WEEKS_IN_MONTH;
    } else if (monthNow === monthOfBirth) {
        if (dayNow < dayOfBirth) {
            weekInYear = (MONTHS_IN_YEAR - 1) * WEEKS_IN_MONTH + dayNow / DAYS_IN_WEEK;
            weekInYear = weekInYear > 51.3 ? 52 : weekInYear;
        } else {
            weekInYear = (dayNow - dayOfBirth) / DAYS_IN_WEEK;
            weekInYear = weekInYear < 1 ? 1 : weekInYear;
        }
    }

    (0, _SecondaryFunctions.initializationLife)(yearInLife, parseInt(weekInYear));
}

function initializationSelect() {
    var _this = this;

    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (var i = 1; i <= 31; i++) {
        this._selectDays.addSelectItem(i, i);
    }

    month.forEach(function (item, index) {
        _this._selectMonths.addSelectItem(index + 1, item);
    });

    for (var _i = 1950; _i < 2010; _i++) {
        this._selectYears.addSelectItem(_i, _i);
    }
}

},{"../utils/SecondaryFunctions":4,"./Select":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SecondaryFunctions = require('../utils/SecondaryFunctions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Select = function () {
    function Select() {
        var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _classCallCheck(this, Select);

        this._className = className;
        this._items = [];
        this._selectId = Math.random() + '';
        this._select = (0, _SecondaryFunctions.createElement)('div', { class: 'select ' + this._className });
    }

    _createClass(Select, [{
        key: 'addSelectItem',
        value: function addSelectItem(value, showValue) {
            this._items.push({
                value: value + '',
                showValue: showValue + ''
            });
        }
    }, {
        key: 'createSelect',
        value: function createSelect() {
            var _this = this;

            var btnTitle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Select item';

            var selectItems = (0, _SecondaryFunctions.createElement)('ul', { class: 'select__items hidden' });
            var selectBtn = (0, _SecondaryFunctions.createElement)('button', { class: 'select__btn', type: 'button' }, btnTitle);

            selectBtn.addEventListener('click', function (event) {
                event.stopPropagation();
                toggleSelectVisible(event.target.nextSibling, event.target);
            });

            this._items.forEach(function (item) {
                var idItem = Math.random() + '';
                var label = (0, _SecondaryFunctions.createElement)('label', { for: idItem }, item.showValue);
                var radio = (0, _SecondaryFunctions.createElement)('input', {
                    type: 'radio',
                    name: _this._selectId,
                    id: idItem,
                    value: item.value
                });

                label.addEventListener('click', function (event) {
                    event.target.parentNode.parentNode.previousSibling.innerText = event.target.innerText;
                    toggleSelectVisible(event.target.parentNode.parentNode);
                });

                var selectItem = (0, _SecondaryFunctions.createElement)('li', { class: 'select__item' }, radio, label);

                selectItems.appendChild(selectItem);
            });

            this._select.appendChild(selectBtn);
            this._select.appendChild(selectItems);

            document.addEventListener('click', closeAllSelects);

            return this._select;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var value = void 0;
            try {
                value = this._select.querySelector('input:checked').value;
            } catch (err) {
                console.warn(err.message);
                return undefined;
            }
            return value;
        }
    }]);

    return Select;
}();

exports.default = Select;


function toggleSelectVisible(elementSelectItems, btn) {
    if (elementSelectItems.classList.contains('select__items_active')) {
        close();
    } else {
        open();
    }

    function close() {
        elementSelectItems.classList.remove('select__items_active');
        elementSelectItems.classList.add('close-select');
        btn.classList.remove('btn_open');
        setTimeout(function () {
            elementSelectItems.classList.add('hidden');
        }, 200);
    }

    function open() {
        btn.classList.add('btn_open');
        elementSelectItems.classList.add('select__items_active');
        elementSelectItems.classList.remove('hidden');
    }
}

function closeAllSelects() {
    document.querySelectorAll('.select__btn').forEach(function (item) {
        item.classList.remove('btn_open');
    });

    document.querySelectorAll('.select__items').forEach(function (item) {
        item.classList.remove('select__items_active');
        item.classList.add('close-select');
        setTimeout(function () {
            item.classList.add('hidden');
        }, 200);
    });
}

},{"../utils/SecondaryFunctions":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createElement = createElement;
exports.initializationLife = initializationLife;
function createElement(tag, props) {
    var element = document.createElement(tag);

    Object.keys(props).forEach(function (key) {
        if (key.startsWith('data-')) {
            element.setAttribute(key, props[key]);
        } else {
            element.setAttribute(key, props[key]);
        }
    });

    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    children.forEach(function (child) {
        if (typeof child === 'string' || typeof child === 'number') {
            child = document.createTextNode(child);
        }

        element.appendChild(child);
    });

    return element;
}

var addRippleEffect = exports.addRippleEffect = function addRippleEffect(e) {
    var target = e.target;
    if (target.tagName.toLowerCase() !== 'button') return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    return false;
};

function initializationLife() {
    var yearsOld = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 19;
    var weekInYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var life = document.querySelector('.life');
    life.innerHTML = '';

    for (var year = 1; year <= 70; year++) {
        var elementYear = document.createElement('div');
        elementYear.setAttribute('class', 'year');
        elementYear.setAttribute('data-year', year + '');

        for (var week = 1; week <= 52; week++) {
            var elementWeek = document.createElement('div');
            elementWeek.classList.add('week');

            if (year < yearsOld + 1) {
                elementWeek.classList.add('lived');
            }

            if (year === yearsOld + 1 && week < weekInYear) {
                elementWeek.classList.add('lived');
            }

            if (year === yearsOld + 1 && week === weekInYear) {
                elementWeek.classList.add('reside');
            }

            var allWeeks = 52 * (year - 1) + week;

            elementWeek.setAttribute('title', allWeeks + ' week of life and ' + week + ' week of ' + year + ' year');

            elementYear.appendChild(elementWeek);
        }

        life.appendChild(elementYear);
    }
}

},{}]},{},[1])