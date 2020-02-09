import {
  GET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LIKE_ERROR,
  REMOVE_ALERT,
  SET_ALERT,
  POST_SCREAM
} from "../actions/type";
import axios from "axios";
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
  } catch (error) {
    console.log(error);
  }
};
export const postScream = newScream => async dispatch => {
  console.log(newScream);
  try {
    const res = await axios.post("/scream", newScream);
    console.log(res.data);
    dispatch({
      type: REMOVE_ALERT
    });
    dispatch({
      type: POST_SCREAM,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_ALERT,
      payload: error.response.data.errors[0]
    });
  }
};
