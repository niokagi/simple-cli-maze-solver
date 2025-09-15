import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WALL = "#";
const PATH = " ";
const DIRS = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// designing
const carve = (cx, cy, grid) => {
  const directions = shuffle([...DIRS]);
  for (const [dx, dy] of directions) {
    const nx = cx + dx * 2;
    const ny = cy + dy * 2;

    if (
      ny > 0 &&
      ny < grid.length - 1 &&
      nx > 0 &&
      nx < grid[0].length - 1 &&
      grid[ny][nx] === WALL
    ) {
      grid[cy + dy][cx + dx] = PATH;
      grid[ny][nx] = PATH;
      carve(nx, ny, grid);
    }
  }
};

const generateMaze = (width, height) => {
  const w = width % 2 === 0 ? width + 1 : width;
  const h = height % 2 === 0 ? height + 1 : height;
  const grid = Array(h)
    .fill(null)
    .map(() => Array(w).fill(WALL));

  const startX = 1;
  const startY = 1;
  grid[startY][startX] = PATH;
  carve(startX, startY, grid);
  grid[1][1] = "S";
  grid[h - 2][w - 2] = "E";

  return grid.map((row) => row.join("")).join("\n");
};

const main = () => {
  const width = parseInt(process.argv[2]) || 21;
  const height = parseInt(process.argv[3]) || 11;
  console.log(`Creating a maze with size ${width}x${height}...`);
  const mazeContent = generateMaze(width, height);

  const mazesDir = path.join(__dirname, "..", "mazes");
  if (!fs.existsSync(mazesDir)) {
    fs.mkdirSync(mazesDir);
  }
  const existingMazes = fs
    .readdirSync(mazesDir)
    .filter((file) => file.startsWith("maze") && file.endsWith(".txt"))
    .map((file) => parseInt(file.replace("maze", "").replace(".txt", "")))
    .filter((num) => !isNaN(num));

  const nextMazeNumber =
    existingMazes.length > 0 ? Math.max(...existingMazes) + 1 : 1;
  const newFileName = `maze${nextMazeNumber}.txt`;
  const filePath = path.join(mazesDir, newFileName);

  fs.writeFileSync(filePath, mazeContent);
  console.log(`A new maze has been created: mazes/${newFileName}`);
  console.log(mazeContent);
};

main();

export { generateMaze };
