import React from 'react';

const Feedback = ({ feedback }) => {
  const correctCount = feedback.filter((correct) => correct).length;
  
  return (
    <div className="feedback">
      Correct letters in position: {correctCount} / {feedback.length}
    </div>
  );
};

export default Feedback;
