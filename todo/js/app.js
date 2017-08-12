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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxjb250cm9sbGVyXFxjb250cm9sbGVyLmpzIiwic3JjXFxqc1xcbW9kZWxcXG1vZGVsLmpzIiwic3JjXFxqc1xcb3RoZXJcXHV0aWxzLmpzIiwic3JjXFxqc1xcdmlld1xcdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLFFBQVEscUJBQWQ7QUFDQSxJQUFNLE9BQU8sb0JBQWI7QUFDQSxJQUFNLGFBQWEseUJBQWUsS0FBZixFQUFzQixJQUF0QixDQUFuQjs7Ozs7Ozs7Ozs7OztJQ05NLFU7QUFDRix3QkFBWSxLQUFaLEVBQW1CLElBQW5CLEVBQXlCO0FBQUE7O0FBQ3JCLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBLGFBQUssRUFBTCxDQUFRLEtBQVIsRUFBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDQSxhQUFLLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixJQUF6QixDQUFsQjtBQUNBLGFBQUssRUFBTCxDQUFRLFFBQVIsRUFBa0IsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQWxCO0FBQ0EsYUFBSyxFQUFMLENBQVEsTUFBUixFQUFnQixLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBaEI7QUFDSDs7OztnQ0FFTyxJLEVBQU07QUFDVixnQkFBTSxPQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFDNUIsb0JBQUksS0FBSyxHQUFMLEVBRHdCO0FBRTVCLDBCQUY0QjtBQUc1Qix5QkFBUztBQUhtQixhQUFuQixDQUFiOztBQU1BLGlCQUFLLElBQUwsQ0FBVSxXQUFWLENBQXNCLElB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QixhQUF2QixDQUFoQjtBQUNBLGdCQUFNLFFBQVEsU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQWQ7QUFDQSxnQkFBTSxPQUFPLE1BQU0sS0FBbkI7QUFDQSxnQkFBTSxVQUFVLFNBQVMsYUFBVCxDQUF1QixtQkFBdkIsQ0FBaEI7QUFDQSxnQkFBTSxZQUFZLFNBQVMsU0FBVCxDQUFtQixRQUFuQixDQUE0QixTQUE1QixDQUFsQjs7QUFFQSxnQkFBSSxTQUFKLEVBQWU7QUFDWCxxQkFBSyxJQUFMLENBQVUsTUFBVixFQUFrQixFQUFDLE1BQUQsRUFBSyxVQUFMLEVBQWxCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsc0JBQU0sS0FBTixHQUFjLFFBQVEsV0FBdEI7QUFDQSx3QkFBUSxXQUFSLEdBQXNCLE1BQXRCO0FBQ0EseUJBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixTQUF2QjtBQUNIO0FBQ0o7Ozs0Q0FFd0I7QUFBQSxnQkFBVixNQUFVLFNBQVYsTUFBVTs7QUFDckIsZ0JBQU0sV0FBVyxPQUFPLFVBQXhCOztBQUVBLGlCQUFLLElBQUwsQ0FBVSxRQUFWLEVBQW9CLFNBQVMsWUFBVCxDQUFzQixTQUF0QixDQUFwQjtBQUNIOzs7cUNBRVksRSxFQUFJO0FBQ2IsbUJBQU8sS0FBSyxRQUFMLENBQWMsYUFBZCxnQkFBeUMsRUFBekMsUUFBUDtBQUNIOzs7Ozs7a0JBR1UsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcvdmlldydcclxuaW1wb3J0IE1vZGVsIGZyb20gJy4vbW9kZWwvbW9kZWwnXHJcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlci9jb250cm9sbGVyJ1xyXG5cclxuY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoKTtcclxuY29uc3QgdmlldyA9IG5ldyBWaWV3KCk7XHJcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcihtb2RlbCwgdmlldyk7IiwiY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCwgdmlldykge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG5cclxuICAgICAgICB2aWV3Lm9uKCdhZGQnLCB0aGlzLmFkZFRvZG8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdmlldy5vbigndG9nZ2xlJywgdGhpcy50b2dnbGVUb2RvSXRlbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB2aWV3Lm9uKCdkZWxldGUnLCB0aGlzLnJlbW92ZVRvZG9JdGVtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHZpZXcub24oJ2VkaXQnLCB0aGlzLmVkaXRUb2RvSXRlbS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKHRleHQpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5tb2RlbC5hZGRJdGVtKHtcclxuICAgICAgICAgICAgaWQ6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlldy5hZGRUb2RvSXRlbShpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVUb2RvSXRlbSh7aWQsIGNoZWNrZWR9KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMubW9kZWwudXBkYXRlSXRlbShpZCwge2NoZWNrZWR9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnZpZXcudG9nZ2xlVG9kb0l0ZW0oaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG9JdGVtKHtpZCwgdGV4dH0pIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5tb2RlbC51cGRhdGVJdGVtKGlkLCB7dGV4dH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZpZXcuZWRpdFRvZG9JdGVtKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvZG9JdGVtKGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZW1vdmVJdGVtKGlkKTtcclxuICAgICAgICB0aGlzLnZpZXcucmVtb3ZlVG9kb0l0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyOyIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uL290aGVyL3V0aWxzJ1xyXG5cclxuY2xhc3MgTW9kZWwgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoaXRlbXMgPSBbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT0gaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW0oaXRlbSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl0ZW0oaWQsIHByb3BzKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGtleSA9PiBpdGVtW2tleV0gPSBwcm9wc1trZXldKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLml0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtKGlkKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7IiwiZnVuY3Rpb24gY3JlYXRlRWxlbWVudCAodGFnLCBwcm9wcywgLi4uY2hpbGRyZW4pIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcbiAgICBcclxuICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKCdkYXRhLScpKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgcHJvcHNba2V5XSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBwcm9wc1trZXldKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2hpbGQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gbGVuZ3RoTnVtYmVyIChudW0pIHtcclxuICAgIHJldHVybiAobnVtICsgJycpLmxlbmd0aDtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0RGF0ZSAobnVtKSB7XHJcbiAgICByZXR1cm4gbGVuZ3RoTnVtYmVyKG51bSkgPT09IDIgPyBudW0gOiAnMCcgKyBudW07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRpbWUgKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgeWVhcjogXCIyLWRpZ2l0XCIsIG1vbnRoOiBcIjItZGlnaXRcIiwgZGF5OiBcIjItZGlnaXRcIixcclxuICAgICAgICBob3VyOiBcIjItZGlnaXRcIiwgbWludXRlOiBcIjItZGlnaXRcIiB9O1xyXG4gICAgY29uc3QgdGltZUZvcm1hdCA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwicnUtUlVTXCIsIG9wdGlvbnMpLmZvcm1hdDtcclxuICAgIHJldHVybiB0aW1lRm9ybWF0KERhdGUubm93KCkpO1xyXG59XHJcblxyXG5jbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBvbih0eXBlLCBsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdID0gdGhpcy5ldmVudHNbdHlwZV0gfHwgW107XHJcbiAgICAgICAgdGhpcy5ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdCh0eXBlLCBhcmcpIHtcclxuICAgICAgICBpZiAodGhpcy5ldmVudHNbdHlwZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbdHlwZV0uZm9yRWFjaChsaXN0ZW5lciA9PiBsaXN0ZW5lcihhcmcpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUVsZW1lbnQsIEV2ZW50RW1pdHRlciwgZ2V0VGltZSB9OyIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIEV2ZW50RW1pdHRlciwgZ2V0VGltZSB9IGZyb20gJy4uL290aGVyL3V0aWxzJztcclxuXHJcbmNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10b2RvJyk7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdG9kb19faW5wdXQnKTtcclxuICAgICAgICB0aGlzLnRvZG9MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9fX2xpc3QnKTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuaGFuZGxlQWRkLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRvZG9JdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge3R5cGU6ICdjaGVja2JveCcsIGNsYXNzOiAndG9kb19fY29tcGxldGUnfSwgdG9kby5jb21wbGV0ZSA/ICdjaGVja2VkJyA6ICcnKTtcclxuICAgICAgICBjb25zdCB0b2RvVGV4dCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtjbGFzczogJ3RvZG9fX3RleHQnfSwgdG9kby50ZXh0KTtcclxuICAgICAgICBjb25zdCB0b2RvVGltZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtjbGFzczogJ3RvZG9fX3RpbWUnfSwgZ2V0VGltZSgpKTtcclxuICAgICAgICBjb25zdCB0b2RvSW5wdXRFZGl0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7Y2xhc3M6ICd0b2RvX19lZGl0JywgdHlwZTogJ3RleHQnfSk7XHJcbiAgICAgICAgY29uc3QgdG9kb0luZm8gPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7Y2xhc3M6ICd0b2RvX19pbmZvJ30sIHRvZG9UZXh0LCB0b2RvSW5wdXRFZGl0LCB0b2RvVGltZSk7XHJcbiAgICAgICAgY29uc3QgdG9kb0J0bkVkaXQgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7Y2xhc3M6ICd0b2RvX19idG5fY2hhbmdlJ30sICdFZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgdG9kb0J0bkRlbGV0ZSA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtjbGFzczogJ3RvZG9fX2J0bl9kZWxldGUnfSwgJ0RlbGV0ZScpO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSBjcmVhdGVFbGVtZW50KCdsaScsIHtjbGFzczogJ3RvZG9fX2l0ZW0nLmNvbmNhdCh0b2RvLmNvbXBsZXRlID8gJyBjb21wbGV0ZScgOiAnJyksICdkYXRhLWlkJzogdG9kby5pZH0sIGNoZWNrYm94LCB0b2RvSW5mbywgdG9kb0J0bkVkaXQsIHRvZG9CdG5EZWxldGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRFdmVudExpc3RlbmVycyh0b2RvSXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoaXRlbSkge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fY29tcGxldGUnKTtcclxuICAgICAgICBjb25zdCBidG5DaGFuZ2UgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvX19idG5fY2hhbmdlJyk7XHJcbiAgICAgICAgY29uc3QgYnRuRGVsZXRlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fYnRuX2RlbGV0ZScpO1xyXG5cclxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZVRvZ2dsZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBidG5DaGFuZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUVkaXQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgYnRuRGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVEZWxldGUuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRvZG9JdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuY3JlYXRlVG9kb0l0ZW0odG9kbyk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSAnJztcclxuXHJcbiAgICAgICAgdGhpcy50b2RvTGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbSlcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVUb2RvSXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbSh0b2RvLmlkKTtcclxuXHJcbiAgICAgICAgaWYgKHRvZG8uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVkaXRUb2RvSXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbSh0b2RvLmlkKTtcclxuICAgICAgICBjb25zdCBkaXZUZXh0ID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX3RleHQnKTtcclxuICAgICAgICBjb25zdCBlZGl0QnV0dG9uID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2J0bl9jaGFuZ2UnKTtcclxuICAgICAgICBcclxuICAgICAgICBkaXZUZXh0LnRleHRDb250ZW50ID0gdG9kby50ZXh0O1xyXG4gICAgICAgIGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCc7XHJcbiAgICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnZWRpdGluZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvZG9JdGVtKGlkKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShpZCk7XHJcblxyXG4gICAgICAgIHRoaXMudG9kb0xpc3QucmVtb3ZlQ2hpbGQodG9kb0l0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUFkZChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmlucHV0LnZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdZb3UgbXVzdCBmaWxsIGluIHRoZSBmaWVsZCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ2FkZCcsIHRleHQpXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVG9nZ2xlKHt0YXJnZXR9KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIGNvbnN0IGlkID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcclxuICAgICAgICBjb25zdCBjaGVja2VkID0gdGFyZ2V0LmNoZWNrZWQ7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgndG9nZ2xlJywge2lkLCBjaGVja2VkfSlcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVFZGl0KHt0YXJnZXR9KSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBjb25zdCBpZCA9IHRvZG9JdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgIGNvbnN0IGRpdlRleHQgPSB0b2RvSXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fdGV4dCcpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2VkaXQnKTtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ0biA9IHRvZG9JdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvX19idG5fY2hhbmdlJyk7XHJcbiAgICAgICAgY29uc3QgaXNFZGl0aW5nID0gdG9kb0l0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0aW5nJyk7XHJcblxyXG4gICAgICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdlZGl0Jywge2lkLCB0ZXh0fSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGRpdlRleHQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGVkaXRCdG4udGV4dENvbnRlbnQgPSAnU2F2ZSc7XHJcbiAgICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoJ2VkaXRpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRGVsZXRlKHsgdGFyZ2V0IH0pIHtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ2RlbGV0ZScsIHRvZG9JdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRMaXN0SXRlbShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9MaXN0LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldzsiXX0=
