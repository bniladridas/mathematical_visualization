import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { MathVisualization } from './components/MathVisualization';
import { Info } from 'lucide-react';

function App() {
  const infoRef = useRef<HTMLDivElement>(null);

  const toggleInfo = () => {
    if (infoRef.current) {
      infoRef.current.classList.toggle('translate-y-full');
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Canvas for 3D visualization */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <MathVisualization />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>

      {/* Title overlay */}
      <div className="absolute top-0 left-0 w-full p-4 text-white z-10">
        <h1 className="text-3xl font-bold text-center">
          Artistic Mathematical Visualization
        </h1>
        <p className="text-center text-lg opacity-80">
          f(x) = sin(x) + ∫ e^(-x²) dx
        </p>
      </div>

      {/* Info button */}
      <button 
        onClick={toggleInfo}
        className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-full text-white z-10 hover:bg-white/20 transition-colors"
      >
        <Info size={24} />
      </button>

      {/* Info panel */}
      <div 
        ref={infoRef}
        className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-md text-white p-6 transform translate-y-full transition-transform duration-300 ease-in-out z-10"
      >
        <h2 className="text-xl font-bold mb-2">About this Visualization</h2>
        <p className="mb-4">
          This 3D visualization represents the mathematical function f(x) = sin(x) + ∫ e^(-x²) dx, where:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>The integral determines the overall smoothness of the surface</li>
          <li>The derivative f'(x) controls the curvature and defines color gradients</li>
          <li>Colors transition based on the rate of change (derivative values)</li>
          <li>The surface includes contour details for aesthetic appeal</li>
        </ul>
        <p>
          Interact with the visualization by dragging to rotate, scrolling to zoom, and right-clicking to pan.
        </p>
      </div>
    </div>
  );
}

export default App;