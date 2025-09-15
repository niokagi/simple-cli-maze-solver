const DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// walk logic
const walk = (maze, wall, curr, end, seen, path) => {
  if (
    curr.x < 0 ||
    curr.x >= maze[0].length ||
    curr.y < 0 ||
    curr.y >= maze.length
  ) {
    return false;
  }
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }
  if (seen[curr.y][curr.x]) {
    return false;
  }
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    return true;
  }

  seen[curr.y][curr.x] = true;
  path.push(curr);

  for (let i = 0; i < DIRS.length; i++) {
    const [dx, dy] = DIRS[i];
    const next = { x: curr.x + dx, y: curr.y + dy };
    if (walk(maze, wall, next, end, seen, path)) {
      return true;
    }
  }
  path.pop();
  return false;
};

const solve = (maze, wall, start, end) => {
  const seen = Array(maze.length)
    .fill(0)
    .map(() => Array(maze[0].length).fill(false));
  const path = [];
  const hasSolution = walk(maze, wall, start, end, seen, path);
  return hasSolution ? path : null;
}

export { solve };
