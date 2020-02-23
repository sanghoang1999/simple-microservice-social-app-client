import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { editUserDetails } from "../../actions/user";
import NotificationItem from "./NotificationItem";
//MUI
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Notification from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconBtn } from "../../utils/IconBtn";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

const Notifications = ({
  userData: { loading, notifications },
  editUserDetails
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <IconBtn tip="Notifications" onClick={handleClick}>
        <Badge badgeContent={4} color="secondary">
          <Notification color="primary" />
        </Badge>
      </IconBtn>
      <Menu
        id="simple-menu"
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = state => ({
  userData: state.auth
});

export default connect(mapStateToProps, { editUserDetails })(Notifications);
