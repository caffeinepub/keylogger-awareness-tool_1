import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

function RotatingRing() {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[1, 0.1, 16, 100]} />
      <meshStandardMaterial color="oklch(0.7 0.25 145)" wireframe />
    </mesh>
  );
}

export default function ThreeSceneAccent() {
  return (
    <div className="w-full h-64 opacity-30">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingRing />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
