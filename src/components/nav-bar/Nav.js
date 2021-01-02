import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Drawer, Hidden } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

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
  nav: {
    background: "#073b4c",
  },
  navItem: {
    color: "#fff",
    padding: "10px",
    textDecoration: "none",
    marginLeft: theme.spacing(3),
    "&:hover": {
      borderBottom: "1px solid #fff",
    },
    "&.active": {
      borderBottom: "1px solid #fff",
    },
    fontWeight: "bold",
  },
  navIcon: {
    color: "#fff",
    textDecoration: "none",
  },
  drawerItem: {
    color: "#073b4c",
    textDecoration: "none",
    minWidth: "190px",
    padding: "10px 0",
    "&:hover": {
      background: "rgba(0,0,0,.1)",
    },
    "&.active": {
      background: "rgba(0,0,0,.1)",
      fontWeight: "bold",
    },
  },
  menuIcon: {
    cursor: "pointer",
  },
  drawer: {
    textAlign: "center",
    "& >div": {
      marginTop: "56px",
    },
  },
  drawerItemWrapper: {
    paddingTop: "20px",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/" className={classes.navIcon}>
              Weather Panel
            </NavLink>
          </Typography>
          <Hidden xsDown>
            <NavLink
              exact
              activeClassName={classes.navItem.active}
              className={classes.navItem}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              exact
              activeClassName={classes.navItem.active}
              className={classes.navItem}
              to="/favorites"
            >
              Favorites
            </NavLink>
          </Hidden>
          <Hidden smUp>
            <MenuIcon className={classes.menuIcon} onClick={toggleDrawer} />
          </Hidden>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        className={classes.drawer}
      >
        <NavLink
          exact
          activeClassName={classes.drawerItem.active}
          className={classes.drawerItem}
          to="/"
          onClick={toggleDrawer}
        >
          Home
        </NavLink>
        <NavLink
          exact
          activeClassName={classes.drawerItem.active}
          className={classes.drawerItem}
          to="/favorites"
          onClick={toggleDrawer}
        >
          Favorites
        </NavLink>
      </Drawer>
    </div>
  );
}
