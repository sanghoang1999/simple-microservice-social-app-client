import { SET_MESSAGE, REMOVE_MESSAGE } from "./type";
import uuid from "uuid";

export const setMessage = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_MESSAGE,
    payload: { msg, alertType, id }
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_MESSAGE,
      payload: id
    });
  }, timeout);
};
