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
    var yearOfBirth = this._selectYears.getValue() === undefined ? 1997 : +this._selectYears.getValue();
    var monthOfBirth = this._selectMonths.getValue() === undefined ? 9 : +this._selectMonths.getValue();
    var dayOfBirth = this._selectDays.getValue() === undefined ? 15 : +this._selectDays.getValue();

    var yearNow = new Date().getFullYear();
    var monthNow = new Date().getMonth() + 1;
    var dayNow = new Date().getDate();

    var yearInLife = yearNow - yearOfBirth;
    var weekInYear = void 0;

    var DAYS_IN_MONTH = 31;
    var MONTHS_IN_YEAR = 12;
    var WEEKS_IN_MONTH = 4.2;
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
            weekInYear = MONTHS_IN_YEAR * WEEKS_IN_MONTH + dayNow / DAYS_IN_WEEK;
            weekInYear = weekInYear > 51.3 ? 52 : weekInYear;
        } else {
            weekInYear = (dayNow - dayOfBirth) / DAYS_IN_WEEK;
            weekInYear = weekInYear < 1 ? 1 : weekInYear;
        }
    }

    console.log(parseInt(weekInYear));
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
                    toggleSelectVisible(event.target.parentNode.parentNode, event.target.parentNode.parentNode.previousSibling);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxjb21wb25lbnRzXFxNYWluRm9ybS5qcyIsInNyY1xcanNcXGNvbXBvbmVudHNcXFNlbGVjdC5qcyIsInNyY1xcanNcXHV0aWxzXFxTZWNvbmRhcnlGdW5jdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOztBQUNBOzs7Ozs7QUFFQSxJQUFNLFdBQVcsd0JBQWpCO0FBQ0EsU0FBUyxVQUFUOztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUI7Ozs7Ozs7Ozs7O0FDUEE7O0FBQ0E7Ozs7Ozs7O0lBRU0sUTtBQUNGLHdCQUFjO0FBQUE7O0FBQ1YsYUFBSyxLQUFMLEdBQWEsU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFiO0FBQ0EsYUFBSyxXQUFMLEdBQW1CLHFCQUFXLE1BQVgsQ0FBbkI7QUFDQSxhQUFLLGFBQUwsR0FBcUIscUJBQVcsUUFBWCxDQUFyQjtBQUNBLGFBQUssWUFBTCxHQUFvQixxQkFBVyxPQUFYLENBQXBCOztBQUVBLG1CQUFXLFNBQVMsSUFBVCxDQUFjLElBQWQsQ0FBWDtBQUNBLCtCQUF1QixxQkFBcUIsSUFBckIsQ0FBMEIsSUFBMUIsQ0FBdkI7QUFDSDs7OztxQ0FFWTtBQUNUO0FBQ0EsZ0JBQU0sVUFBVSx1Q0FBYyxRQUFkLEVBQXdCLEVBQUMsT0FBTyxjQUFSLEVBQXdCLE1BQU0sUUFBOUIsRUFBeEIsRUFBaUUsTUFBakUsQ0FBaEI7O0FBRUEsaUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxXQUFMLENBQWlCLFlBQWpCLENBQThCLGFBQTlCLENBQXZCO0FBQ0EsaUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxhQUFMLENBQW1CLFlBQW5CLENBQWdDLGVBQWhDLENBQXZCO0FBQ0EsaUJBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxZQUFMLENBQWtCLFlB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QUF1QztBQUNuQyxnQkFBSSxjQUFjLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFsQjtBQUNBLHdCQUFZLFNBQVosQ0FBc0IsR0FBdEIsQ0FBMEIsTUFBMUI7O0FBRUEsZ0JBQUksT0FBTyxXQUFXLENBQXRCLEVBQXlCO0FBQ3JCLDRCQUFZLFNBQVosQ0FBc0IsR0FBdEIsQ0FBMEIsT0FBMUI7QUFDSDs7QUFFRCxnQkFBSSxTQUFTLFdBQVcsQ0FBcEIsSUFBeUIsT0FBTyxVQUFwQyxFQUFnRDtBQUM1Qyw0QkFBWSxTQUFaLENBQXNCLEdBQXRCLENBQTBCLE9BQTFCO0FBQ0g7O0FBRUQsZ0JBQUksU0FBUyxXQUFXLENBQXBCLElBQXlCLFNBQVMsVUFBdEMsRUFBa0Q7QUFDOUMsNEJBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixRQUExQjtBQUNIOztBQUVELGdCQUFJLFdBQVksTUFBTSxPQUFPLENBQWIsSUFBa0IsSUFBbEM7O0FBRUEsd0JBQVksWUFBWixDQUF5QixPQUF6QixFQUFrQyxXQUFXLG9CQUFYLEdBQWtDLElBQWxDLEdBQXlDLFdBQXpDLEdBQXVELElBQXZELEdBQThELE9BQWhHOztBQUVBLHdCQUFZLFdBQVosQ0FBd0IsV0FBeEI7QUFDSDs7QUFFRCxhQUFLLFdBQUwsQ0FBaUIsV0FBakI7QUFDSDtBQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG5pbXBvcnQgeyBhZGRSaXBwbGVFZmZlY3QgfSBmcm9tICcuL3V0aWxzL1NlY29uZGFyeUZ1bmN0aW9ucydcclxuaW1wb3J0IE1haW5Gb3JtIGZyb20gJy4vY29tcG9uZW50cy9NYWluRm9ybSdcclxuXHJcbmNvbnN0IG1haW5Gb3JtID0gbmV3IE1haW5Gb3JtKCk7XHJcbm1haW5Gb3JtLmNyZWF0ZUZvcm0oKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkUmlwcGxlRWZmZWN0KTsiLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBpbml0aWFsaXphdGlvbkxpZmUgfSBmcm9tICcuLi91dGlscy9TZWNvbmRhcnlGdW5jdGlvbnMnXHJcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi9TZWxlY3QnO1xyXG5cclxuY2xhc3MgTWFpbkZvcm0ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbnRlci1kYXRlLW9mLWJpcnRoJyk7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0RGF5cyA9IG5ldyBTZWxlY3QoJ2RheXMnKTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RNb250aHMgPSBuZXcgU2VsZWN0KCdtb250aHMnKTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RZZWFycyA9IG5ldyBTZWxlY3QoJ3llYXJzJyk7XHJcblxyXG4gICAgICAgIHNhdmVEYXRlID0gc2F2ZURhdGUuYmluZCh0aGlzKTtcclxuICAgICAgICBpbml0aWFsaXphdGlvblNlbGVjdCA9IGluaXRpYWxpemF0aW9uU2VsZWN0LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRm9ybSgpIHtcclxuICAgICAgICBpbml0aWFsaXphdGlvblNlbGVjdCgpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1CdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7Y2xhc3M6ICdidG4gYnRuX3NhdmUnLCB0eXBlOiAnc3VibWl0J30sICdTYXZlJyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Zvcm0uYXBwZW5kQ2hpbGQodGhpcy5fc2VsZWN0RGF5cy5jcmVhdGVTZWxlY3QoJ1NlbGVjdCBkYXlzJykpO1xyXG4gICAgICAgIHRoaXMuX2Zvcm0uYXBwZW5kQ2hpbGQodGhpcy5fc2VsZWN0TW9udGhzLmNyZWF0ZVNlbGVjdCgnU2VsZWN0IG1vbnRocycpKTtcclxuICAgICAgICB0aGlzLl9mb3JtLmFwcGVuZENoaWxkKHRoaXMuX3NlbGVjdFllYXJzLmNyZWF0ZVNlbGVjdCgnU2VsZWN0IHllYXJzJykpO1xyXG4gICAgICAgIHRoaXMuX2Zvcm0uYXBwZW5kQ2hpbGQoZm9ybUJ0bik7XHJcblxyXG4gICAgICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgc2F2ZURhdGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFpbkZvcm07XHJcblxyXG5mdW5jdGlvbiBzYXZlRGF0ZSgpIHtcclxuICAgIGxldCB5ZWFyT2ZCaXJ0aCA9IHRoaXMuX3NlbGVjdFllYXJzLmdldFZhbHVlKCkgPT09IHVuZGVmaW5lZCA/IDE5OTcgOiArdGhpcy5fc2VsZWN0WWVhcnMuZ2V0VmFsdWUoKTtcclxuICAgIGxldCBtb250aE9mQmlydGggPSB0aGlzLl9zZWxlY3RNb250aHMuZ2V0VmFsdWUoKSA9PT0gdW5kZWZpbmVkID8gOSA6ICt0aGlzLl9zZWxlY3RNb250aHMuZ2V0VmFsdWUoKTtcclxuICAgIGxldCBkYXlPZkJpcnRoID0gdGhpcy5fc2VsZWN0RGF5cy5nZXRWYWx1ZSgpID09PSB1bmRlZmluZWQgPyAxNSA6ICt0aGlzLl9zZWxlY3REYXlzLmdldFZhbHVlKCk7XHJcblxyXG4gICAgY29uc3QgeWVhck5vdyA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG1vbnRoTm93ID0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMTtcclxuICAgIGNvbnN0IGRheU5vdyA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xyXG5cclxuICAgIGxldCB5ZWFySW5MaWZlID0geWVhck5vdyAtIHllYXJPZkJpcnRoO1xyXG4gICAgbGV0IHdlZWtJblllYXI7XHJcblxyXG4gICAgY29uc3QgREFZU19JTl9NT05USCA9IDMxO1xyXG4gICAgY29uc3QgTU9OVEhTX0lOX1lFQVIgPSAxMjtcclxuICAgIGNvbnN0IFdFRUtTX0lOX01PTlRIID0gNC4yO1xyXG4gICAgY29uc3QgREFZU19JTl9XRUVLID0gNztcclxuXHJcbiAgICBpZiAobW9udGhOb3cgPiBtb250aE9mQmlydGgpIHtcclxuICAgICAgICBsZXQgZGF5cyA9IERBWVNfSU5fTU9OVEggLSBkYXlOb3cgKyBkYXlPZkJpcnRoO1xyXG4gICAgICAgIGxldCBtb250aHMgPSBNT05USFNfSU5fWUVBUiAtIG1vbnRoTm93ICsgbW9udGhPZkJpcnRoIC0gMTtcclxuXHJcbiAgICAgICAgd2Vla0luWWVhciA9IGRheXMgLyA3ICsgbW9udGhzICogV0VFS1NfSU5fTU9OVEhcclxuICAgIH0gZWxzZSBpZiAobW9udGhOb3cgPCBtb250aE9mQmlydGgpIHtcclxuICAgICAgICBsZXQgZGF5cyA9IERBWVNfSU5fTU9OVEggLSBkYXlOb3cgKyBkYXlPZkJpcnRoO1xyXG4gICAgICAgIGxldCBtb250aHMgPSArbW9udGhPZkJpcnRoIC0gbW9udGhOb3cgLSAxO1xyXG5cclxuICAgICAgICB3ZWVrSW5ZZWFyID0gZGF5cyAvIDcgKyBtb250aHMgKiBXRUVLU19JTl9NT05USDtcclxuICAgIH0gZWxzZSBpZiAobW9udGhOb3cgPT09IG1vbnRoT2ZCaXJ0aCkge1xyXG4gICAgICAgIGlmIChkYXlOb3cgPCBkYXlPZkJpcnRoKSB7XHJcbiAgICAgICAgICAgIHdlZWtJblllYXIgPSAoKE1PTlRIU19JTl9ZRUFSKSAqIFdFRUtTX0lOX01PTlRIKSArIChkYXlOb3cgLyBEQVlTX0lOX1dFRUspO1xyXG4gICAgICAgICAgICB3ZWVrSW5ZZWFyID0gd2Vla0luWWVhciA+IDUxLjMgPyA1MiA6IHdlZWtJblllYXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2Vla0luWWVhciA9IChkYXlOb3cgLSBkYXlPZkJpcnRoKSAvIERBWVNfSU5fV0VFSztcclxuICAgICAgICAgICAgd2Vla0luWWVhciA9IHdlZWtJblllYXIgPCAxID8gMSA6IHdlZWtJblllYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHBhcnNlSW50KHdlZWtJblllYXIpKTtcclxuICAgIGluaXRpYWxpemF0aW9uTGlmZSh5ZWFySW5MaWZlLCBwYXJzZUludCh3ZWVrSW5ZZWFyKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemF0aW9uU2VsZWN0ICgpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gW1xyXG4gICAgICAgICdKYW51YXJ5JyxcclxuICAgICAgICAnRmVicnVhcnknLFxyXG4gICAgICAgICdNYXJjaCcsXHJcbiAgICAgICAgJ0FwcmlsJyxcclxuICAgICAgICAnTWF5JyxcclxuICAgICAgICAnSnVuZScsXHJcbiAgICAgICAgJ0p1bHknLFxyXG4gICAgICAgICdBdWd1c3QnLFxyXG4gICAgICAgICdTZXB0ZW1iZXInLFxyXG4gICAgICAgICdPY3RvYmVyJyxcclxuICAgICAgICAnTm92ZW1iZXInLFxyXG4gICAgICAgICdEZWNlbWJlcidcclxuICAgIF07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzE7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdERheXMuYWRkU2VsZWN0SXRlbShpLCBpKVxyXG4gICAgfVxyXG5cclxuICAgIG1vbnRoLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0TW9udGhzLmFkZFNlbGVjdEl0ZW0oaW5kZXggKyAxLCBpdGVtKVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDE5NTA7IGkgPCAyMDEwOyBpKyspIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RZZWFycy5hZGRTZWxlY3RJdGVtKGksIGkpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi4vdXRpbHMvU2Vjb25kYXJ5RnVuY3Rpb25zJztcclxuXHJcbmNsYXNzIFNlbGVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGFzc05hbWUgPSAnJykge1xyXG4gICAgICAgIHRoaXMuX2NsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdElkID0gTWF0aC5yYW5kb20oKSArICcnO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtjbGFzczogJ3NlbGVjdCAnICsgdGhpcy5fY2xhc3NOYW1lfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2VsZWN0SXRlbSh2YWx1ZSwgc2hvd1ZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSArICcnLFxyXG4gICAgICAgICAgICBzaG93VmFsdWU6IHNob3dWYWx1ZSArICcnXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTZWxlY3QoYnRuVGl0bGUgPSAnU2VsZWN0IGl0ZW0nKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0SXRlbXMgPSBjcmVhdGVFbGVtZW50KCd1bCcsIHtjbGFzczogJ3NlbGVjdF9faXRlbXMgaGlkZGVuJ30pO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtjbGFzczogJ3NlbGVjdF9fYnRuJywgdHlwZTogJ2J1dHRvbid9LCBidG5UaXRsZSk7XHJcblxyXG4gICAgICAgIHNlbGVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdG9nZ2xlU2VsZWN0VmlzaWJsZShldmVudC50YXJnZXQubmV4dFNpYmxpbmcsIGV2ZW50LnRhcmdldClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRJdGVtID0gTWF0aC5yYW5kb20oKSArICcnO1xyXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IGNyZWF0ZUVsZW1lbnQoJ2xhYmVsJywge2ZvcjogaWRJdGVtfSwgaXRlbS5zaG93VmFsdWUpO1xyXG4gICAgICAgICAgICBjb25zdCByYWRpbyA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3JhZGlvJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuX3NlbGVjdElkLFxyXG4gICAgICAgICAgICAgICAgaWQ6IGlkSXRlbSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLnZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nLmlubmVyVGV4dCA9IGV2ZW50LnRhcmdldC5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVTZWxlY3RWaXNpYmxlKGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUsIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdEl0ZW0gPSBjcmVhdGVFbGVtZW50KCdsaScsIHtjbGFzczogJ3NlbGVjdF9faXRlbSd9LCByYWRpbywgbGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0SXRlbXMuYXBwZW5kQ2hpbGQoc2VsZWN0SXRlbSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0LmFwcGVuZENoaWxkKHNlbGVjdEJ0bik7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0LmFwcGVuZENoaWxkKHNlbGVjdEl0ZW1zKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUFsbFNlbGVjdHMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIGxldCB2YWx1ZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3NlbGVjdC5xdWVyeVNlbGVjdG9yKCdpbnB1dDpjaGVja2VkJykudmFsdWU7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0O1xyXG5cclxuZnVuY3Rpb24gdG9nZ2xlU2VsZWN0VmlzaWJsZSAoZWxlbWVudFNlbGVjdEl0ZW1zLCBidG4pIHtcclxuICAgIGlmIChlbGVtZW50U2VsZWN0SXRlbXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RfX2l0ZW1zX2FjdGl2ZScpKSB7XHJcbiAgICAgICAgY2xvc2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlICgpIHtcclxuICAgICAgICBlbGVtZW50U2VsZWN0SXRlbXMuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X19pdGVtc19hY3RpdmUnKTtcclxuICAgICAgICBlbGVtZW50U2VsZWN0SXRlbXMuY2xhc3NMaXN0LmFkZCgnY2xvc2Utc2VsZWN0Jyk7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bl9vcGVuJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRTZWxlY3RJdGVtcy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW4gKCkge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdidG5fb3BlbicpO1xyXG4gICAgICAgIGVsZW1lbnRTZWxlY3RJdGVtcy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RfX2l0ZW1zX2FjdGl2ZScpO1xyXG4gICAgICAgIGVsZW1lbnRTZWxlY3RJdGVtcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VBbGxTZWxlY3RzICgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3RfX2J0bicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdidG5fb3BlbicpXHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0X19pdGVtcycpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RfX2l0ZW1zX2FjdGl2ZScpO1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnY2xvc2Utc2VsZWN0Jyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgfSwgMjAwKTtcclxuICAgIH0pO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50ICh0YWcsIHByb3BzLCAuLi5jaGlsZHJlbikge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHByb3BzW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgcHJvcHNba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgYWRkUmlwcGxlRWZmZWN0ID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgIGlmICh0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgbGV0IHJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBsZXQgcmlwcGxlID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5yaXBwbGUnKTtcclxuICAgIGlmICghcmlwcGxlKSB7XHJcbiAgICAgICAgcmlwcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHJpcHBsZS5jbGFzc05hbWUgPSAncmlwcGxlJztcclxuICAgICAgICByaXBwbGUuc3R5bGUuaGVpZ2h0ID0gcmlwcGxlLnN0eWxlLndpZHRoID0gTWF0aC5tYXgocmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpICsgJ3B4JztcclxuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocmlwcGxlKTtcclxuICAgIH1cclxuICAgIHJpcHBsZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICBsZXQgdG9wID0gZS5wYWdlWSAtIHJlY3QudG9wIC0gcmlwcGxlLm9mZnNldEhlaWdodCAvIDIgLSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuICAgIGxldCBsZWZ0ID0gZS5wYWdlWCAtIHJlY3QubGVmdCAtIHJpcHBsZS5vZmZzZXRXaWR0aCAvIDIgLSBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XHJcbiAgICByaXBwbGUuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcclxuICAgIHJpcHBsZS5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XHJcbiAgICByaXBwbGUuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemF0aW9uTGlmZSh5ZWFyc09sZCA9IDE5LCB3ZWVrSW5ZZWFyID0gMSkge1xyXG4gICAgbGV0IGxpZmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlmZScpO1xyXG4gICAgbGlmZS5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBmb3IgKGxldCB5ZWFyID0gMTsgeWVhciA8PSA3MDsgeWVhcisrKSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRZZWFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZWxlbWVudFllYXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICd5ZWFyJyk7XHJcbiAgICAgICAgZWxlbWVudFllYXIuc2V0QXR0cmlidXRlKCdkYXRhLXllYXInLCB5ZWFyICsgJycpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB3ZWVrID0gMTsgd2VlayA8PSA1Mjsgd2VlaysrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50V2VlayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBlbGVtZW50V2Vlay5jbGFzc0xpc3QuYWRkKCd3ZWVrJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoeWVhciA8IHllYXJzT2xkICsgMSkge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFdlZWsuY2xhc3NMaXN0LmFkZCgnbGl2ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHllYXIgPT09IHllYXJzT2xkICsgMSAmJiB3ZWVrIDwgd2Vla0luWWVhcikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFdlZWsuY2xhc3NMaXN0LmFkZCgnbGl2ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHllYXIgPT09IHllYXJzT2xkICsgMSAmJiB3ZWVrID09PSB3ZWVrSW5ZZWFyKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50V2Vlay5jbGFzc0xpc3QuYWRkKCdyZXNpZGUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGFsbFdlZWtzID0gKDUyICogKHllYXIgLSAxKSArIHdlZWspO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudFdlZWsuc2V0QXR0cmlidXRlKCd0aXRsZScsIGFsbFdlZWtzICsgJyB3ZWVrIG9mIGxpZmUgYW5kICcgKyB3ZWVrICsgJyB3ZWVrIG9mICcgKyB5ZWFyICsgJyB5ZWFyJyk7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50WWVhci5hcHBlbmRDaGlsZChlbGVtZW50V2Vlayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaWZlLmFwcGVuZENoaWxkKGVsZW1lbnRZZWFyKVxyXG4gICAgfVxyXG59Il19
