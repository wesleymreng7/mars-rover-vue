export interface Rover {
  landingPosition: Position;
  instructions: Instruction[];
  positionHistory: Position[];
}


export interface Position {
  x: number;
  y: number;
  orientation: Orientation;
}

export type Orientation = 'N' | 'E' | 'S' | 'W';
export type Instruction = 'L' | 'R' | 'M';