import type { Coordinate, Plateau } from "../models/plateau";

export class PlateauFactory {
    static create(lowerLeftCoordinates: Coordinate, upperRightCoordinates: Coordinate): Plateau {
        const grid = [];
        for (let x = lowerLeftCoordinates.x; x <= upperRightCoordinates.x; x++) {
            for (let y = lowerLeftCoordinates.y; y <= upperRightCoordinates.y; y++) {
                grid.push({ x, y });
            }
        }

        return {
            lowerLeftCoordinates: lowerLeftCoordinates,
            upperRightCoordinates: upperRightCoordinates,
            grid: grid
        };
    }
}