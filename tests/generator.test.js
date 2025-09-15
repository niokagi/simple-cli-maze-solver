import { generateMaze } from "../src/generator.js";
import { solve } from "../src/solver.js";

function findChar(mazeGrid, char) {
  for (let y = 0; y < mazeGrid.length; y++) {
    for (let x = 0; x < mazeGrid[y].length; x++) {
      if (mazeGrid[y][x] === char) {
        return { x, y };
      }
    }
  }
  return null;
}

describe("Maze Generator", () => {
  const width = 15;
  const height = 9;
  let mazeString;
  let mazeGrid;

  beforeAll(() => {
    mazeString = generateMaze(width, height);
    mazeGrid = mazeString.split("\n").map((row) => row.split(""));
  });

  it("should generate a maze with the correct (odd-adjusted) dimensions", () => {
    const expectedWidth = width % 2 === 0 ? width + 1 : width;
    const expectedHeight = height % 2 === 0 ? height + 1 : height;

    expect(mazeGrid.length).toBe(expectedHeight);
    expect(mazeGrid[0].length).toBe(expectedWidth);
  });

  it("should only contain valid characters (#, S, E, and space)", () => {
    const validCharsRegex = /^[#SE \n]+$/;
    expect(mazeString).toMatch(validCharsRegex);
  });

  it("should contain exactly one Start (S) and one End (E) point", () => {
    const sCount = (mazeString.match(/S/g) || []).length;
    const eCount = (mazeString.match(/E/g) || []).length;

    expect(sCount).toBe(1);
    expect(eCount).toBe(1);
  });

  it("should have solid walls on all borders", () => {
    const h = mazeGrid.length;
    const w = mazeGrid[0].length;

    const topRowIsWall = mazeGrid[0].every((char) => char === "#");
    const bottomRowIsWall = mazeGrid[h - 1].every((char) => char === "#");
    expect(topRowIsWall).toBe(true);
    expect(bottomRowIsWall).toBe(true);

    const sideWallsAreSolid = mazeGrid.every(
      (row) => row[0] === "#" && row[w - 1] === "#"
    );
    expect(sideWallsAreSolid).toBe(true);
  });

  it("should generate a solvable maze", () => {
    const start = findChar(mazeGrid, "S");
    const end = findChar(mazeGrid, "E");
    const wall = "#";
    const solution = solve(mazeGrid, wall, start, end);

    expect(start).not.toBeNull();
    expect(end).not.toBeNull();
    expect(solution).not.toBeNull();
    expect(solution.length).toBeGreaterThan(1);
  });
});
