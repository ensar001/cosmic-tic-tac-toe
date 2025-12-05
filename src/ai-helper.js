import { WINNING_COMBINATIONS } from "./winning-combinations";

// Easy: Random move
export function getEasyMove(gameBoard) {
  const availableMoves = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameBoard[row][col] === null) {
        availableMoves.push({ row, col });
      }
    }
  }
  if (availableMoves.length === 0) return null;
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Medium: Random with 50% chance to block or win
export function getMediumMove(gameBoard) {
  // 50% chance to play smart, 50% random
  if (Math.random() < 0.5) {
    return getEasyMove(gameBoard);
  }

  // Try to win first
  const winningMove = findWinningMove(gameBoard, "O");
  if (winningMove) return winningMove;

  // Try to block player
  const blockingMove = findWinningMove(gameBoard, "X");
  if (blockingMove) return blockingMove;

  // Otherwise random
  return getEasyMove(gameBoard);
}

// Helper function to find a winning move for a player
function findWinningMove(gameBoard, player) {
  for (const combination of WINNING_COMBINATIONS) {
    const positions = combination.map((pos) => ({
      ...pos,
      value: gameBoard[pos.row][pos.column],
    }));

    const playerCount = positions.filter((pos) => pos.value === player).length;
    const emptyCount = positions.filter((pos) => pos.value === null).length;

    if (playerCount === 2 && emptyCount === 1) {
      const emptyPos = positions.find((pos) => pos.value === null);
      return { row: emptyPos.row, col: emptyPos.column };
    }
  }
  return null;
}

// Impossible: Minimax algorithm
export function getImpossibleMove(gameBoard) {
  const bestMove = minimax(gameBoard, "O");
  return bestMove.move;
}

function minimax(board, player, depth = 0) {
  const winner = checkWinner(board);

  // Terminal states
  if (winner === "O") return { score: 10 - depth };
  if (winner === "X") return { score: depth - 10 };
  if (isBoardFull(board)) return { score: 0 };

  const moves = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = player;

        const result = minimax(
          newBoard,
          player === "O" ? "X" : "O",
          depth + 1
        );

        moves.push({
          move: { row, col },
          score: result.score,
        });
      }
    }
  }

  // Choose best move
  if (player === "O") {
    // Maximizing player
    return moves.reduce((best, move) =>
      move.score > best.score ? move : best
    );
  } else {
    // Minimizing player
    return moves.reduce((best, move) =>
      move.score < best.score ? move : best
    );
  }
}

function checkWinner(board) {
  for (const combination of WINNING_COMBINATIONS) {
    const first = board[combination[0].row][combination[0].column];
    const second = board[combination[1].row][combination[1].column];
    const third = board[combination[2].row][combination[2].column];

    if (first && first === second && first === third) {
      return first;
    }
  }
  return null;
}

function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell !== null));
}

export function getComputerMove(gameBoard, difficulty) {
  switch (difficulty) {
    case "easy":
      return getEasyMove(gameBoard);
    case "medium":
      return getMediumMove(gameBoard);
    case "impossible":
      return getImpossibleMove(gameBoard);
    default:
      return getEasyMove(gameBoard);
  }
}
