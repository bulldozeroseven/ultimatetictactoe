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

        return (<table className='small'>{table_rows}</table>);
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
                let TTTColor = calculateTTTWinner(this.props.squares[ 3 * i + j]);
                if (!TTTColor) {
                    TTTColor = 'white'
                }
                table_row.push(
                    <td style={{'background' : TTTColor}}>
                        <TTT
                            xIsNext={this.props.xIsNext}
                            boardNumber={3 * i + j}
                            squares={this.props.squares[3 * i + j]}
                            activeTTT={this.props.activeTTT}
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
            <div>
                <table>
                    {table_rows}
                </table>
            </div>
        );
    }
}

class UUTTT extends React.Component {
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

    render() {
        let table_rows = [];
        for (let i = 0; i < 3; i += 1) {
            let table_row = [];
            for (let j = 0; j < 3; j += 1) {
                table_row.push(
                    <td style={{'background' : calculateUTTTWinner(this.state.squares[3 * i + j])}}>
                        <UTTT
                            xIsNext={this.state.xIsNext}
                            boardNumber={3 * i + j}
                            squares={this.state.squares[3 * i + j]}
                            activeTTT={this.state.activeTTT}
                            activeUTTT={this.state.activeUTTT}
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
            <div>
                <table>
                    {table_rows}
                </table>
            </div>
        );
    }

    handleClick(i, j, k) {
        const squares = this.state.squares.slice();
        squares[i][j][k] = this.state.xIsNext ? 'blue' : 'red';
        let activeUTTT;
        let activeTTT;
        // if (calculateTTTWinner(squares[i][j])) {
        //     if (calculateUTTTWinner(squares[j]) || isUTTTFull(squares[j])) {
        //         activeUTTT = null;
        //     } else {
        //         activeUTTT = j;
        //     }
        //     activeTTT = null;
        // } else if (calculateTTTWinner(squares[i][k]) || isTTTFull(squares[i][k])) {
        //     activeUTTT = i;
        //     activeTTT = null;
        // } else {
        //     activeUTTT = i;
        //     activeTTT = k;
        // }
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
        this.setState({
            xIsNext: !this.state.xIsNext,
            activeTTT: activeTTT,
            activeUTTT: activeUTTT,
            squares: squares,
        });
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
    <UUTTT />,
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
