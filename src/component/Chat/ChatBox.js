import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/appBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  card: {
    marginRight: 10,
    width: 247,
    borderRadius: "7px 7px 0 0",
    position: "relative",
  },
  avt: {
    width: 35,
    height: 35,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 7,
    borderBottom: "2px solid #00000017",
  },
  content: {
    minHeight: 285,
    maxHeight: 285,
    overflow: "auto",
  },
  info: {
    flex: 2,
    marginLeft: 10,
  },
  status: {
    position: "relative",
    top: "-3",
  },
  textarea: {
    width: "100%",
    resize: "none",
    maxHeight: 100,
    outline: "none",
    overflow: "auto",
    padding: "7px 0 0 5px",
    border: "none",
    borderTop: "1px solid #00000029",
  },
  text: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  avtWrap: {
    position: "relative",
  },
  online: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: "white",
    top: 23,
    right: 0,
  },
  inner: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "rgb(66, 183, 42)",
  },
  messWrap: {
    display: "flex",
    padding: "4px 18px 4px 8px",
    alignItems: "flex-end",
  },
  avtMess: {
    width: 28,
    height: 28,
  },
  infoMess: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginLeft: 6,
  },
  infoMessRight: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginLeft: 6,
  },
  handleMess: {
    fontSize: 11,
    marginBottom: 3,
    color: "#90949c",
    paddingLeft: 10,
  },
  messageLeft: {
    padding: "6px 8px 6px 10px",
    background: "#f1f0f0",
    borderRadius: 48,
    maxWidth: 136,
  },
  messageRight: {
    padding: "6px 8px 6px 10px",
    background: "#d696bb",
    borderRadius: 48,
    maxWidth: 136,
    color: "white",
  },
  messContentRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  messContent: {
    display: "flex",
  },
  messTo: {
    display: "flex",
    alignItems: "flex-end",
  },
}));
const ChatBox = ({
  userInfo: { handle, imageurl, _id, messages },
  sendMessage,
  listUserChat,
}) => {
  console.log(messages);
  const classes = useStyles();
  const [mess, setMess] = useState("");
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (mess.length !== 0) {
        sendMessage(mess, handle, listUserChat);
        setMess("");
      }
    }
  };
  const handleChange = (e) => {
    setMess(e.target.value);
  };

  console.log(mess);
  return (
    <Card className={classes.card}>
      <div className={classes.header}>
        <div className={classes.avtWrap}>
          <Avatar
            alt="Profile Picture"
            className={classes.avt}
            src={imageurl}
          />
          <div className={classes.online}>
            <div className={classes.inner}></div>
          </div>
        </div>
        <div className={classes.info}>
          <Typography variant="body2">{handle}</Typography>
          <Typography className={classes.status} variant="caption">
            Online
          </Typography>
        </div>
        <IconButton size="small">
          <CloseIcon fontSize="small" color="primary" />
        </IconButton>
      </div>
      <div className={classes.content}>
        <div>
          {messages != null
            ? messages.map((mess) => (
                <div className={classes.messWrap}>
                  {mess.from === handle ? (
                    <div className={classes.messTo}>
                      <div className={classes.avtWrap}>
                        <Avatar
                          alt="Profile Picture"
                          className={classes.avtMess}
                          src={imageurl}
                        />
                        <div className={classes.online}>
                          <div className={classes.inner}></div>
                        </div>
                      </div>
                      <div className={classes.infoMess}>
                        <Typography
                          variant="caption"
                          className={classes.handleMess}
                        >
                          {handle}
                        </Typography>
                        <div className={classes.messContent}>
                          <Typography
                            className={classes.messageLeft}
                            variant="caption"
                          >
                            {mess.message}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={classes.infoMess}>
                      <div className={classes.messContentRight}>
                        <Typography
                          className={classes.messageRight}
                          variant="caption"
                        >
                          {mess.message}
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
      <div className={classes.text}>
        <TextareaAutosize
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={mess}
          className={classes.textarea}
          style={{ overflow: "auto" }}
          aria-label="minimum height"
          rowsMin={3}
          placeholder="Nhập tin nhắn"
        />
      </div>
    </Card>
  );
};

export default ChatBox;
