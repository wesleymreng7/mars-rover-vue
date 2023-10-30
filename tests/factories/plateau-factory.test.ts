import { PlateauFactory } from "../../src/factories/plateau-factory";

describe("PlateauFactory", () => {
    it("should create a plateau with the correct grid", () => {
        // Arrange
        const lowerLeftCoordinates = { x: 0, y: 0 };
        const upperRightCoordinates = { x: 1, y: 1 };

        // Act
        const plateau = PlateauFactory.create(lowerLeftCoordinates, upperRightCoordinates);

        // Assert
        expect(plateau.grid).toEqual([
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
        ]);
    });
})