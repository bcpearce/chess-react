export const SELECT_SQUARE = 'SELECT_SQUARE';
export const REQUEST_NEW_GAME = 'REQUEST_NEW_GAME';
export const RECEIVE_NEW_GAME = 'RECEIVE_NEW_GAME';

var api = require('./api');

export const selectSquare = (rankAndFile) => {
  return {
    type:SELECT_SQUARE,
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
    console.log(api);
    dispatch(requestNewGame());
    return api.requestNewGame()
      .then(response => response.data)
      .then(data => dispatch(receiveNewGame(data)));
  }
}