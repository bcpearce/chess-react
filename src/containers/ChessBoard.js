import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  selectSquare, 
  fetchNewGame, 
  postMovePiece, 
  postPromotePiece 
} from '../actions/actions';
import '../css/ChessBoard.css'

class ChessBoard extends Component {

  componentWillMount() {
    this.props.dispatch(fetchNewGame());
  }

  handleSelectSquare = (rankAndFile) => {
    if (!this.props.promotion) {
      //only handle square selection if a promotion isn't pending
      if (this.props.selectedSquare && this.props.selectedSquare !== rankAndFile) {
        const move = [this.props.selectedSquare, rankAndFile];
        this.props.dispatch(postMovePiece(
          this.props.game,
          move
        ));
      }
      this.props.dispatch(selectSquare(
        rankAndFile, 
        this.props.board[rankAndFile],
        this.props.selectedSquare
      ));
    }
  }

  handleNewGame = () => {
    this.props.dispatch(fetchNewGame());
  }

  handlePromote = (piece) => {
    console.log(this.props.game);
    this.props.dispatch(postPromotePiece(this.props.game, piece));
  }

  squareLabelsByRank = (rank) => {
    //generates an array of the square indicators for a given rank (int)
    return [...Array(8).keys()].map(x => String.fromCharCode('A'.charCodeAt(0)+x)+rank)
  }

  renderSquare = (rankAndFile) => {
    const even_or_odd = (rankAndFile[0].charCodeAt(0) + parseInt(rankAndFile[1], 10)) % 2;
    var applyClass ="chess-square" 
    if (this.props.selectedSquare === rankAndFile) {
      applyClass += " selected-square";
    } else {
      applyClass += (even_or_odd) ? " red-square": " black-square";
    }
    return (
      <div key={rankAndFile} className={applyClass}
        onClick={() => this.handleSelectSquare(rankAndFile)}>
        <span className="chess-piece">{this.props.board[rankAndFile]}</span>
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
    const ranks = [...Array(8).keys()].reverse().map(x => this.renderRank(x+1));
    var applyClass = 'chess-board';
    if (this.props.check) {
      applyClass += ' check';
    }
    applyClass += (this.props.player === "white") ? ' white-turn': ' black-turn';
    return(
      <div>
        <div className="centered new-game-wrapper">
          <button className="new-game" onClick={this.handleNewGame}>
            Start New Game
          </button>
        </div>
        <div className={applyClass}>
          {ranks}
        </div>
        <div className='info-block'>
          {!this.props.promotion /*only if no pending promotion*/ &&
            <h5 className='player'>{this.props.player}'s turn</h5>
          }
          {this.props.check && 
            <h6>
              <span className='player'>{this.props.player} </span> 
              Player is in <span className='check'>{this.props.check}</span>
            </h6>
          }
          {this.props.alert &&
            <h6 className='alert'>{this.props.alert}</h6>
          }
          {this.props.promotion && 
            <div>
              <h5>Select a piece to promote to</h5>
              <button role="button"
                className="promote-button" 
                onClick={() => this.handlePromote('rook')}>♖</button>
              <button 
                className="promote-button"
                onClick={() => this.handlePromote('knight')}>♘</button>
              <button 
                className="promote-button" 
                onClick={() => this.handlePromote('bishop')}>♗</button>
              <button role="button"
                className="promote-button" 
                onClick={() => this.handlePromote('queen')}>♕</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedSquare:state.selectedSquare,
    board:state.board.items,
    game:state.game.serial,
    check:state.check,
    player:state.player,
    alert:state.alert,
    promotion:state.promotion,
  }
}

export default connect(mapStateToProps)(ChessBoard);