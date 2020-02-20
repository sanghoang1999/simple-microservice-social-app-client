import { LOADING_UI, STOP_LOADING_UI } from "../actions/type";

const initialState = {
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
      return {
        ...state,
        loading: false
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
