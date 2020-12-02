export function findDistanceToTrail(trail, coordinate) {
  var radlat1 = (Math.PI * trail.latitude) / 180;
  var radlat2 = (Math.PI * coordinate.lat) / 180;
  var theta = trail.longitude - coordinate.lng;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}
