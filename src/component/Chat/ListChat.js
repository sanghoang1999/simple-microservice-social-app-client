import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/appBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: 200,
    overflow: "auto",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    width: 208,
    right: 30,
    background: "white",
    borderRadius: " 4px 0 0",
  },
  card: {
    maxHeight: 200,
    marginRight: 10,
  },
}));
const ListChat = ({ listUser }) => {
  const classes = useStyles();
  return listUser.map((primary) => (
    <Card className={classes.card}>
      <List className={classes.list}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar alt="Profile Picture" src={"dd"} />
          </ListItemAvatar>
          <Typography variant="body2">{primary}</Typography>
        </ListItem>
      </List>
    </Card>
  ));
};

export default ListChat;
