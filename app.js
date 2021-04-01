var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            theme: 'light-theme',
            themeChecked: false
        };
        return _this;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                { id: this.state.theme },
                React.createElement(
                    'div',
                    { id: 'theme-switch', className: 'switch', onClick: function onClick() {
                            _this2.state.theme === 'light-theme' ? _this2.setState({ theme: 'dark-theme', themeChecked: true }) : _this2.setState({ theme: 'light-theme', themeChecked: false });
                        } },
                    React.createElement('input', { type: 'checkbox', id: 'slider', checked: this.state.themeChecked, readOnly: true }),
                    React.createElement('span', { className: 'slider round' })
                ),
                React.createElement(
                    'h1',
                    null,
                    'Bergenseren'
                )
            );
        }
    }]);

    return App;
}(React.Component);

var element = React.createElement(App, { city: 'Bergen' });

var domContainer = document.getElementById('container');
ReactDOM.render(element, domContainer);