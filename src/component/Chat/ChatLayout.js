import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ListUser from "./ListUser";
import ListChat from "./ListChat";
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
  layout: {
    position: "fixed",
    bottom: 0,
    right: 0,
  },
  chatWrap: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    marginRight: 10,
  },
}));
const ChatLayout = (props) => {
  const classes = useStyles();
  const [listUser, setListUser] = useState([]);
  const handleAddUser = (list) => {
    console.log(list);
    setListUser(list);
  };
  return (
    <div className={classes.layout}>
      <div className={classes.chatWrap}>
        <ListUser handleAddUser={handleAddUser} listUser={listUser} />
        <ListChat listUser={listUser} />
      </div>
    </div>
  );
};

ChatLayout.propTypes = {};
export default ChatLayout;
