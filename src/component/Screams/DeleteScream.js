import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { deleteScream } from "../../actions/scream";
import { IconBtn } from "../../utils/IconBtn";
//MUI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  delBtn: {
    position: "absolute",
    top: "0%",
    right: "0%"
  }
}));
const DeleteScream = ({ user, deleteScream, screamId, userHandle }) => {
  console.log("delete ne");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    deleteScream(screamId).then(() => {
      console.log(screamId);
    });
  };
  return !user.loading &&
    user.isAuthenticated &&
    userHandle === user.credentials.handle ? (
    <div className={classes.delBtn}>
      <IconBtn tip="Delete" onClick={handleClickOpen}>
        <DeleteOutline color="secondary" fontSize="small" />
      </IconBtn>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Scream</DialogTitle>
        <DialogContent style={{ width: "500px", padding: "20px" }}>
          <Typography>Does you want to delete this scream ?</Typography>
        </DialogContent>
        <DialogActions style={{ paddingBottom: "15px" }}>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Delete
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : null;
};

deleteScream.propTypes = {};

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps, { deleteScream })(DeleteScream);
