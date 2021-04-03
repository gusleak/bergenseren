var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Weather = function (_React$Component) {
    _inherits(Weather, _React$Component);

    function Weather(props) {
        _classCallCheck(this, Weather);

        var _this = _possibleConstructorReturn(this, (Weather.__proto__ || Object.getPrototypeOf(Weather)).call(this, props));

        _this.state = {
            weatherData: '',
            dates: '',
            tempToday: '',
            tempTomorrow: '',
            tempDayAfter: ''
        };
        return _this;
    }

    _createClass(Weather, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.3913&lon=5.3221').then(function (res) {
                return res.json();
            }).then(function (json) {
                return _this2.setState({
                    dates: getDates(json.properties.timeseries[0].time),
                    tempToday: [getTemp('min', 0, json.properties.timeseries), getTemp('max', 0, json.properties.timeseries)],
                    tempTomorrow: [getTemp('min', 1, json.properties.timeseries), getTemp('max', 1, json.properties.timeseries)],
                    tempDayAfter: [getTemp('min', 2, json.properties.timeseries), getTemp('max', 2, json.properties.timeseries)],
                    weatherData: json.properties.timeseries
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'table',
                    { id: 'weather-table', className: 'table table-borderless' },
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                React.createElement('i', { className: 'fas fa-calendar-day' })
                            ),
                            React.createElement(
                                'th',
                                null,
                                React.createElement('i', { className: 'fas fa-thermometer-half' })
                            ),
                            React.createElement(
                                'th',
                                null,
                                React.createElement('i', { className: 'fas fa-wind' })
                            ),
                            React.createElement(
                                'th',
                                null,
                                React.createElement('i', { className: 'fas fa-umbrella' })
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                this.state.dates[0]
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.tempToday[0],
                                ' \u2103 til ',
                                this.state.tempToday[1],
                                ' \u2103'
                            ),
                            React.createElement('td', null),
                            React.createElement('td', null)
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                this.state.dates[1]
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.tempTomorrow[0],
                                ' \u2103 til ',
                                this.state.tempTomorrow[1],
                                ' \u2103'
                            ),
                            React.createElement('td', null),
                            React.createElement('td', null)
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                null,
                                this.state.dates[2]
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.tempDayAfter[0],
                                ' \u2103 til ',
                                this.state.tempDayAfter[1],
                                ' \u2103'
                            ),
                            React.createElement('td', null),
                            React.createElement('td', null)
                        )
                    )
                )
            );
        }
    }]);

    return Weather;
}(React.Component);

var getDates = function getDates(isoDate) {
    var today = new Date(isoDate);
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    var dayAfter = new Date();
    dayAfter.setDate(today.getDate() + 2);
    var settings = { weekday: 'long', day: 'numeric', month: 'long' };
    return [today.toLocaleDateString('no', settings), tomorrow.toLocaleDateString('no', settings), dayAfter.toLocaleDateString('no', settings)];
};

var getTemp = function getTemp(val, dayIdx, dataArr) {
    return val === 'min' ? Math.min.apply(Math, dataArr.map(function (data) {
        var currentDate = new Date(data.time).getDate();
        var queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            return data.data.instant.details.air_temperature;
        }
    }).filter(Number)) : Math.max.apply(Math, dataArr.map(function (data) {
        var currentDate = new Date(data.time).getDate();
        var queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            return data.data.instant.details.air_temperature;
        }
    }).filter(Number));
};