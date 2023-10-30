
import { RoverFactory } from "../../src/factories/rover-factory";
import { Instruction, Orientation } from "../../src/models/rover";

describe("RoverFactory", () => {
    it("should create a rover with the correct position and orientation", () => {
        // Arrange
        const landingPosition = { x: 1, y: 2, orientation: "N" as Orientation };
        const instructions = ["L", "M", "L", "M", "L", "M", "L", "M", "M"];

        // Act
        const rover = RoverFactory.create(landingPosition, instructions as Instruction[]);

        // Assert
        expect(rover).toEqual({
            landingPosition: { x: 1, y: 2, orientation: "N" },
            instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
            positionHistory: []
        });
    });
})