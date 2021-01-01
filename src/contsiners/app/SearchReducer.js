const initState = {
  city: null,
  fetching: false,
  conditions: null
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
    default:
      break;
  }
  return state;
};

export default searchReducer;
