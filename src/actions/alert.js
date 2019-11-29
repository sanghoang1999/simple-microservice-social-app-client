import { SET_ALERT, REMOVE_ALERT } from "./type";
import uuid from "uuid";

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: { ...msg, alertType }
  });
  if (timeout !== 0) {
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT
      });
    }, timeout);
  }
};
