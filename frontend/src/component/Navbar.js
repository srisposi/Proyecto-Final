import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ShoppingCart, Badge } from "@mui/icons-material";
import logo from "../assets/logos/logo.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { getAuth, signOut } from "firebase/auth";
import { actionTypes } from "../reducer";
import { useNavigate } from "react-router-dom";
import SignIn from "../services/ServiceSignIn";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appBar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
    backgroundColor: "whitesmoke",
  },
  image: {
    marginRight: "100px",
    height: "2rem",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [{ basket, user }, dispatch] = useStateValue();
  const [loguedUser, setLoguedUser] = useState({ email: null });

  const history = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    console.log("el email logueado", email);

    if (email !== null) setLoguedUser({ email: email });
  }, []);

  const handleAuth = () => {
    localStorage.clear();
    history("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <img src={logo} className={classes.image} alt="logo" />
            </IconButton>
          </Link>
          <div className={classes.grow} />
          <Typography variant="h6" color="textPrimary" component="p">
            Hello {loguedUser.email ? loguedUser.email : "Guest"}
          </Typography>
          <div className={classes.button}>
            <Link to="/signin">
              <Button variant="outlined" onClick={handleAuth}>
                <strong>
                  {loguedUser.email ? "Log out" : "Sign in / Sign out"}
                </strong>
              </Button>
            </Link>
            <Link to="checkoutpage">
              <IconButton aria-label="show cart items">
                <Badge badgeContent={basket?.length} color="secondary">
                  <ShoppingCartIcon fontSize="large" color="primary" />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
