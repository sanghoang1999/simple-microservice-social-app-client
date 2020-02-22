import { GET_PROFILE, CLEAR_SCREAMS, CLEAR_PROFILE } from "../actions/type";

const initialState = null;
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE: {
      return payload;
    }
    case CLEAR_PROFILE: {
      return null;
    }
  }
  return state;
}
