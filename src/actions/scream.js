import {
  GET_SCREAMS,
  POST_COMMENT,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  GET_LIST_LIKE,
  DELETE_SCREAM,
  LIKE_ERROR,
  REMOVE_ALERT,
  SET_ALERT,
  GET_SCREAM,
  POST_SCREAM,
  CLEAR_SCREAM,
  CLEAR_SCREAMS,
  STOP_LOADING_UI
} from "../actions/type";
import axios from "axios";
import { setMessage } from "./message";
import socket from "../utils/socketAdapter";
import React from "react";
//const base_url = "http://localhost:4000/social";
const base_url = "https://social-api-gatway.herokuapp.com/social";
export const getAllScreams = () => async dispatch => {
  dispatch({
    type: CLEAR_SCREAMS
  });
  try {
    const res = await axios.get(base_url + "/scream");
    dispatch({
      type: GET_SCREAMS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPaginationScream = (pageSize, pageNumber) => async dispatch => {
  try {
    const res = await axios.get(
      base_url + `/scream/page/${pageSize}/${pageNumber}`
    );
    dispatch({
      type: GET_SCREAMS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeScream = (screamID, handle) => async dispatch => {
  var socketReq = new Promise((rs, rj) => {
    try {
      let io = socket.io;
      io.emit("like", handle, screamID);
      rs();
    } catch (error) {
      console.log(error);
      rj(error);
    }
  });
  try {
    console.log(handle, screamID);
    const res = await axios.get(base_url + `/scream/${screamID}/like`);
    await socketReq;

    dispatch({
      type: LIKE_SCREAM,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
export const unlikeScream = (screamID, handle) => async dispatch => {
  try {
    await Promise.all([
      axios.get(base_url + `/scream/${screamID}/unlike`),
      axios.delete(
        `https://social-api-gatway.herokuapp.com/notifications/notifications/${screamID}/${handle}`
      )
    ]);
    dispatch({
      type: UNLIKE_SCREAM,
      payload: {
        screamId: screamID
      }
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteScream = screamID => async dispatch => {
  try {
    const res = await axios.delete(base_url + `/scream/${screamID}`);
    dispatch({
      type: DELETE_SCREAM,
      payload: {
        screamId: screamID
      }
    });
    dispatch(setMessage("Delete successfully", "success"));
  } catch (error) {
    console.log(error);
  }
};
export const postScream = newScream => async dispatch => {
  console.log(newScream);

  try {
    const res = await axios.post(base_url + "/scream", newScream);
    dispatch({
      type: REMOVE_ALERT
    });
    dispatch({
      type: POST_SCREAM,
      payload: res.data
    });
    dispatch(setMessage("Post a scream successfully", "success"));
    return null;
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_ALERT,
      payload: error.response.data.errors[0]
    });
    return error.response.data.errors[0];
  }
};
export const getScream = screamId => async dispatch => {
  try {
    const res = await axios.get(base_url + `/scream/${screamId}`);
    console.log(res.data);
    dispatch({
      type: STOP_LOADING_UI
    });
    dispatch({
      type: GET_SCREAM,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_ALERT,
      payload: error
    });
  }
};
export const postComment = (body, screamId, handle) => async dispatch => {
  var socketReq = new Promise((rs, rj) => {
    try {
      let io = socket.io;
      io.emit("comment", handle, screamId);
      rs();
    } catch (error) {
      console.log(error);
      rj(error);
    }
  });
  try {
    const res = await axios.post(
      base_url + `/scream/${screamId}/comment`,
      body
    );
    await socketReq;
    console.log(res.data);
    dispatch({
      type: POST_COMMENT,
      payload: {
        data: res.data,
        screamId: screamId
      }
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_ALERT,
      payload: error.response.data
    });
  }
};

export const getListLike = screamId => async dispatch => {
  try {
    const res = await axios.get(base_url + `/scream/${screamId}/listLike`);
    dispatch({
      type: GET_LIST_LIKE,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_ALERT,
      payload: error.response.data
    });
  }
};
