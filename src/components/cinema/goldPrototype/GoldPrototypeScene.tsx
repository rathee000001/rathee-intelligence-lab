"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type PrototypeFlowKey =
  | "overview"
  | "framework"
  | "excel"
  | "dashboard"
  | "past"
  | "future"
  | "summary"
  | "aiLog"
  | "spring2025";

type SceneProps = {
  activeKey: PrototypeFlowKey;
};

function PrototypeLab({ activeKey }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const sheetCells = useMemo(() => {
    const cells: { id: string; x: number; y: number; value: number }[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 10; col++) {
        cells.push({
          id: `${row}-${col}`,
          x: -2.25 + col * 0.28,
          y: -1.02 + row * 0.24,
          value: ((row + 2) * (col + 3)) % 7
        });
      }
    }

    return cells;
  }, []);

  const dashboardBars = useMemo(() => {
    return [0.42, 0.78, 0.52, 1.0, 0.68, 1.18, 0.85];
  }, []);

  const modelCurve = useMemo(() => {
    return [
      [-2.45, -0.75, 0.18],
      [-1.9, -0.55, 0.2],
      [-1.35, -0.35, 0.2],
      [-0.78, -0.12, 0.22],
      [-0.2, 0.1, 0.2],
      [0.38, 0.32, 0.22],
      [0.95, 0.5, 0.2],
      [1.55, 0.72, 0.2],
      [2.25, 0.92, 0.2]
    ] as [number, number, number][];
  }, []);

  const backtestCurve = useMemo(() => {
    return [
      [-2.4, -0.92, 0.25],
      [-1.8, -0.85, 0.25],
      [-1.2, -0.55, 0.25],
      [-0.6, -0.35, 0.25],
      [0.0, -0.05, 0.25],
      [0.6, 0.08, 0.25],
      [1.2, 0.28, 0.25],
      [1.8, 0.48, 0.25],
      [2.35, 0.68, 0.25]
    ] as [number, number, number][];
  }, []);

  const docCards = useMemo(() => {
    return [
      { x: -2.75, y: 1.3, label: "FW" },
      { x: -2.35, y: 1.0, label: "XL" },
      { x: -1.95, y: 1.28, label: "BT" },
      { x: 2.25, y: 1.32, label: "DB" },
      { x: 2.65, y: 1.0, label: "AI" }
    ];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.17) * 0.11;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.14) * 0.04;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.04;
  });

  const sheetActive = activeKey === "excel" || activeKey === "overview";
  const curveActive = activeKey === "framework" || activeKey === "summary";
  const dashboardActive = activeKey === "dashboard";
  const backtestActive = activeKey === "past" || activeKey === "future";
  const aiActive = activeKey === "aiLog";

  return (
    <group ref={groupRef} position={[1.15, 0.05, 0]} scale={0.96}>
      <mesh position={[0, 0.15, -0.14]}>
        <boxGeometry args={[6.45, 3.4, 0.08]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.24}
          emissive="#dbeafe"
          emissiveIntensity={0.08}
        />
      </mesh>

      {sheetCells.map((cell) => (
        <mesh key={cell.id} position={[cell.x, cell.y, -0.02]}>
          <boxGeometry args={[0.2, 0.15, 0.025]} />
          <meshStandardMaterial
            color={sheetActive ? "#16a34a" : "#94a3b8"}
            emissive={sheetActive ? "#16a34a" : "#64748b"}
            emissiveIntensity={sheetActive ? 0.16 + cell.value * 0.06 : 0.08}
            transparent
            opacity={sheetActive ? 0.55 + cell.value * 0.05 : 0.28}
          />
        </mesh>
      ))}

      <Line
        points={modelCurve}
        color={curveActive ? "#eab308" : "#2563eb"}
        lineWidth={curveActive ? 5 : 3}
      />

      <Line
        points={backtestCurve}
        color={backtestActive ? "#0f172a" : "#60a5fa"}
        lineWidth={backtestActive ? 4.5 : 2.5}
      />

      <group position={[2.15, -1.05, 0.24]}>
        {dashboardBars.map((height, index) => (
          <Float key={index} speed={1.1 + index * 0.03} rotationIntensity={0.05} floatIntensity={0.12}>
            <mesh position={[index * 0.18, height / 2, 0]}>
              <boxGeometry args={[0.09, height, 0.08]} />
              <meshStandardMaterial
                color={dashboardActive ? "#2563eb" : "#60a5fa"}
                emissive={dashboardActive ? "#2563eb" : "#60a5fa"}
                emissiveIntensity={dashboardActive ? 0.72 : 0.28}
                metalness={0.32}
                roughness={0.22}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <mesh position={[-0.15, 0.18, 0.04]} rotation={[-0.23, 0.08, -0.18]}>
        <planeGeometry args={[4.9, 2.2, 1, 1]} />
        <meshStandardMaterial
          color={curveActive ? "#fde68a" : "#93c5fd"}
          transparent
          opacity={curveActive ? 0.22 : 0.1}
          side={THREE.DoubleSide}
          emissive={curveActive ? "#facc15" : "#60a5fa"}
          emissiveIntensity={curveActive ? 0.14 : 0.06}
        />
      </mesh>

      {docCards.map((card, index) => {
        const isAi = card.label === "AI";
        const active =
          (card.label === "FW" && activeKey === "framework") ||
          (card.label === "XL" && activeKey === "excel") ||
          (card.label === "BT" && backtestActive) ||
          (card.label === "DB" && dashboardActive) ||
          (card.label === "AI" && aiActive);

        return (
          <Float key={card.label} speed={1.2 + index * 0.08} rotationIntensity={0.12} floatIntensity={0.22}>
            <mesh position={[card.x, card.y, 0.18]}>
              <boxGeometry args={[0.34, 0.24, 0.04]} />
              <meshStandardMaterial
                color={active ? (isAi ? "#22c55e" : "#facc15") : "#ffffff"}
                emissive={active ? (isAi ? "#22c55e" : "#facc15") : "#94a3b8"}
                emissiveIntensity={active ? 0.65 : 0.12}
                transparent
                opacity={0.88}
              />
            </mesh>
          </Float>
        );
      })}

      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.28}>
        <mesh position={[-2.7, -1.26, 0.16]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial
            color={activeKey === "spring2025" ? "#facc15" : "#eab308"}
            emissive={activeKey === "spring2025" ? "#facc15" : "#eab308"}
            emissiveIntensity={activeKey === "spring2025" ? 0.9 : 0.42}
          />
        </mesh>
      </Float>

      <Float speed={1.25} rotationIntensity={0.2} floatIntensity={0.32}>
        <mesh position={[2.62, 1.38, 0.2]}>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial
            color={aiActive ? "#22c55e" : "#60a5fa"}
            emissive={aiActive ? "#22c55e" : "#60a5fa"}
            emissiveIntensity={aiActive ? 0.9 : 0.42}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function GoldPrototypeScene({ activeKey }: SceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.45], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.72} />
        <pointLight position={[4, 4, 5]} intensity={2.05} color="#facc15" />
        <pointLight position={[-3.5, -2, 4]} intensity={1.18} color="#2563eb" />
        <pointLight position={[1.5, -3, 3]} intensity={0.65} color="#22c55e" />
        <Stars radius={90} depth={45} count={500} factor={2} fade speed={0.16} />
        <PrototypeLab activeKey={activeKey} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.75} intensity={0.2} />
          <Vignette eskil={false} offset={0.55} darkness={0.08} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_60%_56%,rgba(22,163,74,0.08),transparent_32%)]" />
      <div className="absolute inset-y-0 left-0 w-[57%] bg-gradient-to-r from-white via-white/95 to-white/42" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
}