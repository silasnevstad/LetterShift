import React from 'react';
import styles from '../styles/Background.module.css';

const ParallaxComponents = () => {
    return (
        <div className={styles.parallaxContainer}>
            {/* <Parallax className={[styles.shape, styles.shapeLeft].join(' ')} x={[10, -10]} y={[10, -10]} tagOuter="figure"> */}
            <div className={[styles.shape, styles.shapeLeft].join(' ')}>
                <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs> 
                        <linearGradient id="sw-gradient1" x1="0" x2="1" y1="1" y2="0">
                            <stop id="stop1" stop-color="rgba(255, 255, 255, 1)" offset="0%"></stop>
                            <stop id="stop2" stop-color="rgba(0, 112, 255, 1)" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#sw-gradient1)" d="M19.3,-22.6C26.7,-21.2,35.4,-17.8,35.8,-12.6C36.1,-7.4,28,-0.5,25.5,8.6C23,17.8,26.2,29.1,22.9,32.9C19.6,36.7,9.8,33,2.1,30.1C-5.7,27.3,-11.4,25.4,-18.5,22.8C-25.7,20.3,-34.4,17.2,-39.5,10.7C-44.5,4.2,-46,-5.6,-41,-11C-36.1,-16.4,-24.7,-17.4,-16.8,-18.6C-8.9,-19.8,-4.5,-21.2,0.7,-22.2C6,-23.2,11.9,-23.9,19.3,-22.6Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" style={{transition: 'all 0.3s ease 0s'}} stroke="url(#sw-gradient)"></path>
                </svg>
            {/* </Parallax> */}
            </div>
            {/* <Parallax className={[styles.shape, styles.shapeRight].join(' ')} x={[-10, 10]} y={[10, -10]} tagOuter="figure"> */}
            <div className={[styles.shape, styles.shapeRight].join(' ')}>
                <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs> 
                        <linearGradient id="sw-gradient2" x1="0" x2="1" y1="1" y2="0">
                            <stop id="stop1" stop-color="rgba(220, 220, 230, 1)" offset="0%"></stop>
                            <stop id="stop2" stop-color="rgba(0, 112, 255, 1)" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#sw-gradient2)" d="M11.8,-17C16.5,-12.9,22.1,-11,24.2,-7.3C26.2,-3.5,24.5,1.9,21.3,5.4C18.2,8.9,13.4,10.4,9.6,13.2C5.8,16,2.9,20,-2.9,24C-8.6,28,-17.3,31.8,-23.9,30C-30.5,28.1,-35.2,20.5,-33.2,13.8C-31.2,7.1,-22.6,1.3,-20.2,-6.7C-17.8,-14.7,-21.6,-24.8,-19.3,-29.7C-16.9,-34.5,-8.5,-34.1,-2.4,-30.7C3.6,-27.3,7.2,-21.1,11.8,-17Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style={{transition: 'all 0.3s ease 0s;'}}></path>
                </svg>
            {/* </Parallax> */}
            </div>
            <div className={[styles.shape, styles.shapeBottom].join(' ')}>
                <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs> 
                        <linearGradient id="sw-gradient3" x1="0" x2="1" y1="1" y2="0">
                            <stop id="stop1" stop-color="rgba(251.193, 251.193, 251.193, 1)" offset="0%"></stop>
                            <stop id="stop2" stop-color="rgba(0, 129.749, 255, 1)" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#sw-gradient3)" d="M19.7,-35.5C21.9,-29.3,17.4,-17.6,21,-9.6C24.6,-1.7,36.3,2.6,38.3,7.2C40.2,11.8,32.6,16.7,26.1,20.7C19.6,24.7,14.4,27.9,8.7,29.6C3,31.4,-3.2,31.6,-9.7,30.8C-16.2,29.9,-23,27.9,-24.7,23C-26.4,18.2,-23,10.5,-20.3,5.1C-17.6,-0.2,-15.7,-3.2,-15.3,-8.2C-14.9,-13.1,-16,-19.9,-13.7,-26C-11.4,-32.2,-5.7,-37.7,1.5,-40.1C8.8,-42.4,17.5,-41.7,19.7,-35.5Z" width="100%" height="100%" 
                        transform="translate(50 50)" stroke-width="0" style={{transition: "all 0.3s ease 0s;"}} stroke="url(#sw-gradient)"></path>
                </svg>
            </div>
        </div>
    );
};

export default ParallaxComponents;