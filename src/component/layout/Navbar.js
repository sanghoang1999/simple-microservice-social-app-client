import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { IconBtn } from "../../utils/IconBtn";
import PostScream from "../Screams/PostScream";
//MT stuff
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Typography from "@material-ui/core/Typography";

// icon
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
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

const Navbar = ({ isAuthenticated, logout }) => {
  const classes = useStyles();
  const handleLogout = () => {
    logout();
  };
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
            {!isAuthenticated ? (
              <div>
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
            ) : (
              <div className="nav-auth">
                <div className="nav-auth-wrap-icon">
                  <PostScream />
                  <Link to="/">
                    <IconBtn tip="Home" color="success">
                      <HomeIcon color="primary" />
                    </IconBtn>
                  </Link>
                  <IconBtn tip="Notifications">
                    <Notifications color="primary" />
                  </IconBtn>
                </div>
                <Button color="inherit" component={Link} to="/home">
                  <Typography
                    variant="button"
                    to="/login"
                    color="inherit"
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

// Navbar.propTypes = {
//   isAuthenticated: PropTypes.bool.isRequired
// };

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
