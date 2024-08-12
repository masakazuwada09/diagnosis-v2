import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VANTA } from 'vanta';

const VantaEffect = () => {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    // Initialize VANTA effect
    effectRef.current = VANTA.NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
    });

    // Cleanup effect on component unmount
    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} style={{ height: '100vh', width: '100%' }} />;
};

export default VantaEffect;