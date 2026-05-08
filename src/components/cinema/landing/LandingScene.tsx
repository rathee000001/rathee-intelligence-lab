"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function CoreSystem() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: 70 }, (_, index) => {
      const angle = (index / 70) * Math.PI * 2;
      const radius = 1.7 + (index % 8) * 0.18;
      const y = Math.sin(index * 1.31) * 1.15;

      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        ] as [number, number, number],
        size: 0.025 + (index % 4) * 0.008,
        color:
          index % 4 === 0
            ? "#facc15"
            : index % 4 === 1
              ? "#60a5fa"
              : index % 4 === 2
                ? "#34d399"
                : "#c084fc"
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.62, 64, 64]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.8}
          roughness={0.18}
          emissive="#1e40af"
          emissiveIntensity={0.12}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.35, 0.01, 16, 220]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.38} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2.4, Math.PI / 3.5]}>
        <torusGeometry args={[1.8, 0.01, 16, 220]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.42} />
      </mesh>

      <mesh rotation={[Math.PI / 3.2, Math.PI / 6, Math.PI / 2.5]}>
        <torusGeometry args={[2.22, 0.008, 16, 220]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.25} />
      </mesh>

      {nodes.map((node) => (
        <Float key={node.id} speed={1.2} rotationIntensity={0.2} floatIntensity={0.65}>
          <mesh position={node.position}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.75}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function LandingScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5.7], fov: 48 }}>
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={0.42} />
        <pointLight position={[4, 3, 5]} intensity={2.2} color="#facc15" />
        <pointLight position={[-4, -2, -3]} intensity={1.7} color="#2563eb" />
        <pointLight position={[0, -4, 2]} intensity={0.9} color="#22c55e" />
        <Stars radius={90} depth={55} count={1800} factor={4} fade speed={0.55} />
        <CoreSystem />
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(250,204,21,0.14),transparent_26%),radial-gradient(circle_at_18%_35%,rgba(37,99,235,0.28),transparent_34%),linear-gradient(90deg,rgba(3,7,18,0.95)_0%,rgba(3,7,18,0.72)_45%,rgba(3,7,18,0.28)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]" />
    </div>
  );
}