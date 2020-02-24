import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { deleteScream, likeScream, unlikeScream } from "../../actions/scream";
import Moment from "react-moment";
const useStyles = makeStyles(theme => ({
  commentWrapper: {
    display: "flex",
    backgroundColor: "#f2f3f5",
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
  body: {
    fontSize: "0.9rem",
    color: "black",
    letterSpacing: 0
  },
  createdAt: {
    lineHeight: 1
  }
}));

const NotificationItem = ({
  notification: {
    type,
    recipient,
    createdAt,
    sender,
    userImage,
    screamId,
    notificationId
  }
}) => {
  const classes = useStyles();
  return (
    <Link to={`/user/${recipient}/scream/${screamId}`}>
      <div className={classes.commentWrapper}>
        <Avatar src={userImage} className={classes.avatar} />

        <div className={classes.input}>
          <div>
            <Typography
              color="primary"
              variant="body1"
              component="span"
              className={classes.userName}
            >
              {sender}
            </Typography>
            <Typography
              className={classes.body}
              variant="body1"
              component="span"
            >
              {type === "like"
                ? "has just liked on your scream"
                : "has just commented on your scream"}
            </Typography>
          </div>
          <Typography
            className={classes.createdAt}
            component="div"
            variant="caption"
            color="textSecondary"
          >
            <Moment fromNow>{createdAt}</Moment>
          </Typography>
        </div>
      </div>
    </Link>
  );
};

Comment.propTypes = {};

export default NotificationItem;
