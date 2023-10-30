import type { Plateau } from "../models/plateau";
import type { Orientation, Instruction, Position, Rover } from "../models/rover";

export class MovementService {
  execute(plateau: Plateau, rover: Rover): Rover {
    const { landingPosition, instructions } = rover;
    let currentPosition = landingPosition;
    rover.positionHistory.push(currentPosition);

    instructions.forEach((instruction) => {
      currentPosition = this.move(currentPosition, instruction, plateau);
      rover.positionHistory.push(currentPosition);
    });

    return {
      landingPosition: landingPosition,
      instructions: instructions,
      positionHistory: rover.positionHistory,
    };
  }

  move(currentPosition: Position, instruction: Instruction, plateau: Plateau): Position {
    let newPosition = currentPosition;

    switch (instruction) {
      case 'L':
        newPosition = this.turnLeft(currentPosition);
        break;
      case 'R':
        newPosition = this.turnRight(currentPosition);
        break;
      case 'M':
        newPosition = this.moveForward(currentPosition, plateau);
        break;
      default:
        break;
    }

    return newPosition;
  }

  turnLeft(currentPosition: Position): Position {
    let newOrientation: Orientation = currentPosition.orientation;

    switch (currentPosition.orientation) {
      case 'N':
        newOrientation = 'W';
        break;
      case 'E':
        newOrientation = 'N';
        break;
      case 'S':
        newOrientation = 'E';
        break;
      case 'W':
        newOrientation = 'S';
        break;
      default:
        break;
    }

    return {
      x: currentPosition.x,
      y: currentPosition.y,
      orientation: newOrientation,
    };
  }

  turnRight(currentPosition: Position): Position {
    let newOrientation: Orientation = currentPosition.orientation;

    switch (currentPosition.orientation) {
      case 'N':
        newOrientation = 'E';
        break;
      case 'E':
        newOrientation = 'S';
        break;
      case 'S':
        newOrientation = 'W';
        break;
      case 'W':
        newOrientation = 'N';
        break;
      default:
        break;
    }
 
    return {
      x: currentPosition.x,
      y: currentPosition.y,
      orientation: newOrientation,
    };
  }

  moveForward(currentPosition: Position, plateau: Plateau): Position {
    let newPosition = currentPosition;

    switch (currentPosition.orientation) {
      case 'N':
        newPosition = this.moveNorth(currentPosition, plateau);
        break;
      case 'E':
        newPosition = this.moveEast(currentPosition, plateau);
        break;
      case 'S':
        newPosition = this.moveSouth(currentPosition, plateau);
        break;
      case 'W':
        newPosition = this.moveWest(currentPosition, plateau);
        break;
      default:
        break;
    }

    return newPosition;
  }

  moveNorth(currentPosition: Position, plateau: Plateau): Position {
    const { x, y } = currentPosition;
    const newPosition = { x, y: y + 1, orientation: currentPosition.orientation };

    return this.validatePosition(newPosition, plateau);
  }

  moveEast(currentPosition: Position, plateau: Plateau): Position {
    const { x, y } = currentPosition;
    const newPosition = { x: x + 1, y, orientation: currentPosition.orientation };

    return this.validatePosition(newPosition, plateau);
  }

  moveSouth(currentPosition: Position, plateau: Plateau): Position {
    const { x, y } = currentPosition;
    const newPosition = { x, y: y - 1, orientation: currentPosition.orientation };

    return this.validatePosition(newPosition, plateau);
  }

  moveWest(currentPosition: Position, plateau: Plateau): Position {
    const { x, y } = currentPosition;
    const newPosition = { x: x - 1, y, orientation: currentPosition.orientation };

    return this.validatePosition(newPosition, plateau);
  }

  validatePosition(newPosition: Position, plateau: Plateau): Position {
    const { x, y } = newPosition;
    const { lowerLeftCoordinates, upperRightCoordinates } = plateau;

    if (x < lowerLeftCoordinates.x) {
      throw new Error(`Rover can't move beyond the lower left coordinates of the plateau`);
    }

    if (x > upperRightCoordinates.x) {
      throw new Error(`Rover can't move beyond the upper right coordinates of the plateau`);
    }

    if (y < lowerLeftCoordinates.y) {
      throw new Error(`Rover can't move beyond the lower left coordinates of the plateau`);
    }

    if (y > upperRightCoordinates.y) {
      throw new Error(`Rover can't move beyond the upper right coordinates of the plateau`);
    }

    return newPosition;
  }
};