import React, { useState, useEffect } from 'react';

const MinSwaps = ({ completeWord, scrambledWord }) => {
  const [minSwaps, setMinSwaps] = useState(0);

  const calculateMinSwaps = (completeWord, scrambledWord) => {
    const positionMap = new Map();
    const complete = completeWord.split('');
    const scrambled = scrambledWord.slice(); // Create a copy of the original array

    for (let i = 0; i < complete.length; i++) {
      positionMap.set(complete[i], i);
    }

    let swaps = 0;
    for (let i = 0; i < scrambled.length; i++) {
      if (scrambled[i] !== complete[i]) {
        const correctCharIdx = positionMap.get(scrambled[i]);
        const temp = scrambled[correctCharIdx];
        scrambled[correctCharIdx] = scrambled[i];
        scrambled[i] = temp;
        positionMap.set(temp, correctCharIdx);
        swaps++;
      }
    }

    return swaps;
  };

  useEffect(() => {
    const swaps = calculateMinSwaps(completeWord, scrambledWord);
    setMinSwaps(swaps);
  }, [completeWord, scrambledWord]);

  return (
    <div className='min-swap-counter'>
      <p>Minimum swaps required: {minSwaps}</p>
    </div>
  );
};

export default MinSwaps;
