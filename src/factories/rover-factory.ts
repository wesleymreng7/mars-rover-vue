import type { Instruction, Position, Rover } from "../models/rover";

export class RoverFactory {
    static create(landingPosition: Position, instruction: Instruction[]): Rover {
        return {
            landingPosition: landingPosition,
            instructions: instruction ?? [],
            positionHistory: []
        };
    }
}