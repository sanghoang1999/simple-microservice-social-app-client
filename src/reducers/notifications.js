import {
  GET_NOTIFICATIONS,
  MARK_READ_NOTIFICATIONS,
  NOTIFICATIONS
} from "../actions/type";

const initialState = {
  notifications: [],
  loading: true
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: payload,
        loading: false
      };
    }
    case MARK_READ_NOTIFICATIONS: {
      return {
        ...state,
        notifications: state.notifications.map(noti => {
          if (!noti.read) noti.read = true;
          return noti;
        })
      };
    }
    case NOTIFICATIONS: {
      return {
        ...state,

        notifications: [payload, ...state.notifications]
      };
    }
  }
  return state;
}
