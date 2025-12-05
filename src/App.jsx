import { useState, useEffect } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import GameModeSelector from "./components/GameModeSelector";
import SpaceLogo from "./components/SpaceLogo";
import {
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from "./winning-combinations";
import { getComputerMove } from "./ai-helper";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const [gameMode, setGameMode] = useState("multiplayer");

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  // Computer move logic
  useEffect(() => {
    if (
      gameMode !== "multiplayer" &&
      activePlayer === "O" &&
      !winner &&
      !hasDraw
    ) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(gameBoard, gameMode);
        if (computerMove) {
          handleSelectSquare(computerMove.row, computerMove.col);
        }
      }, 500); // Small delay for better UX

      return () => clearTimeout(timer);
    }
  }, [activePlayer, gameMode, winner, hasDraw]);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  function handleGameModeChange(mode) {
    setGameMode(mode);
    setGameTurns([]);
    if (mode !== "multiplayer") {
      setPlayers({
        X: "Player 1",
        O: "Computer",
      });
    } else {
      setPlayers(PLAYERS);
    }
  }

  return (
    <>
      <header>
        <SpaceLogo />
        <h1 data-text="Cosmic Tic-Tac-Toe">Cosmic Tic-Tac-Toe</h1>
      </header>
      <main>
        <div id="game-container">
          <GameModeSelector
            onSelectMode={handleGameModeChange}
            currentMode={gameMode}
          />
          <ol id="players" className="highlight-player">
            <Player
              initialName={players.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initialName={players.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
              isComputer={gameMode !== "multiplayer"}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
