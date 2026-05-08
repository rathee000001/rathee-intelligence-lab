"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type PortfolioAICluster =
  | "overview"
  | "forecasting"
  | "supply"
  | "finance"
  | "marketing"
  | "ai"
  | "roles"
  | "evidence";

type Props = {
  activeKey: PortfolioAICluster;
};

const colors: Record<PortfolioAICluster, string> = {
  overview: "#60a5fa",
  forecasting: "#facc15",
  supply: "#16a34a",
  finance: "#38bdf8",
  marketing: "#ec4899",
  ai: "#8b5cf6",
  roles: "#f59e0b",
  evidence: "#22c55e"
};

function PortfolioAIWorld({ activeKey }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const tokenRingRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const neuralNodes = useMemo(() => {
    return [
      { key: "overview", position: [-2.45, 1.05, 0.2], color: "#60a5fa", size: 0.1 },
      { key: "forecasting", position: [-1.55, 1.35, -0.05], color: "#facc15", size: 0.1 },
      { key: "supply", position: [-0.72, 0.72, 0.18], color: "#16a34a", size: 0.1 },
      { key: "finance", position: [0.3, 1.18, -0.08], color: "#38bdf8", size: 0.1 },
      { key: "marketing", position: [1.18, 0.58, 0.18], color: "#ec4899", size: 0.1 },
      { key: "ai", position: [0.02, -0.02, 0.32], color: "#8b5cf6", size: 0.18 },
      { key: "roles", position: [-1.42, -0.9, -0.05], color: "#f59e0b", size: 0.1 },
      { key: "evidence", position: [1.52, -0.82, -0.05], color: "#22c55e", size: 0.1 },
      { key: "ai", position: [2.18, 0.12, 0.1], color: "#a855f7", size: 0.08 },
      { key: "evidence", position: [2.45, -0.55, 0.15], color: "#22c55e", size: 0.08 }
    ] as {
      key: PortfolioAICluster;
      position: [number, number, number];
      color: string;
      size: number;
    }[];
  }, []);

  const neuralLinks = useMemo(() => {
    return [
      [0, 5],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [6, 5],
      [7, 5],
      [5, 8],
      [8, 9],
      [5, 9],
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [6, 7]
    ] as [number, number][];
  }, []);

  const retrievalPath = useMemo(() => {
    return [
      [-2.62, -1.25, 0.22],
      [-1.95, -0.92, 0.24],
      [-1.25, -0.58, 0.24],
      [-0.58, -0.25, 0.26],
      [0.02, -0.02, 0.32],
      [0.72, 0.22, 0.26],
      [1.42, 0.08, 0.24],
      [2.05, -0.18, 0.24],
      [2.62, -0.48, 0.22]
    ] as [number, number, number][];
  }, []);

  const embeddingCells = useMemo(() => {
    const cells: { id: string; x: number; y: number; value: number }[] = [];

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 14; col++) {
        cells.push({
          id: `${row}-${col}`,
          x: -2.85 + col * 0.21,
          y: -1.14 + row * 0.22,
          value: ((row + 7) * (col + 5)) % 10
        });
      }
    }

    return cells;
  }, []);

  const tokenParticles = useMemo(() => {
    return Array.from({ length: 150 }, (_, index) => {
      const angle = index * 0.36;
      const radius = 1.1 + ((index * 13) % 110) / 60;
      const y = -1.45 + ((index * 23) % 130) / 45;

      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius - 0.2
        ] as [number, number, number],
        size: 0.012 + (index % 4) * 0.004,
        color:
          index % 5 === 0
            ? "#8b5cf6"
            : index % 5 === 1
            ? "#60a5fa"
            : index % 5 === 2
            ? "#22c55e"
            : index % 5 === 3
            ? "#facc15"
            : "#ec4899"
      };
    });
  }, []);

  const promptCards = useMemo(() => {
    return [
      { label: "ASK", x: -2.42, y: -1.25, color: "#60a5fa" },
      { label: "FIND", x: -0.55, y: -1.36, color: "#22c55e" },
      { label: "SOURCE", x: 1.25, y: -1.28, color: "#facc15" },
      { label: "ANSWER", x: 2.48, y: -1.02, color: "#8b5cf6" }
    ];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.04;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.04;
    }

    if (tokenRingRef.current) {
      tokenRingRef.current.rotation.z = state.clock.elapsedTime * 0.16;
      tokenRingRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.035;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  const activeColor = colors[activeKey];

  return (
    <group ref={groupRef} position={[0.9, 0.02, 0]} scale={1.02}>
      <mesh position={[0.05, 0.05, -0.28]}>
        <boxGeometry args={[6.35, 3.42, 0.08]} />
        <meshStandardMaterial
          color="#020617"
          transparent
          opacity={0.88}
          emissive="#0f172a"
          emissiveIntensity={0.24}
        />
      </mesh>

      {embeddingCells.map((cell) => (
        <mesh key={cell.id} position={[cell.x, cell.y, -0.22]}>
          <boxGeometry args={[0.13, 0.105, 0.018]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.06 + cell.value * 0.03}
            transparent
            opacity={0.08 + cell.value * 0.028}
          />
        </mesh>
      ))}

      {neuralLinks.map(([a, b], index) => {
        const source = neuralNodes[a];
        const target = neuralNodes[b];
        const related = source.key === activeKey || target.key === activeKey || activeKey === "ai";

        return (
          <Line
            key={`${a}-${b}-${index}`}
            points={[source.position, target.position]}
            color={related ? activeColor : "#64748b"}
            lineWidth={related ? 3.9 : 1.5}
            transparent
            opacity={related ? 0.92 : 0.32}
          />
        );
      })}

      <Line
        points={retrievalPath}
        color={activeKey === "evidence" || activeKey === "ai" ? "#22c55e" : "#60a5fa"}
        lineWidth={activeKey === "evidence" || activeKey === "ai" ? 5 : 3}
      />

      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.24}>
        <mesh ref={coreRef} position={[0.02, -0.02, 0.34]}>
          <sphereGeometry args={[0.43, 64, 64]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.72}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.15, 0, 0]} position={[0.02, -0.02, 0.34]}>
        <torusGeometry args={[0.76, 0.008, 16, 180]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.48} />
      </mesh>

      <mesh rotation={[0.55, Math.PI / 2.45, 0.18]} position={[0.02, -0.02, 0.34]}>
        <torusGeometry args={[1.18, 0.007, 16, 180]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.48} />
      </mesh>

      <mesh rotation={[0.2, 0.85, 0.85]} position={[0.02, -0.02, 0.34]}>
        <torusGeometry args={[1.55, 0.005, 16, 190]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.32} />
      </mesh>

      {neuralNodes.map((node, index) => {
        const active = activeKey === node.key || (activeKey === "ai" && node.key === "ai");

        return (
          <Float key={`${node.key}-${index}`} speed={1.06 + index * 0.03} rotationIntensity={0.16} floatIntensity={0.24}>
            <mesh position={node.position}>
              <sphereGeometry args={[active ? node.size * 1.55 : node.size, 30, 30]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={active ? 1.2 : 0.42}
                metalness={0.55}
                roughness={0.16}
              />
            </mesh>
          </Float>
        );
      })}

      <group ref={tokenRingRef}>
        {tokenParticles.map((particle) => (
          <mesh key={particle.id} position={particle.position}>
            <sphereGeometry args={[particle.size, 10, 10]} />
            <meshStandardMaterial
              color={particle.color}
              emissive={particle.color}
              emissiveIntensity={0.58}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {promptCards.map((card, index) => {
        const active =
          (index === 0 && activeKey === "overview") ||
          (index === 1 && activeKey === "evidence") ||
          (index === 2 && activeKey === "supply") ||
          (index === 3 && activeKey === "roles") ||
          activeKey === "ai";

        return (
          <Float key={card.label} speed={1.08 + index * 0.05} rotationIntensity={0.05} floatIntensity={0.12}>
            <group position={[card.x, card.y, 0.18]}>
              <mesh>
                <boxGeometry args={[0.48, 0.25, 0.04]} />
                <meshStandardMaterial
                  color={active ? card.color : "#e2e8f0"}
                  emissive={active ? card.color : "#64748b"}
                  emissiveIntensity={active ? 0.68 : 0.08}
                  transparent
                  opacity={active ? 0.92 : 0.42}
                />
              </mesh>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export default function PortfolioAIScene({ activeKey }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 5]} intensity={2.25} color="#8b5cf6" />
        <pointLight position={[-3, -2, 4]} intensity={1.55} color="#60a5fa" />
        <pointLight position={[1.5, -3, 3]} intensity={1.1} color="#22c55e" />
        <Stars radius={90} depth={45} count={760} factor={2.1} fade speed={0.18} />
        <PortfolioAIWorld activeKey={activeKey} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.75} intensity={0.52} />
          <Vignette eskil={false} offset={0.48} darkness={0.18} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_58%_52%,rgba(37,99,235,0.10),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(34,197,94,0.10),transparent_30%)]" />
      <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-white via-white/96 to-white/35" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-white via-white/82 to-transparent" />
    </div>
  );
}