import axios from 'axios';

export function ziptoLatLon(zip, options = {}) {
  options.key = process.env.ZIP_PROJECT_KEY;
  options.location = zip;

  return axios
    .get(`http://www.mapquestapi.com/geocoding/v1/address`, {
      params: options,
    })
    .then(({ data }) => data?.results[0].locations[0].latLng ?? [])
    .catch((err) => {
      console.error(err);
      rs;
      return [];
    });
}
