import SAVE_PLAYER_INFO from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER_INFO:
    return {
      ...state,
      name: action.payload.inputName,
      gravatarEmail: action.payload.inputEmail,
    };
  default:
    return state;
  }
};

export default player;
