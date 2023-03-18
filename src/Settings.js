import React, { useState } from 'react';

function Settings({ onSettingsChange, settings, setCustomGame }) {
    const [wordLength, setWordLength] = useState(settings.wordLength);
    const [moveLimit, setMoveLimit] = useState(settings.moveLimit);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomGame(wordLength, moveLimit);
    onSettingsChange({
      wordLength: parseInt(wordLength),
      moveLimit: parseInt(moveLimit),
    });
  };

  return (
    <div className="Settings">
        <form className="Settings" onSubmit={handleSubmit}>
            <h3>Game Settings</h3>
            <div>
                <label htmlFor="wordLength">Word Length:</label>
                <input
                type="number"
                id="wordLength"
                value={wordLength}
                min={3}
                max={12}
                onChange={(e) => setWordLength(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="moveLimit">Max moves:</label>
                <input
                type="number"
                id="moveLimit"
                value={moveLimit || ''}
                min={2}
                max={1000}
                onChange={(e) => setMoveLimit(e.target.value ? parseInt(e.target.value) : null)}
                />
            </div>
            {/* <button type='submit' onClick={setCustomGame(wordLength, moveLimit)}>Update Settings</button> */}
            <button type='submit'>Update Settings</button>
        </form>
    </div>
  );
}

export default Settings;
