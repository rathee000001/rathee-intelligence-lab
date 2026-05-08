"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type TimelineCluster =
  | "goldV1"
  | "goldV2"
  | "goldV3"
  | "tableau"
  | "finance"
  | "marketing"
  | "fundraiser"
  | "management"
  | "portfolio";

type TimelineSceneProps = {
  activeKey: TimelineCluster;
};

const colors: Record<TimelineCluster, string> = {
  goldV1: "#facc15",
  goldV2: "#2563eb",
  goldV3: "#f59e0b",
  tableau: "#16a34a",
  finance: "#38bdf8",
  marketing: "#ec4899",
  fundraiser: "#22c55e",
  management: "#7c3aed",
  portfolio: "#60a5fa"
};

function TimelineWorld({ activeKey }: TimelineSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return [
      { key: "goldV1", label: "V1", position: [-2.55, -1.1, 0.12], color: "#facc15" },
      { key: "tableau", label: "TB", position: [-1.85, -0.55, -0.04], color: "#16a34a" },
      { key: "finance", label: "10K", position: [-1.15, 0.05, 0.12], color: "#38bdf8" },
      { key: "marketing", label: "C4C", position: [-0.42, 0.58, -0.04], color: "#ec4899" },
      { key: "fundraiser", label: "BF", position: [0.35, 0.85, 0.14], color: "#22c55e" },
      { key: "management", label: "META", position: [1.05, 0.38, -0.05], color: "#7c3aed" },
      { key: "goldV2", label: "V2", position: [1.72, -0.25, 0.12], color: "#2563eb" },
      { key: "goldV3", label: "V3", position: [2.35, -0.78, -0.02], color: "#f59e0b" },
      { key: "portfolio", label: "LAB", position: [2.78, 0.85, 0.15], color: "#60a5fa" }
    ] as const;
  }, []);

  const spinePoints = useMemo(() => {
    return nodes.map((node) => node.position) as [number, number, number][];
  }, [nodes]);

  const orbitParticles = useMemo(() => {
    return Array.from({ length: 180 }, (_, index) => {
      const angle = index * 0.42;
      const radius = 1.35 + ((index * 17) % 140) / 58;
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
            : "#7c3aed"
      };
    });
  }, []);

  const matrixCells = useMemo(() => {
    const cells: { id: string; x: number; y: number; value: number }[] = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 12; col++) {
        cells.push({
          id: `${row}-${col}`,
          x: -2.75 + col * 0.25,
          y: -1.15 + row * 0.24,
          value: ((row + 4) * (col + 7)) % 10
        });
      }
    }

    return cells;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.04;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.04;
  });

  const activeColor = colors[activeKey];

  return (
    <group ref={groupRef} position={[0.78, 0.02, 0]} scale={1.02}>
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

      <Line points={spinePoints} color="#64748b" lineWidth={2.2} transparent opacity={0.5} />
      <Line points={spinePoints} color={activeColor} lineWidth={4.2} transparent opacity={0.72} />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.24}>
        <mesh position={[0.08, -0.05, 0.08]}>
          <sphereGeometry args={[0.38, 48, 48]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.55}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[0.92, 0.008, 16, 170]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.42} />
      </mesh>

      <mesh rotation={[0.48, Math.PI / 2.5, 0.22]}>
        <torusGeometry args={[1.48, 0.006, 16, 190]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.3} />
      </mesh>

      {nodes.map((node, index) => {
        const active = activeKey === node.key;

        return (
          <Float key={node.key} speed={1.1 + index * 0.03} rotationIntensity={0.16} floatIntensity={0.22}>
            <mesh position={node.position}>
              <sphereGeometry args={[active ? 0.16 : 0.095, 30, 30]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={active ? 1.1 : 0.45}
                metalness={0.5}
                roughness={0.18}
              />
            </mesh>
          </Float>
        );
      })}

      {orbitParticles.map((particle) => (
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

export default function TimelineScene({ activeKey }: TimelineSceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.52} />
        <pointLight position={[4, 4, 5]} intensity={2.2} color="#60a5fa" />
        <pointLight position={[-3, -2, 4]} intensity={1.55} color="#facc15" />
        <pointLight position={[1.5, -3, 3]} intensity={1.1} color="#16a34a" />
        <Stars radius={90} depth={45} count={680} factor={2.1} fade speed={0.16} />
        <TimelineWorld activeKey={activeKey} />
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