import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { Mesh, TorusGeometry, MeshStandardMaterial } from 'three';

function RotatingRing() {
  const meshRef = useRef<Mesh>(null);
  const geometryRef = useRef<TorusGeometry | null>(null);
  const materialRef = useRef<MeshStandardMaterial | null>(null);

  useEffect(() => {
    // Store references for cleanup
    if (meshRef.current) {
      geometryRef.current = meshRef.current.geometry as TorusGeometry;
      materialRef.current = meshRef.current.material as MeshStandardMaterial;
    }

    return () => {
      // Dispose Three.js resources
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[1, 0.1, 16, 100]} />
      <meshStandardMaterial color="oklch(0.7 0.25 145)" wireframe />
    </mesh>
  );
}

export default function ThreeSceneAccent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      // Cleanup WebGL context
      if (containerRef.current) {
        const canvas = containerRef.current.querySelector('canvas');
        if (canvas) {
          const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
          if (gl) {
            const loseContext = gl.getExtension('WEBGL_lose_context');
            if (loseContext) {
              loseContext.loseContext();
            }
          }
        }
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-64 opacity-30">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingRing />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
