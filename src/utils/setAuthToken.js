import axios from "axios";

export default function(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("emvuii");
    delete axios.defaults.headers.common["Authorization"];
  }
}
