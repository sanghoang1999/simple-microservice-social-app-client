import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ALERT,
  REMOVE_ALERT
} from "./type";
import { setAlert } from "./alert";
import React from "react";
import { loadUser } from "./auth";

export const uploadImage = formData => async dispatch => {
  try {
    await axios.post("/user/image", formData);
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
  }
};

export const editUserDetails = formData => async dispatch => {
  try {
    await axios.post("/user/detail", formData);
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
  }
};
