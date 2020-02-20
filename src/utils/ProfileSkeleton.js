import React, { Fragment } from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
// MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  card: {
    textAlign: "center"
  },
  avatarWrap: {
    display: "flex",
    justifyContent: "center",
    position: "relative"
  },
  row: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const ScreamSkeleton = props => {
  const classes = styles();
  const content = Array.from({ length: 1 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <div className={classes.avatarWrap}>
        <Skeleton variant="circle" width={150} height={150} />
      </div>
      <CardContent className={classes.row}>
        <Skeleton width="30%" />
        <Skeleton width="30%" />
        <Skeleton width="50%" />
        <Skeleton width="50%" />
        <Skeleton width="70%" />
        <Skeleton width="70%" />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

export default ScreamSkeleton;
