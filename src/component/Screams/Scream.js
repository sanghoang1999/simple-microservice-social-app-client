import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Moment from "react-moment";
const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    marginBottom: theme.spacing(2)
  },

  image: {
    minWidth: 100,
    flex: 1
  },
  detail: {
    flex: 2.5,
    display: "flex",
    flexDirection: "column"
  }
}));
const Scream = ({ scream: { body, createdAt, userImage, userHandle } }) => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          image={userImage}
          title="Contemplative Reptile"
          className={classes.image}
        ></CardMedia>
        <CardContent className={classes.detail}>
          <Typography
            component={Link}
            to={`/users/${userHandle}`}
            variant="h5"
            gutterBottom
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="caption" component="div" color="textSecondary">
            <Moment fromNow>{createdAt}</Moment>
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

Scream.propTypes = {};

export default Scream;
