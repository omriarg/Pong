import React, { Component } from 'react';
import './App.css';
import Board from './components/Board.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: true, // To control the menu visibility
            gameInProgress: false, // To track if the game is in progress
        };
    }

    // Handle "Start Game" button click
    startGame = () => {
        this.setState({
            menuVisible: false,
            gameInProgress: true, // Set gameInProgress to true
        });
    };

    render() {
        const { menuVisible, gameInProgress } = this.state;

        return (
            <div>
                <h1 className="title">Pong Game</h1>

                {menuVisible ? (
                    <div className="menu">
                        <h2></h2>
                        <button onClick={this.startGame}>Start Game</button>
                    </div>
                ) : (
                    // Pass gameInProgress as a prop to the Board component
                    <Board gameInProgress={gameInProgress} />
                )}
            </div>
        );
    }
}

export default App;
