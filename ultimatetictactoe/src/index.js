import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board';

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

export function calculateTTTWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export function isTTTFull(squares) {
    let full = true;
    for (let i = 0; i < 9; i += 1) {
        full &= squares[i] !== null;
    }
    return full || (calculateTTTWinner(squares) !== null);
}

export function calculateUTTTWinner(squares) {
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

export function isUTTTFull(squares) {
    let full = true;
    for (let i = 0; i < 9; i += 1) {
        full &= calculateTTTWinner(squares[i]) !== null;
    }
    return full || (calculateUTTTWinner(squares) !== null);
}

export function calculateUUTTTWinner(squares) {
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

export function isUUTTTFull(squares) {
    let full = true;
    for (let i = 0; i < 9; i += 1) {
        full &= calculateUTTTWinner(squares[i]) !== null;
    }
    return full || (calculateUUTTTWinner(squares) !== null);
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
