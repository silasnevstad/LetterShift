import React, { useEffect, useState } from 'react';
import { useSprings, animated } from 'react-spring';

const getRandomIndex = (max, current) => {
    let newIndex = Math.floor(Math.random() * max);
    while (newIndex === current) {
        newIndex = Math.floor(Math.random() * max);
    }
    return newIndex;
};

const ScrambleTitle = ({ title, scrambleInterval = 2000 }) => {

    const [letters, setLetters] = useState(title.split(''));


    // useEffect(() => {
    //     const scrambleLetters = () => {
    //         setLetters((letters) => {
    //             const newLetters = [...letters];
    //             const firstIndex = getRandomIndex(letters.length, -1);
    //             const secondIndex = getRandomIndex(letters.length, firstIndex);

    //             // Swap the letters
    //             [newLetters[firstIndex], newLetters[secondIndex]] = [
    //             newLetters[secondIndex],
    //             newLetters[firstIndex],
    //             ];
    //             return newLetters;
    //         });
    //     };

    //     const intervalId = setInterval(scrambleLetters, scrambleInterval);
    //     return () => clearInterval(intervalId);
    // }, [scrambleInterval]);

    const swapTwoLetters = (index1, index2) => {
        setLetters((letters) => {
            const newLetters = [...letters];
            [newLetters[index1], newLetters[index2]] = [newLetters[index2], newLetters[index1]];
            return newLetters;
        });
    };

    const [springs, setSprings] = useSprings(letters.length, (index) => ({
        transform: 'translateY(0px)',
        config: { mass: 1, tension: 200, friction: 20 },
    }));


    const animateLetterSwap = (index1, index2) => {
        const firstLetter = letters[index1];
        const secondLetter = letters[index2];

        // swap two letters in the letters array, and animate the move
        // the letters being swapped are animated to their new positions
        // the animation is lifting up the letters up. moving them to the new position, and then dropping them back down
        
        // swap the letters\
        swapTwoLetters(index1, index2);

        // animate the letters moving up
        // setSprings((springs) => {
        //     const newSprings = [...springs];
        //     newSprings[index1] = { transform: 'translateY(-20px)' };
        //     newSprings[index2] = { transform: 'translateY(-20px)' };
        //     return newSprings;
        // });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const firstIndex = getRandomIndex(letters.length, -1);
            const secondIndex = getRandomIndex(letters.length, firstIndex);
            animateLetterSwap(firstIndex, secondIndex);
        }, scrambleInterval);
        return () => clearInterval(intervalId);
    }, [scrambleInterval, letters]);



    return (
        <h1>
            {springs.map((spring, index) => (
            <animated.span key={index} style={spring}>
                {letters[index]}
            </animated.span>
            ))}
        </h1>
    );
};

export default ScrambleTitle;
