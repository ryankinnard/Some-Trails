export function findDistanceToTrail(trail, coordinates) {
  const distance = latLonDistance(trail, coordinates);
  return distance;
}

function latLonDistance(trail, coordinate) {
  var radTrailLat = (Math.PI * trail.latitude) / 180;
  var radZipLat = (Math.PI * coordinate.latitude) / 180;
  var radLongDiff = (Math.PI * (trail.longitude - coordinate.longitude)) / 180;
  var dist =
    Math.sin(radTrailLat) * Math.sin(radZipLat) +
    Math.cos(radTrailLat) * Math.cos(radZipLat) * Math.cos(radLongDiff);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}
