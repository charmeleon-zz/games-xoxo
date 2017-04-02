import React from 'react';

function Square(props) {
    let className = "square";
    if (props.isWinner) {
        className += " winner";
    }
    return (
        <button className={className} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        const isWinner = this.props.winnerLine && this.props.winnerLine.indexOf(i) > -1;
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                isWinner={isWinner}
            />
        )
    }
    renderRow(j) {
        return (
            <div className="board-row">
                {this.renderSquare(j)}
                {this.renderSquare(j + 1)}
                {this.renderSquare(j + 2)}
            </div>
        );
    }
    render() {
        return (
            <div>
                {this.renderRow(0)}
                {this.renderRow(3)}
                {this.renderRow(6)}
            </div>
        );
    }
}

export default Board
