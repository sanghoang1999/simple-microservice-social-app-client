import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { IconBtn } from "../../utils/IconBtn";
import PostScream from "../Screams/PostScream";
import Notificatoins from "./Notifications";
//MT stuff
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
// icon
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    zIndex: 0,
  },
  menuButton: {
    marginLeft: theme.spacing(4),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  title: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row-reverse",
  },
  brand: {
    fontSize: 25,
    padding: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
}));

const Navbar = ({ isAuthenticated, logout }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");
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
            to="/home"
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
                  {!matches ? (
                    <Link to="/profile">
                      <IconBtn tip="Profile" color="success">
                        <PersonIcon color="primary" />
                      </IconBtn>
                    </Link>
                  ) : null}
                  <Link to="/">
                    <IconBtn tip="Home" color="success">
                      <HomeIcon color="primary" />
                    </IconBtn>
                  </Link>
                  <div style={{ display: "inline" }}>
                    <Notificatoins />
                  </div>
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
