import {
  GET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  GET_LIST_LIKE,
  GET_SCREAM,
  CLEAR_SCREAM,
  CLEAR_SCREAMS,
  POST_COMMENT
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
      return {
        ...state,
        numPage: payload.numPage,
        screams: [...state.screams, ...payload.screams],
        loading: false
      };
    }
    case LIKE_SCREAM: {
      return {
        ...state,
        screams: state.screams.map(scream =>
          scream.id === payload.screamId
            ? { ...scream, likeCount: (scream.likeCount += 1) }
            : scream
        )
      };
    }
    case UNLIKE_SCREAM: {
      return {
        ...state,
        screams: state.screams.map(scream =>
          scream.id === payload.screamId
            ? { ...scream, likeCount: (scream.likeCount -= 1) }
            : scream
        )
      };
    }
    case DELETE_SCREAM: {
      return {
        ...state,
        screams: state.screams.filter(scream => scream.id !== payload.screamId)
      };
    }
    case POST_SCREAM: {
      return {
        ...state,
        screams: [payload, ...state.screams],
        loading: false
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
    case POST_COMMENT: {
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [payload.data, ...state.scream.comments]
        },
        screams: state.screams.map(scream =>
          scream.id === payload.screamId
            ? { ...scream, commentCount: (scream.commentCount += 1) }
            : scream
        )
      };
    }
    case CLEAR_SCREAMS: {
      return {
        ...state,
        screams: [],
        loading: true
      };
    }
    case GET_LIST_LIKE: {
      return {
        ...state
      };
    }
  }

  return state;
}
