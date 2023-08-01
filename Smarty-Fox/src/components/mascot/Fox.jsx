import { Player } from '@lottiefiles/react-lottie-player';
import lottie from "lottie-web";
import default_fox from '../../assets/default_fox.json';
import React, { useState, useEffect, useRef } from 'react';
import wake from '../../assets/wake.json';
import normal from '../../assets/default_fox.json';

function Fox({ fox, setFox }) {
  const foxMascot = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (fox !== wake) {
      animationRef.current = lottie.loadAnimation({
        container: foxMascot.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: fox,
        speed: 1
      });
    } else {
      animationRef.current = lottie.loadAnimation({
        container: foxMascot.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: fox,
        speed: 0.5
      });
      setTimeout(() => {
        setFox(normal);
      }, 1200);

    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [fox]);

  return (
    <div className="flex self-end mr-20 w-2/5 flex-col">
      <div className="foxMascot w-11/12" ref={foxMascot} ></div>
    </div>
    // <div className="flex self-end mr-20 w-2/5">
    //   <Player
    //     src={fox}
    //     background="transparent"
    //     speed="1"
    //     className="w-11/12"
    //     loop
    //     autoplay
    //   />
    // </div>
  )
}

export default Fox;