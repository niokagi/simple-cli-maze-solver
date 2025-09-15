import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadMaze = (filename) => {
  const filePath = path.join(__dirname, "..", "mazes", filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return fileContent.split("\n").map((row) => row.split(""));
};

const findChar = (maze, char) => {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === char) {
        return { x, y };
      }
    }
  }
  return null;
};

export { loadMaze, findChar };
