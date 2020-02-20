import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getScream } from "../../actions/scream";
import { IconBtn } from "../../utils/IconBtn";
import DeleteScream from "./DeleteScream";
import LikeScreamBtn from "./LikeScreamBtn";
import Comment from "./Comment";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
//MUI
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import Grid from "@material-ui/core/Grid";

import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import ChatIcon from "@material-ui/icons/Chat";

import PropTypes from "prop-types";
import store from "../../store";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import PostComment from "./PostComment";
const useStyles = makeStyles(theme => ({
  avatar: {
    width: "185px",
    height: "185px"
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
    maxHeight: "300px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
}));

const ScreamDialog = ({
  screamProps,
  screamFromRedux: { scream },
  getScream
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      getScream(screamProps.id);
    }
  }, [open]);
  useEffect(() => {});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    store.dispatch({
      type: "CLEAR_SCREAM"
    });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <IconBtn tip="Expand scream" onClick={handleClickOpen}>
        <UnfoldMore color="primary" />
      </IconBtn>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
      >
        <IconButton
          size="small"
          className={classes.closeBtn}
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <DialogContent>
          <Grid container style={{ padding: "10px 0 10px 0" }}>
            <Grid item sm={5}>
              <Avatar src={screamProps.userImage} className={classes.avatar} />
            </Grid>
            <Grid item sm={7} className={classes.content}>
              <div>
                <Typography
                  component={Link}
                  color="primary"
                  variant="h5"
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
                <Typography variant="body2">{screamProps.body}</Typography>
              </div>{" "}
              <div style={{ margin: "32px 0 0 -12px", display: "flex" }}>
                <span style={{ flex: 1 }}>
                  <LikeScreamBtn screamId={screamProps.id} />
                  <span>{screamProps.likeCount}</span>
                </span>
                <span style={{ flex: 1 }}>
                  <IconBtn tip="comments">
                    <ChatIcon color="primary" />
                  </IconBtn>
                  <span>{screamProps.commentCount} comments</span>
                </span>
              </div>
            </Grid>
          </Grid>
          {scream !== null ? (
            <div className={classes.cmtScollBar}>
              <PostComment screamId={screamProps.id} />
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
  user: state.auth.credential
});

export default connect(mapStateToProps, { getScream })(ScreamDialog);
