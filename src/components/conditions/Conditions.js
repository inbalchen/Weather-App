import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    color: "rgba(0, 12, 30, 0.6)",
    padding: '10px',
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: "rgba(0, 12, 30, 0.5)",
    marginBottom: '15px'
  },
  icon: {
    fontSize: 50,
    cursor: "pointer",
  },
  img: {
    maxWidth: "20px",
    height: "24px",
  },
  units: {
    cursor: "pointer",
    color: "rgba(0, 12, 30, 0.5)",
    textDecoration: "none",
    "&:hover": {
      color: "#0081a7",
    },
  },
}));

export default function Conditions({chosenCity, favorite, toggleFavorite, conditions, changeUnit, unit}) {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" spacing={2} className={classes.container}>
      <Grid item md={12} sm={12}>
      
        <div className={classes.title}>
            {chosenCity}
        </div>
        {!favorite ? (
          <FavoriteBorderIcon
            color="secondary"
            onClick={() => toggleFavorite(conditions[0])}
            className={classes.icon}
          />
        ) : (
          <FavoriteIcon
            color="secondary"
            onClick={toggleFavorite}
            className={classes.icon}
          />
        )}
        
      </Grid>
      <Grid item md={12} xs={12}>
        <span
          className={classes.units}
          onClick={() => changeUnit("Imperial")}
        >
          F
        </span>{" "}
        |{" "}
        <span
          className={classes.units}
          onClick={() => changeUnit("Metric")}
        >
          C
        </span>
      </Grid>
      <Grid item md={12} xs={12}>
        <div className={classes.flexWrapper}>
            {conditions[0].Temperature[unit].Value}&#176;{" "}
            {conditions[0].Temperature[unit].Unit}
        </div>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography>{conditions[0].WeatherText}</Typography>
      </Grid>
    </Grid>
  );
}
