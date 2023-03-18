import React, { useState, useEffect } from 'react';
import './App.css';
import WordDisplay from './WordDisplay';
import MoveCounter from './MoveCounter';
import Modal from './Modal';
import Settings from './Settings';
import nouns from './nouns.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';


const wordList = nouns.nouns;

const difficulties = {
  beginner: { wordLengths: [3, 4], remainingMoves: 7 },
  easy: { wordLengths: [4, 5], remainingMoves: 7 },
  medium: { wordLengths: [6, 7], remainingMoves: 7 },
  hard: { wordLengths: [8, 9], remainingMoves: 8 },
  advanced: { wordLengths: [10, 11], remainingMoves: 8 },
};

function App() {
  const [settings, setSettings] = useState({ wordLength: 4, moveLimit: 7 });
  const [showSettings, setShowSettings] = useState(false);
  const maxMoves = 7;

  const getRandomWord = (lengths) => {
    while (true) {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      if (lengths.includes(randomWord.length)) {
        return randomWord.toLowerCase();
      }
    }
  };

  const scrambleWord = (word) => {
    const wordArray = word.split('');
    let isSame = true;
  
    while (isSame) {
      for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        if (i !== j) {
          [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
      }
  
      isSame = wordArray.some((letter, index) => letter === word[index]);
  
      if (!isSame) {
        break;
      }
    }
  
    return wordArray.join('');
  };
  

  const [secretWord, setSecretWord] = useState(getRandomWord([4, 5]));
  const [scrambledWord, setScrambledWord] = useState(scrambleWord(secretWord));
  const [currentWord, setCurrentWord] = useState(scrambledWord.split(''));
  const [remainingMoves, setRemainingMoves] = useState(maxMoves);
  const [feedback, setFeedback] = useState(Array(secretWord.length).fill(false));
  const [gameResult, setGameResult] = useState(null);

  const handleLetterSwap = (index1, index2) => {
    // make sure remainingMoves is greater than 0
    if (remainingMoves > 0) {
      setCurrentWord((prevWord) => {
        const newWord = [...prevWord];
        [newWord[index1], newWord[index2]] = [newWord[index2], newWord[index1]];
        return newWord;
      });
      if (index1 !== index2) { // Prevents the move counter from decreasing when the same letter is clicked twice
        setRemainingMoves((prevMoves) => prevMoves - 1);
      }
    }
  };

  const checkAndUpdateFeedback = () => {
    const newFeedback = currentWord.map((letter, index) => letter === secretWord[index]);
    setFeedback(newFeedback);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const resetGame = (difficulty) => {
    const { wordLengths, remainingMoves } = difficulties[difficulty];
    const newSecretWord = getRandomWord(wordLengths);
    const newScrambledWord = scrambleWord(newSecretWord);
  
    setSecretWord(newSecretWord);
    setScrambledWord(newScrambledWord);
    setCurrentWord(newScrambledWord.split(''));
    setRemainingMoves(remainingMoves);
    setFeedback(Array(newSecretWord.length).fill(false));
    setGameResult(null);
  };

  const setCustomGame = (wordLength, moveLimit) => {
    const newSecretWord = getRandomWord([wordLength]);
    const newScrambledWord = scrambleWord(newSecretWord);

    console.log(newSecretWord);
    
    setSecretWord(newSecretWord);
    setScrambledWord(newScrambledWord);
    setCurrentWord(newScrambledWord.split(''));
    setRemainingMoves(moveLimit);
    setFeedback(Array(newSecretWord.length).fill(false));
    setGameResult(null);
    setShowSettings(false);
  };

  const revealWord = () => {
    setCurrentWord(secretWord.split(''));
  };

  useEffect(() => {
    checkAndUpdateFeedback();
  }, [currentWord]);

  useEffect(() => {
    if (remainingMoves <= 0) {
      revealWord();
      setGameResult('lost');
    } else if (feedback.every((correct) => correct)) {
      setGameResult('won');
    }
  }, [remainingMoves, feedback]);

  return (
    <div className="App">
      <h1> Letter Shift </h1>

      <WordDisplay
        word={currentWord}
        feedback={feedback}
        onLetterSwap={handleLetterSwap}
        gameResult={gameResult}
      />
      
      <br></br>

      {gameResult === null && <button onClick={revealWord} className="solve-btn"> Reveal Word </button>}

      {gameResult !== null && <div className="lost">
          <button onClick={() => { resetGame('beginner'); }}> Beginner </button>
          <button onClick={() => { resetGame('easy'); }}> Easy </button>
          <button onClick={() => { resetGame('medium'); }}> Meduim </button>
          <button onClick={() => { resetGame('hard'); }}> Hard </button>
          <button onClick={() => { resetGame('advanced'); }}> Advanced </button>
        </div>}
      
      <br></br>

      <MoveCounter remainingMoves={remainingMoves} />

      <button
      className="settings-toggle"
      onClick={() => setShowSettings(!showSettings)}
      title="Toggle settings">
        <FontAwesomeIcon icon={faCog} />
      </button>

      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)}>
        <Settings onSettingsChange={handleSettingsChange} settings={settings} setCustomGame={setCustomGame} />
      </Modal>
    </div>
  );
}

export default App;
