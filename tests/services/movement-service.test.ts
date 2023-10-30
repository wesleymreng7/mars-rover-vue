import { PlateauFactory } from "../../src/factories/plateau-factory";
import { RoverFactory } from "../../src/factories/rover-factory";
import { Instruction, Orientation, Position } from "../../src/models/rover";
import { MovementService } from "../../src/services/movement-service";

describe("MovementService", () => {
    it("should execute the correct instructions", () => {
        // Arrange
        const plateau = PlateauFactory.create({ x: 0, y: 0 }, { x: 5, y: 5 });
        const landingPosition = { x: 1, y: 2, orientation: "N" };
        const instructions = ["L", "M", "L", "M", "L", "M", "L", "M", "M"];
        const rover = RoverFactory.create(landingPosition as Position, instructions as Instruction[]);
        const movementService = new MovementService();

        // Act
        const result = movementService.execute(plateau, rover);

        // Assert
        expect(result).toEqual({
            landingPosition: { x: 1, y: 2, orientation: "N" },
            instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
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
        });
    });

    it("Should move forward correctly", () => {
        // Arrange
        const plateau = PlateauFactory.create({ x: 0, y: 0 }, { x: 5, y: 5 });
        const landingPosition = { x: 1, y: 2, orientation: "N" };
        const instructions = ["M"];
        const rover = RoverFactory.create(landingPosition as Position, instructions as Instruction[]);
        const movementService = new MovementService();

        // Act
        const result = movementService.execute(plateau, rover);

        // Assert
        expect(result).toEqual({
            landingPosition: { x: 1, y: 2, orientation: "N" },
            instructions: ["M"],
            positionHistory: [
                { x: 1, y: 2, orientation: "N" },
                { x: 1, y: 3, orientation: "N" },
            ],
        });
    });

    it("Should turn left correctly", () => {
        // Arrange
        const plateau = PlateauFactory.create({ x: 0, y: 0 }, { x: 5, y: 5 });
        const landingPosition = { x: 1, y: 2, orientation: "N" };
        const instructions = ["L"];
        const rover = RoverFactory.create(landingPosition as Position, instructions as Instruction[]);
        const movementService = new MovementService();

        // Act
        const result = movementService.execute(plateau, rover);

        // Assert
        expect(result).toEqual({
            landingPosition: { x: 1, y: 2, orientation: "N" },
            instructions: ["L"],
            positionHistory: [
                { x: 1, y: 2, orientation: "N" },
                { x: 1, y: 2, orientation: "W" },
            ],
        });
    });

    it("Should turn right correctly", () => {
        // Arrange
        const plateau = PlateauFactory.create({ x: 0, y: 0 }, { x: 5, y: 5 });
        const landingPosition = { x: 1, y: 2, orientation: "N" };
        const instructions = ["R"];
        const rover = RoverFactory.create(landingPosition as Position, instructions as Instruction[]);
        const movementService = new MovementService();

        // Act
        const result = movementService.execute(plateau, rover);

        // Assert
        expect(result).toEqual({
            landingPosition: { x: 1, y: 2, orientation: "N" },
            instructions: ["R"],
            positionHistory: [
                { x: 1, y: 2, orientation: "N" },
                { x: 1, y: 2, orientation: "E" },
            ],
        });
    });

    it("Should turn left from North to West correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "N" as Orientation };

        // Act
        const result = movementService.turnLeft(currentPosition);

        // Assert
        expect(result).toEqual({ x: 1, y: 2, orientation: "W" });
    });

    it("Should turn left from East to North correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "E" as Orientation };

        // Act
        const result = movementService.turnLeft(currentPosition);

        // Assert
        expect(result).toEqual({ x: 1, y: 2, orientation: "N" });
    });

    it("Should turn left from South to East correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "S" as Orientation };

        // Act
        const result = movementService.turnLeft(currentPosition);

        // Assert
        expect(result).toEqual({ x: 1, y: 2, orientation: "E" });
    });

    it("Should turn left from West to South correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "W" as Orientation };

        // Act
        const result = movementService.turnLeft(currentPosition);

        // Assert
        expect(result).toEqual({ x: 1, y: 2, orientation: "S" });
    });

    it("Should turn right from North to East correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "N" as Orientation };

        // Act
        const result = movementService.turnRight(currentPosition);

        // Assert
        expect(result).toEqual({ x: 1, y: 2, orientation: "E" });
    });

    it("Should turn right from East to South correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "E" as Orientation };

        // Act
        const result = movementService.turnRight(currentPosition);

        // Assert
        expect(result).toEqual({ x: 1, y: 2, orientation: "S" });
    });

    it("Should turn right from South to West correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "S" as Orientation };

        // Act
        const result = movementService.turnRight(currentPosition);

        // Assert
        expect(result).toEqual({ x: 1, y: 2, orientation: "W" });
    });

    it("Should turn right from West to North correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "W" as Orientation };

        // Act
        const result = movementService.turnRight(currentPosition);

        // Assert
        expect(result).toEqual({ x: 1, y: 2, orientation: "N" });
    });

    it("Should move forward from North correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "N" as Orientation };
        const plateau = PlateauFactory.create({ x: 0, y: 0 }, { x: 5, y: 5 });

        // Act
        const result = movementService.moveForward(currentPosition, plateau);

        // Assert
        expect(result).toEqual({ x: 1, y: 3, orientation: "N" });
    });

    it("Should move forward from East correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "E" as Orientation };
        const plateau = PlateauFactory.create({ x: 0, y: 0 }, { x: 5, y: 5 });

        // Act
        const result = movementService.moveForward(currentPosition, plateau);

        // Assert
        expect(result).toEqual({ x: 2, y: 2, orientation: "E" });
    });
    
    it("Should move forward from South correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "S" as Orientation };
        const plateau = PlateauFactory.create({ x: 0, y: 0 }, { x: 5, y: 5 });

        // Act
        const result = movementService.moveForward(currentPosition, plateau);

        // Assert
        expect(result).toEqual({ x: 1, y: 1, orientation: "S" });
    });

    it("Should move forward from West correctly", () => {
        // Arrange
        const movementService = new MovementService();
        const currentPosition = { x: 1, y: 2, orientation: "W" as Orientation };
        const plateau = PlateauFactory.create({ x: 0, y: 0 }, { x: 5, y: 5 });

        // Act
        const result = movementService.moveForward(currentPosition, plateau);

        // Assert
        expect(result).toEqual({ x: 0, y: 2, orientation: "W" });
    });

})