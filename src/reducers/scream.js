import {
  GET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM
} from "../actions/type";

const initialState = {
  screams: [],
  scream: {},
  loading: true,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SCREAMS: {
      return {
        ...state,
        screams: payload,
        loading: false
      };
    }
    case LIKE_SCREAM: {
      let index = state.screams.findIndex(
        scream => scream.id === action.payload.screamId
      );
      state.screams[index].likeCount += 1;
      return {
        ...state
      };
    }
    case UNLIKE_SCREAM: {
      let index = state.screams.findIndex(
        scream => scream.id === action.payload.screamId
      );
      state.screams[index].likeCount -= 1;
      return {
        ...state
      };
    }
    case DELETE_SCREAM: {
      let index = state.screams.findIndex(
        scream => scream.id === action.payload.screamId
      );
      state.screams.splice(index, 1);
      return {
        ...state
      };
    }
    case POST_SCREAM: {
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    }
  }
  return state;
}
