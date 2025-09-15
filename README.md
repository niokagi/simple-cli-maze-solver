# Simple CLI Maze Solver & Generator

A lightweight, command-line application built with Node.js for generating and solving text-based mazes. This project serves as an academic demonstration of graph traversal algorithms, procedural generation, and modern JavaScript (ESM) development practices, including a modular architecture and unit testing with Jest.
<br>

---

## Theoretical Foundation & Core Algorithm
The logical core of this project's solver is a direct application of Depth-First Search (DFS), a classic and fundamental algorithm for traversing tree or graph data structures. The maze itself is treated as a graph, where each open cell is a node and each possible move (up, down, left, right) to an adjacent open cell represents an edge.

The DFS strategy operates on a "last-in, first-out" principle, exploring as far as possible along each branch before backtracking. Imagine a logical explorer traversing a cave system: they will follow a single passage to its very end. If it leads to the destination, the search is complete. If it is a dead end, they backtrack to the previous junction and explore the next available, unvisited passage.

In this implementation, the process is handled via recursion, which leverages the call stack to manage the path history implicitly. To prevent infinite loops in mazes with cycles and to avoid redundant exploration, a seen matrix is maintained to keep track of every visited cell. This robust and efficient approach forms the backbone of the solver's functionality.

## Features

- **Procedural Maze Generation**: Creates complex and solvable mazes using a Recursive Backtracking algorithm.
- **Efficient Maze Solving**: Implements a Depth-First Search (DFS) algorithm to find a path from start to end.
- **Command-Line Interface**: All functionalities are accessible and configurable through a clean CLI.
<!-- - **Modular Architecture**: The codebase is logically separated into modules for solving, generation, and utilities, promoting maintainability and testability. -->
- **Unit Tested**: Core logic for both the solver and generator is validated with unit tests using Jest.
- **Customizable Dimensions**: Generate mazes of any specified width and height.


## Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- [npm](https://www.npmjs.com/) (typically included with Node.js)

## Installation

1.  Clone the repository to your local machine:

    ```bash
    git clone https://github.com/niokagi/simple-cli-maze-solver.git
    cd simple-cli-maze-solver
    ```

2.  Install project dependencies:
    ```bash
    npm install
    ```

## Usage

All commands should be run from the root directory of the project. The table below summarizes the available scripts.

| Command            | Description                                                            | Arguments & Options                                                                     | Example                      |
| :----------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :--------------------------- |
| `npm run generate` | Generates a new, solvable maze and saves it to the `/mazes` directory. | **`-- <width> <height>`** (optional)<br>_Defines custom dimensions. Defaults to 21x11._ | `npm run generate -- 35 15`  |
| `npm run start`    | Solves an existing maze file and prints the solution to the console.   | **`-- <filename.txt>`** (required)<br>_Name of the file in the `/mazes` directory._     | `npm run start -- maze1.txt` |
| `npm test`         | Runs the full suite of unit tests for both the solver and generator.   | _None_                                                                                  | `npm test`                   |

<br>

_Note: For the `generate` command, dimensions will be automatically adjusted to the nearest odd number to ensure proper corridor formation._

## References

The foundational principles of Depth-First Search as a method for traversing mazes can be attributed to the 19th-century French mathematician Charles Pierre Trémaux. His work on Trémaux's algorithm established a formal, guaranteed method for finding a way out of any maze. While the modern computer science formalization of DFS was developed later, his algorithm is a direct and significant precursor.
