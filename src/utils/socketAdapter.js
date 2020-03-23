import io from "socket.io-client";
// let sockets = {};
// sockets.init = function(server = "http://localhost:4000/notifications") {
//   return io.connect(server, {
//     query: "token=" + localStorage.getItem("token")
//   });
// };
function sockets() {}

sockets.io = io.connect(
  "https://sanghoang-notifications-sv.herokuapp.com/notifications",
  {
    query: "token=" + localStorage.getItem("token")
  }
);

export default sockets;
