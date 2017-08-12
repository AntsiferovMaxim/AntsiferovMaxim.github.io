(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _view = require('./view/view');

var _view2 = _interopRequireDefault(_view);

var _model = require('./model/model');

var _model2 = _interopRequireDefault(_model);

var _controller = require('./controller/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = new _model2.default();
var view = new _view2.default();
var controller = new _controller2.default(model, view);

},{"./controller/controller":2,"./model/model":3,"./view/view":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller(model, view) {
        _classCallCheck(this, Controller);

        this.model = model;
        this.view = view;

        view.on('add', this.addTodo.bind(this));
        view.on('toggle', this.toggleTodoItem.bind(this));
        view.on('delete', this.removeTodoItem.bind(this));
        view.on('edit', this.editTodoItem.bind(this));
    }

    _createClass(Controller, [{
        key: 'addTodo',
        value: function addTodo(text) {
            var item = this.model.addItem({
                id: Date.now(),
                text: text,
                checked: false
            });

            this.view.addTodoItem(item);
        }
    }, {
        key: 'toggleTodoItem',
        value: function toggleTodoItem(_ref) {
            var id = _ref.id,
                checked = _ref.checked;

            var item = this.model.updateItem(id, { checked: checked });

            this.view.toggleTodoItem(item);
        }
    }, {
        key: 'editTodoItem',
        value: function editTodoItem(_ref2) {
            var id = _ref2.id,
                text = _ref2.text;

            var item = this.model.updateItem(id, { text: text });

            this.view.editTodoItem(item);
        }
    }, {
        key: 'removeTodoItem',
        value: function removeTodoItem(id) {
            this.model.removeItem(id);
            this.view.removeTodoItem(id);
        }
    }]);

    return Controller;
}();

exports.default = Controller;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../other/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Model = function (_EventEmitter) {
    _inherits(Model, _EventEmitter);

    function Model() {
        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Model);

        var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

        _this.items = items;
        return _this;
    }

    _createClass(Model, [{
        key: 'getItem',
        value: function getItem(id) {
            return this.items.find(function (item) {
                return item.id == id;
            });
        }
    }, {
        key: 'addItem',
        value: function addItem(item) {
            this.items.push(item);
            this.emit('change', this.items);
            return item;
        }
    }, {
        key: 'updateItem',
        value: function updateItem(id, props) {
            var item = this.getItem(id);

            Object.keys(props).forEach(function (key) {
                return item[key] = props[key];
            });

            this.emit('change', this.item);

            return item;
        }
    }, {
        key: 'removeItem',
        value: function removeItem(id) {
            var index = this.items.findIndex(function (item) {
                return item.id === id;
            });

            if (index > -1) {
                this.items.splice(index, 1);
                this.emit('change', this.items);
            }
        }
    }]);

    return Model;
}(_utils.EventEmitter);

exports.default = Model;

},{"../other/utils":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function lengthNumber(num) {
    return (num + '').length;
}

function formatDate(num) {
    return lengthNumber(num) === 2 ? num : '0' + num;
}

function getTime() {
    var options = { year: "2-digit", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit" };
    var timeFormat = new Intl.DateTimeFormat("ru-RUS", options).format;
    return timeFormat(Date.now());
}

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.events = {};
    }

    _createClass(EventEmitter, [{
        key: 'on',
        value: function on(type, listener) {
            this.events[type] = this.events[type] || [];
            this.events[type].push(listener);
        }
    }, {
        key: 'emit',
        value: function emit(type, arg) {
            if (this.events[type]) {
                this.events[type].forEach(function (listener) {
                    return listener(arg);
                });
            }
        }
    }]);

    return EventEmitter;
}();

