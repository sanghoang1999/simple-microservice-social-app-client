import io from "socket.io-client";

function sockets() {
  this.io = io.connect(
    "https://chat-service-microservice.herokuapp.com/socket/message",
    {
      query: "token=" + localStorage.getItem("token"),
    }
  );
}

export default sockets;
