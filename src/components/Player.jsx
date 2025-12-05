import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName, isComputer }) {
    const [name, setName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((prev) => !prev);
        
        if (isEditing) {
            onChangeName(symbol, name);
        }
    }
    
    function handleChange(event) {
        setName(event.target.value);
    }

    let playerName = <span className="player-name">{name}</span>;
    if (isEditing) {
        playerName = <input className="player-name" required value={name} onChange={handleChange} />;
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            {!isComputer && <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>}
        </li>
    );
}