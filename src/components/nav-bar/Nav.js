import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nav:{
    background: '#073b4c',
  },
  navItem: {
      color: '#fff',
      padding: '10px',
      textDecoration: 'none',
      marginLeft: theme.spacing(3),
      borderRadius: '4px',
      "&:hover": {
        background: 'rgba(249,249,249,0.1)',
      },
      fontWeight: 'bold',
  },
  
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Weather Panel
          </Typography>
          <NavLink className={classes.navItem} color="inherit" to="/" >Home</NavLink>
          <NavLink className={classes.navItem} color="inherit" to="/favorites" >Favorites</NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
