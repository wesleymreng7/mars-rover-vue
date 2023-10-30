export interface Plateau {
  lowerLeftCoordinates: Coordinate;
  upperRightCoordinates: Coordinate;
  grid: Array<Coordinate>;
}

export interface Coordinate {
  x: number;
  y: number;
}