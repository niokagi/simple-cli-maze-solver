import { loadMaze, findChar } from "./src/maze.js";
import { solve } from "./src/solver.js";

const main = () => {
  const mazeFile = process.argv[2];
  if (!mazeFile) {
    console.error("Error: Please provide the name of the maze file.");
    console.log("Ex: node index.js maze1.txt");
    return;
  }
  console.log(`Trying to solve the maze: ${mazeFile}...\n`);

  const maze = loadMaze(mazeFile);
  const start = findChar(maze, "S");
  const end = findChar(maze, "E");
  const wall = "#";
  if (!start || !end) {
    console.error(
      "Error: The maze must have an 'S' (Start) and 'E' (End) point."
    );
    return;
  }
  console.log("Maze:");

  maze.forEach((row) => {
    console.log(row.join(""));
  });
  console.log("\n");

  const solutionPath = solve(maze, wall, start, end);
  if (solutionPath) {
    console.log("Solution found! (*):");
    const solvedMaze = maze.map((row) => [...row]);
    solutionPath.forEach((p) => {
      if (solvedMaze[p.y][p.x] === " ") {
        solvedMaze[p.y][p.x] = "*";
      }
    });
    solvedMaze.forEach((row) => console.log(row.join("")));
  } else {
    console.log("No solution was found :(");
  }
};

main();
