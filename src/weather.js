class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: '',
            dates: '',
            tempToday: '',
            tempTomorrow: '',
            tempDayAfter: ''
        };
    }

    componentDidMount() {
        fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.3913&lon=5.3221')
            .then(res => res.json())
            .then(json =>
                this.setState({
                    dates: getDates(json.properties.timeseries[0].time),
                    tempToday: [getTemp('min', 0, json.properties.timeseries), getTemp('max', 0, json.properties.timeseries)],
                    tempTomorrow: [getTemp('min', 1, json.properties.timeseries), getTemp('max', 1, json.properties.timeseries)],
                    tempDayAfter: [getTemp('min', 2, json.properties.timeseries), getTemp('max', 2, json.properties.timeseries)],
                    weatherData: json.properties.timeseries
                }))
    }

    render() {

        return (
            <div>
                <table id='weather-table' className='table table-borderless'>
                    <thead>
                        <tr>
                            <th><i className="fas fa-calendar-day"></i></th>
                            <th><i className="fas fa-thermometer-half"></i></th>
                            <th><i className="fas fa-wind"></i></th>
                            <th><i className="fas fa-umbrella"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.dates[0]}</td>
                            <td>{this.state.tempToday[0]} &#8451; til {this.state.tempToday[1]} &#8451;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.state.dates[1]}</td>
                            <td>{this.state.tempTomorrow[0]} &#8451; til {this.state.tempTomorrow[1]} &#8451;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{this.state.dates[2]}</td>
                            <td>{this.state.tempDayAfter[0]} &#8451; til {this.state.tempDayAfter[1]} &#8451;</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const getDates = (isoDate) => {
    const today = new Date(isoDate);
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let dayAfter = new Date();
    dayAfter.setDate(today.getDate() + 2);
    const settings = { weekday: 'long', day: 'numeric', month: 'long' }
    return [today.toLocaleDateString('no', settings), tomorrow.toLocaleDateString('no', settings), dayAfter.toLocaleDateString('no', settings)];
}

const getTemp = (val, dayIdx, dataArr) => {
    return val === 'min'
        ? Math.min.apply(Math, dataArr.map(data => {
            const currentDate = new Date(data.time).getDate();
            const queriedDate = new Date(dataArr[0].time);
            if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
                return data.data.instant.details.air_temperature
            }
        }).filter(Number))
        : Math.max.apply(Math, dataArr.map(data => {
            const currentDate = new Date(data.time).getDate();
            const queriedDate = new Date(dataArr[0].time);
            if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
                return data.data.instant.details.air_temperature
            }
        }).filter(Number))
}