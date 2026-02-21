"use client"
import { useState, useEffect } from 'react';

const Circle = () => {
  const [rotation, setRotation] = useState(0);
  const [circleSize, setCircleSize] = useState(600);
  const [imageSize, setImageSize] = useState(150);
  const [marginLeft, setMarginLeft] = useState('0px');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const updateCircleSize = () => {
      if (window.innerWidth >= 1024) {
        setCircleSize(1192);
        setImageSize(303);
        setMarginLeft('10px');
      } else {
        setCircleSize(600);
        setImageSize(150);
        setMarginLeft('0px');
      }
    };
    
    updateCircleSize();
    window.addEventListener('resize', updateCircleSize);
    
    return () => window.removeEventListener('resize', updateCircleSize);
  }, []);
  
  // Calculate position on circle border
  const radius = circleSize / 2;
  const angle = (rotation * Math.PI) / 180;
  const x = radius + (radius * Math.cos(angle)) - (imageSize / 2);
  const y = radius + (radius * Math.sin(angle)) - (imageSize / 2);
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="outer-one relative">
        <div className="inner-one relative">
          {/* The circle */}
          <div 
            className="circle rounded-full border-2 border-[#283745] relative w-[600px] h-[600px] lg:w-[1192px] lg:h-[1192px]" 
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
                backgroundImage: 'url("/edit-blue.webp")',
                rotate: '-180deg',
                marginLeft: marginLeft,
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

export default Circle;