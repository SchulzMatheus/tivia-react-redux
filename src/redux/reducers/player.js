import {
  TOKEN_REQUEST_SUCCESSFUL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_REQUEST_SUCCESSFUL:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
};

export default player;
