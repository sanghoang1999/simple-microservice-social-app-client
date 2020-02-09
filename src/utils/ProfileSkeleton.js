import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";
// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10
  },
  avatar: {
    width: 150,
    height: 150,
    marginTop: theme.spacing(1.5)
  },
  card: {
    textAlign: "center"
  },
  avatarWrap: {
    display: "flex",
    justifyContent: "center",
    position: "relative"
  }
}));

const ScreamSkeleton = props => {
  const classes = styles();
  const content = Array.from({ length: 1 }).map((item, index) => (
    // <Card className={classes.card}>
    //   <CardMedia
    //     component="img"
    //     image={NoImg}
    //     className={classes.image}
    //   ></CardMedia>
    //   <CardContent className={classes.detail}>
    //     <div className={classes.handle} />
    //     <div className={classes.date} />
    //     <div className={classes.fullLine} />
    //     <div className={classes.fullLine} />
    //     <div className={classes.halfLine} />
    //   </CardContent>
    // </Card>
    <Card className={classes.card}>
      <div className={classes.avatarWrap}>
        <Avatar src={NoImg} className={classes.avatar} />
      </div>
      <CardContent>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

export default ScreamSkeleton;
