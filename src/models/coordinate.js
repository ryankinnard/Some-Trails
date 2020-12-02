export class Coordinate {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  toDecimalDegrees() {
    return `${this.latitude},${this.longitude}`;
  }
}
