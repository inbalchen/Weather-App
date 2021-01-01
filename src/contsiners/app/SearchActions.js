import axios from "axios";
import key from "../../utils/api-key";

export const getCityLocation = (data) => {
  return async (dispatch) => {
    try {

      dispatch({ type: "GET_LOCATION_AUTOCOMPLETE_START" });

      const payload = await axios.get(
           `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${data}&language=en`
         );

    //   const payload = data ? {data: [{Key: "224374",
    //   LocalizedName: "Yokohama-shi",
    //   Rank: 11,
    //   Type: "City",
    //   Version: 1,
    // }, {Key: "224374",
    // LocalizedName: "Yiyang",
    // Rank: 11,
    // Type: "City",
    // Version: 1,}, {Key: "224374",
    // LocalizedName: "Yulin",
    // Rank: 11,
    // Type: "City",
    // Version: 1,}, {Key: "224374",
    // LocalizedName: "Yangon",
    // Rank: 11,
    // Type: "City",
    // Version: 1,}]} : ''
      

      dispatch({
        type: "GET_LOCATION_AUTOCOMPLETE",
        payload: payload,
      });

    } catch (error) {
        dispatch({ type: "GET_LOCATION_AUTOCOMPLETE_FAILURE", payload: error });
        throw error;
    }

    
  };
};



