import axios from "axios";
import key from "../../utils/api-key";

export const getGeoposition = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_GEOPOSITION_START" });

      // const payload = await axios.get(
      //   `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=32.109333%2C34.855499&language=en&details=false&toplevel=false`
      //    );

      const payload = "";

      dispatch({
        type: "GET_GEOPOSITION",
        payload: payload,
      });
    } catch (error) {
      dispatch({ type: "GET_GEOPOSITION_FAILURE", payload: { error: error } });
      throw error;
    }
  };
};

export const getCityLocation = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_LOCATION_AUTOCOMPLETE_START" });

      const payload = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${data}&language=en`
      );

      dispatch({
        type: "GET_LOCATION_AUTOCOMPLETE",
        payload: payload.data,
      });
    } catch (error) {
      dispatch({
        type: "GET_LOCATION_AUTOCOMPLETE_FAILURE",
        payload: { error: error },
      });
      throw error;
    }
  };
};

export const getCurrentConditions = (locationKey) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_CURRENT_CONDITIONS_START" });

      const payload = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}&language=en&details=false&metric=true`
      );

      dispatch({
        type: "GET_CURRENT_CONDITIONS",
        payload: payload.data,
      });
    } catch (error) {
      dispatch({
        type: "GET_CURRENT_CONDITIONS_FAILURE",
        payload: { error: error },
      });
      throw error;
    }
  };
};

export const getDaylyForecasts = (locationKey, unit) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_DAYLY_FORECASTS_START" });
      let metric = false;
      if (unit === "Metric") {
        metric = true;
      }

      const payload = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${key}&language=en&details=false&metric=${metric}`
      );

      dispatch({
        type: "GET_DAYLY_FORECASTS",
        payload: payload.data,
      });
    } catch (error) {
      dispatch({
        type: "GET_DAYLY_FORECASTS_FAILURE",
        payload: { error: error },
      });
      throw error;
    }
  };
};

export const getCurrentFavorites = (favoriteList) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_CURRENT_FAVORITES_START" });

      let favorites = [];
      for (let i in favoriteList) {
        let favorite = await axios.get(
          `https://dataservice.accuweather.com/currentconditions/v1/${favoriteList[i].locationKey}?apikey=${key}&language=en&details=false&metric=true`
        );
        favorite.cityName = favoriteList[i].chosenCity;
        favorite.locationKey = favoriteList[i].locationKey;
        favorites.push(favorite);
      }
      const payload = favorites;

      dispatch({
        type: "GET_CURRENT_FAVORITES",
        payload: payload,
      });
    } catch (error) {
      dispatch({
        type: "GET_CURRENT_FAVORITES_FAILURE",
        payload: { error: error },
      });
      throw error;
    }
  };
};
