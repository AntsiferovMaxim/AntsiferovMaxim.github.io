/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_sass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_index_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_index_sass__);


document.addEventListener("DOMContentLoaded", function () {
    // Radio grip
    const gripInputs = document.querySelectorAll('.grip-item input[type="radio"]');
    const grips = document.querySelectorAll('.grip');
    const gripItemActiveClass = 'grip-item_active';

    $('#input-phone').mask('+38(999)999-99-99');

    grips.forEach(item => {
        item.addEventListener('click', event => {
            if (event.target.nodeName.toUpperCase() === 'INPUT') {
                const name = event.target.getAttribute('name');
                const value = event.target.getAttribute('value');

                gripInputs.forEach(item => {
                    if (item.getAttribute('name') === name) {
                        item.parentNode.classList.remove(gripItemActiveClass);

                        if (item.getAttribute('value') === value) {
                            item.parentNode.classList.add(gripItemActiveClass);
                        }
                    }
                });
            }
        });
    });
    ///////////

    // Form validation
    const a = [{ name: 'name', msg: 'Вы не ввели имя', validator: textValid }, { name: 'age', msg: 'Вы не выбрали возраст', validator: radioValid }, { name: 'staj', msg: 'Вы не выбрали стаж', validator: radioValid }, { name: 'trudo', msg: 'Вы не выбрали трудоустройство', validator: radioValid }, { name: 'spravka', msg: 'Вы не указали наличие справки', validator: radioValid }, { name: 'sum', msg: 'Вы не указали сумму', validator: textValid }, { name: 'city', msg: 'Вы не указали город', validator: textValid }, { name: 'phone', msg: 'Вы не указали номер телефона', validator: textValid }];

    document.getElementById('main-form').addEventListener('submit', function (event) {
        event.preventDefault();

        let c;

        for (let item of a) {
            if (!item.validator(event.target[item.name])) {
                c = getParentNodeByClass($(event.target[item.name]), 'input-item').children();

                if (!c[c.length - 1].classList.contains('error')) {
                    getParentNodeByClass($(event.target[item.name]), 'input-item').append(createErrorMsg(item.msg));
                }
            } else {
                getParentNodeByClass($(event.target[item.name]), 'input-item').find('.error').remove();
            }
        }
    });
    /////////////

    // Percentage line
    const percentageLine = document.querySelector('.percentage-line');
    const percentageItems = document.querySelectorAll('.percentage-line__item');
    const total = percentageLine.dataset.total;

    percentageItems.forEach((item, index) => {
        let percent = (item.dataset.part * 100 / total + '').substring(0, 4) + '%';

        if (window.innerWidth > 550) {
            item.style.backgroundColor = item.dataset.color;
            item.style.width = percent;
        } else {
            item.style.width = 100 / percentageItems.length + '%';
        }
    });

    if (window.innerWidth < 550) {
        console.log(percentageItems[0].parentNode.classList.add('mobile'));
    }
});

function textValid(elem) {
    return $(elem).val() !== '';
}

function radioValid(elements) {
    let isValid;

    $(elements).each(index => {
        $(elements[index]).prop('checked') && (isValid = true);
    });

    return isValid;
}

function createErrorMsg(msg) {
    return `<div class="error">${msg}</div>`;
}

function getParentNodeByClass(element, parentClass) {
    if (element === undefined || parentClass === undefined) {
        return undefined;
    }

    const parents = element.parents();
    let parentNode;

    parents.each(index => {
        if ($(parents[index]).hasClass(parentClass)) {
            parentNode = $(parents[index]);
        }
    });

    return parentNode;
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);