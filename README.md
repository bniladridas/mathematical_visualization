# Artistic Mathematical Visualization

![Mathematical Visualization](https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)

## Overview

This project creates an artistic 3D visualization of mathematical functions using React Three Fiber. It demonstrates the relationship between a function, its derivative, and its integral in an aesthetically pleasing way.

The visualization renders the function `f(x) = sin(x) + ∫ e^(-x²) dx` in 3D space, where:
- The integral determines the overall smoothness of the surface
- The derivative controls the curvature and defines color gradients
- Colors transition based on the rate of change (derivative values)

## Mathematical Concepts

### The Function

The main function visualized is:

```
f(x, z) = sin(x) + ∫ e^(-x²) dx + sin(z) * 0.5
```

This combines:
1. A sine wave for oscillation
2. The integral of a Gaussian function for smoothness
3. A z-dimension component for creating a true 3D surface

### The Derivative

The derivative of the function is:

```
f'(x, z) = cos(x) + e^(-x²) + cos(z) * 0.5
```

This derivative is used to:
- Calculate surface normals for realistic lighting
- Map colors to the surface based on the rate of change
- Define the curvature characteristics of the visualization

### The Integral

The integral of e^(-x²) is related to the error function (erf):

```
∫ e^(-x²) dx = (√π/2) * erf(x)
```

This integral component:
- Adds smoothness to the overall surface
- Creates gradual transitions between regions
- Balances the oscillatory behavior of the sine components

## Technical Implementation

### 3D Rendering

The project uses:
- **React Three Fiber**: A React renderer for Three.js
- **Three.js**: A JavaScript 3D library
- **React**: For component-based UI architecture

### Key Components

1. **MathVisualization.tsx**: Generates the 3D surface using:
   - Custom geometry with vertices, normals, and colors
   - Color mapping based on derivative values
   - Smooth surface rendering with appropriate lighting

2. **App.tsx**: Provides the UI framework with:
   - Canvas setup for 3D rendering
   - Camera controls for user interaction
   - Information panel explaining the visualization

### Color Mapping

The visualization maps derivative values to colors:
- Blue regions: Low rate of change
- Purple regions: Moderate rate of change
- Red regions: High rate of change

This creates a visually appealing gradient that highlights the mathematical properties of the function.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/artistic-math-visualization.git
   cd artistic-math-visualization
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Interaction

- **Rotate**: Click and drag to rotate the visualization
- **Zoom**: Scroll to zoom in and out
- **Pan**: Right-click and drag to pan
- **Info Panel**: Click the info button in the bottom right to learn more about the visualization

## Customization

You can modify the visualization by editing the following:

1. **The function**: Change `f(x, z)` in `MathVisualization.tsx` to visualize different mathematical relationships

2. **Color mapping**: Adjust the color gradient in the `useMemo` hook to create different visual effects

3. **Resolution**: Increase or decrease the `resolution` variable to change the detail level of the surface

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The error function implementation is based on numerical approximation techniques
- Color theory principles were applied to create aesthetically pleasing gradients
- Mathematical concepts from calculus inspired the visualization approach