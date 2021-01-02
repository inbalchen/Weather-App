import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentFavorites } from "../app/SearchActions";
import {
  Grid,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { nightIcons, dayIcons } from "../../utils/map";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      padding: "10px",
    },
  },
  cardWrapper: {
    padding: "10px",
    cursor: "pointer",
    "&:hover": {
      padding: "8px",
    },
    textAlign: "center",
  },
  elementPadding: {
    padding: "10px 0",
  },
  cardHeader: {
    padding: "10px",
  },
  cardContent: {
    padding: "0 10px",
  },
  cardNocontent: {
    textAlign: "center",
    maxWidth: "500px",
    margin: "20px auto",
    padding: "10px 10px 20px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    padding: "6px",
    color: "#284b63",
    textDecoration: "none",
  },
  icon: {
    color: "#f48c06",
    fontSize: "35px",
  },
  img: {
    maxWidth: '50px',
    margin: '8px 0 10px 0'
  },
  degree: {
    paddingTop: '10px'
  }
}));

function Favorites() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { favoriteCities, fetchingFavorites } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    async function fetchData() {
      var favorites = [];
      favorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
      if (favorites) {
        await dispatch(getCurrentFavorites(favorites));
      } else {
      }
    }
    fetchData();
  }, [dispatch]);

  const handleFavorite = (cityname, locationkey) => {
    let search = window.btoa(`city=${cityname}&location=${locationkey}`);
    window.location.replace(`/?${search}`);
  };

  return (
    <div className={classes.root}>
      {fetchingFavorites ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <CircularProgress />
        </div>
      ) : favoriteCities && favoriteCities.error ? (
        <div>error</div>
      ) : favoriteCities && favoriteCities.length ? (
        <Grid container justify="center" alignItems="center" spacing={2}>
          {favoriteCities.map((favorite, i) => {
            return (
              <Grid
                item
                key={i}
                xs={12}
                md={3}
                onClick={() =>
                  handleFavorite(favorite.cityName, favorite.locationKey)
                }
              >
                <Card id={favorite.locationKey} className={classes.cardWrapper}>
                  <CardHeader
                    title={favorite.cityName}
                    className={classes.cardHeader}
                  />
                  <CardContent className={classes.cardContent}>
                    <div className={classes.elementPadding}>
                      {favorite.data[0].WeatherText}
                    </div>
                    {favorite.data[0].IsDayTime ? (
                      <img
                        className={classes.img}
                        src={dayIcons(favorite.data[0].WeatherText)}
                        alt="condition"
                      />
                    ) : (
                      <img
                      className={classes.img}
                        src={nightIcons(favorite.data[0].WeatherText)}
                        alt="condition"
                      />
                    )}
                    <div className={classes.degree}>
                      {favorite.data[0].Temperature.Metric.Value}&#176;{" "}
                      {favorite.data[0].Temperature.Metric.Unit}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Card className={classes.cardNocontent}>
          <Typography gutterBottom variant="h5">
            No Favorites Yet
          </Typography>
          <FavoriteIcon className={classes.icon} />
          <NavLink exact to="/" className={classes.link}>
            Let's get them!
          </NavLink>
        </Card>
      )}
    </div>
  );
}

export default Favorites;
