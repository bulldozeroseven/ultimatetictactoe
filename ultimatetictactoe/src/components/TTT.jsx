import React from 'react';
import { calculateTTTWinner } from '..';
import Square from './Square';

class TTT extends React.Component {
  handleClick(i) {
      this.props.onClick(i);
  }

  renderSquare(i) {
      return (
          <Square
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

export default TTT;