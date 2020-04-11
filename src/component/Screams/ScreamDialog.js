import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getScream } from "../../actions/scream";
import { IconBtn } from "../../utils/IconBtn";
import LikeScreamBtn from "./LikeScreamBtn";
import Comment from "./Comment";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
//MUI
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import BackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent";
import ChatIcon from "@material-ui/icons/Chat";

import PropTypes from "prop-types";
import store from "../../store";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import PostComment from "./PostComment";
const useStyles = makeStyles(theme => ({
  avatar: {
    width: "40px",
    height: "40px "
  },
  closeBtn: {
    position: "absolute",
    top: "1%",
    right: "0%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  cmtScollBar: {
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      maxHeight: 300,
      overflow: "auto",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    }
  },
  screamDialogWrap: {
    padding: "10px 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 6px"
    }
  },
  screamContent: {
    borderBottom: "1px solid #00000038",
    marginBottom: "15px"
  },
  info: {
    marginLeft: 7,
    lineHeight: 1
  },
  body: {
    maxHeight: 150,
    overflow: "auto"
  },
  top: {
    display: "flex",
    marginBottm: 5
  }
}));

const ScreamDialog = ({
  screamProps,
  screamFromRedux: { scream },
  getScream,
  openDialog,
  rdNum,
  open,
  setOpen,
  user: { isAuthenticated }
}) => {
  const classes = useStyles();
  const [oldPath, setOldPath] = useState("");
  const [newPath, setNewPath] = useState("");

  const matches = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    if (open) {
      getScream(screamProps.id);
    }
  }, [open]);
  useEffect(() => {
    if (openDialog) {
      setOpen(true);
    }
  }, [rdNum, openDialog]);
  if (oldPath === newPath) {
    setOldPath(`/user/${screamProps.userHandle}`);
  }
  const handleClickOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/user/${screamProps.userHandle}/scream/${screamProps.id}`;
    console.log(oldPath, newPath);

    setOldPath(oldPath);
    setNewPath(newPath);
    window.history.pushState(null, null, newPath);
    setOpen(true);
  };

  let history = useHistory();
  const handleClose = () => {
    if (openDialog) {
      history.push("home");
      setOpen(false);
    }
    setOpen(false);
    window.history.pushState(null, null, oldPath);
    store.dispatch({
      type: "CLEAR_SCREAM"
    });
  };
  const mobileBack = !matches ? (
    <Button
      variant="contained"
      style={{
        display: "flex",
        borderRadius: 0,
        display: "flex",
        padding: "6px 0"
      }}
      color="primary"
      onClick={handleClose}
    >
      <BackIcon style={{ flex: 1 }} />
      <div style={{ flex: 6, textAlign: "left" }}>
        {screamProps.userHandle} - {screamProps.body}
      </div>
    </Button>
  ) : null;
  return (
    <div style={{ display: "inline-block" }}>
      <IconBtn tip="Expand scream" onClick={handleClickOpen}>
        <UnfoldMore color="primary" />
      </IconBtn>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={!matches}
        fullWidth="true"
        maxWidth="sm"
        className={classes.dialog}
        aria-labelledby="form-dialog-title"
      >
        <IconButton
          size="small"
          className={classes.closeBtn}
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        {mobileBack}
        <DialogContent className={classes.screamDialogWrap}>
          <div container className={classes.screamContent}>
            <div className={classes.top}>
              <Avatar src={screamProps.userImage} className={classes.avatar} />
              <div className={classes.info}>
                <Typography
                  component={Link}
                  color="primary"
                  variant="body1"
                  to={`/users/${screamProps.userHandle}`}
                  gutterBottom
                >
                  @{screamProps.userHandle}
                </Typography>
                <Typography
                  variant="caption"
                  component="div"
                  color="textSecondary"
                  gutterBottom
                >
                  <Moment format="DD/MM/YYYY">{screamProps.createdAt}</Moment>
                </Typography>
              </div>
            </div>
            <div className={classes.content}>
              <Typography variant="body2" className={classes.body}>
                {screamProps.body}
              </Typography>
            </div>

            <div style={{ margin: "32px 0 0 -12px", display: "flex" }}>
              <span style={{ flex: 1 }}>
                <LikeScreamBtn
                  screamId={screamProps.id}
                  handle={screamProps.userHandle}
                />
                <span>{screamProps.likeCount}</span>
              </span>
              <span style={{ flex: 1 }}>
                <IconBtn tip="comments">
                  <ChatIcon color="primary" />
                </IconBtn>
                <span>
                  {screamProps.commentCount} {matches ? " comments" : null}
                </span>
              </span>
            </div>
          </div>
          {scream !== null ? (
            <div className={classes.cmtScollBar}>
              {isAuthenticated ? (
                <PostComment
                  screamId={screamProps.id}
                  userHandle={screamProps.userHandle}
                />
              ) : null}
              {scream.comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={20} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
const mapStateToProps = state => ({
  screamFromRedux: state.scream,
  user: state.auth
});

export default connect(mapStateToProps, { getScream })(ScreamDialog);
