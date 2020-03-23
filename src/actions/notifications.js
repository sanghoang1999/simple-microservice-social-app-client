import axios from "axios";
import { GET_NOTIFICATIONS, MARK_READ_NOTIFICATIONS } from "./type";
import { setAlert } from "./alert";
import React from "react";
import { loadUser } from "./auth";
import { setMessage } from "./message";
import firebase from "../fb";
//const base_url = "http://localhost:4000/notifications/notifications";
const base_url =
  "https://social-api-gatway.herokuapp.com/notifications/notifications";
export const getNotifications = () => async dispatch => {
  try {
    const res = await axios.get(base_url);
    console.log(res.data);
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const markReadNotis = formData => async dispatch => {
  try {
    const res = await axios.post(base_url, formData);
    console.log(res);
    dispatch({
      type: MARK_READ_NOTIFICATIONS
    });
  } catch (error) {
    console.log(error);
  }
};
