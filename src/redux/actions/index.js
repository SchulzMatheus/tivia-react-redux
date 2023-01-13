import SAVE_PLAYER_INFO from './actionTypes';

const savePlayerInfo = (playerInfo) => ({
  type: SAVE_PLAYER_INFO,
  payload: playerInfo,
});

export default savePlayerInfo;
