
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            theme: 'light-theme',
            themeChecked: false,
            currentTemp: '',
            weatherData: ''
        };
    }

    componentDidMount() {
        fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.3913&lon=5.3221')
            .then(res => res.json())
            .then(json => 
                this.setState({
                currentTemp: json.properties.timeseries[0].data.instant.details.air_temperature,
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
                <h1 id='title'>Bergenseren</h1>
                <table id='weather-table' className='table table-sm'>
                    <thead>
                        <tr>
                            <th><i class="fas fa-calendar-day"></i></th>
                            <th><i className="fas fa-thermometer-half"></i></th>
                            <th><i class="fas fa-wind"></i></th>
                            <th><i class="fas fa-umbrella"></i></th>
                        </tr>
                    </thead>
                    <tr>
                        <td>Today</td>
                        <td>{this.state.currentTemp} &#8451;</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        );
    }
}

const element = <App city="Bergen" />;

const domContainer = document.getElementById('container');
ReactDOM.render(element, domContainer);