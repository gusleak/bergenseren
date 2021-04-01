class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            theme: 'light-theme',
            themeChecked: false
        };
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
                <h1>Bergenseren</h1>
            </div>
        );
    }
}

const element = <App city="Bergen" />;

const domContainer = document.getElementById('container');
ReactDOM.render(element, domContainer);