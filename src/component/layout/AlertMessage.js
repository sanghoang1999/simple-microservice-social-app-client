import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";

const AlertMessage = ({ message }) => {
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    setOpen(true);
  }, [message]);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  return (
    message.length > 0 &&
    message.map(mes => (
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
        style={{ marginTop: 50 }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={mes.alertType}
        >
          {mes.msg}
        </Alert>
      </Snackbar>
    ))
  );
};
AlertMessage.propTypes = {};

const mapStateToProps = state => ({
  message: state.message
});

export default connect(mapStateToProps, null)(AlertMessage);
