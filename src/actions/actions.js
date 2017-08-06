export const SELECT_SQUARE = 'SELECT_SQUARE';
export const REQUEST_NEW_GAME = 'REQUEST_NEW_GAME';
export const RECEIVE_NEW_GAME = 'RECEIVE_NEW_GAME';
export const REQUEST_MOVE_PIECE = 'REQUEST_MOVE_PIECE';
export const RECEIVE_MOVE_PIECE = 'RECEIVE_MOVE_PIECE';
export const REQUEST_PROMOTE_PIECE = 'REQUEST_PROMOTE_PIECE';
export const RECEIVE_PROMOTE_PIECE = 'RECEIVE_PROMOTE_PIECE';

var api = require('./api');

export const selectSquare = (rankAndFile, piece) => {
  return {
    type:SELECT_SQUARE,
    piece,
    rankAndFile
  }
}

//get a new game from provider
export const requestNewGame = () => {
  return {
    type:REQUEST_NEW_GAME,
  }
}

export const receiveNewGame = (data) => {
  return {
    type:RECEIVE_NEW_GAME,
    data
  }
}

export const fetchNewGame = () => {
  return dispatch => {
    dispatch(requestNewGame());
    return api.requestNewGame()
      .then(response => response.data)
      .then(data => dispatch(receiveNewGame(data)));
  }
}

//moving pieces 
export const requestMovePiece = () => {
  return {
    type: REQUEST_MOVE_PIECE
  }
}

export const receiveMovePiece = (data) => {
  console.log(data);
  return {
    type: RECEIVE_MOVE_PIECE,
    data
  }
}

export const postMovePiece = (game, move) => {
  return dispatch => {
    dispatch(requestMovePiece());
    return api.makeMove(game, move)
      .then(response => response.data)
      .then(data => dispatch(receiveMovePiece(data)));
  }
}

//promoting pieces
export const requestPromotePiece = () => {
  return {
    type: REQUEST_PROMOTE_PIECE
  }
}

export const receivePromotePiece = (data) => {
  return {
    type: RECEIVE_PROMOTE_PIECE,
    data
  }
}

export const postPromotePiece = (game, piece) => {
  return dispatch => {
    dispatch(requestPromotePiece());
    return api.promotePiece(game, piece)
      .then(response => response.data)
      .then(data => dispatch(receivePromotePiece(data)));
  }
}