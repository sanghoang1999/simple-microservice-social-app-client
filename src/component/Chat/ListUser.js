import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/appBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
const messages = [
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 1,
    primary: "Brunch this week?",
    secondary: "I'll be t",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do  on it.`,
    person: "/static/images/avatar/1.jpg",
  },
];
const useStyles = makeStyles((theme) => ({
  card: {
    padding: "5px 10px",
    marginBottom: 3,
  },
  list: {
    maxHeight: 400,
    overflow: "auto",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    width: 208,
    right: 30,
    background: "white",
    borderRadius: "4px 4px 0 0",
  },
}));
const ListUser = ({ handleAddUser, listUser }) => {
  const classes = useStyles();
  console.log(handleAddUser);
  return (
    <AppBar position="static" color="primary" className={classes.appBar}>
      <Card className={classes.card}>
        <Typography variant="subtitle2" style={{ fontSize: 16 }}>
          chat
        </Typography>
        <Typography variant="caption" component="h2">
          online
        </Typography>
      </Card>
      <Card>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              <ListItem
                button
                onClick={() => handleAddUser([...listUser, primary])}
              >
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <Typography variant="body2">{primary}</Typography>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Card>
    </AppBar>
  );
};

export default ListUser;
