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
            temperature: '',
            windSpeed: '',
            precipitation: ''
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
                    temperature: [getTemp('min', 0, json.properties.timeseries), getTemp('max', 0, json.properties.timeseries), getTemp('min', 1, json.properties.timeseries), getTemp('max', 1, json.properties.timeseries), getTemp('min', 2, json.properties.timeseries), getTemp('max', 2, json.properties.timeseries)],
                    windSpeed: [getWind(0, json.properties.timeseries), getWind(1, json.properties.timeseries), getWind(2, json.properties.timeseries)],
                    precipitation: [getRain(0, json.properties.timeseries), getRain(0, json.properties.timeseries, true), getRain(1, json.properties.timeseries), getRain(1, json.properties.timeseries, true), getRain(2, json.properties.timeseries), getRain(2, json.properties.timeseries, true)],
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
                                this.state.temperature[0],
                                ' \u2103 til ',
                                this.state.temperature[1],
                                ' \u2103'
                            ),
                            React.createElement(
                                'td',
                                null,
                                'opp til ',
                                this.state.windSpeed[0],
                                ' m/s'
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.precipitation[0],
                                ' mm kl ',
                                this.state.precipitation[1]
                            )
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
                                this.state.temperature[2],
                                ' \u2103 til ',
                                this.state.temperature[3],
                                ' \u2103'
                            ),
                            React.createElement(
                                'td',
                                null,
                                'opp til ',
                                this.state.windSpeed[1],
                                ' m/s'
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.precipitation[2],
                                ' mm kl ',
                                this.state.precipitation[3]
                            )
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
                                this.state.temperature[4],
                                ' \u2103 til ',
                                this.state.temperature[5],
                                ' \u2103'
                            ),
                            React.createElement(
                                'td',
                                null,
                                'opp til ',
                                this.state.windSpeed[2],
                                ' m/s'
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.precipitation[4],
                                ' mm kl ',
                                this.state.precipitation[5]
                            )
                        )
                    )
                ),
                React.createElement(
                    'small',
                    null,
                    'Med data fra ',
                    React.createElement(
                        'a',
                        { href: 'https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-92416/Norge/Vestland/Bergen/Bergen' },
                        'yr.no'
                    ),
                    '.'
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

var getWind = function getWind(dayIdx, dataArr) {
    return Math.max.apply(Math, dataArr.map(function (data) {
        var currentDate = new Date(data.time).getDate();
        var queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            return data.data.instant.details.wind_speed;
        }
    }).filter(Number));
};

var getRain = function getRain(dayIdx, dataArr) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var rainPerHour = dataArr.map(function (data) {
        var currentDate = new Date(data.time).getDate();
        var queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            if (data.data.next_1_hours !== undefined) {
                return [data.data.next_1_hours.details.precipitation_amount, new Date(data.time).getHours()];
            } else {
                return undefined;
            }
        }
    });
    var precipitation = [],
        hours = [];
    for (var i = 0; i < rainPerHour.length; i++) {
        if (rainPerHour[i] !== undefined) {
            precipitation.push(rainPerHour[i][0]);
            hours.push(rainPerHour[i][1]);
        }
    }
    return !time ? Math.max.apply(Math, precipitation) : hours[precipitation.indexOf(Math.max.apply(Math, precipitation))];
};