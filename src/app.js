class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            theme: 'light-theme',
            themeChecked: false,
            weatherData: '',
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
                    tempToday: [getTemp('min', 0, json.properties.timeseries), getTemp('max', 0, json.properties.timeseries)],
                    tempTomorrow: [getTemp('min', 1, json.properties.timeseries), getTemp('max', 1, json.properties.timeseries)],
                    tempDayAfter: [getTemp('min', 2, json.properties.timeseries), getTemp('max', 2, json.properties.timeseries)],
                    weatherData: json.properties.timeseries
            }))
    }

    render() {

        return (
            <div id={this.state.theme}>
                <div id='theme-switch' className='switch' onClick={() => {
                    this.state.theme === 'light-theme' 
                    ? this.setState({ theme: 'dark-theme', themeChecked: true }) 
                    : this.setState({ theme: 'light-theme', themeChecked: false }) }}>
                    <input type='checkbox' id='slider' checked={this.state.themeChecked} readOnly></input>
                    <span className='slider round'></span>
                </div>
                <NavBar />
                <table id='weather-table' className='table'>
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
                            <td>Today</td>
                            <td>{this.state.tempToday[0]} &#8451; til {this.state.tempToday[1]} &#8451;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Tomorrow</td>
                            <td>{this.state.tempTomorrow[0]} &#8451; til {this.state.tempTomorrow[1]} &#8451;</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Day After</td>
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

function NavBar() {
    return (
        <ul className='nav justify-content-center'>
            <li className='nav-item'>
                <h2>Bergenseren</h2>
            </li>
            <li className='nav-item'>
                <a className='nav-link active' href='#'>Værvarsel</a>
            </li>
        </ul>
    );
}

const getTemp = (val, dayIdx, dataArr) => {
    return val === 'min' 
    ? Math.min.apply(Math, dataArr.map(data => {
        const currentDate = new Date(data.time).getDate();
        const queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            return data.data.instant.details.air_temperature
        }}).filter(Number))
    : Math.max.apply(Math, dataArr.map(data => {
        const currentDate = new Date(data.time).getDate();
        const queriedDate = new Date(dataArr[0].time);
        if (new Date(queriedDate.setDate(queriedDate.getDate() + dayIdx)).getDate() === currentDate) {
            return data.data.instant.details.air_temperature
        }}).filter(Number))
}


const element = <App city="Bergen" />;

const domContainer = document.getElementById('container');
ReactDOM.render(element, domContainer);