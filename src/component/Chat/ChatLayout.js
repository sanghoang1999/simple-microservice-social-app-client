import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ChatBox from "./ChatBox";
import ListUser from "./ListUser";
import chatSocket from "../../utils/chatSocket";
import { connect } from "react-redux";
import socket from "socket.io-client";
const messages = [
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
];
const useStyles = makeStyles((theme) => ({
  layout: {
    position: "fixed",
    bottom: 0,
    right: 0,
  },
  chatWrap: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    marginRight: 10,
  },
}));
const ChatLayout = ({
  user: {
    isAuthenticated,
    credentials: { handle, imageurl, userId },
  },
}) => {
  const classes = useStyles();
  const [listUser, setListUser] = useState([]);
  const [listFriend, setListFriend] = useState([]);
  const [socket, setSocket] = useState(null);
  const [message, SetMessage] = useState("");
  const [listMess, setListMess] = useState([]);
  const [listUserChat, setListUserChat] = useState([]);
  var io = null;
  const getListFriends = (io) => {
    return new Promise((rs, rj) => {
      io.on("connect", () => {
        console.log("chat service");
      });
      io.on("friends", (resData) => {
        console.log("get list friends");
        const data = resData.friends;
        setListFriend(resData.friends);
        console.log(listFriend, data);
        rs(resData.friends);
      });
    });
  };
  useEffect(() => {
    let check = 0;
    if (check && !isAuthenticated) {
      io.close();
      setListUser([]);
    }
    if (isAuthenticated) {
      check = true;
      console.log("cc");
      io = new chatSocket().io;
      setSocket(io);
      console.log(io);
      getListFriends(io).then((lstFriends) => {
        io.on("join", (listGuest, newUser) => {
          console.log("join");
          if (lstFriends.length !== 0) {
            listGuest = listGuest.filter(
              (guest) =>
                lstFriends.findIndex(
                  (item) => item.user.handle === guest.handle
                ) === -1
            );
          }
          let check = false;
          const newList = lstFriends.map((item) => {
            if (item.user.handle === newUser) {
              check = true;
              item.user.status = "online";
            }
            return item;
          });
          if (check) {
            setListFriend(newList);
          }
          setListUser(listGuest);
        });
        io.on("leave", (userHandle, listUserOnline) => {
          console.log("leave");
          const indexFr = lstFriends.findIndex(
            (item) => item.user.handle == userHandle
          );
          if (indexFr !== -1) {
            const newListF = lstFriends.map((item) => {
              if (item.user.handle === userHandle) {
                item.user.status = "offline";
              }
              return item;
            });
            setListFriend(newListF);
          } else {
            console.log("test xem thu");
            console.log(listUser);
            const index = listUserOnline.findIndex(
              (item) => item.handle === userHandle
            );
            if (index !== -1) {
              listUserOnline.splice(index, 1);
            }
            setListUser(listUserOnline);
          }
        });
        io.on("serviceMessage", (mess, listUserNow) => {
          setListUserChat((list) => {
            console.log("list ne");
            console.log(list);
            let newList = list.map((item) => {
              if (item.handle == mess.from) item.messages.push(mess);
              return item;
            });
            return newList;
          });
        });
      });
    }
    return () => {
      if (io != null) {
        io.close();
      }
    };
  }, [isAuthenticated]);
  const handleAddUserChat = (handleTo, imageurl, _id, status, isFriend) => {
    console.log(handle, handleTo, imageurl, _id);
    if (listUserChat.findIndex((item) => item._id === _id) === -1) {
      if (!isFriend) {
        console.log("add user ");
        socket.emit("makeFriend", _id);
      }
      socket.emit("get_message", handle, handleTo, (cb) => {
        setListUserChat([
          ...listUserChat,
          {
            handle: handleTo,
            imageurl,
            _id,
            status,
            messages: cb,
          },
        ]);
      });
    }
  };
  const handleCloseChat = (idUserTo) => {
    const newList = listUserChat.filter((item) => item._id !== idUserTo);
    setListUserChat(newList);
    socket.emit("closeChat", idUserTo);
  };
  const sendMessage = (message, to) => {
    const newMess = {
      from: handle,
      to,
      message,
    };
    if (newMess.from !== newMess.to) {
      console.log(newMess.from, newMess.to);
      console.log(listUserChat);
      let newList = listUserChat.map((item) => {
        if (item.handle == newMess.to) item.messages.push(newMess);
        return item;
      });

      setListUserChat(newList);
      console.log(listUserChat);
    }
    socket.emit("sendmessage", newMess, listUserChat);
  };
  return isAuthenticated ? (
    <div className={classes.layout}>
      <div className={classes.chatWrap}>
        <ListUser
          handleAddUserChat={handleAddUserChat}
          listUser={listUser}
          listFriend={listFriend}
          listUserChat={listUserChat}
        />
        {listUserChat.map((userInfo) => (
          <ChatBox
            listUserChat={listUserChat}
            userInfo={userInfo}
            sendMessage={sendMessage}
            handleCloseChat={handleCloseChat}
          />
        ))}
      </div>
    </div>
  ) : null;
};
const mapStateToProps = (state) => ({
  user: state.auth,
});

export default connect(mapStateToProps, null)(ChatLayout);
