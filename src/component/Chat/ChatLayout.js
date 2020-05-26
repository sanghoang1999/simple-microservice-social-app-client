import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ChatBox from "./ChatBox";
import ListUser from "./ListUser";
import chatSocket from "../../utils/chatSocket";
import { connect } from "react-redux";
import RSA from "../../utils/jsencrypt";
import AES from "../../utils/aesWrapper";
import axios from "axios";
import socket from "socket.io-client";

let userChat = [];
let listAesKey = {};
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
  const [image, setImage] = useState("");
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
          setListUserChat((list) => {
            const newList = list.map((user) => {
              if (user.handle === newUser) {
                user.status = "online";
              }
              return user;
            });
            return newList;
          });
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
        io.on("recive_aseKey", (to, aesKey) => {
          console.log("emvuidddddddddddddddddddddddddddddddddddddi");
          console.log(to);
          listAesKey[to] = aesKey;
        });
        io.on("leave", (userHandle, listUserOnline) => {
          setListUserChat((list) => {
            const newList = list.map((user) => {
              if (user.handle === userHandle) {
                user.status = "offline";
              }
              return user;
            });
            return newList;
          });

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
        io.on("serviceMessage", async (mess, userSend) => {
          console.log(mess);
          let msgDecrypt = AES.decrypt(
            mess,
            listAesKey[userSend.handle],
            "Utf8"
          );
          console.log(msgDecrypt);
          let plainMsg = JSON.parse(msgDecrypt);
          let newList = [];
          let listMess = [];
          if (
            userChat.indexOf(userSend.handle) !== -1 ||
            plainMsg.from === plainMsg.to
          ) {
            setListUserChat((list) => {
              newList = list.map((item) => {
                if (item.handle == plainMsg.from) item.messages.push(plainMsg);
                return item;
              });

              return newList;
            });
          } else {
            userChat.push(userSend.handle);
            io.emit("get_message", plainMsg.from, plainMsg.to, (listMess) => {
              setListUserChat((list) => {
                newList = [
                  {
                    handle: userSend.handle,
                    status: userSend.status,
                    imageurl: userSend.imageurl,
                    _id: userSend._id,
                    messages: listMess,
                  },
                ];
                return newList;
              });
            });
          }
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
      socket.emit("get_connection", handleTo, (key, isAesKey) => {
        if (isAesKey) {
          console.log("co roi");
          listAesKey[handleTo] = key;
          console.log(handleTo);
          console.log(listAesKey[handleTo]);
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
        } else {
          let aesKey = AES.createAesKey();
          listAesKey[handleTo] = aesKey;
          console.log(handleTo);
          console.log(listAesKey[handleTo]);
          console.log(aesKey);
          let rsaEncrytedAesKey = RSA.rsaEncrypt(key, aesKey);
          socket.emit("send_aesKey", rsaEncrytedAesKey, handleTo, () => {
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
          });
        }
      });
    }
  };
  const handleCloseChat = (idUserTo, handle) => {
    const newList = listUserChat.filter((item) => item._id !== idUserTo);
    setListUserChat(newList);
    userChat = userChat.filter((user) => user !== handle);
    socket.emit("closeChat", idUserTo, handle);
  };
  const sendImage = (src, to) => {
    console.log("send image");
    console.log(to);
    console.log(listAesKey[to]);
    const dataEncrypt = AES.encryptMsg(src, listAesKey[to]);
    socket.emit("sendImage", dataEncrypt, to, (newMess) => {
      let newList = listUserChat.map((item) => {
        if (item.handle == newMess.to) item.messages.push(newMess);
        return item;
      });

      setListUserChat(newList);
    });
  };
  const sendMessage = (message, to) => {
    console.log(to);
    console.log(listAesKey[to]);
    const newMess = {
      from: handle,
      to,
      message,
    };
    let cypherMsg = AES.encryptMsg(JSON.stringify(newMess), listAesKey[to]);

    if (newMess.from !== newMess.to) {
      let newList = listUserChat.map((item) => {
        if (item.handle == newMess.to) item.messages.push(newMess);
        return item;
      });

      setListUserChat(newList);
    }
    socket.emit("sendmessage", cypherMsg, newMess.to);
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
            sendImage={sendImage}
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
