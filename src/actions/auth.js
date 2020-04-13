import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ALERT,
  REMOVE_ALERT,
  LOGOUT,
} from "./type";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import chatSocket from "../utils/chatSocket";

//const base_url = "http://localhost:4000/social";
const base_url = "https://social-api-gatway.herokuapp.com/social";
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
    try {
      const res = await axios.get(base_url + "/user/me");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);

      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    const data = {
      email,
      password,
    };
    const token = await axios.post(base_url + "/user/login", data);
    console.log(token);
    dispatch({
      type: REMOVE_ALERT,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token.data,
    });
    dispatch(loadUser());
    return token;
  } catch (error) {
    console.log(error);
    const errObject = error.response.data.errors.reduce((x, y) => {
      if (Object.keys(y).length > 1) {
        x[y.param] = y.msg;
      } else {
        if (y.msg.indexOf("Password") !== -1) {
          x["password"] = y.msg;
        } else {
          x["email"] = y.msg;
        }
      }
      return x;
    }, {});
    dispatch({
      type: REMOVE_ALERT,
    });
    dispatch(setAlert(errObject, "danger", 0));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const register = ({ email, password, handle }) => async (dispatch) => {
  try {
    const data = {
      email,
      password,
      handle,
    };
    const token = await axios.post(base_url + "/user/signup", data);
    dispatch({
      type: REMOVE_ALERT,
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: token.data,
    });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    const errObject = error.response.data.errors.reduce((x, y) => {
      if (Object.keys(y).length > 1) {
        x[y.param] = y.msg;
      } else {
        if (y.msg.indexOf("Password") !== -1) {
          x["password"] = y.msg;
        } else if (y.msg.indexOf("Email") !== -1) {
          x["email"] = y.msg;
        } else {
          x["handle"] = y.msg;
        }
      }
      return x;
    }, {});
    dispatch({
      type: REMOVE_ALERT,
    });
    dispatch(setAlert(errObject, "danger", 0));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
