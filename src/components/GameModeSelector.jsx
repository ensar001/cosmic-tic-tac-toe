export default function GameModeSelector({ onSelectMode, currentMode }) {
  return (
    <div id="game-mode">
      <h2>Select Game Mode</h2>
      <div className="mode-buttons">
        <button
          className={currentMode === "multiplayer" ? "active" : ""}
          onClick={() => onSelectMode("multiplayer")}
        >
          Multiplayer
        </button>
        <button
          className={currentMode === "easy" ? "active" : ""}
          onClick={() => onSelectMode("easy")}
        >
          vs Computer (Easy)
        </button>
        <button
          className={currentMode === "medium" ? "active" : ""}
          onClick={() => onSelectMode("medium")}
        >
          vs Computer (Medium)
        </button>
        <button
          className={currentMode === "impossible" ? "active" : ""}
          onClick={() => onSelectMode("impossible")}
        >
          vs Computer (Impossible)
        </button>
      </div>
    </div>
  );
}