exports.createElement = createElement;
exports.EventEmitter = EventEmitter;
exports.getTime = getTime;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../other/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_EventEmitter) {
    _inherits(View, _EventEmitter);

    function View() {
        _classCallCheck(this, View);

        var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this));

        _this.form = document.getElementById('add-todo');
        _this.input = document.getElementById('add-todo__input');
        _this.todoList = document.getElementById('todo__list');

        _this.form.addEventListener('submit', _this.handleAdd.bind(_this));
        return _this;
    }

    _createClass(View, [{
        key: 'createTodoItem',
        value: function createTodoItem(todo) {
            var checkbox = (0, _utils.createElement)('input', { type: 'checkbox', class: 'todo__complete' }, todo.complete ? 'checked' : '');
            var todoText = (0, _utils.createElement)('div', { class: 'todo__text' }, todo.text);
            var todoTime = (0, _utils.createElement)('div', { class: 'todo__time' }, (0, _utils.getTime)());
            var todoInputEdit = (0, _utils.createElement)('input', { class: 'todo__edit', type: 'text' });
            var todoInfo = (0, _utils.createElement)('div', { class: 'todo__info' }, todoText, todoInputEdit, todoTime);
            var todoBtnEdit = (0, _utils.createElement)('button', { class: 'todo__btn_change' }, 'Edit');
            var todoBtnDelete = (0, _utils.createElement)('button', { class: 'todo__btn_delete' }, 'Delete');

            var todoItem = (0, _utils.createElement)('li', { class: 'todo__item'.concat(todo.complete ? ' complete' : ''), 'data-id': todo.id }, checkbox, todoInfo, todoBtnEdit, todoBtnDelete);

            return this.addEventListeners(todoItem);
        }
    }, {
        key: 'addEventListeners',
        value: function addEventListeners(item) {
            var checkbox = item.querySelector('.todo__complete');
            var btnChange = item.querySelector('.todo__btn_change');
            var btnDelete = item.querySelector('.todo__btn_delete');

            checkbox.addEventListener('change', this.handleToggle.bind(this));
            btnChange.addEventListener('click', this.handleEdit.bind(this));
            btnDelete.addEventListener('click', this.handleDelete.bind(this));

            return item;
        }
    }, {
        key: 'addTodoItem',
        value: function addTodoItem(todo) {
            var todoItem = this.createTodoItem(todo);

            this.input.value = '';

            this.todoList.appendChild(todoItem);
        }
    }, {
        key: 'toggleTodoItem',
        value: function toggleTodoItem(todo) {
            var todoItem = this.findListItem(todo.id);
            var checkbox = todoItem.querySelector('.todo__complete');

            //checkbox.checked = todo.checked;


            if (todo.checked) {
                todoItem.classList.add('complete');
            } else {
                todoItem.classList.remove('complete');
            }
        }
    }, {
        key: 'editTodoItem',
        value: function editTodoItem(todo) {
            var todoItem = this.findListItem(todo.id);
            var divText = todoItem.querySelector('.todo__text');
            var editButton = todoItem.querySelector('.todo__btn_change');

            divText.textContent = todo.text;
            editButton.textContent = 'Edit';
            todoItem.classList.remove('editing');
        }
    }, {
        key: 'removeTodoItem',
        value: function removeTodoItem(id) {
            var todoItem = this.findListItem(id);

            this.todoList.removeChild(todoItem);
        }
    }, {
        key: 'handleAdd',
        value: function handleAdd(event) {
            event.preventDefault();

            var text = this.input.value;

            if (!text) {
                return alert('You must fill in the field');
            }

            this.emit('add', text);
        }
    }, {
        key: 'handleToggle',
        value: function handleToggle(_ref) {
            var target = _ref.target;

            var item = target.parentNode;
            var id = item.getAttribute('data-id');
            var checked = target.checked;

            this.emit('toggle', { id: id, checked: checked });
        }
    }, {
        key: 'handleEdit',
        value: function handleEdit(_ref2) {
            var target = _ref2.target;

            var todoItem = target.parentNode;
            var id = todoItem.getAttribute('data-id');
            var divText = todoItem.querySelector('.todo__text');
            var input = todoItem.querySelector('.todo__edit');
            var text = input.value;
            var editBtn = todoItem.querySelector('.todo__btn_change');
            var isEditing = todoItem.classList.contains('editing');

            if (isEditing) {
                this.emit('edit', { id: id, text: text });
            } else {
                input.value = divText.textContent;
                editBtn.textContent = 'Save';
                todoItem.classList.add('editing');
            }
        }
    }, {
        key: 'handleDelete',
        value: function handleDelete(_ref3) {
            var target = _ref3.target;

            var todoItem = target.parentNode;

            this.emit('delete', todoItem.getAttribute('data-id'));
        }
    }, {
        key: 'findListItem',
        value: function findListItem(id) {
            return this.todoList.querySelector('[data-id="' + id + '"]');
        }
    }]);

    return View;
}(_utils.EventEmitter);

