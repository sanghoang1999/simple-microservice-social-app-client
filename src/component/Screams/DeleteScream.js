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

const useStyles = makeStyles(theme => ({
  delBtn: {
    position: "absolute",
    top: "-3%",
    right: "-1%"
  }
}));
const DeleteScream = ({ deleteScream, screamId }) => {
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
  return (
    <div className={classes.delBtn}>
      <IconBtn tip="Delete" onClick={handleClickOpen}>
        <DeleteOutline color="secondary" fontSize="small" />
      </IconBtn>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User Details</DialogTitle>
        <DialogContent>xoa de</DialogContent>
        <DialogActions style={{ paddingBottom: "15px" }}>
          <Button onClick={handleDelete} variant="contained" color="primary">
            Delete
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteScream.propTypes = {};

const mapStateToProps = state => ({
  userData: state.auth
});

export default connect(mapStateToProps, { deleteScream })(DeleteScream);
