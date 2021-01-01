import React, { useState, useEffect } from "react";
import AutoComplete from "../../components/auto-complete/AutoComplete";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getCityLocation, getCurrentConditions } from "./SearchActions";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  CircularProgress,
  Card,
  CardHeader,
  Typography,
  Divider,
} from "@material-ui/core";
import { Days } from "../../utils/map";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import thermometer from "../../assets/images/thermometer.svg";
import Brightness3Icon from "@material-ui/icons/Brightness3";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      padding: "10px",
    },
  },
  autoComplete: {
    maxWidth: "400px",
    margin: "auto",
    display: "table",
  },
  listWrapper: {
    width: "300px",
    padding: "0",
    background: "#fff",
    border: "0.5px solid rgba(0,0,0,.3)",
    borderRadius: "4px",
    position: "absolute",
    maxHeight: "400px",
    overflow: "auto",
    "& :last-child": {
      borderBottom: "none",
    },
  },
  listItem: {
    borderBottom: "1px solid rgba(0,0,0,.2)",
  },
  progress: {
    width: "20px !important",
    height: "20px !important",
  },
  cardWrapper: {
    padding: "15px",
  },
}));

function Search() {
  //   var a = [];
  //   a.push(JSON.parse(localStorage.getItem("session")));
  //   localStorage.setItem("session", JSON.stringify(a));
  const classes = useStyles();
  const dispatch = useDispatch();
  const { city, fetching, conditions } = useSelector((state) => state.search);
  const [defaultCity, setDefaultCity] = useState("Tel Aviv");
  const [locationKey, setLocationKey] = useState("215854"); //To Do - tel aviv location key
  const [chosenCity, setChosenCity] = useState("Tel Aviv");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getCurrentConditions(locationKey));
    }
    fetchData();
    var a = [];
    a = JSON.parse(localStorage.getItem("session")) || [];
    if(a.includes(locationKey)){
        setFavorite(true)
    }
  }, [dispatch]);

  const toggleFavorite = () => {
    var a = [];
    a = JSON.parse(localStorage.getItem("session")) || [];
    setFavorite(!favorite);
    if (!favorite) {
      if(!a.includes(locationKey)){
        a.push(locationKey);
        localStorage.setItem("session", JSON.stringify(a));
      }
    }else if(favorite){
        if(a.includes(locationKey)){
            let index = a.indexOf(locationKey);
            a = a.splice(1, index);
            localStorage.setItem("session", JSON.stringify(a));
        }
    }
  };

  const handleChange = async (e) => {
    console.log(e.target.value);
    setDefaultCity(e.target.value);
    await dispatch(getCityLocation(e.target.value));
  };

  const handleListItemClick = async (item, locationKey) => {
    console.log(item);
    setDefaultCity(item);
    setChosenCity(item);
    setLocationKey(locationKey);
    await dispatch(getCityLocation(""));
    await dispatch(getCurrentConditions(locationKey));
  };

  return (
    <div className={classes.root}>
      <div className={classes.autoComplete}>
        <AutoComplete handleChange={handleChange} defaultCity={defaultCity} />

        {city && city.data && city.data.length > 0 && (
          <List className={classes.listWrapper}>
            {city.data.map((cityName, i) => {
              return (
                <ListItem
                  button
                  key={i}
                  onClick={() =>
                    handleListItemClick(cityName.LocalizedName, cityName.Key)
                  }
                  className={classes.listItem}
                >
                  <ListItemText primary={cityName.LocalizedName} />
                </ListItem>
              );
            })}
          </List>
        )}
      </div>

      {fetching && <CircularProgress />}
      {conditions && (
        <div style={{ marginTop: "100px" }}>
          <Card className={classes.cardWrapper}>
            <div style={{ display: "flex" }}>
              <Typography variant="h6" gutterBottom>
                {chosenCity}
              </Typography>
              <Brightness3Icon />
            </div>

            <div style={{ display: "flex" }}>
              <img
                src={thermometer}
                alt="thermometer"
                style={{ maxWidth: "20px" }}
              />
              <Typography style={{ padding: "0 8px" }}>
                {conditions.data[0].Temperature.Metric.Value}&#176;{" "}
                {conditions.data[0].Temperature.Metric.Unit}
              </Typography>
            </div>

            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item>{conditions.data[0].WeatherText}</Grid>

              <div style={{ flexGrow: "1" }} />
              <Grid item>
                {!favorite ? (
                  <FavoriteBorderIcon
                    color="secondary"
                    onClick={() => toggleFavorite(conditions.data[0])}
                    style={{ fontSize: 30, cursor: "pointer" }}
                  />
                ) : (
                  <FavoriteIcon
                    color="secondary"
                    onClick={toggleFavorite}
                    style={{ fontSize: 30, cursor: "pointer" }}
                  />
                )}
              </Grid>
            </Grid>
            <Divider style={{ marginTop: "8px" }} />

            {conditions.DailyForecasts && (
              <Grid
                container
                justify="center"
                alignItems="center"
                spacing={2}
                style={{ padding: "20px" }}
              >
                {conditions.DailyForecasts.map((condition, i) => {
                  return (
                    <Grid item key={i} xs={12} sm={4} md={2} lg={2}>
                      <Card
                        style={{
                          padding: "10px 3px",
                          fontSize: "0.9rem",
                          textAlign: "center",
                        }}
                      >
                        <CardHeader
                          subheader={Days[i]}
                          style={{ padding: "7px 0" }}
                        />
                        <div>
                          Day:
                          {condition.Day.IconPhrase}
                        </div>
                        <div>
                          Night:
                          {condition.Night.IconPhrase}
                        </div>
                        <div>
                          {Math.round(condition.Temperature.Maximum.Value)}
                        </div>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default Search;
