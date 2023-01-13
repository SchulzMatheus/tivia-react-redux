import {
  TOKEN_REQUEST_STARTED,
  TOKEN_REQUEST_SUCCESSFUL,
  TOKEN_REQUEST_FAILED,
  SAVE_PLAYER_INFO,
} from './actionTypes';

// import getToken from '../../services/TriviaAPI/requestToken';

export const tokenRequiredStarted = () => ({
  type: TOKEN_REQUEST_STARTED,
});

export const tokenRequiredSuccessfull = (playerTokenObj) => ({
  type: TOKEN_REQUEST_SUCCESSFUL,
  payload: playerTokenObj,
});

export const tokenRequiredFailed = (error) => ({
  type: TOKEN_REQUEST_FAILED,
  payload: error,
});

export const savePlayerInfo = (playerInfo) => ({
  type: SAVE_PLAYER_INFO,
  payload: playerInfo,
});

export const fetchTokenPlayer = () => async (dispatch) => {
  try {
    dispatch(tokenRequiredStarted);
    // const token = await getToken();
    // localStorage.setItem('token', token);
    // dispatch(tokenRequiredSuccessfull(tokenPlayerObj));
  } catch (error) {
    dispatch(tokenRequiredFailed(error));
  }
};

// export const questionsRequiredStarted = () => ({
//   type: QUESTION_REQUEST_STARTED,
// });

// export const questionsRequiredSuccessful = (questionsObj) => ({
//   type: QUESTION_REQUEST_SUCCESSFUL,
//   payload: questionsObj,
// });

// export const questionsRequiredFailed = (error) => ({
//   type: QUESTION_REQUEST_FAILED,
//   payload: error,
// });

// export const fetchQuestions = () => async (dispatch) => {
//   try {
//     dispatch(questionsRequiredStarted);
//     const questionsObj = await getQuestions();
//     dispatch(questionsRequiredSuccessful(questionsObj));
//   } catch (error) {
//     dispatch(questionsRequiredFailed(error));
//   }
// };