exports.default = View;

},{"../other/utils":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxjb250cm9sbGVyXFxjb250cm9sbGVyLmpzIiwic3JjXFxqc1xcbW9kZWxcXG1vZGVsLmpzIiwic3JjXFxqc1xcb3RoZXJcXHV0aWxzLmpzIiwic3JjXFxqc1xcdmlld1xcdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLFFBQVEscUJBQWQ7QUFDQSxJQUFNLE9BQU8sb0JBQWI7QUFDQSxJQUFNLGFBQWEseUJBQWUsS0FBZixFQUFzQixJQUF0QixDQUFuQjs7Ozs7Ozs7Ozs7OztJQ05NLFU7QUFDRix3QkFBWSxLQUFaLEVBQW1CLElBQW5CLEVBQXlCO0FBQUE7O0FBQ3JCLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBLGFBQUssRUFBTCxDQUFRLEtBQVIsRUFBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDQSxhQUFLLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixJQUF6QixDQUFsQjtBQUNBLGFBQUssRUFBTCxDQUFRLFFBQVIsRUFBa0IsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQWxCO0FBQ0EsYUFBSyxFQUFMLENBQVEsTUFBUixFQUFnQixLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBaEI7QUFDSDs7OztnQ0FFTyxJLEVBQU07QUFDVixnQkFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFDNUIsb0JBQUksS0FBSyxHQUFMLEVBRHdCO0FBRTVCLDBCQUY0QjtBQUc1Qix5QkFBUztBQUhtQixhQUFuQixDQUFiOztBQU1BLGlCQUFLLElBQUwsQ0FBVSxXQUFWLENBQXNCLElB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WUFBVCxDQUFzQixTQUF0QixDQUFYO0FBQ0EsZ0JBQU0sVUFBVSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBaEI7QUFDQSxnQkFBTSxRQUFRLFNBQVMsYUFBVCxDQUF1QixhQUF2QixDQUFkO0FBQ0EsZ0JBQU0sT0FBTyxNQUFNLEtBQW5CO0FBQ0EsZ0JBQU0sVUFBVSxTQUFTLGFBQVQsQ0FBdUIsbUJBQXZCLENBQWhCO0FBQ0EsZ0JBQU0sWUFBWSxTQUFTLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsU0FBNUIsQ0FBbEI7O0FBRUEsZ0JBQUksU0FBSixFQUFlO0FBQ1gscUJBQUssSUFBTCxDQUFVLE1BQVYsRUFBa0IsRUFBQyxNQUFELEVBQUssVUFBTCxFQUFsQjtBQUNILGFBRkQsTUFFTztBQUNILHNCQUFNLEtBQU4sR0FBYyxRQUFRLFdBQXRCO0FBQ0Esd0JBQVEsV0FBUixHQUFzQixNQUF0QjtBQUNBLHlCQUFTLFNBQVQsQ0FBbUIsR0FBbkIsQ0FBdUIsU0FBdkI7QUFDSDtBQUNKOzs7NENBRXdCO0FBQUEsZ0JBQVYsTUFBVSxTQUFWLE1BQVU7O0FBQ3JCLGdCQUFNLFdBQVcsT0FBTyxVQUF4Qjs7QUFFQSxpQkFBSyxJQUFMLENBQVUsUUFBVixFQUFvQixTQUFTLFlBQVQsQ0FBc0IsU0FBdEIsQ0FBcEI7QUFDSDs7O3FDQUVZLEUsRUFBSTtBQUNiLG1CQUFPLEtBQUssUUFBTCxDQUFjLGFBQWQsZ0JBQXlDLEVBQXpDLFFBQVA7QUFDSDs7Ozs7O2tCQUdVLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3L3ZpZXcnXHJcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsL21vZGVsJ1xyXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXIvY29udHJvbGxlcidcclxuXHJcbmNvbnN0IG1vZGVsID0gbmV3IE1vZGVsKCk7XHJcbmNvbnN0IHZpZXcgPSBuZXcgVmlldygpO1xyXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIobW9kZWwsIHZpZXcpOyIsImNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IobW9kZWwsIHZpZXcpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgdGhpcy52aWV3ID0gdmlldztcclxuXHJcbiAgICAgICAgdmlldy5vbignYWRkJywgdGhpcy5hZGRUb2RvLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHZpZXcub24oJ3RvZ2dsZScsIHRoaXMudG9nZ2xlVG9kb0l0ZW0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdmlldy5vbignZGVsZXRlJywgdGhpcy5yZW1vdmVUb2RvSXRlbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB2aWV3Lm9uKCdlZGl0JywgdGhpcy5lZGl0VG9kb0l0ZW0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kbyh0ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMubW9kZWwuYWRkSXRlbSh7XHJcbiAgICAgICAgICAgIGlkOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZpZXcuYWRkVG9kb0l0ZW0oaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlVG9kb0l0ZW0oe2lkLCBjaGVja2VkfSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLm1vZGVsLnVwZGF0ZUl0ZW0oaWQsIHtjaGVja2VkfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy52aWV3LnRvZ2dsZVRvZG9JdGVtKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvSXRlbSh7aWQsIHRleHR9KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMubW9kZWwudXBkYXRlSXRlbShpZCwge3RleHR9KTtcclxuXHJcbiAgICAgICAgdGhpcy52aWV3LmVkaXRUb2RvSXRlbShpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVUb2RvSXRlbShpZCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwucmVtb3ZlSXRlbShpZCk7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlbW92ZVRvZG9JdGVtKGlkKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjsiLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi9vdGhlci91dGlscydcclxuXHJcbmNsYXNzIE1vZGVsIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGl0ZW1zID0gW10pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJdGVtKGl0ZW0pIHtcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLml0ZW1zKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJdGVtKGlkLCBwcm9wcykge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4gaXRlbVtrZXldID0gcHJvcHNba2V5XSk7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdGhpcy5pdGVtKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSXRlbShpZCkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09PSBpZCk7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLml0ZW1zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsOyIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQgKHRhZywgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG4gICAgXHJcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHByb3BzW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgcHJvcHNba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxlbmd0aE51bWJlciAobnVtKSB7XHJcbiAgICByZXR1cm4gKG51bSArICcnKS5sZW5ndGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdERhdGUgKG51bSkge1xyXG4gICAgcmV0dXJuIGxlbmd0aE51bWJlcihudW0pID09PSAyID8gbnVtIDogJzAnICsgbnVtO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaW1lICgpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHllYXI6IFwiMi1kaWdpdFwiLCBtb250aDogXCIyLWRpZ2l0XCIsIGRheTogXCIyLWRpZ2l0XCIsXHJcbiAgICAgICAgaG91cjogXCIyLWRpZ2l0XCIsIG1pbnV0ZTogXCIyLWRpZ2l0XCIgfTtcclxuICAgIGNvbnN0IHRpbWVGb3JtYXQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcInJ1LVJVU1wiLCBvcHRpb25zKS5mb3JtYXQ7XHJcbiAgICByZXR1cm4gdGltZUZvcm1hdChEYXRlLm5vdygpKTtcclxufVxyXG5cclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgb24odHlwZSwgbGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50c1t0eXBlXSA9IHRoaXMuZXZlbnRzW3R5cGVdIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVtaXQodHlwZSwgYXJnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW3R5cGVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoYXJnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCBFdmVudEVtaXR0ZXIsIGdldFRpbWUgfTsiLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBFdmVudEVtaXR0ZXIsIGdldFRpbWUgfSBmcm9tICcuLi9vdGhlci91dGlscyc7XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdG9kbycpO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRvZG9fX2lucHV0Jyk7XHJcbiAgICAgICAgdGhpcy50b2RvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvX19saXN0Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLmhhbmRsZUFkZC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUb2RvSXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHt0eXBlOiAnY2hlY2tib3gnLCBjbGFzczogJ3RvZG9fX2NvbXBsZXRlJ30sIHRvZG8uY29tcGxldGUgPyAnY2hlY2tlZCcgOiAnJyk7XHJcbiAgICAgICAgY29uc3QgdG9kb1RleHQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7Y2xhc3M6ICd0b2RvX190ZXh0J30sIHRvZG8udGV4dCk7XHJcbiAgICAgICAgY29uc3QgdG9kb1RpbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7Y2xhc3M6ICd0b2RvX190aW1lJ30sIGdldFRpbWUoKSk7XHJcbiAgICAgICAgY29uc3QgdG9kb0lucHV0RWRpdCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge2NsYXNzOiAndG9kb19fZWRpdCcsIHR5cGU6ICd0ZXh0J30pO1xyXG4gICAgICAgIGNvbnN0IHRvZG9JbmZvID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge2NsYXNzOiAndG9kb19faW5mbyd9LCB0b2RvVGV4dCwgdG9kb0lucHV0RWRpdCwgdG9kb1RpbWUpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9CdG5FZGl0ID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge2NsYXNzOiAndG9kb19fYnRuX2NoYW5nZSd9LCAnRWRpdCcpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9CdG5EZWxldGUgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7Y2xhc3M6ICd0b2RvX19idG5fZGVsZXRlJ30sICdEZWxldGUnKTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gY3JlYXRlRWxlbWVudCgnbGknLCB7Y2xhc3M6ICd0b2RvX19pdGVtJy5jb25jYXQodG9kby5jb21wbGV0ZSA/ICcgY29tcGxldGUnIDogJycpLCAnZGF0YS1pZCc6IHRvZG8uaWR9LCBjaGVja2JveCwgdG9kb0luZm8sIHRvZG9CdG5FZGl0LCB0b2RvQnRuRGVsZXRlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnModG9kb0l0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKGl0ZW0pIHtcclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2NvbXBsZXRlJyk7XHJcbiAgICAgICAgY29uc3QgYnRuQ2hhbmdlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fYnRuX2NoYW5nZScpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkRlbGV0ZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2J0bl9kZWxldGUnKTtcclxuXHJcbiAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVUb2dnbGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgYnRuQ2hhbmdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVFZGl0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGJ0bkRlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlRGVsZXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvSXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmNyZWF0ZVRvZG9JdGVtKHRvZG8pO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgIHRoaXMudG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pXHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlVG9kb0l0ZW0odG9kbykge1xyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0odG9kby5pZCk7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSB0b2RvSXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fY29tcGxldGUnKTtcclxuXHJcbiAgICAgICAgLy9jaGVja2JveC5jaGVja2VkID0gdG9kby5jaGVja2VkO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRvZG8uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvSXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbSh0b2RvLmlkKTtcclxuICAgICAgICBjb25zdCBkaXZUZXh0ID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX3RleHQnKTtcclxuICAgICAgICBjb25zdCBlZGl0QnV0dG9uID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2J0bl9jaGFuZ2UnKTtcclxuICAgICAgICBcclxuICAgICAgICBkaXZUZXh0LnRleHRDb250ZW50ID0gdG9kby50ZXh0O1xyXG4gICAgICAgIGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCc7XHJcbiAgICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnZWRpdGluZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvZG9JdGVtKGlkKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShpZCk7XHJcblxyXG4gICAgICAgIHRoaXMudG9kb0xpc3QucmVtb3ZlQ2hpbGQodG9kb0l0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUFkZChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmlucHV0LnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdZb3UgbXVzdCBmaWxsIGluIHRoZSBmaWVsZCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ2FkZCcsIHRleHQpXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVG9nZ2xlKHt0YXJnZXR9KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIGNvbnN0IGlkID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcclxuICAgICAgICBjb25zdCBjaGVja2VkID0gdGFyZ2V0LmNoZWNrZWQ7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgndG9nZ2xlJywge2lkLCBjaGVja2VkfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFZGl0KHt0YXJnZXR9KSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBjb25zdCBpZCA9IHRvZG9JdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgIGNvbnN0IGRpdlRleHQgPSB0b2RvSXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fdGV4dCcpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2VkaXQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ0biA9IHRvZG9JdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvX19idG5fY2hhbmdlJyk7XHJcbiAgICAgICAgY29uc3QgaXNFZGl0aW5nID0gdG9kb0l0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0aW5nJyk7XHJcblxyXG4gICAgICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdlZGl0Jywge2lkLCB0ZXh0fSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGRpdlRleHQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGVkaXRCdG4udGV4dENvbnRlbnQgPSAnU2F2ZSc7XHJcbiAgICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoJ2VkaXRpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGVsZXRlKHsgdGFyZ2V0IH0pIHtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ2RlbGV0ZScsIHRvZG9JdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRMaXN0SXRlbShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9MaXN0LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldzsiXX0=
