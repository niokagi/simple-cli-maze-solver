import { solve } from "../src/solver.js";

describe("Maze Solver", () => {
  it("should find a path in a solvable maze", () => {
    const solvableMaze = [
      ["S", " ", "#"],
      ["#", " ", "#"],
      ["#", " ", "E"],
    ];
    const start = { x: 0, y: 0 };
    const end = { x: 2, y: 2 };
    const wall = "#";
    const path = solve(solvableMaze, wall, start, end);

    expect(path).not.toBeNull();
    expect(path.length).toBeGreaterThan(0);
    expect(path[0]).toEqual(start);
    expect(path[path.length - 1]).toEqual(end);
  });

  it("should return null for an unsolvable maze", () => {
    const unsolvableMaze = [["S", "#", "E"]];
    const start = { x: 0, y: 0 };
    const end = { x: 2, y: 0 };
    const wall = "#";
    const path = solve(unsolvableMaze, wall, start, end);

    expect(path).toBeNull();
  });
});
