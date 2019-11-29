import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import daisy from "../../images/daisy.png";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { login } from "../../actions/auth";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    textAlign: "center"
  },
  textField: {},
  circul: {
    marginLeft: theme.spacing(1)
  },
  signup: {
    marginTop: theme.spacing(1)
  }
}));

const Login = ({ history, login, errors }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;

  if (localStorage.getItem("token")) {
    history.push("/home");
  }
  const handleSubmit = async e => {
    e.preventDefault();
    console.log("cc");
    setLoading(true);
    login({ email, password }).then(() => {
      setLoading(false);
    });
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Grid container className={classes.form} spacing={2}>
      <Grid item sm></Grid>
      <Grid item sm>
        <img src={daisy} alt="daisy" />
        <Typography variant="h3" color="textSecondary">
          Login
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              className={classes.textField}
              type="Email"
              helperText={errors.length > 0 ? errors[0].email : ""}
              error={errors.length > 0 && errors[0].email ? true : false}
              value={email}
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              fullWidth
              value={password}
              className={classes.textField}
              type="password"
              margin="normal"
              helperText={errors.length > 0 ? errors[0].password : ""}
              error={errors.length > 0 && errors[0].password ? true : false}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Submit{" "}
            {loading && (
              <CircularProgress size={20} className={classes.circul} />
            )}
          </Button>
          <Typography
            variant="caption"
            component="div"
            className={classes.signup}
          >
            Don't have an account ? sign up <Link to="/signup"> here</Link>{" "}
          </Typography>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

Login.propTypes = {
  errors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  errors: state.alert
});

export default connect(mapStateToProps, { login })(Login);
