import React from "react";
import UTTT from "./UTTT";
import { calculateUTTTWinner, calculateUUTTTWinner } from "..";

class UUTTT extends React.Component {
    
  handleClick(i, j, k) {
      this.props.onClick(i, j, k);
  }

  render() {
      let table_rows = [];
      for (let i = 0; i < 3; i += 1) {
          let table_row = [];
          for (let j = 0; j < 3; j += 1) {
              let bgcolor = calculateUTTTWinner(this.props.squares[3 * i + j]);
              if (!bgcolor) {
                  if (this.props.activeTTT === null 
                      && this.props.activeUTTT === 3 * i + j
                      && !calculateUUTTTWinner(this.props.squares)) {
                      bgcolor = "yellow"
                  } else {
                      bgcolor = "white"
                  }
              }
              table_row.push(
                  <td style={{'background' : bgcolor}}>
                      <UTTT
                          boardNumber={3 * i + j}
                          squares={this.props.squares[3 * i + j]}
                          activeUTTT={this.props.activeUTTT}
                          activeTTT={this.props.activeTTT}
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

export default UUTTT;