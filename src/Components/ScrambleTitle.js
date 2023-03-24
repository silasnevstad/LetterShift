import React, { useEffect, useState } from 'react';


const getRandomIndex = (max, current) => {
    let newIndex = Math.floor(Math.random() * max);
    while (newIndex === current) {
        newIndex = Math.floor(Math.random() * max);
    }
    return newIndex;
};

const ScrambleTitle = ({ title, scrambleInterval = 2000 }) => {
    const [letters, setLetters] = useState(title.split(''));


    const swapTwoLetters = (index1, index2) => {
        setLetters((letters) => {
            const newLetters = [...letters];
            [newLetters[index1], newLetters[index2]] = [newLetters[index2], newLetters[index1]];
            return newLetters;
        });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const firstIndex = getRandomIndex(letters.length, -1);
            const secondIndex = getRandomIndex(letters.length, firstIndex);
            swapTwoLetters(firstIndex, secondIndex);
        }, scrambleInterval);
        return () => clearInterval(intervalId);
    }, [scrambleInterval, letters]);



    return (
        <h1>
            {letters.map((letter, index) => (
                <span key={index}>{letter}</span>
            ))}
        </h1>
    );
};

export default ScrambleTitle;
