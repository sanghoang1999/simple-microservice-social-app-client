import React from "react";
import { Link } from "react-router-dom";
//MT stuff
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginLeft: theme.spacing(4)
  },
  title: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row-reverse"
  },
  brand: {
    fontSize: 25,
    padding: 0
  }
}));

const Navbar = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar color="secondary">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <FavoriteIcon />
          </IconButton>
          <Button
            className={classes.brand}
            size="large"
            color="inherit"
            component={Link}
            to="home"
          >
            emvuidi
          </Button>
          <div className={classes.title}>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
