import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import scream from "./scream";
import message from "./message";
import profile from "./profile";
import loadingUI from "./loadingUI";
import notifications from "./notifications";
export default combineReducers({
  alert,
  message,
  auth,
  scream,
  profile,
  notifications,
  loadingUI
});
