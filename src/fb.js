import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
const fbConfig = {
  apiKey: "AIzaSyAva_tvphC_Q_yS471YTSYsFoq_7AUJTjg",
  authDomain: "social-app-f685d.firebaseapp.com",
  databaseURL: "https://social-app-f685d.firebaseio.com",
  projectId: "social-app-f685d",
  storageBucket: "social-app-f685d.appspot.com",
  messagingSenderId: "345065672139",
  appId: "1:345065672139:web:7e893248d2909fa4cafa4e"
};
export default firebase.initializeApp(fbConfig);
