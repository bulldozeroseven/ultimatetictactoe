import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className='square' onClick={props.onClick} />
    );
}

class TTT extends React.Component {
    handleClick(i) {
        if (calculateTTTWinner(this.props.squares) || this.props.squares[i]
            || (this.props.boardNumber !== this.props.activeTTT && this.props.activeTTT !== null)) {
            return;
        }
        this.props.onClick(i);
    }

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        let table_rows = [];
        for (let i = 0; i < 3; i += 1) {
            let table_row = [];
            for (let j = 0; j < 3; j += 1) {
                let color = this.props.squares[3 * i + j];
                if (color !== 'blue' && color !== 'red') {
                    color = 'white'
                }
                table_row.push(
                    <td style={{'background' : color}}>
                        {this.renderSquare(3 * i + j)}
                    </td>
                );
            }
            table_rows.push(
                <tr className='board-row'>
                    {table_row}
                </tr>
            );
        }

        return (
            <table className='small'>
                <tbody>
                    {table_rows}
                </tbody>
            </table>
        );
    }
}

class UTTT extends React.Component {
    handleClick(i, j) {
        if (calculateUTTTWinner(this.props.squares) || (this.props.boardNumber !== this.props.activeUTTT && this.props.activeUTTT !== null)) {
            return;
        }
        this.props.onClick(i, j);
    }

    render() {
        let table_rows = [];
        for (let i = 0; i < 3; i += 1) {
            let table_row = [];
            for (let j = 0; j < 3; j += 1) {
                let bgcolor = calculateTTTWinner(this.props.squares[ 3 * i + j]);
                if (!bgcolor) {
                    if (this.props.activeTTT === 3 * i + j && this.props.activeUTTT === this.props.boardNumber) {
                        bgcolor = "yellow"
                    } else {
                        bgcolor = "white"
                    }
                }
                table_row.push(
                    <td style={{'background' : bgcolor}}>
                        <TTT
                            xIsNext={this.props.xIsNext}
                            boardNumber={3 * i + j}
                            squares={this.props.squares[3 * i + j]}
                            activeTTT={this.props.activeTTT}
                            activeUTTT={this.props.activeUTTT}
                            onClick={(k) => this.handleClick(3 * i + j, k)}
                        />
                    </td>
                );
            }
            table_rows.push(
                <tr>
                    {table_row}
                </tr>
            );
        }

        return (
            <table>
                <tbody>
                    {table_rows}
                </tbody>
            </table>
        );
    }
}

class UUTTT extends React.Component {
    
    handleClick(i, j, k) {
        this.props.onClick(i, j, k);
    }

    render() {
        let table_rows = [];
        for (let i = 0; i < 3; i += 1) {
            let table_row = [];
            for (let j = 0; j < 3; j += 1) {
                let bgcolor = calculateUTTTWinner(this.props.state.squares[3 * i + j]);
                if (!bgcolor) {
                    if (this.props.state.activeTTT === null 
                        && this.props.state.activeUTTT === 3 * i + j
                        && !calculateUUTTTWinner(this.props.state.squares)) {
                        bgcolor = "yellow"
                    } else {
                        bgcolor = "white"
                    }
                }
                table_row.push(
                    <td style={{'background' : bgcolor}}>
                        <UTTT
                            xIsNext={this.props.state.xIsNext}
                            boardNumber={3 * i + j}
                            squares={this.props.state.squares[3 * i + j]}
                            activeTTT={this.props.state.activeTTT}
                            activeUTTT={this.props.state.activeUTTT}
                            onClick={(k, l) => this.handleClick(3 * i + j, k, l)}
                        />
                    </td>
                );
            }
            table_rows.push(
                <tr>
                    {table_row}
                </tr>
            );
        }

        return (
            <table>
                <tbody>
                    {table_rows}
                </tbody>
            </table>
        );
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        let arr0 = [];
        for (let i = 0; i < 9; i += 1) {
            let arr1 = [];
            for (let j = 0; j < 9; j += 1) {
                let arr2 = [];
                for (let k = 0; k < 9; k += 1) {
                    arr2.push(null);
                }
                arr1.push(arr2);
            }
            arr0.push(arr1);
        }
        this.state = {
            xIsNext: true,
            activeTTT: null,
            activeUTTT: null,
            squares: arr0,
        };
    };

    updateState(activeTTT, activeUTTT, squares) {
        this.setState({
            xIsNext: !this.state.xIsNext,
            activeTTT: activeTTT,
            activeUTTT: activeUTTT,
            squares: squares,
        });
    }

    handleClick(i, j, k) {
        if (calculateUUTTTWinner(this.state.squares)) {
            return
        }
        const squares = this.state.squares.slice();
        squares[i][j][k] = this.state.xIsNext ? 'blue' : 'red';
        let activeUTTT;
        let activeTTT;
        if (calculateTTTWinner(squares[i][j])) {
            activeTTT = null;
            if (calculateUTTTWinner(squares[j]) || isUTTTFull(squares[j])) {
                activeUTTT = null;
            } else {
                activeUTTT = j;
            }
        } else {
            if (calculateTTTWinner(squares[i][k]) || isTTTFull(squares[i][k])) {
                activeTTT = null;
                if (calculateUTTTWinner(squares[i]) || isUTTTFull(squares[i])) {
                    activeUTTT = null;
                } else {
                    activeUTTT = i;
                }
            } else {
                activeTTT = k;
                activeUTTT = i;
            }
        }
        this.updateState(activeTTT, activeUTTT, squares);
    }

    componentDidUpdate() {
        if (!this.state.xIsNext) {    
            let a = this.state.activeUTTT;
            if (a === null) {
                a = getRandomInt(0, 8);
            }
            let b = this.state.activeTTT;
            if (b === null) {
                b = getRandomInt(0, 8);
            }
            let c = getRandomInt(0, 8);
            while (this.state.squares[a][b][c] !== null) {
                c = getRandomInt(0, 8);
            }
            this.handleClick(a, b, c);
        }
    }

    render() {
        let bgcolor = calculateUUTTTWinner(this.state.squares);
        if (!bgcolor) {
            if (this.state.activeUTTT === null) {
                bgcolor = "yellow"
            } else {
                bgcolor = "white"
            }
        }
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td style={{'background' : bgcolor}}>
                                <UUTTT 
                                    state={this.state}
                                    updateState={(a, b, c) => this.updateState(a, b, c)}
                                    onClick={(i, j, k) => this.handleClick(i, j, k)}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

// ========================================

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);

function calculateTTTWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function isTTTFull(squares) {
    let full = true;
    for (let i = 0; i < 9; i += 1) {
        full &= squares[i] !== null;
    }
    return full;
}

function calculateUTTTWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (calculateTTTWinner(squares[a])
            && calculateTTTWinner(squares[a]) === calculateTTTWinner(squares[b])
            && calculateTTTWinner(squares[a]) === calculateTTTWinner(squares[c])) {
                return calculateTTTWinner(squares[a]);
        }
    }
    return null;
}

function isUTTTFull(squares) {
    let full = true;
    for (let i = 0; i < 9; i += 1) {
        full &= calculateTTTWinner(squares[i]) !== null;
    }
    return full;
}

function calculateUUTTTWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (calculateUTTTWinner(squares[a])
            && calculateUTTTWinner(squares[a]) === calculateUTTTWinner(squares[b])
            && calculateUTTTWinner(squares[a]) === calculateUTTTWinner(squares[c])) {
                return calculateUTTTWinner(squares[a]);
        }
    }
    return null;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
