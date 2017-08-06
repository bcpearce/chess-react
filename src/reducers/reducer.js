import { combineReducers } from 'redux';
import { SELECT_SQUARE, REQUEST_NEW_GAME, RECEIVE_NEW_GAME } from '../actions/actions';

const board = (state = {isFetching:false, items:{}}, action) => {
  switch(action.type)
  {
    case REQUEST_NEW_GAME:
      return {
        isFetching:true,
        items:{}
      }
    case RECEIVE_NEW_GAME:
      console.log(action.data);
      return {
        isFetching:false,
        items:action.data.board
      }
    default:
      return state
  }
}

const selectedSquare = (state = null, action) => {
  switch(action.type) 
  {
    case SELECT_SQUARE:
      if (state === action.rankAndFile) {
        return null
      }
      return action.rankAndFile;
    default:
      return state;
  }
}

const reducer = combineReducers({ board, selectedSquare });

export default reducer;

