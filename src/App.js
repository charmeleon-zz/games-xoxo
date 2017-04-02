import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Parts';

function GameControls(props) {
    return (
        <div className="controls">
            <button key="reset" onClick={() => props.reset()}>Reset</button>
            <button key="sound" onClick={() => props.toggleSound()}>Sound</button>
        </div>
    );
}

class App extends Component {
  constructor() {
    super();
    this.reset();
  }
  reset() {
    const playSound = localStorage.getItem('playSound') === null ?
      true : JSON.parse(localStorage.getItem('playSound')) ;

    var state = {
      history: [
        {squares: Array(9).fill(null)}
      ],
      xIsNext: true,
      stepNumber: 0,
      winner: null,
      winnerLine: null,
      playSound: playSound
    };

    if ('state' in this) {
      this.setState(state);
    }
    else {
      this.state = state;
    }
  }
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] || this.state.winner) {
        return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const winner = calculateWinner(squares);
    const winnerLine = getWinnerLine(squares);

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1,
      winner: winner,
      winnerLine: winnerLine
    })
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    })
  }
  toggleSound() {
    const playSound = !this.state.playSound;
    localStorage.setItem('playSound', playSound);
    this.setState({
      playSound: playSound
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const sound = this.state.playSound ? 
        <audio id="background-sound" src="/assets/sounds/electro-bass.wav" autoPlay loop /> : "";

    let status = 'Current turn: ' + (this.state.xIsNext ? 'X' : 'O');

    if (this.state.winner) {
        status = 'Winner: ' + this.state.winner;
    }
    else if (this.state.stepNumber >= current.squares.length) {
        status = "It's a tie!";
    }

    /*const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Start!';

      return (
        <li key = {move}>
          <a href="#" onClick ={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });*/

    return (
      <div className="App">
        <div className="game-info">
          <div className="text-center">{status}</div>
          {/*<ol>{moves}</ol>*/}
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerLine={this.state.winnerLine}
            onClick={(i) => this.handleClick(i)}
           />
        </div>
        <GameControls 
          toggleSound={() => this.toggleSound()}
          reset={() => this.reset()}
        />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        {sound}
      </div>
      
    );
  }
}

function calculateWinner(squares) {
  const line = getWinnerLine(squares);

  if (line) {
    for (var index in line) {
      return squares[line[index]];
    }
  }

  return null;
}

function getWinnerLine(squares) {
  const lines = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // across
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }

  return null;
}

export default App;
