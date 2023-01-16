import { SAVE_PLAYER_INFO, SCORE } from './actionTypes';

export const savePlayerInfo = (playerInfo) => ({
  type: SAVE_PLAYER_INFO,
  payload: playerInfo,
});

export const sumScore = (score) => ({
  type: SCORE,
  payload: score,
});
