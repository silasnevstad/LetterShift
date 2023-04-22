import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MultiBackend.HTML5DragTransition,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: MultiBackend.TouchTransition,
    },
  ],
};

const LetterCard = ({ letter, index, onLetterSwap, onCardClick, clickedIndex, feedback, gameResult }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [opacity, setOpacity] = useState(1);

    const handleClick = () => {
      onCardClick(index);
    };
  
    const [, drag, preview] = useDrag(() => ({
      type: 'letter',
      item: { index },
      collect: (monitor) => {
        setIsDragging(monitor.isDragging());
        setOpacity(monitor.isDragging() ? 0.8 : 1);
      },
    }));
  
    const [, drop] = useDrop(() => ({
      accept: 'letter',
      drop: (item) => onLetterSwap(index, item.index),
      hover: (item) => {
        if (item.index !== index) {
          setIsOver(true);
        }
      },
      collect: (monitor) => {
        setIsOver(monitor.isOver() && monitor.getItem().index !== index);
      },
    }));

    const className = `letter-card ${feedback ? 'correct' : ''} ${
      isDragging ? 'dragging' : isOver ? 'hover' : ''
    } ${gameResult === 'win' ? 'win' : gameResult === 'lost' ? 'lost' : ''} ${
      clickedIndex === index ? 'clicked' : ''
    }`;

  
    return (
        <div
        ref={(node) => {
          drag(drop(node));
          preview(node);
        }}
        className={className}
        style={{ opacity }}
        onClick={handleClick}
      >
        {letter}
      </div>
    );
};
  

const WordDisplay = ({ word, feedback, onLetterSwap, decreaseMoveCounter }) => {
  const [isAnyDragging, setIsAnyDragging] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleLetterSwap = (index1, index2) => {
    onLetterSwap(index1, index2);
    decreaseMoveCounter();
    setIsAnyDragging(false);
  };

  const handleCardClick = (index) => {
    if (clickedIndex === null) {
      setClickedIndex(index);
    } else if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      handleLetterSwap(clickedIndex, index);
      setClickedIndex(null);
    }
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="word-display">
        {word.map((letter, index) => (
          <LetterCard
            key={index}
            letter={letter}
            index={index}
            feedback={feedback[index]}
            onLetterSwap={handleLetterSwap}
            onCardClick={handleCardClick}
            clickedIndex={clickedIndex}
            isAnyDragging={isAnyDragging}
          />
        ))}
      </div>
    </DndProvider>
  );
};


export default WordDisplay;