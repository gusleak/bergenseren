class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: '',
            dates: '',
            temperature: '',
            windSpeed: '',
            precipitation: ''
        };
    }

    componentDidMount() {
        fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.3913&lon=5.3221')
            .then(res => res.json())
            .then(json =>
                this.setState({
                    dates: getDates(json.properties.timeseries[0].time),
                    temperature: [getTemp('min', 0, json.properties.timeseries), getTemp('max', 0, json.properties.timeseries),
                                getTemp('min', 1, json.properties.timeseries), getTemp('max', 1, json.properties.timeseries),
                                getTemp('min', 2, json.properties.timeseries), getTemp('max', 2, json.properties.timeseries)],
                    windSpeed: [getWind(0, json.properties.timeseries), getWind(1, json.properties.timeseries), getWind(2, json.properties.timeseries)],
                    precipitation: [getRain(0, json.properties.timeseries), getRain(0, json.properties.timeseries, true),
                                    getRain(1, json.properties.timeseries), getRain(1, json.properties.timeseries, true),
                                    getRain(2, json.properties.timeseries), getRain(2, json.properties.timeseries, true)],
                    weatherData: json.properties.timeseries
                }))
    }

    render() {

        return (
            <div className={this.props.theme === 'light' ? 'container border shadow-sm p-5 mb-5 rounded' : 'container border border-dark shadow-sm p-5 mb-5 rounded'}>
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
                            <td><span className='temp-degree'>{this.state.temperature[0]}</span> &#8451; til <span className='temp-degree'>{this.state.temperature[1]}</span> &#8451;</td>
                            <td>opp til <span className='wind-degree'>{this.state.windSpeed[0]}</span> m/s</td>
                            <td><span className='prep-degree'>{this.state.precipitation[0]}</span> mm kl {this.state.precipitation[1]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.dates[1]}</td>
                            <td><span className='temp-degree'>{this.state.temperature[2]}</span> &#8451; til <span className='temp-degree'>{this.state.temperature[3]}</span> &#8451;</td>
                            <td>opp til <span className='wind-degree'>{this.state.windSpeed[1]}</span> m/s</td>
                            <td><span className='prep-degree'>{this.state.precipitation[2]}</span> mm kl {this.state.precipitation[3]}</td>
                        </tr>
                        <tr>
                            <td>{this.state.dates[2]}</td>
                            <td><span className='temp-degree'>{this.state.temperature[4]}</span> &#8451; til <span className='temp-degree'>{this.state.temperature[5]}</span> &#8451;</td>
                            <td>opp til <span className='wind-degree'>{this.state.windSpeed[2]}</span> m/s</td>
                            <td><span className='prep-degree'>{this.state.precipitation[4]}</span> mm kl {this.state.precipitation[5]}</td>
                        </tr>
                    </tbody>
                </table>
                <small>Med data fra <a href='https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/1-92416/Norge/Vestland/Bergen/Bergen'>yr.no</a>.</small>
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

const getWind = (dayIdx, dataArr) => {
    return Math.max.apply(Math, dataArr.map(data => {
        const currentDate = new Date(data.time).getDate();
        const queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            return data.data.instant.details.wind_speed
        }
    }).filter(Number))
}

const getRain = (dayIdx, dataArr, time=false) => {
    const rainPerHour =  dataArr.map(data => {
        const currentDate = new Date(data.time).getDate();
        const queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            if (data.data.next_1_hours !== undefined) {
                return [data.data.next_1_hours.details.precipitation_amount, new Date(data.time).getHours()]
            } else {
                return undefined
            }
        }});
    let precipitation = [], hours = [];
    for (let i=0; i < rainPerHour.length; i++) {
        if (rainPerHour[i] !== undefined) {
            precipitation.push(rainPerHour[i][0]);
            hours.push(rainPerHour[i][1]);
        }
    }
    return !time ? Math.max.apply(Math, precipitation) : hours[precipitation.indexOf(Math.max.apply(Math, precipitation))];
}