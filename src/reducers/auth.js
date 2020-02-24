import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  MARK_READ_NOTIFICATIONS
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  credentials: {},
  likes: [],
  notifications: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS: {
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    }
    case REGISTER_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    }
    case AUTH_ERROR: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        credentials: {},
        isAuthenticated: false,
        loading: false
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    }
    case LOGIN_SUCCESS: {
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    }
    case LOGIN_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        credentials: {},
        isAuthenticated: false,
        loading: false
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        credentials: {},
        isAuthenticated: false,
        loading: false
      };
    }
    case LIKE_SCREAM: {
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    }
    case UNLIKE_SCREAM: {
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId != action.payload.screamId
        )
      };
    }
    case MARK_READ_NOTIFICATIONS: {
      return {
        ...state,
        notifications: state.notifications.map(noti => {
          noti.read = true;
          return noti;
        })
      };
    }
  }
  return state;
}
