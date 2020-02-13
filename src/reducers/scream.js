import {
  GET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  GET_SCREAM,
  CLEAR_SCREAM
} from "../actions/type";

const initialState = {
  screams: [],
  scream: null,
  numPage: 0,
  loading: true,
  error: {}
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SCREAMS: {
      state.numPage = payload.numPage;
      state.screams.push(...payload.screams);
      return {
        ...state,
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
        screams: [payload, ...state.screams]
      };
    }
    case GET_SCREAM: {
      return {
        ...state,
        scream: action.payload,
        loading: false
      };
    }
    case CLEAR_SCREAM: {
      return {
        ...state,
        scream: null,
        loading: false
      };
    }
  }
  return state;
}
