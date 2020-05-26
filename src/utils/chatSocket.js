import io from "socket.io-client";
let sercie_url =
  "https://chat-service-microservice.herokuapp.com/socket/message";
let local_url = "http://localhost:4600/socket/message";
function sockets() {
  this.io = io.connect(sercie_url, {
    query: "token=" + localStorage.getItem("token"),
  });
}

export default sockets;
