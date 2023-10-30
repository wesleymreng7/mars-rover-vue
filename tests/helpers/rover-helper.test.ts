import { Instruction, Position } from "../../src/models/rover";
import { RoverHelper } from "../../src/helpers/rover-helper";

describe("RoverHelper", () => {
    it("should execute the correct instructions", () => {
        // Arrange
        const roverHelper = new RoverHelper();
        const upperRightCoordinatesString = "5,5";
        const landingPositionString = "1 2 N";
        const instructionsString = "LMLMLMLMM";

        // Act
        const result = roverHelper.execute(upperRightCoordinatesString, landingPositionString, instructionsString);

        // Assert
        expect(result).toEqual({
            positionHistory: [
                { x: 1, y: 2, orientation: "N" },
                { x: 1, y: 2, orientation: "W" },
                { x: 0, y: 2, orientation: "W" },
                { x: 0, y: 2, orientation: "S" },
                { x: 0, y: 1, orientation: "S" },
                { x: 0, y: 1, orientation: "E" },
                { x: 1, y: 1, orientation: "E" },
                { x: 1, y: 1, orientation: "N" },
                { x: 1, y: 2, orientation: "N" },
                { x: 1, y: 3, orientation: "N" },
            ],
            lastPosition: { x: 1, y: 3, orientation: "N" },
            upperRightCoordinates: { x: 5, y: 5 },
        });
    });

    it('Should create a plateau correctly', () => {
        // Arrange
        const roverHelper = new RoverHelper();
        const upperRightCoordinatesString = "5,5";

        // Act
        const result = roverHelper.createPlateau(upperRightCoordinatesString);

        // Assert
        expect(result).toEqual({
            grid: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 },
                { x: 0, y: 4 },
                { x: 0, y: 5 },
                { x: 1, y: 0 },
                { x: 1, y: 1 },
                { x: 1, y: 2 },
                { x: 1, y: 3 },
                { x: 1, y: 4 },
                { x: 1, y: 5 },
                { x: 2, y: 0 },
                { x: 2, y: 1 },
                { x: 2, y: 2 },
                { x: 2, y: 3 },
                { x: 2, y: 4 },
                { x: 2, y: 5 },
                { x: 3, y: 0 },
                { x: 3, y: 1 },
                { x: 3, y: 2 },
                { x: 3, y: 3 },
                { x: 3, y: 4 },
                { x: 3, y: 5 },
                { x: 4, y: 0 },
                { x: 4, y: 1 },
                { x: 4, y: 2 },
                { x: 4, y: 3 },
                { x: 4, y: 4 },
                { x: 4, y: 5 },
                { x: 5, y: 0 },
                { x: 5, y: 1 },
                { x: 5, y: 2 },
                { x: 5, y: 3 },
                { x: 5, y: 4 },
                { x: 5, y: 5 },
            ],
            lowerLeftCoordinates: { x: result.lowerLeftCoordinates.x, y: result.lowerLeftCoordinates.y },
            upperRightCoordinates: { x: result.upperRightCoordinates.x, y: result.upperRightCoordinates.y },
        });
    });

    it('Should parse coordinates correctly', () => {
        // Arrange
        const roverHelper = new RoverHelper();
        const coordinatesString = "5,5";

        // Act
        const result = roverHelper.parseCoordinates(coordinatesString);

        // Assert
        expect(result).toEqual({ x: 5, y: 5 });
    });

    it('Should create instructions correctly', () => {
        // Arrange
        const roverHelper = new RoverHelper();
        const instructionsString = "LMLMLMLMM";

        // Act
        const result = roverHelper.createInstructions(instructionsString);

        // Assert
        expect(result).toEqual(["L", "M", "L", "M", "L", "M", "L", "M", "M"]);
    });

    it('Should create landing position correctly', () => {
        // Arrange
        const roverHelper = new RoverHelper();
        const landingPositionString = "1 2 N";

        // Act
        const result = roverHelper.createLandingPosition(landingPositionString);

        // Assert
        expect(result).toEqual({ x: 1, y: 2, orientation: "N" });
    });

    it('Should create a rover correctly', () => {
        // Arrange
        const roverHelper = new RoverHelper();
        const landingPosition = { x: 1, y: 2, orientation: "N" };
        const instructions = ["L", "M", "L", "M", "L", "M", "L", "M", "M"];

        // Act
        const result = roverHelper.createRover(landingPosition as Position, instructions as Instruction[]);

        // Assert
        expect(result).toEqual({
            landingPosition: { x: 1, y: 2, orientation: "N" },
            instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
            positionHistory: []
        });
    });

})