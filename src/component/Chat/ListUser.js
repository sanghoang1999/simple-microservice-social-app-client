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
  card: {
    padding: "5px 10px",
    marginBottom: 3,
  },
  list: {
    minHeight: 400,
    overflow: "auto",
    padding: 0,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    width: 208,
    right: 30,
    background: "white",
    borderRadius: "4px 4px 0 0",
  },
  avtWrap: {
    minWidth: 47,
  },
  avt: {
    width: 35,
    height: 35,
  },
  listItem: {
    justifyContent: "space-between",
  },
  handle: {
    flex: 2,
  },
  online: {
    width: 6,
    height: 6,
    backgroundColor: "rgb(66, 183, 42)",
    borderRadius: "50%",
  },
  offline: {
    width: 6,
    height: 6,
    backgroundColor: "black",
    borderRadius: "50%",
  },
}));
const ListUser = ({
  handleAddUserChat,
  listUserChat,
  listFriend,
  listUser,
}) => {
  const classes = useStyles();
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
          <div className={classes.friends}>
            <Typography>Ban be</Typography>
            {listFriend.map(({ user: { handle, imageurl, _id, status } }) => (
              <React.Fragment key={handle}>
                <ListItem
                  button
                  onClick={() =>
                    handleAddUserChat(
                      [...listUserChat, { handle, imageurl, _id }],
                      null,
                      handle
                    )
                  }
                  className={classes.listItem}
                >
                  <ListItemAvatar className={classes.avtWrap}>
                    <Avatar
                      alt="Profile Picture"
                      className={classes.avt}
                      src={imageurl}
                    />
                  </ListItemAvatar>
                  <Typography className={classes.handle} variant="body2">
                    {handle}
                  </Typography>
                  {status === "online" ? (
                    <span className={classes.online}></span>
                  ) : (
                    <span className={classes.offline}></span>
                  )}
                </ListItem>
              </React.Fragment>
            ))}
          </div>
          <div className={classes.friends}>
            <Typography>Nguoi dung khac</Typography>
            {listUser.map(({ handle, imageurl, _id }) => (
              <React.Fragment key={handle}>
                <ListItem
                  button
                  onClick={() =>
                    handleAddUserChat(
                      [...listUserChat, { handle, imageurl, _id }],
                      _id,
                      null
                    )
                  }
                  className={classes.listItem}
                >
                  <ListItemAvatar className={classes.avtWrap}>
                    <Avatar
                      alt="Profile Picture"
                      className={classes.avt}
                      src={imageurl}
                    />
                  </ListItemAvatar>
                  <Typography className={classes.handle} variant="body2">
                    {handle}
                  </Typography>
                  <span className={classes.status}>.</span>
                </ListItem>
              </React.Fragment>
            ))}
          </div>
        </List>
      </Card>
    </AppBar>
  );
};

export default ListUser;
