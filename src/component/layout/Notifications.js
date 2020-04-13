import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { markReadNotis } from "../../actions/notifications";
import { getNotifications } from "../../actions/notifications";
import NotificationItem from "./NotificationItem";
import Typography from "@material-ui/core/Typography";
import socket from "../../utils/socketAdapter";
import store from "../../store";
import { NOTIFICATIONS } from "../../actions/type";
//MUI
import Badge from "@material-ui/core/Badge";
import Notification from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import { IconBtn } from "../../utils/IconBtn";

const useStyles = makeStyles((theme) => ({
  notification: {
    padding: "0px 0px 3px 7px",
    borderBottom: "1px solid #00000017",
    fontWeight: 500,
    fontSize: "0.85rem",
  },
  menu: {},
  notiWrap: {
    paddingBottom: 10,

    minWidth: 200,
    minHeight: 50,
  },
}));

const Notifications = ({
  notis: { loading, notifications },
  markReadNotis,
  getNotifications,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    let io = socket.io;

    io.on("connect", () => {
      console.log("emvuidiiiii");
    });
    io.on("notification_like", (res) => {
      store.dispatch({
        type: NOTIFICATIONS,
        payload: res,
      });
    });
    io.on("notification_comment", (res) => {
      store.dispatch({
        type: NOTIFICATIONS,
        payload: res,
      });
    });
    return () => {
      io.close();
    };
  }, []);
  useEffect(() => {
    getNotifications();
  }, []);
  let listNotisIdNoRead = notifications
    .filter((noti) => noti.read === false)
    .map((item) => item._id);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (listNotisIdNoRead.length !== 0) {
      markReadNotis(listNotisIdNoRead);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <IconBtn tip="Notifications" onClick={handleClick}>
        <Badge
          badgeContent={!loading ? listNotisIdNoRead.length : 0}
          color="secondary"
        >
          <Notification color="primary" />
        </Badge>
      </IconBtn>
      <Menu
        className={classes.menu}
        id="simple-menu"
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.notiWrap}>
          <Typography variant="body1" className={classes.notification}>
            Notifications
          </Typography>

          {!loading ? (
            notifications.length === 0 ? (
              <Typography variant="body1" className={classes.notification}>
                You have no notifications
              </Typography>
            ) : (
              notifications.map((item) => (
                <NotificationItem notification={item} key={item._id} />
              ))
            )
          ) : null}
        </div>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notis: state.notifications,
});

export default connect(mapStateToProps, {
  markReadNotis,

  getNotifications,
})(Notifications);
