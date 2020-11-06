export function findDistanceToTrail (trail, coordinates) {
    const distance = latLonDistance(trail.latitude, trail.longitude, coordinates)
    return distance
}


function latLonDistance(trailLat, trailLon, coordinate) {
    var radTrailLat = Math.PI * trailLat/180;
    var radZipLat = Math.PI * coordinate.latitude /180;
    var radLongDiff = Math.PI * (trailLon - coordinate.longitude)/180;
    var dist = Math.sin(radTrailLat) * Math.sin(radZipLat) + Math.cos(radTrailLat) * Math.cos(radZipLat) * Math.cos(radLongDiff);
    if (dist > 1) {
        dist = 1
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist
}