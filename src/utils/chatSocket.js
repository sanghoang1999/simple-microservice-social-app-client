import io from "socket.io-client";

function sockets() {
  this.io = io.connect("http://localhost:4600/socket/message", {
    query: "token=" + localStorage.getItem("token"),
  });
}

export default sockets;
