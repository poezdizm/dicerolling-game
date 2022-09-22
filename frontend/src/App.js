import React, {Component} from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        rolls: []
    };

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/rolls');
        const body = await response.json();
        this.setState({rolls: body});
    }

    render() {
        const {rolls} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className="App-intro">
                        <h2>Rolls</h2>
                        {rolls.map(roll =>
                            <div key={roll.id}>
                                {roll.username} ({roll.rollValue})
                            </div>
                        )}
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
