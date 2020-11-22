export function estimatedTime(trail) {
  // https://46climbs.com/trip-planning-estimating-long-hike-will-take/
  var time = trail.length / 2 + 0.5 * (trail.ascent / 1000);
  return time;
}
