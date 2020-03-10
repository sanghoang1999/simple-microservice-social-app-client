import React from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  card: {
    display: "flex",
    marginBottom: theme.spacing(2)
  },

  image: {
    flex: 1.5,
    [theme.breakpoints.down("sm")]: {
      flex: 3.5
    }
  },
  detail: {
    flex: 3
  }
}));
export const SkeletonScream = () => {
  const classes = styles();
  return Array.from(new Array(3)).map(() => (
    <Card className={classes.card}>
      <div className={classes.image}>
        <Skeleton variant="rect" width={"100%"} height={"100%"} />
      </div>
      <CardContent className={classes.detail}>
        <Box pt={0.5}>
          <Skeleton width="20%" />
          <Skeleton width="50%" />

          <Box pt={3} pb={2}>
            <Skeleton width="60%" />
            <Skeleton width="60%" />
            <Skeleton width="60%" />
          </Box>

          <Skeleton width="80%" />
        </Box>
      </CardContent>
    </Card>
  ));
};
