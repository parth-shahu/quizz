import React, { useState, useEffect } from "react";
import {
  Button,
  InputAdornment,
  TextField,
  Backdrop,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import actions from "../../Stores/Auth/actions";
import { connect, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { compose } from "redux";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const loginAction = actions.login;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ login }) {
  const history = useHistory();
  const classes = useStyles();

  const { error, isAuthenticated, isLoggingIn } = useSelector(
    (state) => state?.AuthReducer
  );

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      return <Redirect to="/technology" />;
    }
  }, [isAuthenticated]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login(formData, history);
  };
  return (
    <>
      {isLoggingIn && (
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              autoFocus
              required
              value={formData.email}
              onChange={handleChange}
              style={{ marginBottom: "10px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="password"
              label="Password"
              type={visible ? "text" : "password"}
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              style={{ marginBottom: "10px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {visible ? (
                      <VisibilityIcon onClick={() => setVisible(false)} />
                    ) : (
                      <VisibilityOffIcon onClick={() => setVisible(true)} />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            {error?.error && (
              <Typography varient="subtitle2" style={{ color: "red" }}>
                {error?.error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

const mapStateToProps = ({ AuthReducer }) => ({
  isAuthenticated: AuthReducer.isAuthenticated,
  isLoggingIn: AuthReducer.isLoggingIn,
  error: AuthReducer.error,
});
function mapDispatchToProps(dispatch) {
  return {
    login: (...args) => dispatch(loginAction(...args)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
