import { SET_MESSAGE, REMOVE_MESSAGE } from "../actions/type";

const initialState = [];
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE: {
      return [...state, payload];
    }
    case REMOVE_MESSAGE: {
      return state.filter(mess => mess.id != payload);
    }
  }
  return state;
}
