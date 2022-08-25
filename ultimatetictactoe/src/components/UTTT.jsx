import React from 'react';
import TTT from './TTT';
import { calculateTTTWinner } from '..';

class UTTT extends React.Component {
  handleClick(i, j) {
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
                          squares={this.props.squares[3 * i + j]}
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

export default UTTT;