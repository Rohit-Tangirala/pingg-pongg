import React, { useState } from 'react';
import GameSelection from './components/GameSelection';
import GameArena from './components/GameArena';
import './App.css';

function App() {
    const [selectedGame, setSelectedGame] = useState(null);

    return (
        <div className="App">
            <h1>Ping Pong Game</h1>
            {!selectedGame ? (
                <GameSelection onSelectGame={setSelectedGame} />
            ) : (
                <GameArena game={selectedGame} />
            )}
        </div>
    );
}

export default App;