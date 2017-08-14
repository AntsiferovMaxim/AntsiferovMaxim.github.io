(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _view = require('./view/view');

var _view2 = _interopRequireDefault(_view);

var _model = require('./model/model');

var _model2 = _interopRequireDefault(_model);

var _controller = require('./controller/controller');

var _controller2 = _interopRequireDefault(_controller);

var _utils = require('./other/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = (0, _utils.load)();

var model = new _model2.default(state || undefined);
model.on('change', function (state) {
  return (0, _utils.save)(state);
});

var view = new _view2.default();

var controller = new _controller2.default(model, view);

},{"./controller/controller":2,"./model/model":3,"./other/utils":4,"./view/view":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../other/utils');

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

        view.show(model.items);
    }

    _createClass(Controller, [{
        key: 'addTodo',
        value: function addTodo(text) {
            var item = this.model.addItem({
                id: Date.now(),
                text: text,
                checked: false,
                time: (0, _utils.getTime)(Date.now())
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

},{"../other/utils":4}],3:[function(require,module,exports){
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
                return item.id == id;
            });

            if (index > -1) {
                this.items.splice(index, 1);
                this.emit('change', this.items);
                console.log(this.items);
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

function getTime() {
    var options = { year: "2-digit", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit" };
    var timeFormat = new Intl.DateTimeFormat("ru-RUS", options).format;
    return timeFormat(Date.now());
}

function save(data) {
    localStorage.setItem('todos', JSON.stringify(data));
}

function load() {
    if (localStorage.getItem('todos')) {
        return JSON.parse(localStorage.getItem('todos'));
    } else {
        return [];
    }
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
exports.load = load;
exports.save = save;

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
            var todoTime = (0, _utils.createElement)('div', { class: 'todo__time' }, todo.time);
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
        key: 'show',
        value: function show(todos) {
            var _this2 = this;

            todos.forEach(function (todo) {
                var listItem = _this2.createTodoItem(todo);

                _this2.todoList.appendChild(listItem);
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxjb250cm9sbGVyXFxjb250cm9sbGVyLmpzIiwic3JjXFxqc1xcbW9kZWxcXG1vZGVsLmpzIiwic3JjXFxqc1xcb3RoZXJcXHV0aWxzLmpzIiwic3JjXFxqc1xcdmlld1xcdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNLFFBQVEsa0JBQWQ7O0FBRUEsSUFBTSxRQUFRLG9CQUFVLFNBQVMsU0FBbkIsQ0FBZDtBQUNBLE1BQU0sRUFBTixDQUFTLFFBQVQsRUFBbUI7QUFBQSxTQUFTLGlCQUFLLEtBQUwsQ0FBVDtBQUFBLENBQW5COztBQUVBLElBQU0sT0FBTyxvQkFBYjs7QUFFQSxJQUFNLGFBQWEseUJBQWUsS0FBZixFQUFzQixJQUF0QixDQUFuQjs7Ozs7Ozs7Ozs7QUNaQTs7OztJQUVNLFU7QUFDRix3QkFBWSxLQUFaLEVBQW1CLElBQW5CLEVBQXlCO0FBQUE7O0FBQ3JCLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBLGFBQUssRUFBTCxDQUFRLEtBQVIsRUFBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDQSxhQUFLLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixJQUF6QixDQUFsQjtBQUNBLGFBQUssRUFBTCxDQUFRLFFBQVIsRUFBa0IsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQWxCO0FBQ0EsYUFBSyxFQUFMLENBQVEsTUFBUixFQUFnQixLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBaEI7O0FBRUEsYUFBSyxJQUFMLENBQVUsTUFBTSxLQUFoQjtBQUNIOzs7O2dDQUVPLEks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LGdCQUFRO0FBQ2xCLG9CQUFNLFdBQVcsT0FBSyxjQUFMLENBQW9CLElBQXBCLENBQWpCOztBQUVBLHVCQUFLLFFBQUwsQ0FBYyxXQUFkLENBQTBCLFFBQTFCO0FBQ0gsYUFKRDtBQUtIOzs7cUNBRVksRSxFQUFJO0FBQ2IsbUJBQU8sS0FBSyxRQUFMLENBQWMsYUFBZCxnQkFBeUMsRUFBekMsUUFBUDtBQUNIOzs7Ozs7a0JBR1UsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcvdmlldydcclxuaW1wb3J0IE1vZGVsIGZyb20gJy4vbW9kZWwvbW9kZWwnXHJcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlci9jb250cm9sbGVyJ1xyXG5pbXBvcnQge2xvYWQsIHNhdmV9IGZyb20gJy4vb3RoZXIvdXRpbHMnO1xyXG5cclxuY29uc3Qgc3RhdGUgPSBsb2FkKCk7XHJcblxyXG5jb25zdCBtb2RlbCA9IG5ldyBNb2RlbChzdGF0ZSB8fCB1bmRlZmluZWQpO1xyXG5tb2RlbC5vbignY2hhbmdlJywgc3RhdGUgPT4gc2F2ZShzdGF0ZSkpO1xyXG5cclxuY29uc3QgdmlldyA9IG5ldyBWaWV3KCk7XHJcblxyXG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIobW9kZWwsIHZpZXcpOyIsImltcG9ydCB7Z2V0VGltZX0gZnJvbSAnLi4vb3RoZXIvdXRpbHMnO1xyXG5cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCwgdmlldykge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG5cclxuICAgICAgICB2aWV3Lm9uKCdhZGQnLCB0aGlzLmFkZFRvZG8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdmlldy5vbigndG9nZ2xlJywgdGhpcy50b2dnbGVUb2RvSXRlbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB2aWV3Lm9uKCdkZWxldGUnLCB0aGlzLnJlbW92ZVRvZG9JdGVtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHZpZXcub24oJ2VkaXQnLCB0aGlzLmVkaXRUb2RvSXRlbS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmlldy5zaG93KG1vZGVsLml0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKHRleHQpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5tb2RlbC5hZGRJdGVtKHtcclxuICAgICAgICAgICAgaWQ6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB0aW1lOiBnZXRUaW1lKERhdGUubm93KCkpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlldy5hZGRUb2RvSXRlbShpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVUb2RvSXRlbSh7aWQsIGNoZWNrZWR9KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMubW9kZWwudXBkYXRlSXRlbShpZCwge2NoZWNrZWR9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnZpZXcudG9nZ2xlVG9kb0l0ZW0oaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG9JdGVtKHtpZCwgdGV4dH0pIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5tb2RlbC51cGRhdGVJdGVtKGlkLCB7dGV4dH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZpZXcuZWRpdFRvZG9JdGVtKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvZG9JdGVtKGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZW1vdmVJdGVtKGlkKTtcclxuICAgICAgICB0aGlzLnZpZXcucmVtb3ZlVG9kb0l0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyOyIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uL290aGVyL3V0aWxzJ1xyXG5cclxuY2xhc3MgTW9kZWwgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoaXRlbXMgPSBbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT0gaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW0oaXRlbSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl0ZW0oaWQsIHByb3BzKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGtleSA9PiBpdGVtW2tleV0gPSBwcm9wc1trZXldKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLml0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtKGlkKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT0gaWQpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdGhpcy5pdGVtcyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsOyIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQgKHRhZywgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG4gICAgXHJcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHByb3BzW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgcHJvcHNba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRpbWUgKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgeWVhcjogXCIyLWRpZ2l0XCIsIG1vbnRoOiBcIjItZGlnaXRcIiwgZGF5OiBcIjItZGlnaXRcIixcclxuICAgICAgICBob3VyOiBcIjItZGlnaXRcIiwgbWludXRlOiBcIjItZGlnaXRcIiB9O1xyXG4gICAgY29uc3QgdGltZUZvcm1hdCA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwicnUtUlVTXCIsIG9wdGlvbnMpLmZvcm1hdDtcclxuICAgIHJldHVybiB0aW1lRm9ybWF0KERhdGUubm93KCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlKGRhdGEpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvcycpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBvbih0eXBlLCBsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdID0gdGhpcy5ldmVudHNbdHlwZV0gfHwgW107XHJcbiAgICAgICAgdGhpcy5ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdCh0eXBlLCBhcmcpIHtcclxuICAgICAgICBpZiAodGhpcy5ldmVudHNbdHlwZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudHNbdHlwZV0uZm9yRWFjaChsaXN0ZW5lciA9PiBsaXN0ZW5lcihhcmcpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUVsZW1lbnQsIEV2ZW50RW1pdHRlciwgZ2V0VGltZSwgbG9hZCwgc2F2ZSB9OyIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnLi4vb3RoZXIvdXRpbHMnO1xyXG5cclxuY2xhc3MgVmlldyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRvZG8nKTtcclxuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10b2RvX19pbnB1dCcpO1xyXG4gICAgICAgIHRoaXMudG9kb0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kb19fbGlzdCcpO1xyXG5cclxuICAgICAgICB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5oYW5kbGVBZGQuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVG9kb0l0ZW0odG9kbykge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7dHlwZTogJ2NoZWNrYm94JywgY2xhc3M6ICd0b2RvX19jb21wbGV0ZSd9LCB0b2RvLmNvbXBsZXRlID8gJ2NoZWNrZWQnIDogJycpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9UZXh0ID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge2NsYXNzOiAndG9kb19fdGV4dCd9LCB0b2RvLnRleHQpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9UaW1lID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge2NsYXNzOiAndG9kb19fdGltZSd9LCB0b2RvLnRpbWUpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9JbnB1dEVkaXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtjbGFzczogJ3RvZG9fX2VkaXQnLCB0eXBlOiAndGV4dCd9KTtcclxuICAgICAgICBjb25zdCB0b2RvSW5mbyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtjbGFzczogJ3RvZG9fX2luZm8nfSwgdG9kb1RleHQsIHRvZG9JbnB1dEVkaXQsIHRvZG9UaW1lKTtcclxuICAgICAgICBjb25zdCB0b2RvQnRuRWRpdCA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIHtjbGFzczogJ3RvZG9fX2J0bl9jaGFuZ2UnfSwgJ0VkaXQnKTtcclxuICAgICAgICBjb25zdCB0b2RvQnRuRGVsZXRlID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge2NsYXNzOiAndG9kb19fYnRuX2RlbGV0ZSd9LCAnRGVsZXRlJyk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJywge2NsYXNzOiAndG9kb19faXRlbScuY29uY2F0KHRvZG8uY29tcGxldGUgPyAnIGNvbXBsZXRlJyA6ICcnKSwgJ2RhdGEtaWQnOiB0b2RvLmlkfSwgY2hlY2tib3gsIHRvZG9JbmZvLCB0b2RvQnRuRWRpdCwgdG9kb0J0bkRlbGV0ZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKHRvZG9JdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudExpc3RlbmVycyhpdGVtKSB7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvX19jb21wbGV0ZScpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkNoYW5nZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2J0bl9jaGFuZ2UnKTtcclxuICAgICAgICBjb25zdCBidG5EZWxldGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvX19idG5fZGVsZXRlJyk7XHJcblxyXG4gICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuaGFuZGxlVG9nZ2xlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGJ0bkNoYW5nZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlRWRpdC5iaW5kKHRoaXMpKTtcclxuICAgICAgICBidG5EZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZURlbGV0ZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9kb0l0ZW0odG9kbykge1xyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5jcmVhdGVUb2RvSXRlbSh0b2RvKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICB0aGlzLnRvZG9MaXN0LmFwcGVuZENoaWxkKHRvZG9JdGVtKVxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVRvZG9JdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKHRvZG8uaWQpO1xyXG5cclxuICAgICAgICBpZiAodG9kby5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG9JdGVtKHRvZG8pIHtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKHRvZG8uaWQpO1xyXG4gICAgICAgIGNvbnN0IGRpdlRleHQgPSB0b2RvSXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fdGV4dCcpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSB0b2RvSXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fYnRuX2NoYW5nZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRpdlRleHQudGV4dENvbnRlbnQgPSB0b2RvLnRleHQ7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdFZGl0JztcclxuICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0aW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVG9kb0l0ZW0oaWQpIHtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IHRoaXMuZmluZExpc3RJdGVtKGlkKTtcclxuXHJcbiAgICAgICAgdGhpcy50b2RvTGlzdC5yZW1vdmVDaGlsZCh0b2RvSXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQWRkKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuaW5wdXQudmFsdWU7XHJcblxyXG4gICAgICAgIGlmICghdGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYWxlcnQoJ1lvdSBtdXN0IGZpbGwgaW4gdGhlIGZpZWxkJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgnYWRkJywgdGV4dClcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVUb2dnbGUoe3RhcmdldH0pIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgY29uc3QgaWQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrZWQgPSB0YXJnZXQuY2hlY2tlZDtcclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KCd0b2dnbGUnLCB7aWQsIGNoZWNrZWR9KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUVkaXQoe3RhcmdldH0pIHtcclxuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIGNvbnN0IGlkID0gdG9kb0l0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcbiAgICAgICAgY29uc3QgZGl2VGV4dCA9IHRvZG9JdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvX190ZXh0Jyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0b2RvSXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fZWRpdCcpO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICBjb25zdCBlZGl0QnRuID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2J0bl9jaGFuZ2UnKTtcclxuICAgICAgICBjb25zdCBpc0VkaXRpbmcgPSB0b2RvSXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXRpbmcnKTtcclxuXHJcbiAgICAgICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2VkaXQnLCB7aWQsIHRleHR9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gZGl2VGV4dC50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdTYXZlJztcclxuICAgICAgICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZCgnZWRpdGluZycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVEZWxldGUoeyB0YXJnZXQgfSkge1xyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdCgnZGVsZXRlJywgdG9kb0l0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpXHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyh0b2Rvcykge1xyXG4gICAgICAgIHRvZG9zLmZvckVhY2godG9kbyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGhpcy5jcmVhdGVUb2RvSXRlbSh0b2RvKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudG9kb0xpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRMaXN0SXRlbShpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvZG9MaXN0LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtpZH1cIl1gKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldzsiXX0=
