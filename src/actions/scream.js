import {
  GET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LIKE_ERROR,
  REMOVE_ALERT,
  SET_ALERT,
  GET_SCREAM,
  POST_SCREAM,
  CLEAR_SCREAM
} from "../actions/type";
import axios from "axios";
import { setMessage } from "./message";
import React from "react";

export const getAllScreams = () => async dispatch => {
  try {
    const res = await axios.get("/scream");
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
    const res = await axios.get(`/scream/page/${pageSize}/${pageNumber}`);
    dispatch({
      type: GET_SCREAMS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
export const likeScream = screamID => async dispatch => {
  console.log(screamID);
  try {
    const res = await axios.get(`/scream/${screamID}/like`);
    console.log(res.data);
    dispatch({
      type: LIKE_SCREAM,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};
export const unlikeScream = screamID => async dispatch => {
  try {
    const res = await axios.get(`/scream/${screamID}/unlike`);
    console.log(res.data);
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
    const res = await axios.delete(`/scream/${screamID}`);
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
    const res = await axios.post("/scream", newScream);
    dispatch({
      type: REMOVE_ALERT
    });
    dispatch({
      type: POST_SCREAM,
      payload: res.data
    });
    dispatch(setMessage("Post a scream successfully", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_ALERT,
      payload: error.response.data.errors[0]
    });
  }
};
export const getScream = screamId => async dispatch => {
  try {
    const res = await axios.get(`/scream/${screamId}`);
    console.log(res.data);
    dispatch({
      type: GET_SCREAM,
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
