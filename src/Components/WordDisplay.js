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

const LetterCard = ({ letter, index, onLetterSwap, feedback, gameResult }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [opacity, setOpacity] = useState(1);
  
    const [, drag, preview] = useDrag(() => ({
      type: 'letter',
      item: { index },
      collect: (monitor) => {
        setIsDragging(monitor.isDragging());
        setOpacity(monitor.isDragging() ? 0.4 : 1);
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
  
    return (
        <div
        ref={(node) => {
          drag(drop(node));
          preview(node);
        }}
        className={`letter-card ${feedback ? 'correct' : ''} ${
          isDragging ? 'dragging' : isOver ? 'hover' : ''
        } ${gameResult === 'win' ? 'win' : gameResult === 'lost' ? 'lost' : ''}`}
        style={{ opacity }}
      >
        {letter}
      </div>
    );
};
  

const WordDisplay = ({ word, feedback, onLetterSwap }) => {
  const [isAnyDragging, setIsAnyDragging] = useState(false);

  const handleLetterSwap = (index1, index2) => {
    onLetterSwap(index1, index2);
    setIsAnyDragging(false);
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
            isAnyDragging={isAnyDragging}
          />
        ))}
      </div>
    </DndProvider>
  );
};


export default WordDisplay;
