import { PlateauFactory } from "../factories/plateau-factory";
import { RoverFactory } from "../factories/rover-factory";
import type { Instruction, Position } from "../models/rover";
import { MovementService } from "../services/movement-service";

export class RoverHelper {

  execute(upperRightCoordinatesString: string, landingPositionString: string, instructionsString: string): { positionHistory: Position[], lastPosition: Position, upperRightCoordinates: { x: number, y: number } } {
    const plateau = this.createPlateau(upperRightCoordinatesString);
    const instructions = this.createInstructions(instructionsString);
    const landingPosition = this.createLandingPosition(landingPositionString);
    const rover = this.createRover(landingPosition as Position, instructions as Instruction[]);
    const movementService = new MovementService();
    const result = movementService.execute(plateau, rover);

    return {
      positionHistory: result.positionHistory,
      lastPosition: result.positionHistory[result.positionHistory.length - 1],
      upperRightCoordinates: plateau.upperRightCoordinates,
    };
  }

  createPlateau(upperRightCoordinatesString: string) {
    const upperRightCoordinates = this.parseCoordinates(upperRightCoordinatesString);
    const plateau = PlateauFactory.create({ x: 0, y: 0 }, upperRightCoordinates);

    return plateau;
  }

  parseCoordinates(coordinatesString: string) {
    const coordinates = coordinatesString.trim().split(",");
    const x = parseInt(coordinates[0]);
    const y = parseInt(coordinates[1]);

    return { x, y };
  }

  createInstructions(instructionsString: string) {
    const instructions = instructionsString.trim().split("");

    return instructions;
  }

  createLandingPosition(landingPositionString: string) {
    const landingPosition = landingPositionString.trim().split(" ");
    const x = parseInt(landingPosition[0]);
    const y = parseInt(landingPosition[1]);
    const orientation = landingPosition[2];
  
    return { x, y, orientation };
  }

  createRover(landingPosition: Position, instructions: Instruction[]) {
    const rover = RoverFactory.create(landingPosition, instructions);

    return rover;
  }
}