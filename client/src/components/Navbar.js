import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#3b5998'
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2)
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }
}));

function Navbar() {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("user");
    setUser(username);
  }, []);

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <img src="logo.png" alt="logo" height="30px" />
          SimpliAudit
        </Typography>
        <div className={classes.search}>
          <InputBase
            placeholder="Filter by protocol…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        {user ? (
          <Typography variant="subtitle1">Welcome, {user}</Typography>
        ) : (
          <>
            <Button color="inherit" href="/login">Login</Button>
            <Button color="inherit" href="/signup">Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
