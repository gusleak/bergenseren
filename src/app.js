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
                <NavBar />
                <Weather />
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

const element = <App city="Bergen" />;

const domContainer = document.getElementById('container');
ReactDOM.render(element, domContainer);