import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import scream from "./scream";
import message from "./message";
import profile from "./profile";
import loadingUI from "./loadingUI";
export default combineReducers({
  alert,
  message,
  auth,
  scream,
  profile,

  loadingUI
});
