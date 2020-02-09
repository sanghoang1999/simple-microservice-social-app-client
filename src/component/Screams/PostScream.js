import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { postScream } from "../../actions/scream";
import { IconBtn } from "../../utils/IconBtn";
import AddIcon from "@material-ui/icons/Add";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

const PostScream = ({ errors, postScream }) => {
  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    body: ""
  });
  const { body } = formData;
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmit(true);
    postScream({ body }).then(() => {
      setIsSubmit(false);
    });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <IconBtn tip="Notifications" onClick={handleClickOpen}>
        <AddIcon color="primary" />
      </IconBtn>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User Details</DialogTitle>
        <DialogContent style={{ width: "500px" }}>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                id="body"
                name="body"
                label="Add a scream"
                fullWidth
                value={body}
                type="textField"
                margin="normal"
                helperText={errors.length > 0 ? errors[0].msg : ""}
                error={errors.length > 0 && errors[0].msg ? true : false}
                onChange={handleChange}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions style={{ paddingBottom: "15px" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmit}
            onClick={handleSubmit}
          >
            Add {isSubmit && <CircularProgress size={20} />}
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  errors: state.alert
});

export default connect(mapStateToProps, { postScream })(PostScream);
