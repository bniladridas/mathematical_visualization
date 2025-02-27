import React, { useMemo } from 'react';
import * as THREE from 'three';

// Helper function to calculate the error function (erf)
// This is needed for the integral of e^(-x²)
const erf = (x: number): number => {
  // Constants
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  // Save the sign of x
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  // A&S formula 7.1.26
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
};

// The integral of e^(-x²) is related to the error function
const integralOfGaussian = (x: number): number => {
  return (Math.sqrt(Math.PI) / 2) * erf(x);
};

// Our main function f(x) = sin(x) + ∫ e^(-x²) dx
const f = (x: number, z: number): number => {
  return Math.sin(x) + integralOfGaussian(x) + Math.sin(z) * 0.5;
};

// The derivative of f(x) with respect to x
const df = (x: number, z: number): number => {
  return Math.cos(x) + Math.exp(-x * x) + Math.cos(z) * 0.5;
};

export const MathVisualization: React.FC = () => {
  // Generate the geometry for our visualization
  const { positions, normals, colors, indices } = useMemo(() => {
    const resolution = 100; // Grid resolution
    const size = 4; // Size of the grid
    
    const positions: number[] = [];
    const normals: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];
    
    // Generate vertices
    for (let i = 0; i <= resolution; i++) {
      const x = (i / resolution) * size - size / 2;
      
      for (let j = 0; j <= resolution; j++) {
        const z = (j / resolution) * size - size / 2;
        
        // Calculate y using our function
        const y = f(x, z);
        
        // Calculate derivative for color mapping
        const derivative = df(x, z);
        
        // Add position
        positions.push(x, y, z);
        
        // Calculate normal (approximation)
        const eps = 0.001;
        const nx = (f(x + eps, z) - f(x - eps, z)) / (2 * eps);
        const nz = (f(x, z + eps) - f(x, z - eps)) / (2 * eps);
        const normal = new THREE.Vector3(-nx, 1, -nz).normalize();
        normals.push(normal.x, normal.y, normal.z);
        
        // Map derivative to color
        // Using a color gradient from blue to purple to red based on derivative
        const normalizedDerivative = (derivative + 2) / 4; // Normalize to 0-1 range
        
        // Create a smooth color transition
        const r = Math.max(0, Math.min(1, normalizedDerivative * 2 - 0.5));
        const g = Math.max(0, Math.min(1, 1 - Math.abs(normalizedDerivative - 0.5) * 2));
        const b = Math.max(0, Math.min(1, 1.5 - normalizedDerivative * 2));
        
        colors.push(r, g, b);
      }
    }
    
    // Generate indices for triangles
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const a = i * (resolution + 1) + j;
        const b = i * (resolution + 1) + j + 1;
        const c = (i + 1) * (resolution + 1) + j;
        const d = (i + 1) * (resolution + 1) + j + 1;
        
        // First triangle
        indices.push(a, c, b);
        // Second triangle
        indices.push(b, c, d);
      }
    }
    
    return { positions, normals, colors, indices };
  }, []);

  return (
    <mesh receiveShadow castShadow rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="index"
          array={new Uint32Array(indices)}
          count={indices.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(positions)}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-normal"
          array={new Float32Array(normals)}
          count={normals.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={new Float32Array(colors)}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
        roughness={0.4}
        metalness={0.3}
        flatShading={false}
      />
    </mesh>
  );
};