export const getCurrentConditions = (locationKey) => {
  return async (dispatch) => {
    try {

      dispatch({ type: "GET_CURRENT_CONDITIONS_START" });

      // const payload = await axios.get(
      //      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}&language=en&details=false&metric=true`
      //    );



         const payload = {data: [
          {
            "LocalObservationDateTime": "2021-01-01T02:46:00+09:00",
            "EpochTime": 1609436760,
            "WeatherText": "Mostly cloudy",
            "WeatherIcon": 38,
            "HasPrecipitation": false,
            "PrecipitationType": null,
            "IsDayTime": false,
            "Temperature": {
              "Metric": {
                "Value": 3.1,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 38,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "MobileLink": "http://m.accuweather.com/en/jp/yokohama-shi/224374/current-weather/224374?lang=en-us",
            "Link": "http://www.accuweather.com/en/jp/yokohama-shi/224374/current-weather/224374?lang=en-us"
          }
        ]}

      // const payload = 
      // {
      //   "Headline": {
      //     "EffectiveDate": "2020-12-31T07:00:00+09:00",
      //     "EffectiveEpochDate": 1609365600,
      //     "Severity": 7,
      //     "Text": "Cool Thursday",
      //     "Category": "cold",
      //     "EndDate": "2020-12-31T19:00:00+09:00",
      //     "EndEpochDate": 1609408800,
      //     "MobileLink": "http://m.accuweather.com/en/jp/yokohama-shi/224374/extended-weather-forecast/224374?unit=c&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?unit=c&lang=en-us"
      //   },
      //   "DailyForecasts": [
      //     {
      //       "Date": "2020-12-31T07:00:00+09:00",
      //       "EpochDate": 1609365600,
      //       "Temperature": {
      //         "Minimum": {
      //           "Value": 3.3,
      //           "Unit": "C",
      //           "UnitType": 17
      //         },
      //         "Maximum": {
      //           "Value": 7.2,
      //           "Unit": "C",
      //           "UnitType": 17
      //         }
      //       },
      //       "Day": {
      //         "Icon": 2,
      //         "IconPhrase": "Mostly sunny",
      //         "HasPrecipitation": false
      //       },
      //       "Night": {
      //         "Icon": 34,
      //         "IconPhrase": "Mostly clear",
      //         "HasPrecipitation": false
      //       },
      //       "Sources": [
      //         "AccuWeather"
      //       ],
      //       "MobileLink": "http://m.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=1&unit=c&lang=en-us",
      //       "Link": "http://www.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=1&unit=c&lang=en-us"
      //     },
      //     {
      //       "Date": "2021-01-01T07:00:00+09:00",
      //       "EpochDate": 1609452000,
      //       "Temperature": {
      //         "Minimum": {
      //           "Value": 2.8,
      //           "Unit": "C",
      //           "UnitType": 17
      //         },
      //         "Maximum": {
      //           "Value": 9.4,
      //           "Unit": "C",
      //           "UnitType": 17
      //         }
      //       },
      //       "Day": {
      //         "Icon": 1,
      //         "IconPhrase": "Sunny",
      //         "HasPrecipitation": false
      //       },
      //       "Night": {
      //         "Icon": 33,
      //         "IconPhrase": "Clear",
      //         "HasPrecipitation": false
      //       },
      //       "Sources": [
      //         "AccuWeather"
      //       ],
      //       "MobileLink": "http://m.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=2&unit=c&lang=en-us",
      //       "Link": "http://www.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=2&unit=c&lang=en-us"
      //     },
      //     {
      //       "Date": "2021-01-02T07:00:00+09:00",
      //       "EpochDate": 1609538400,
      //       "Temperature": {
      //         "Minimum": {
      //           "Value": 3.1,
      //           "Unit": "C",
      //           "UnitType": 17
      //         },
      //         "Maximum": {
      //           "Value": 8.7,
      //           "Unit": "C",
      //           "UnitType": 17
      //         }
      //       },
      //       "Day": {
      //         "Icon": 3,
      //         "IconPhrase": "Partly sunny",
      //         "HasPrecipitation": false
      //       },
      //       "Night": {
      //         "Icon": 35,
      //         "IconPhrase": "Partly cloudy",
      //         "HasPrecipitation": false
      //       },
      //       "Sources": [
      //         "AccuWeather"
      //       ],
      //       "MobileLink": "http://m.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=3&unit=c&lang=en-us",
      //       "Link": "http://www.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=3&unit=c&lang=en-us"
      //     },
      //     {
      //       "Date": "2021-01-03T07:00:00+09:00",
      //       "EpochDate": 1609624800,
      //       "Temperature": {
      //         "Minimum": {
      //           "Value": 3.7,
      //           "Unit": "C",
      //           "UnitType": 17
      //         },
      //         "Maximum": {
      //           "Value": 7.7,
      //           "Unit": "C",
      //           "UnitType": 17
      //         }
      //       },
      //       "Day": {
      //         "Icon": 3,
      //         "IconPhrase": "Partly sunny",
      //         "HasPrecipitation": false
      //       },
      //       "Night": {
      //         "Icon": 35,
      //         "IconPhrase": "Partly cloudy",
      //         "HasPrecipitation": false
      //       },
      //       "Sources": [
      //         "AccuWeather"
      //       ],
      //       "MobileLink": "http://m.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=4&unit=c&lang=en-us",
      //       "Link": "http://www.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=4&unit=c&lang=en-us"
      //     },
      //     {
      //       "Date": "2021-01-04T07:00:00+09:00",
      //       "EpochDate": 1609711200,
      //       "Temperature": {
      //         "Minimum": {
      //           "Value": 5.1,
      //           "Unit": "C",
      //           "UnitType": 17
      //         },
      //         "Maximum": {
      //           "Value": 9.8,
      //           "Unit": "C",
      //           "UnitType": 17
      //         }
      //       },
      //       "Day": {
      //         "Icon": 3,
      //         "IconPhrase": "Partly sunny",
      //         "HasPrecipitation": false
      //       },
      //       "Night": {
      //         "Icon": 35,
      //         "IconPhrase": "Partly cloudy",
      //         "HasPrecipitation": false
      //       },
      //       "Sources": [
      //         "AccuWeather"
      //       ],
      //       "MobileLink": "http://m.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=5&unit=c&lang=en-us",
      //       "Link": "http://www.accuweather.com/en/jp/yokohama-shi/224374/daily-weather-forecast/224374?day=5&unit=c&lang=en-us"
      //     }
      //   ]
      // }
  
      

      dispatch({
        type: "GET_CURRENT_CONDITIONS",
        payload: payload,
      });

    } catch (error) {
        dispatch({ type: "GET_CURRENT_CONDITIONS_FAILURE", payload: error });
        throw error;
    }

    
  };
};
