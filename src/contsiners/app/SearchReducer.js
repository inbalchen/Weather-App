const initState = {
  city: null,
  fetchingConditions: false,
  conditions: null,
  forecasts: null,
  fetchingForecasts: false,
  favoriteCities: null,
  fetchingFavorites: false,
  geoPosition: null,
  fetchingGeo: false,
};

const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_LOCATION_AUTOCOMPLETE_START":
      state = { ...state };
      break;
    case "GET_LOCATION_AUTOCOMPLETE":
      state = { ...state, city: action.payload };
      break;
    case "GET_LOCATION_AUTOCOMPLETE_FAILURE":
      state = { ...state, city: action.payload };
      break;
    case "GET_CURRENT_CONDITIONS_START":
      state = { ...state, fetching: true };
      break;
    case "GET_CURRENT_CONDITIONS":
      state = { ...state, conditions: action.payload, fetching: false };
      break;
    case "GET_CURRENT_CONDITIONS_FAILURE":
      state = { ...state, conditions: action.payload, fetching: false };
      break;
    case "GET_DAYLY_FORECASTS_START":
      state = { ...state, fetchingForecasts: true };
      break;
    case "GET_DAYLY_FORECASTS":
      state = { ...state, forecasts: action.payload, fetchingForecasts: false };
      break;
    case "GET_DAYLY_FORECASTS_FAILURE":
      state = { ...state, forecasts: action.payload, fetchingForecasts: false };
      break;
    case "GET_CURRENT_FAVORITES_START":
      state = { ...state, fetchingFavorites: true };
      break;
    case "GET_CURRENT_FAVORITES":
      state = {
        ...state,
        favoriteCities: action.payload,
        fetchingFavorites: false,
      };
      break;
    case "GET_CURRENT_FAVORITES_FAILURE":
      state = {
        ...state,
        favoriteCities: action.payload,
        fetchingFavorites: false,
      };
      break;
    case "GET_GEOPOSITION_START":
      state = { ...state, fetchingGeo: true };
      break;
    case "GET_GEOPOSITION":
      state = { ...state, geoPosition: action.payload, fetchingGeo: false };
      break;
    case "GET_GEOPOSITION_FAILURE":
      state = { ...state, geoPosition: action.payload, fetchingGeo: false };
      break;
    default:
      break;
  }
  return state;
};

export default searchReducer;
