import React, { Fragment, useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import Upload from "./Upload";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import ImageBox from "./ImageBox";

const useStyles = makeStyles((theme) => ({
  card: {
    marginRight: 10,
    width: 247,
    borderRadius: "7px 7px 0 0",
    position: "relative",
    boxSizing: "border-box",
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
    minHeight: 40,
  },
  content: {
    height: 258,
    maxHeight: 258,
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
    fontSize: 12,
    overflow: "auto",
    padding: "6px 0 0 8px",
    border: "none",
    marginBottom: 3,
    boxSizing: "border-box",
  },
  text: {
    bottom: 0,
    width: "100%",
    borderTop: "1px solid #00000029",
  },
  avtWrap: {
    position: "relative",
    paddingLeft: 5,
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
  imageUpload: {
    width: 45,
    height: 45,
    padding: "8px 0 0 8px",
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
    borderRadius: 25,
    wordBreak: "break-all",
    maxWidth: 136,
  },
  messageRight: {
    padding: "6px 8px 6px 10px",
    background: "#d696bb",
    borderRadius: 25,
    wordBreak: "break-all",
    maxWidth: 136,
    color: "white",
  },
  messContentRight: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "1px 0",
    paddingRight: 5,
  },
  messContent: {
    display: "flex",
  },
  messTo: {
    display: "flex",
    alignItems: "flex-end",
  },
  messWrap: {
    "&:last-child": {
      marginBottom: 10,
    },
  },
  messageImage: {
    width: 100,
    height: 100,
  },
}));
const ChatBox = ({
  userInfo: { handle, imageurl, _id, messages, status },
  sendMessage,
  listUserChat,
  handleCloseChat,
  sendImage,
}) => {
  console.log(status, status === "online");
  const classes = useStyles();
  const inputMess = useRef(null);
  const scrollBottom = useRef();
  const [mess, setMess] = useState("");
  const [src, setSrc] = useState("");
  // useEffect(() => {
  //   var a = document.getElementById("hehe");
  //   a.addEventListener("input", (e) => {
  //     e.target.addEventListener("propertychange", (e) => {
  //       console.log("change");
  //       console.log(e.target);
  //     });
  //   });
  // }, []);
  useEffect(() => {
    let textHeight = 35;
    const resizeObserver = new ResizeObserver((entries) => {
      const heightChange = textHeight - entries[0].target.offsetHeight;
      console.log(entries[0]);
      entries[0].target.previousElementSibling.style.height =
        entries[0].target.previousElementSibling.offsetHeight +
        heightChange +
        "px";
      textHeight = entries[0].target.offsetHeight;
    });

    resizeObserver.observe(document.getElementById("emvuidi_" + _id));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      console.log("cc");
      scrollBottom.current.scrollTo(0, scrollBottom.current.scrollHeight);
    }, 0);
  }, [listUserChat]);
  useEffect(() => {
    if (src.length > 0) {
      inputMess.current.focus();
    }
  }, [src]);
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      console.log(mess);
      if (src.length > 0) {
        sendImage(src, handle);
        setSrc("");
        return;
      }
      if (mess.length !== 0) {
        sendMessage(mess, handle);
        inputMess.current.innerText = "";

        setMess("");
      }
    }
  };
  const handleChange = (e) => {
    setMess(e.target.innerText);
  };

  const handleSetImage = (src) => {
    console.log(src);
    setSrc(src);
  };
  return (
    <Card className={classes.card}>
      <div className={classes.header}>
        <div className={classes.avtWrap}>
          <Avatar
            alt="Profile Picture"
            className={classes.avt}
            src={imageurl}
          />
          {status === "online" ? (
            <div className={classes.online}>
              <div className={classes.inner}></div>
            </div>
          ) : null}
        </div>
        <div className={classes.info}>
          <Typography
            variant="body2"
            style={{ marginTop: status === "online" ? 0 : 7 }}
          >
            {handle}
          </Typography>
          {status === "online" ? (
            <Typography className={classes.status} variant="caption">
              Online
            </Typography>
          ) : null}
        </div>
        <IconButton size="small" onClick={() => handleCloseChat(_id, handle)}>
          <CloseIcon fontSize="small" color="primary" />
        </IconButton>
      </div>
      <div ref={scrollBottom} className={classes.content}>
        <div className={classes.messWrap}>
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
                        {status === "online" ? (
                          <div className={classes.online}>
                            <div className={classes.inner}></div>
                          </div>
                        ) : null}
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
                            {mess.type === "image" ? (
                              <ImageBox image={mess.message} />
                            ) : (
                              mess.message
                            )}
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
                          {mess.type === "image" ? (
                            <ImageBox image={mess.message} />
                          ) : (
                            mess.message
                          )}
                        </Typography>
                      </div>
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
      <div id={`emvuidi_` + _id} className={classes.text}>
        {src.length > 0 ? (
          <img src={src} className={classes.imageUpload} alt="" />
        ) : null}
        <div
          contentEditable
          onInput={handleChange}
          onKeyDown={handleKeyDown}
          value={mess}
          className={classes.textarea}
          style={{ overflow: "auto" }}
          aria-label="minimum height"
          rowsMin={2}
          placeholder="Nhập tin nhắn"
          ref={inputMess}
        ></div>
        <Upload handleSetImage={handleSetImage} />
      </div>
    </Card>
  );
};

export default ChatBox;
