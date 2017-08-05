import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChessBoard extends Component {

  squareLabelsByRank = (rank) => {
    //generates an array of the square indicators for a given rank (int)
    return [...Array(8).keys()].map(x => String.fromCharCode('A'.charCodeAt(0)+x)+rank)
  }

  renderSquare = (rankAndFile) => {
    return (
      <div key={rankAndFile} className="chess-square">
          {this.props.board[rankAndFile]}
      </div>
    );
  }

  renderRank = (rank) => {
    const squares = this.squareLabelsByRank(rank).map(this.renderSquare)
    return(
      <div key={rank} className="chess-rank">
        {squares}
      </div>
    )
  }

  render() {
    const ranks = [...Array(8).keys()].map(x => this.renderRank(x+1));
    return(
      <div>
        {ranks}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    board:
    {A1: '♖',
     A2: '♙',
     A3: ' ',
     A4: ' ',
     A5: ' ',
     A6: ' ',
     A7: '♟',
     A8: '♜',
     B1: '♘',
     B2: '♙',
     B3: ' ',
     B4: ' ',
     B5: ' ',
     B6: ' ',
     B7: '♟',
     B8: '♞',
     C1: '♗',
     C2: '♙',
     C3: ' ',
     C4: ' ',
     C5: ' ',
     C6: ' ',
     C7: '♟',
     C8: '♝',
     D1: '♕',
     D2: '♙',
     D3: ' ',
     D4: ' ',
     D5: ' ',
     D6: ' ',
     D7: '♟',
     D8: '♛',
     E1: '♔',
     E2: '♙',
     E3: ' ',
     E4: ' ',
     E5: ' ',
     E6: ' ',
     E7: '♟',
     E8: '♚',
     F1: '♗',
     F2: '♙',
     F3: ' ',
     F4: ' ',
     F5: ' ',
     F6: ' ',
     F7: '♟',
     F8: '♝',
     G1: '♘',
     G2: '♙',
     G3: ' ',
     G4: ' ',
     G5: ' ',
     G6: ' ',
     G7: '♟',
     G8: '♞',
     H1: '♖',
     H2: '♙',
     H3: ' ',
     H4: ' ',
     H5: ' ',
     H6: ' ',
     H7: '♟',
     H8: '♜' }
  }
}

export default connect(mapStateToProps)(ChessBoard);