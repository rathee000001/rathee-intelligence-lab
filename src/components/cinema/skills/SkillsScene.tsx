"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type SkillClusterKey =
  | "supply"
  | "forecasting"
  | "analytics"
  | "ai"
  | "frontend"
  | "finance"
  | "marketing"
  | "management";

type SkillsSceneProps = {
  activeKey: SkillClusterKey;
};

const clusterColors: Record<SkillClusterKey, string> = {
  supply: "#16a34a",
  forecasting: "#facc15",
  analytics: "#2563eb",
  ai: "#8b5cf6",
  frontend: "#38bdf8",
  finance: "#22c55e",
  marketing: "#ec4899",
  management: "#f59e0b"
};

function SkillsWorld({ activeKey }: SkillsSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return [
      { key: "supply", position: [-2.2, 0.86, 0.16], color: "#16a34a" },
      { key: "forecasting", position: [-1.24, 1.25, -0.04], color: "#facc15" },
      { key: "analytics", position: [-0.25, 0.62, 0.16], color: "#2563eb" },
      { key: "ai", position: [0.85, 1.08, -0.04], color: "#8b5cf6" },
      { key: "frontend", position: [1.85, 0.45, 0.16], color: "#38bdf8" },
      { key: "finance", position: [-1.55, -0.75, -0.04], color: "#22c55e" },
      { key: "marketing", position: [-0.2, -1.05, 0.16], color: "#ec4899" },
      { key: "management", position: [1.25, -0.72, -0.04], color: "#f59e0b" }
    ] as const;
  }, []);

  const matrixCells = useMemo(() => {
    const cells: { id: string; x: number; y: number; value: number }[] = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 12; col++) {
        cells.push({
          id: `${row}-${col}`,
          x: -2.75 + col * 0.25,
          y: -1.16 + row * 0.24,
          value: ((row + 5) * (col + 3)) % 10
        });
      }
    }

    return cells;
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 180 }, (_, index) => {
      const angle = index * 0.44;
      const radius = 1.25 + ((index * 19) % 150) / 62;
      const y = -1.7 + ((index * 31) % 165) / 48;

      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius - 0.25
        ] as [number, number, number],
        size: 0.01 + (index % 4) * 0.005,
        color:
          index % 5 === 0
            ? "#facc15"
            : index % 5 === 1
            ? "#60a5fa"
            : index % 5 === 2
            ? "#16a34a"
            : index % 5 === 3
            ? "#ec4899"
            : "#8b5cf6"
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.04;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.04;
  });

  const activeColor = clusterColors[activeKey];

  return (
    <group ref={groupRef} position={[0.85, 0.02, 0]} scale={1.02}>
      <mesh position={[0.05, 0.05, -0.26]}>
        <boxGeometry args={[6.25, 3.35, 0.08]} />
        <meshStandardMaterial
          color="#020617"
          transparent
          opacity={0.84}
          emissive="#0f172a"
          emissiveIntensity={0.22}
        />
      </mesh>

      {matrixCells.map((cell) => (
        <mesh key={cell.id} position={[cell.x, cell.y, -0.2]}>
          <boxGeometry args={[0.16, 0.12, 0.018]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.07 + cell.value * 0.026}
            transparent
            opacity={0.1 + cell.value * 0.025}
          />
        </mesh>
      ))}

      {nodes.map((node, index) => {
        const active = activeKey === node.key;

        return (
          <Float key={node.key} speed={1.08 + index * 0.03} rotationIntensity={0.16} floatIntensity={0.24}>
            <mesh position={node.position}>
              <sphereGeometry args={[active ? 0.17 : 0.095, 30, 30]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={active ? 1.15 : 0.45}
                metalness={0.55}
                roughness={0.16}
              />
            </mesh>
          </Float>
        );
      })}

      {nodes.map((node, index) => {
        const next = nodes[(index + 1) % nodes.length];
        const related = activeKey === node.key || activeKey === next.key;

        return (
          <Line
            key={`${node.key}-${next.key}`}
            points={[node.position, next.position]}
            color={related ? activeColor : "#64748b"}
            lineWidth={related ? 3.6 : 1.6}
            transparent
            opacity={related ? 0.92 : 0.34}
          />
        );
      })}

      <Float speed={1.18} rotationIntensity={0.18} floatIntensity={0.24}>
        <mesh position={[0.05, -0.02, 0.1]}>
          <sphereGeometry args={[0.42, 48, 48]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.54}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[0.94, 0.008, 16, 170]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.42} />
      </mesh>

      <mesh rotation={[0.48, Math.PI / 2.5, 0.22]}>
        <torusGeometry args={[1.48, 0.006, 16, 190]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.3} />
      </mesh>

      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 10, 10]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.55}
            transparent
            opacity={0.78}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function SkillsScene({ activeKey }: SkillsSceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.52} />
        <pointLight position={[4, 4, 5]} intensity={2.2} color="#60a5fa" />
        <pointLight position={[-3, -2, 4]} intensity={1.55} color="#facc15" />
        <pointLight position={[1.5, -3, 3]} intensity={1.1} color="#16a34a" />
        <Stars radius={90} depth={45} count={680} factor={2.1} fade speed={0.16} />
        <SkillsWorld activeKey={activeKey} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.22} luminanceSmoothing={0.75} intensity={0.45} />
          <Vignette eskil={false} offset={0.48} darkness={0.18} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(15,23,42,0.18),transparent_30%),radial-gradient(circle_at_58%_52%,rgba(37,99,235,0.08),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(250,204,21,0.10),transparent_30%)]" />
      <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-white via-white/96 to-white/35" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-white via-white/82 to-transparent" />
    </div>
  );
}