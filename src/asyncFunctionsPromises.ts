import request from "request";

/**
 * Obtains weather information from weatherstack API
 * based on a particular location provided
 * @param location The location for which weather data is going to be fetched
 * @returns `Promise<request.Response>`
 */
export function weatherInfoPromises(location: string) {
  const url = `http://api.weatherstack.com/current?access_key=f39a707f65a076a5a190d3adba14c5a8&query=${encodeURIComponent(location)}&units=m`;
  return new Promise<request.Response>((resolve, reject) => {
    request(
      { url: url, json: true },
      (error: Error, response: request.Response) => {
        if (error) {
          reject(error.message);
        } else if (response.body.error) {
          reject(response.body.error.type);
        } else {
          resolve(response);
        }
      }
    );
  });
}
