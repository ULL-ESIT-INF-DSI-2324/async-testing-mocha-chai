import * as request from 'request';

/**
 * Obtains weather information from weatherstack API
 * based on a particular location provided
 * @param location The location for which weather data is going to be fetched
 * @param callback A callback based on two arguments:
 * The first one is an error string, which is provided in case any error arises.
 * The second one is a request.Response object, which is provided if no error
 * arises.
 */
export const weatherInfo = (location: string, callback: (
  err: string | undefined, data: request.Response | undefined) => void) => {
  const url = `http://api.weatherstack.com/current?access_key=0a7b0390060e7ffc6c0f36c71bb96b6a&query=${encodeURIComponent(location)}&units=m`;

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback(`Weatherstack API is not available: ${error.message}`,
          undefined);
    } else if (response.body.error) {
      callback(`Weatherstack API error: ${response.body.error.type}`,
          undefined);
    } else {
      callback(undefined, response);
    }
  });
};

/**
 * Obtains geocoding information from mapbox API
 * based on a particular location provided
 * @param location The location for which geocoding data is going to be fetched
 * @param callback A callback based on two arguments:
 * The first one is an error string, which is provided in case any error arises.
 * The second one is a request.Response object, which is provided if no error
 * arises.
 */
export const coordinatesInfo = (location: string, callback:(
  err: string | undefined, data: request.Response | undefined) => void) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiZWR1c2VncmUiLCJhIjoiY2tvNDNjb3hmMWY4azJ1azQ3ZDlwaXozaCJ9.ycsJoGhxGtjZFrIzNt5LZA&limit=1`;

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback(`Mapbox API is not available: ${error.message}`, undefined);
    } else if (response.body.features.length === 0) {
      callback(`Mapbox API error: no location found`, undefined);
    } else {
      callback(undefined, response);
    }
  });
};
