import React from "react";
import UUTTT from './UUTTT';
import { calculateTTTWinner, calculateUTTTWinner, calculateUUTTTWinner } from '..';
import { isTTTFull, isUTTTFull, isUUTTTFull } from '..';
import { getRandomInt } from '..';

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
      this.state = this.newState();
  };

  newState() {
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
      return({
          xIsNext: true,
          activeTTT: null,
          activeUTTT: null,
          squares: arr0,
      });
  }

  updateState(xIsNext, activeTTT, activeUTTT, squares) {
      this.setState({
          xIsNext: xIsNext,
          activeTTT: activeTTT,
          activeUTTT: activeUTTT,
          squares: squares,
      });
  }

  handleClick(i, j, k) {
    if (this.state.squares[i][j][k] !== null) {
      return;
    }
    if (this.state.activeTTT !== null && this.state.activeTTT !== j) {
      return;
    }
    if ((calculateUTTTWinner(this.state.squares[i]) || calculateTTTWinner(this.state.squares[i][j])) !== null) {
        return;
    }
    if (this.state.activeUTTT !== null && this.state.activeUTTT !== i) {
      return;
    }
    const squares = this.state.squares.slice();
    squares[i][j][k] = this.state.xIsNext ? 'blue' : 'red';
    let activeUTTT;
    let activeTTT;
    if (calculateTTTWinner(squares[i][j]) !== null) {
        activeTTT = null;
        if ((calculateUTTTWinner(squares[j]) !== null) || isUTTTFull(squares[j])) {
            activeUTTT = null;
        } else {
            activeUTTT = j;
        }
    } else {
        if ((calculateTTTWinner(squares[i][k]) !== null) || isTTTFull(squares[i][k])) {
            activeTTT = null;
            if ((calculateUTTTWinner(squares[i]) !== null) || isUTTTFull(squares[i])) {
                activeUTTT = null;
            } else {
                activeUTTT = i;
            }
        } else {
            activeTTT = k;
            activeUTTT = i;
        }
    }
    this.updateState(!this.state.xIsNext, activeTTT, activeUTTT, squares);
    let winner;
    if (calculateUUTTTWinner(this.state.squares) === 'blue') {
        winner = "you won!";
    } else if (calculateUUTTTWinner(this.state.squares) === 'red') {
        winner = "you lost!";
    } else if (isUUTTTFull(this.state.squares)) {
        winner = "you tied!";
    }
    if (winner) {
        let restart = window.confirm(winner + '\n' + "do you want to restart?");
        if (restart) {
            this.setState(this.newState())
        }
    } 
    return;
  }

  componentDidUpdate() {
      if (!this.state.xIsNext) {
          let a = this.state.activeUTTT;
          if (a === null || calculateUTTTWinner(this.state.squares[a]) !== null || isUTTTFull(this.state.squares[a])) {
              a = getRandomInt(0, 8);
          }
          let b = this.state.activeTTT;
          while (b === null || calculateTTTWinner(this.state.squares[a][b]) !== null || isTTTFull(this.state.squares[a][b])) {
              b = getRandomInt(0, 8);
          }
          let c;
          let i = 0;
          let foundWin = false;
          while (i < 9 && !foundWin) {
              if (this.state.squares[a][b][i] === null) {
                  const squares = [...this.state.squares[a][b]];
                  squares[i] = 'red';
                  if (calculateTTTWinner(squares) === 'red') {
                      c = i;
                      foundWin = true;
                  }
              }
              i++;
          }
          if (!foundWin) {
              c = getRandomInt(0, 8);
              while (this.state.squares[a][b][c] !== null) {
                  c = getRandomInt(0, 8);
              }
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
                                  squares={this.state.squares}
                                  activeUTTT={this.state.activeUTTT}
                                  activeTTT={this.state.activeTTT}
                                  onClick={(i, j, k) => this.handleClick(i, j, k)}/>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      );
  }
}

export default Board;