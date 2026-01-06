"use client"
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [rotation, setRotation] = useState(0);
  const circleSize = 1192; // You can change this value
  const imageSize = 303; // Size of the rotating image
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate position on circle border
  const radius = circleSize / 2;
  const angle = (rotation * Math.PI) / 180;
  const x = radius + (radius * Math.cos(angle)) - (imageSize / 2);
  const y = radius + (radius * Math.sin(angle)) - (imageSize / 2);
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="outer-one relative">
        <div className="inner-one relative">
          {/* The circle */}
          <div 
            className="circle rounded-full border-2 border-white relative" 
            style={{ 
              height: `${circleSize}px`, 
              width: `${circleSize}px` 
            }}
          >
            {/* Rotating image */}
            <div
              className="absolute"
              style={{
                width: `${imageSize}px`,
                height: `${imageSize}px`,
                left: `${x}px`,
                top: `${y}px`,
                transform: `rotate(${rotation}deg)`,
                backgroundImage: 'url("/problem-vector.png")',
                rotate: '-180deg',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;