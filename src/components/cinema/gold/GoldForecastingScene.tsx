"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type GoldFlowKey =
  | "data"
  | "alpha"
  | "beta"
  | "delta"
  | "epsilon"
  | "gamma"
  | "omega"
  | "final"
  | "ai"
  | "sql"
  | "rag";

type SceneProps = {
  activeKey: GoldFlowKey;
};

const candles = [
  { x: -2.4, open: -0.5, close: -0.2, high: 0.15, low: -0.75, up: true },
  { x: -1.85, open: -0.25, close: -0.7, high: 0.05, low: -0.95, up: false },
  { x: -1.3, open: -0.65, close: 0.05, high: 0.38, low: -0.85, up: true },
  { x: -0.75, open: -0.05, close: 0.45, high: 0.75, low: -0.25, up: true },
  { x: -0.2, open: 0.4, close: 0.1, high: 0.62, low: -0.12, up: false },
  { x: 0.35, open: 0.15, close: 0.78, high: 1.0, low: -0.04, up: true },
  { x: 0.9, open: 0.78, close: 1.05, high: 1.28, low: 0.52, up: true },
  { x: 1.45, open: 1.0, close: 0.72, high: 1.22, low: 0.48, up: false },
  { x: 2.0, open: 0.75, close: 1.35, high: 1.55, low: 0.58, up: true }
];

function Candle({ candle, active }: { candle: (typeof candles)[number]; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const color = candle.up ? "#22c55e" : "#ef4444";
  const bodyCenter = (candle.open + candle.close) / 2;
  const bodyHeight = Math.max(Math.abs(candle.close - candle.open), 0.08);
  const wickCenter = (candle.high + candle.low) / 2;
  const wickHeight = candle.high - candle.low;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const pulse = active ? 1.08 + Math.sin(state.clock.elapsedTime * 4) * 0.03 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), delta * 6);
  });

  return (
    <group ref={groupRef} position={[candle.x, 0, 0]}>
      <mesh position={[0, wickCenter, 0]}>
        <boxGeometry args={[0.035, wickHeight, 0.04]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.7 : 0.28} />
      </mesh>
      <mesh position={[0, bodyCenter, 0]}>
        <boxGeometry args={[0.22, bodyHeight, 0.08]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.72 : 0.3} />
      </mesh>
    </group>
  );
}

function ForecastChart({ activeKey }: SceneProps) {
  const chartRef = useRef<THREE.Group>(null);

  const forecastPoints = useMemo(() => {
    return [
      [-2.55, -0.55, 0.05],
      [-2.0, -0.45, 0.06],
      [-1.45, -0.2, 0.08],
      [-0.9, 0.12, 0.1],
      [-0.35, 0.32, 0.12],
      [0.2, 0.48, 0.1],
      [0.75, 0.82, 0.08],
      [1.3, 1.05, 0.06],
      [1.95, 1.28, 0.05],
      [2.45, 1.48, 0.03]
    ] as [number, number, number][];
  }, []);

  const gridLines = useMemo(() => {
    const lines: [number, number, number][][] = [];
    for (let i = 0; i < 6; i++) {
      const y = -0.9 + i * 0.45;
      lines.push([
        [-2.8, y, -0.04],
        [2.8, y, -0.04]
      ]);
    }
    for (let i = 0; i < 7; i++) {
      const x = -2.7 + i * 0.9;
      lines.push([
        [x, -1.05, -0.04],
        [x, 1.6, -0.04]
      ]);
    }
    return lines;
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 140 }, (_, index) => {
      const angle = index * 0.48;
      const radius = 2.4 + ((index * 19) % 110) / 72;
      const y = -1.8 + ((index * 13) % 150) / 44;
      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius - 0.4
        ] as [number, number, number],
        size: 0.01 + (index % 4) * 0.006
      };
    });
  }, []);

  useFrame((state) => {
    if (!chartRef.current) return;
    chartRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    chartRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.04;
    chartRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
  });

  const lineGold = activeKey === "final" || activeKey === "ai" || activeKey === "omega";

  return (
    <group ref={chartRef} position={[1.2, 0.05, 0]} scale={0.96}>
      <mesh position={[0, 0.25, -0.1]}>
        <boxGeometry args={[6.2, 3.1, 0.08]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.22} emissive="#dbeafe" emissiveIntensity={0.1} />
      </mesh>

      {gridLines.map((line, index) => (
        <Line key={index} points={line} color="#94a3b8" transparent opacity={0.28} lineWidth={1} />
      ))}

      {candles.map((candle, index) => (
        <Candle key={index} candle={candle} active={activeKey === "data" || activeKey === "final"} />
      ))}

      <Line
        points={forecastPoints}
        color={lineGold ? "#facc15" : "#2563eb"}
        lineWidth={lineGold ? 5 : 3.5}
      />

      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh position={[2.48, 1.48, 0.03]}>
          <sphereGeometry args={[0.1, 28, 28]} />
          <meshStandardMaterial color="#2563eb" emissive="#2563eb" emissiveIntensity={0.9} metalness={0.7} roughness={0.16} />
        </mesh>
      </Float>

      <group position={[2.15, -0.88, 0.16]}>
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <mesh key={`${row}-${col}`} position={[col * 0.16, row * 0.16, 0]}>
              <boxGeometry args={[0.11, 0.11, 0.025]} />
              <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={activeKey === "sql" ? 0.75 : 0.28} />
            </mesh>
          ))
        )}
      </group>

      <group position={[-2.45, -0.9, 0.16]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, i * 0.15, 0]}>
            <boxGeometry args={[0.55 + i * 0.08, 0.055, 0.025]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={activeKey === "rag" ? 0.8 : 0.3} />
          </mesh>
        ))}
      </group>

      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 10, 10]} />
          <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.5} transparent opacity={0.72} />
        </mesh>
      ))}
    </group>
  );
}

export default function GoldForecastingScene({ activeKey }: SceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.35], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 4, 5]} intensity={2.15} color="#facc15" />
        <pointLight position={[-3, -2, 4]} intensity={1.15} color="#2563eb" />
        <Stars radius={90} depth={45} count={600} factor={2.1} fade speed={0.18} />
        <ForecastChart activeKey={activeKey} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.75} intensity={0.22} />
          <Vignette eskil={false} offset={0.5} darkness={0.1} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_20%,rgba(250,204,21,0.14),transparent_28%),radial-gradient(circle_at_62%_54%,rgba(37,99,235,0.08),transparent_30%)]" />
      <div className="absolute inset-y-0 left-0 w-[57%] bg-gradient-to-r from-white via-white/95 to-white/45" />
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
}