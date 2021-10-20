import React, { useState, useEffect, useCallback } from "react";
import AutoComplete from "../../components/auto-complete/AutoComplete";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getCityLocation,
  getCurrentConditions,
  getDaylyForecasts,
} from "./SearchActions";
import {
  CircularProgress,
  Typography,
  Snackbar,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Alert from "@material-ui/lab/Alert";
import errorIcon from "../../assets/images/sad.svg";
import Conditions from "../../components/conditions/Conditions";
import Forecasts from "../../components/forecasts/Forecasts";
import { NavLink } from "react-router-dom";
import { debounce } from "lodash";
import '../../assets/styles/index.scss'

const useStyles = makeStyles((props) => ({
  container: {
    height: '100%',
    display: "flex",
    padding: "20px",
    '@media (max-width: 768px)': {
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  },
  autoComplete: {
    maxWidth: "400px",
    display: "table",
  },
  progress: {
    width: "20px !important",
    height: "20px !important",
  },
  alert1: {
    justifyContent: "center",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  alert1Img: {
    maxWidth: "100px",
    margin: "20px 0 0 0",
  },
  leftPane: {
    padding: "10px",
    background: '#fff',
    borderRadius: '4px',
    boxShadow: "0px 2px 1px -1px rgb(0, 0, 0, 0.2), 0px 1px 1px 0px rgb(0, 0, 0, 0.14), 0px 1px 3px 0px rgb(0, 0, 0, 0.12)",
    maxHeight: "646px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media (max-width: 768px)': {
      marginBottom: '50px'
    },
    opacity: '0.7',
    maxWidth: '315px'
  },
  favLink: {
    color: 'rgba(0, 13, 129, 0.75)',
    fontSize: "16px",
    '&:hover': {
      fontSize: "18px"
    },
    height: 25
  }
}));

function Search() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    city,
    fetchingConditions,
    conditions,
    forecasts,
    fetchingForecasts,
  } = useSelector((state) => state.search);

  let cityName;
  let locKey;
  if (window.location.search) {
    let search = window.location.search.split("?");
    let params = window.atob(search[1]);
    params = params.split("&");
    cityName = params[0].replace("city=", "");
    locKey = params[1].replace("location=", "");
  }

  const [defaultCity, setDefaultCity] = useState(cityName || "Tel Aviv");
  const [locationKey, setLocationKey] = useState(locKey || "215854");
  const [chosenCity, setChosenCity] = useState(cityName || "Tel Aviv");
  const [favorite, setFavorite] = useState(false);

  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState("Metric");

  const changeUnit = async (unit) => {
    setUnit(unit);
    await dispatch(getDaylyForecasts(locationKey, unit));
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      await dispatch(getCurrentConditions(locationKey));
      await dispatch(getDaylyForecasts(locationKey, unit));
    }
    fetchData();
    var a = [];
    a = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    if (a) {
      for (let i in a) {
        if (a[i].locationKey === locationKey) {
          setFavorite(true);
        }
      }
    }
  }, [dispatch, locationKey, unit]);

  const toggleFavorite = () => {
    setFavorite(!favorite);
    var a = [];
    a = JSON.parse(localStorage.getItem("favoriteCities")) || [];

    if (favorite === false) {
      if (a.length) {
        let add = true;
        for (let i in a) {
          if (a[i].locationKey === locationKey) {
            add = false;
          }
        }
        if (add) {
          a.push({ locationKey: locationKey, chosenCity: chosenCity });
          setOpen(true);
        }
        localStorage.setItem("favoriteCities", JSON.stringify(a));
      } else {
        a.push({ locationKey: locationKey, chosenCity: chosenCity });
        localStorage.setItem("favoriteCities", JSON.stringify(a));
        setOpen(true);
      }
    } else if (favorite) {
      console.log(a);
      a = a.filter(function (obj) {
        return obj.locationKey !== locationKey;
      });
      console.log("new a", a);
      localStorage.setItem("favoriteCities", JSON.stringify(a));
    }
  };

  const handleChange = useCallback(debounce(async (e) => {
    console.log(e.target.value);
    setDefaultCity(e.target.value);
    await dispatch(getCityLocation(e.target.value));
  }, 500), []);

  const handleListItemClick = async (item, locationKey) => {
    setDefaultCity(item);
    setChosenCity(item);
    setLocationKey(locationKey);
    setFavorite(false);
    await dispatch(getCityLocation(""));
    await dispatch(getCurrentConditions(locationKey));
  };
  
  return (
    <div className={`${conditions && conditions.length ? classes.container + " " + conditions[0].WeatherText.toLowerCase().replace(' ', '-') : classes.container}`}>
      {fetchingConditions ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <CircularProgress />
        </div>
      ) :
      conditions && conditions.error ? (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
          <Alert
            severity="error"
            style={{
              justifyContent: "center",
              boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
            }}
          >
            Sorry! Could not find {chosenCity ? chosenCity : ""} current
            conditions
            <img
              src={errorIcon}
              alt="Error"
              style={{ maxWidth: "100px", margin: "20px 0 0 0" }}
            />
          </Alert>
        </div>
      ) : conditions && 
      <div className={classes.leftPane}>
        <div className={classes.autoComplete}>
          {city && city.error ? (
            <Alert severity="error" className={classes.alert1}>
              Service Unavailable
              <img src={errorIcon} alt="Error" className={classes.alert1Img} />
            </Alert>
          ) : (
            <AutoComplete
              handleChange={handleChange}
              defaultCity={defaultCity}
              city={city}
              handleListItemClick={handleListItemClick}
            />
          )}
        </div>
        { 
      
        <Conditions
          conditions={conditions}
          chosenCity={chosenCity}
          favorite={favorite}
          toggleFavorite={toggleFavorite}
          changeUnit={changeUnit}
          unit={unit}
        />
      }

      <NavLink exact className={classes.favLink} to="/favorites">
        Favorites
      </NavLink>
      </div>
    }


    {fetchingForecasts ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <CircularProgress />
        </div>
      ) : forecasts && forecasts.error ? (
        <div>
          <Alert severity="error">
            Sorry! Could not find {chosenCity ? chosenCity : ""}{" "}
            forecasts
          </Alert>
        </div>
      ) : (
        forecasts &&
        forecasts.DailyForecasts && (
          <Forecasts forecasts={forecasts} />
        )
      )}

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={
          <Typography style={{ display: "flex" }}>
            Added {chosenCity} To Favorites
            <FavoriteIcon color="secondary" style={{ margin: "0 6px" }} />
          </Typography>
        }
        key={"bottom_center"}
        autoHideDuration={3000}
      />
    </div>
  );
}

export default Search;
