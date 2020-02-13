import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getScream } from "../../actions/scream";
import { IconBtn } from "../../utils/IconBtn";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
//MUI
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import store from "../../store";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  avatar: {
    width: "200px",
    height: "200px"
  },
  closeBtn: {
    position: "absolute",
    top: "1%",
    right: "0%"
  }
}));
const ScreamDialog = ({ screamId, scream: { scream, loading }, getScream }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      getScream(screamId);
    }
  }, [getScream, open]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    store.dispatch({
      type: "CLEAR_SCREAM"
    });
  };

  const dialogMarkup =
    scream == null ? (
      <CircularProgress size={200} />
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <Avatar src={scream.userImage} className={classes.avatar} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${scream.userHandle}`}
          >
            @{scream.userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Moment format="DD/MM/YYYY">{scream.createdAt}</Moment>
          </Typography>
        </Grid>
      </Grid>
    );

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
        <IconButton size="small" className={classes.closeBtn}>
          <CloseIcon fontSize="small" onClick={handleClose} />
        </IconButton>
        <DialogContent>{dialogMarkup}</DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  scream: state.scream
});

export default connect(mapStateToProps, { getScream })(ScreamDialog);
