import React, { useState, useEffect, Fragment } from "react";

import { connect } from "react-redux";
import { getListLike } from "../../actions/scream";
import { IconBtn } from "../../utils/IconBtn";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";

//MUI
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  likeCount: {
    marginTop: "-4px",
    "&:hover": {
      textDecoration: "underline"
    },
    position: "relative"
  },

  content: {
    minWidth: 445,
    minHeight: 475,
    padding: "13px 10px"
  },
  delWrap: {
    position: "absolute",
    top: "0%",
    right: "0%"
  },
  total: {
    padding: "13px 10px",
    borderBottom: `1px solid #00000029 `
  },
  commentWrapper: {
    display: "flex",
    borderBottom: "1px solid #00000017",
    padding: "6px 0 6px 13px"
  },
  input: {
    marginLeft: "2px",
    paddingLeft: 8,
    paddingRight: 40
  },
  userName: {
    marginRight: 5,
    fontWeight: 500
  },
  circur: {
    display: "flex",
    width: 350,
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  }
}));
const ListLike = ({ screamId, likeCount }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listUserLikes, setListUserLike] = useState([]);
  let res = null;
  const handleClickOpen = async () => {
    setOpen(true);
    res = await axios.get(`/scream/${screamId}/listLike`);
    console.log(res.data);
    setListUserLike(res.data);
    setLoading(false);
  };

  const handleClose = () => {
    setListUserLike([]);
    setOpen(false);
    setTimeout(() => {
      setLoading(true);
    }, 100);
  };
  console.log(loading);
  return (
    <div className={classes.likeCount}>
      <div style={{ cursor: "pointer" }} onClick={handleClickOpen}>
        <Typography variant="body1">{likeCount}</Typography>{" "}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ minWidth: 100 }}
        aria-labelledby="form-dialog-title"
      >
        {!loading ? (
          <Fragment>
            <div className={classes.delWrap}>
              <IconBtn tip="Delete" onClick={handleClickOpen}>
                <CloseIcon fontSize="small" />
              </IconBtn>
            </div>
            <Typography
              className={classes.total}
              variant="body1"
              color={"primary"}
            >
              total <span> {likeCount} </span>{" "}
            </Typography>
            <DialogContent className={classes.content}>
              {listUserLikes.map(user => (
                <div key={user.createdAt}>
                  <Link
                    to={`/user/${user.userHandle}`}
                    className={classes.commentWrapper}
                  >
                    <Avatar src={user.userImage} className={classes.avatar} />
                    <div className={classes.input}>
                      <div>
                        <Typography
                          color="primary"
                          variant="body1"
                          component="span"
                          className={classes.userName}
                        >
                          {user.userHandle}
                        </Typography>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </DialogContent>
          </Fragment>
        ) : (
          <div className={classes.circur}>
            <CircularProgress size={30} />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ListLike;
