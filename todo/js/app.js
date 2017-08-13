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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxhcHAuanMiLCJzcmNcXGpzXFxjb250cm9sbGVyXFxjb250cm9sbGVyLmpzIiwic3JjXFxqc1xcbW9kZWxcXG1vZGVsLmpzIiwic3JjXFxqc1xcb3RoZXJcXHV0aWxzLmpzIiwic3JjXFxqc1xcdmlld1xcdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNLFFBQVEsa0JBQWQ7O0FBRUEsSUFBTSxRQUFRLG9CQUFVLFNBQVMsU0FBbkIsQ0FBZDtBQUNBLE1BQU0sRUFBTixDQUFTLFFBQVQsRUFBbUI7QUFBQSxTQUFTLGlCQUFLLEtBQUwsQ0FBVDtBQUFBLENBQW5COztBQUVBLElBQU0sT0FBTyxvQkFBYjs7QUFFQSxJQUFNLGFBQWEseUJBQWUsS0FBZixFQUFzQixJQUF0QixDQUFuQjs7Ozs7Ozs7Ozs7OztJQ1pNLFU7QUFDRix3QkFBWSxLQUFaLEVBQW1CLElBQW5CLEVBQXlCO0FBQUE7O0FBQ3JCLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBLGFBQUssRUFBTCxDQUFRLEtBQVIsRUFBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDQSxhQUFLLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixJQUF6QixDQUFsQjtBQUNBLGFBQUssRUFBTCxDQUFRLFFBQVIsRUFBa0IsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQWxCO0FBQ0EsYUFBSyxFQUFMLENBQVEsTUFBUixFQUFnQixLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBaEI7O0FBRUEsYUFBSyxJQUFMLENBQVUsTUFBTSxLQUFoQjtBQUNIOzs7O2dDQUVPLEksRUFBTTtB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QkFBTSxXQUFXLE9BQU8sVUFBeEI7O0FBRUEsaUJBQUssSUFBTCxDQUFVLFFBQVYsRUFBb0IsU0FBUyxZQUFULENBQXNCLFNBQXRCLENBQXBCO0FBQ0g7Ozs2QkFFSSxLLEVBQU87QUFBQTs7QUFDUixrQkFBTSxPQUFOLENBQWMsZ0JBQVE7QUFDbEIsb0JBQU0sV0FBVyxPQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBakI7O0FBRUEsdUJBQUssUUFBTCxDQUFjLFdBQWQsQ0FBMEIsUUFBMUI7QUFDSCxhQUpEO0FBS0g7OztxQ0FFWSxFLEVBQUk7QUFDYixtQkFBTyxLQUFLLFFBQUwsQ0FBYyxhQUFkLGdCQUF5QyxFQUF6QyxRQUFQO0FBQ0g7Ozs7OztrQkFHVSxJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBWaWV3IGZyb20gJy4vdmlldy92aWV3J1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbC9tb2RlbCdcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyL2NvbnRyb2xsZXInXHJcbmltcG9ydCB7bG9hZCwgc2F2ZX0gZnJvbSAnLi9vdGhlci91dGlscyc7XHJcblxyXG5jb25zdCBzdGF0ZSA9IGxvYWQoKTtcclxuXHJcbmNvbnN0IG1vZGVsID0gbmV3IE1vZGVsKHN0YXRlIHx8IHVuZGVmaW5lZCk7XHJcbm1vZGVsLm9uKCdjaGFuZ2UnLCBzdGF0ZSA9PiBzYXZlKHN0YXRlKSk7XHJcblxyXG5jb25zdCB2aWV3ID0gbmV3IFZpZXcoKTtcclxuXHJcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcihtb2RlbCwgdmlldyk7IiwiY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCwgdmlldykge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG5cclxuICAgICAgICB2aWV3Lm9uKCdhZGQnLCB0aGlzLmFkZFRvZG8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdmlldy5vbigndG9nZ2xlJywgdGhpcy50b2dnbGVUb2RvSXRlbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB2aWV3Lm9uKCdkZWxldGUnLCB0aGlzLnJlbW92ZVRvZG9JdGVtLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHZpZXcub24oJ2VkaXQnLCB0aGlzLmVkaXRUb2RvSXRlbS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmlldy5zaG93KG1vZGVsLml0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvKHRleHQpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5tb2RlbC5hZGRJdGVtKHtcclxuICAgICAgICAgICAgaWQ6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlldy5hZGRUb2RvSXRlbShpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVUb2RvSXRlbSh7aWQsIGNoZWNrZWR9KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMubW9kZWwudXBkYXRlSXRlbShpZCwge2NoZWNrZWR9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnZpZXcudG9nZ2xlVG9kb0l0ZW0oaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRvZG9JdGVtKHtpZCwgdGV4dH0pIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5tb2RlbC51cGRhdGVJdGVtKGlkLCB7dGV4dH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZpZXcuZWRpdFRvZG9JdGVtKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvZG9JdGVtKGlkKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZW1vdmVJdGVtKGlkKTtcclxuICAgICAgICB0aGlzLnZpZXcucmVtb3ZlVG9kb0l0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyOyIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uL290aGVyL3V0aWxzJ1xyXG5cclxuY2xhc3MgTW9kZWwgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoaXRlbXMgPSBbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0uaWQgPT0gaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW0oaXRlbSkge1xyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl0ZW0oaWQsIHByb3BzKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGtleSA9PiBpdGVtW2tleV0gPSBwcm9wc1trZXldKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLml0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtKGlkKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT0gaWQpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdGhpcy5pdGVtcyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsOyIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQgKHRhZywgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG4gICAgXHJcbiAgICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHByb3BzW2tleV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgcHJvcHNba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGNoaWxkID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxlbmd0aE51bWJlciAobnVtKSB7XHJcbiAgICByZXR1cm4gKG51bSArICcnKS5sZW5ndGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdERhdGUgKG51bSkge1xyXG4gICAgcmV0dXJuIGxlbmd0aE51bWJlcihudW0pID09PSAyID8gbnVtIDogJzAnICsgbnVtO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaW1lICgpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHllYXI6IFwiMi1kaWdpdFwiLCBtb250aDogXCIyLWRpZ2l0XCIsIGRheTogXCIyLWRpZ2l0XCIsXHJcbiAgICAgICAgaG91cjogXCIyLWRpZ2l0XCIsIG1pbnV0ZTogXCIyLWRpZ2l0XCIgfTtcclxuICAgIGNvbnN0IHRpbWVGb3JtYXQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcInJ1LVJVU1wiLCBvcHRpb25zKS5mb3JtYXQ7XHJcbiAgICByZXR1cm4gdGltZUZvcm1hdChEYXRlLm5vdygpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZShkYXRhKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWQoKSB7XHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykpIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgb24odHlwZSwgbGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmV2ZW50c1t0eXBlXSA9IHRoaXMuZXZlbnRzW3R5cGVdIHx8IFtdO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVtaXQodHlwZSwgYXJnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW3R5cGVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW3R5cGVdLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoYXJnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50LCBFdmVudEVtaXR0ZXIsIGdldFRpbWUsIGxvYWQsIHNhdmUgfTsiLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBFdmVudEVtaXR0ZXIsIGdldFRpbWUgfSBmcm9tICcuLi9vdGhlci91dGlscyc7XHJcblxyXG5jbGFzcyBWaWV3IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdG9kbycpO1xyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRvZG9fX2lucHV0Jyk7XHJcbiAgICAgICAgdGhpcy50b2RvTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvX19saXN0Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLmhhbmRsZUFkZC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVUb2RvSXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHt0eXBlOiAnY2hlY2tib3gnLCBjbGFzczogJ3RvZG9fX2NvbXBsZXRlJ30sIHRvZG8uY29tcGxldGUgPyAnY2hlY2tlZCcgOiAnJyk7XHJcbiAgICAgICAgY29uc3QgdG9kb1RleHQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7Y2xhc3M6ICd0b2RvX190ZXh0J30sIHRvZG8udGV4dCk7XHJcbiAgICAgICAgY29uc3QgdG9kb1RpbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7Y2xhc3M6ICd0b2RvX190aW1lJ30sIGdldFRpbWUoKSk7XHJcbiAgICAgICAgY29uc3QgdG9kb0lucHV0RWRpdCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge2NsYXNzOiAndG9kb19fZWRpdCcsIHR5cGU6ICd0ZXh0J30pO1xyXG4gICAgICAgIGNvbnN0IHRvZG9JbmZvID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge2NsYXNzOiAndG9kb19faW5mbyd9LCB0b2RvVGV4dCwgdG9kb0lucHV0RWRpdCwgdG9kb1RpbWUpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9CdG5FZGl0ID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge2NsYXNzOiAndG9kb19fYnRuX2NoYW5nZSd9LCAnRWRpdCcpO1xyXG4gICAgICAgIGNvbnN0IHRvZG9CdG5EZWxldGUgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7Y2xhc3M6ICd0b2RvX19idG5fZGVsZXRlJ30sICdEZWxldGUnKTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gY3JlYXRlRWxlbWVudCgnbGknLCB7Y2xhc3M6ICd0b2RvX19pdGVtJy5jb25jYXQodG9kby5jb21wbGV0ZSA/ICcgY29tcGxldGUnIDogJycpLCAnZGF0YS1pZCc6IHRvZG8uaWR9LCBjaGVja2JveCwgdG9kb0luZm8sIHRvZG9CdG5FZGl0LCB0b2RvQnRuRGVsZXRlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnModG9kb0l0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKGl0ZW0pIHtcclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2NvbXBsZXRlJyk7XHJcbiAgICAgICAgY29uc3QgYnRuQ2hhbmdlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fYnRuX2NoYW5nZScpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkRlbGV0ZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX2J0bl9kZWxldGUnKTtcclxuXHJcbiAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVUb2dnbGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgYnRuQ2hhbmdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVFZGl0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGJ0bkRlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlRGVsZXRlLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb2RvSXRlbSh0b2RvKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0aGlzLmNyZWF0ZVRvZG9JdGVtKHRvZG8pO1xyXG5cclxuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgIHRoaXMudG9kb0xpc3QuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pXHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlVG9kb0l0ZW0odG9kbykge1xyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0odG9kby5pZCk7XHJcblxyXG4gICAgICAgIGlmICh0b2RvLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlZGl0VG9kb0l0ZW0odG9kbykge1xyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0odG9kby5pZCk7XHJcbiAgICAgICAgY29uc3QgZGl2VGV4dCA9IHRvZG9JdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvX190ZXh0Jyk7XHJcbiAgICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IHRvZG9JdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvX19idG5fY2hhbmdlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGl2VGV4dC50ZXh0Q29udGVudCA9IHRvZG8udGV4dDtcclxuICAgICAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xyXG4gICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXRpbmcnKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVUb2RvSXRlbShpZCkge1xyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0oaWQpO1xyXG5cclxuICAgICAgICB0aGlzLnRvZG9MaXN0LnJlbW92ZUNoaWxkKHRvZG9JdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVBZGQoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5pbnB1dC52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGVydCgnWW91IG11c3QgZmlsbCBpbiB0aGUgZmllbGQnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KCdhZGQnLCB0ZXh0KVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRvZ2dsZSh7dGFyZ2V0fSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICBjb25zdCBpZCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcbiAgICAgICAgY29uc3QgY2hlY2tlZCA9IHRhcmdldC5jaGVja2VkO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ3RvZ2dsZScsIHtpZCwgY2hlY2tlZH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlRWRpdCh7dGFyZ2V0fSkge1xyXG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgY29uc3QgaWQgPSB0b2RvSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcclxuICAgICAgICBjb25zdCBkaXZUZXh0ID0gdG9kb0l0ZW0ucXVlcnlTZWxlY3RvcignLnRvZG9fX3RleHQnKTtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IHRvZG9JdGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvX19lZGl0Jyk7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGlucHV0LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGVkaXRCdG4gPSB0b2RvSXRlbS5xdWVyeVNlbGVjdG9yKCcudG9kb19fYnRuX2NoYW5nZScpO1xyXG4gICAgICAgIGNvbnN0IGlzRWRpdGluZyA9IHRvZG9JdGVtLmNsYXNzTGlzdC5jb250YWlucygnZWRpdGluZycpO1xyXG5cclxuICAgICAgICBpZiAoaXNFZGl0aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZWRpdCcsIHtpZCwgdGV4dH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBkaXZUZXh0LnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICBlZGl0QnRuLnRleHRDb250ZW50ID0gJ1NhdmUnO1xyXG4gICAgICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKCdlZGl0aW5nJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZURlbGV0ZSh7IHRhcmdldCB9KSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KCdkZWxldGUnLCB0b2RvSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSlcclxuICAgIH1cclxuXHJcbiAgICBzaG93KHRvZG9zKSB7XHJcbiAgICAgICAgdG9kb3MuZm9yRWFjaCh0b2RvID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmNyZWF0ZVRvZG9JdGVtKHRvZG8pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZExpc3RJdGVtKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9kb0xpc3QucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWV3OyJdfQ==
