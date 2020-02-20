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
    marginBottom: 13
  },
  input: {
    borderRadius: "25px",
    border: "1px solid white",
    backgroundColor: "#f2f3f5",
    outline: "none",
    marginLeft: "7px",
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

const Comment = ({ comment: { body, createdAt, userHandle, userImage } }) => {
  console.log("cc");
  const classes = useStyles();
  return (
    <div className={classes.commentWrapper}>
      <Avatar src={userImage} className={classes.avatar} />

      <div className={classes.input}>
        <div>
          <Typography
            component={Link}
            color="primary"
            variant="body1"
            component="span"
            to={`/users/${userHandle}`}
            className={classes.userName}
          >
            {userHandle}
          </Typography>
          <Typography className={classes.body} variant="body1" component="span">
            {body}
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
  );
};

Comment.propTypes = {};

export default Comment;
