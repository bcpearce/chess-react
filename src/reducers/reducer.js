import { combineReducers } from 'redux';
import { 
  SELECT_SQUARE, 
  REQUEST_NEW_GAME, 
  RECEIVE_NEW_GAME,
  REQUEST_MOVE_PIECE,
  RECEIVE_MOVE_PIECE 
} from '../actions/actions';

const board = (state = {isFetching:false, items:{}}, action) => {
  switch(action.type)
  {
    case REQUEST_NEW_GAME:
    case REQUEST_MOVE_PIECE:
      return {
        isFetching:true,
        items:{}
      }
    case RECEIVE_NEW_GAME:
      return {
        isFetching:false,
        items:action.data.board
      }
    case RECEIVE_MOVE_PIECE:
      return {
        isFetching:false,
        items:action.data.game.board
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
      if (action.piece === ' ' || action.piece === '') {
        return null
      }
      return action.rankAndFile;
    case RECEIVE_MOVE_PIECE:
      return null
    default:
      return state;
  }
}

const game = (state = {isFetching:false, serial:null}, action) => {
  switch(action.type)
  {
    case REQUEST_NEW_GAME:
    case REQUEST_MOVE_PIECE:
      return {
        isFetching:true,
        serial:null
      }
    case RECEIVE_NEW_GAME:
      return {
        isFetching:false,
        serial:action.data.serial
      }
    case RECEIVE_MOVE_PIECE:
      return {
        isFetching:false,
        serial:action.data.game.serial
      }
    default:
      return state;
  }
}

const reducer = combineReducers({ board, selectedSquare, game });

export default reducer;

