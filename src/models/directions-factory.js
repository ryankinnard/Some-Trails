export class DirectionsFactory {
  /**
   * Create a link for directions by creating one of the following formats:
   *
   * Degrees, minutes, and seconds (DMS): 41°24'12.2"N 2°10'26.5"E
   * Degrees and decimal minutes (DMM): 41 24.2028, 2 10.4418
   * Decimal degrees (DD): 41.40338, 2.17403
   *
   * @param {Coordinate} coordinate
   */
  static createGoogleDirectionLink(coordinate) {
    return `https://www.google.com/maps/place/${coordinate.toDecimalDegrees()}`;
  }
}
