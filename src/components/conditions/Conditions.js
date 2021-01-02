import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import celsius from "../../assets/images/celsius.svg";
import { makeStyles } from "@material-ui/core/styles";
import fahrenheit from "../../assets/images/fahrenheit.svg";

const useStyles = makeStyles((theme) => ({
  flexWrapper: {
    display: "flex",
  },
  icon: {
    fontSize: 30,
    cursor: "pointer",
  },
  img: {
    maxWidth: "20px",
  },
  temp: {
    padding: "0 8px",
  },
  units: {
    cursor: "pointer",
    color: "#000",
    textDecoration: "none",
    "&:hover": {
      color: "#0081a7",
    },
  },
}));

export default function Conditions(props) {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item>
        <div className={classes.flexWrapper}>
          <Typography variant="h6" gutterBottom>
            {props.chosenCity}
          </Typography>
        </div>
      </Grid>
      <div style={{ flexGrow: "1" }} />
      <Grid item>
        {!props.favorite ? (
          <FavoriteBorderIcon
            color="secondary"
            onClick={() => props.toggleFavorite(props.conditions.data[0])}
            className={classes.icon}
          />
        ) : (
          <FavoriteIcon
            color="secondary"
            onClick={props.toggleFavorite}
            className={classes.icon}
          />
        )}
      </Grid>
      <Grid item md={12} xs={12}>
        <span
          className={classes.units}
          onClick={() => props.changeUnit("Imperial")}
        >
          F
        </span>{" "}
        |{" "}
        <span
          className={classes.units}
          onClick={() => props.changeUnit("Metric")}
        >
          C
        </span>
      </Grid>
      <Grid item md={12} xs={12}>
        <div className={classes.flexWrapper}>
          {props.unit === "Metric" ? (
            <img src={celsius} alt="celsius" className={classes.img} />
          ) : (
            <img src={fahrenheit} alt="fahrenheit" className={classes.img} />
          )}
          <Typography className={classes.temp}>
            {props.conditions.data[0].Temperature[props.unit].Value}&#176;{" "}
            {props.conditions.data[0].Temperature[props.unit].Unit}
          </Typography>
        </div>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography>{props.conditions.data[0].WeatherText}</Typography>
      </Grid>
    </Grid>
  );
}
