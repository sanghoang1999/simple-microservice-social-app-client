import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { editUserDetails } from "../../actions/user";

//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

const EditDetail = ({
  userData: { loading, credentials },
  editUserDetails
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    website: "",
    location: ""
  });
  useEffect(() => {
    if (open) {
      console.log("editDetail useEffect");
      setFormData({
        bio: loading || !credentials.bio ? "" : credentials.bio,
        website: loading || !credentials.bio ? "" : credentials.website,
        location: loading || !credentials.bio ? "" : credentials.location
      });
    }
  }, [credentials, open]);
  const { bio, website, location } = formData;
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
    editUserDetails({ bio, website, location }).then(() => {
      setIsSubmit(false);
      setOpen(false);
    });
  };

  return (
    <div>
      <Button
        style={{ marginTop: "10px" }}
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Add User Details
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User Details</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                id="bio"
                name="bio"
                label="Bio"
                fullWidth
                type="TextField"
                value={bio}
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                id="website"
                name="website"
                label="Website"
                fullWidth
                value={website}
                type="TextField"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                id="location"
                name="location"
                label="Location"
                fullWidth
                value={location}
                type="TextField"
                margin="normal"
                onChange={handleChange}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions style={{ paddingBottom: "15px" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmit}
            onClick={handleSubmit}
          >
            Add{" "}
            {isSubmit && (
              <CircularProgress size={20} style={{ marginLeft: 8 }} />
            )}
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  userData: state.auth
});

export default connect(mapStateToProps, { editUserDetails })(EditDetail);
