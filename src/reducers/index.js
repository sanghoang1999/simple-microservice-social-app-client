import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./alert";
import scream from "./scream";
import message from "./message";
export default combineReducers({
  alert,
  message,
  auth,
  scream
});
