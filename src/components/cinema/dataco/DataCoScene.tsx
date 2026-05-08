"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type DataCoFlowKey =
  | "dataset"
  | "sales"
  | "profit"
  | "delivery"
  | "shipping"
  | "customer"
  | "segment"
  | "filters"
  | "story"
  | "tableau"
  | "presentation";

type SceneProps = {
  activeKey: DataCoFlowKey;
};

function SupplyChainDashboardWorld({ activeKey }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const dashboardTiles = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => ({
      id: index,
      x: -2.45 + (index % 4) * 0.48,
      y: -0.95 + Math.floor(index / 4) * 0.42,
      value: ((index + 3) * 7) % 10
    }));
  }, []);

  const routePoints = useMemo(() => {
    return [
      [-2.7, -1.15, 0.24],
      [-2.05, -0.72, 0.24],
      [-1.3, -0.42, 0.26],
      [-0.55, -0.08, 0.24],
      [0.18, 0.2, 0.25],
      [0.9, 0.42, 0.24],
      [1.62, 0.28, 0.25],
      [2.34, -0.18, 0.24]
    ] as [number, number, number][];
  }, []);

  const salesLine = useMemo(() => {
    return [
      [-2.45, 0.98, 0.2],
      [-1.85, 1.1, 0.22],
      [-1.25, 0.88, 0.2],
      [-0.65, 1.02, 0.22],
      [-0.05, 0.78, 0.2],
      [0.55, 0.86, 0.22],
      [1.15, 0.62, 0.2],
      [1.75, 0.5, 0.22],
      [2.35, 0.28, 0.2]
    ] as [number, number, number][];
  }, []);

  const segmentNodes = useMemo(() => {
    return [
      { key: "customer", x: 1.15, y: 1.25, color: "#2563eb" },
      { key: "segment", x: 1.85, y: 0.82, color: "#8b5cf6" },
      { key: "filters", x: 2.28, y: 0.18, color: "#16a34a" }
    ] as { key: DataCoFlowKey; x: number; y: number; color: string }[];
  }, []);

  const bars = useMemo(() => {
    return [0.38, 0.82, 0.55, 1.08, 0.72, 0.95, 0.48, 1.18];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.11;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.13) * 0.035;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.035;
  });

  const dashboardActive = activeKey === "tableau" || activeKey === "story" || activeKey === "presentation";
  const salesActive = activeKey === "sales" || activeKey === "profit";
  const logisticsActive = activeKey === "delivery" || activeKey === "shipping";
  const customerActive = activeKey === "customer" || activeKey === "segment" || activeKey === "filters";
  const dataActive = activeKey === "dataset";

  return (
    <group ref={groupRef} position={[1.15, 0.05, 0]} scale={0.97}>
      <mesh position={[0, 0.08, -0.18]}>
        <boxGeometry args={[6.55, 3.45, 0.08]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.25} emissive="#dbeafe" emissiveIntensity={0.08} />
      </mesh>

      {dashboardTiles.map((tile) => (
        <mesh key={tile.id} position={[tile.x, tile.y, -0.03]}>
          <boxGeometry args={[0.34, 0.26, 0.035]} />
          <meshStandardMaterial
            color={dashboardActive || dataActive ? "#2563eb" : "#94a3b8"}
            emissive={dashboardActive || dataActive ? "#2563eb" : "#64748b"}
            emissiveIntensity={dashboardActive || dataActive ? 0.16 + tile.value * 0.035 : 0.08}
            transparent
            opacity={dashboardActive || dataActive ? 0.58 + tile.value * 0.025 : 0.28}
          />
        </mesh>
      ))}

      <Line
        points={salesLine}
        color={salesActive ? "#2563eb" : "#60a5fa"}
        lineWidth={salesActive ? 5 : 3}
      />

      <Line
        points={routePoints}
        color={logisticsActive ? "#16a34a" : "#facc15"}
        lineWidth={logisticsActive ? 5 : 3}
      />

      <group position={[2.18, -1.16, 0.24]}>
        {bars.map((height, index) => (
          <Float key={index} speed={1.05 + index * 0.04} rotationIntensity={0.05} floatIntensity={0.12}>
            <mesh position={[index * 0.16, height / 2, 0]}>
              <boxGeometry args={[0.08, height, 0.08]} />
              <meshStandardMaterial
                color={salesActive ? "#2563eb" : "#93c5fd"}
                emissive={salesActive ? "#2563eb" : "#60a5fa"}
                emissiveIntensity={salesActive ? 0.72 : 0.25}
                metalness={0.32}
                roughness={0.22}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.28}>
        <mesh position={[-2.68, 1.18, 0.2]}>
          <sphereGeometry args={[dataActive ? 0.14 : 0.11, 28, 28]} />
          <meshStandardMaterial
            color={dataActive ? "#facc15" : "#2563eb"}
            emissive={dataActive ? "#facc15" : "#2563eb"}
            emissiveIntensity={dataActive ? 0.9 : 0.45}
          />
        </mesh>
      </Float>

      <Float speed={1.28} rotationIntensity={0.2} floatIntensity={0.34}>
        <mesh position={[2.68, 1.24, 0.22]}>
          <sphereGeometry args={[dashboardActive ? 0.15 : 0.12, 30, 30]} />
          <meshStandardMaterial
            color={dashboardActive ? "#2563eb" : "#f59e0b"}
            emissive={dashboardActive ? "#2563eb" : "#f59e0b"}
            emissiveIntensity={dashboardActive ? 0.95 : 0.45}
            metalness={0.5}
            roughness={0.18}
          />
        </mesh>
      </Float>

      {segmentNodes.map((node) => {
        const active = activeKey === node.key || customerActive;

        return (
          <Float key={node.key} speed={1.16} rotationIntensity={0.18} floatIntensity={0.24}>
            <mesh position={[node.x, node.y, 0.18]}>
              <sphereGeometry args={[activeKey === node.key ? 0.14 : 0.105, 28, 28]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={active ? 0.82 : 0.36}
                metalness={0.42}
                roughness={0.2}
              />
            </mesh>
          </Float>
        );
      })}

      <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.28}>
        <mesh position={[-2.2, -1.28, 0.2]}>
          <boxGeometry args={[0.42, 0.28, 0.08]} />
          <meshStandardMaterial
            color={logisticsActive ? "#16a34a" : "#cbd5e1"}
            emissive={logisticsActive ? "#16a34a" : "#64748b"}
            emissiveIntensity={logisticsActive ? 0.68 : 0.12}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function DataCoScene({ activeKey }: SceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.74} />
        <pointLight position={[4, 4, 5]} intensity={1.85} color="#facc15" />
        <pointLight position={[-3.5, -2, 4]} intensity={1.18} color="#2563eb" />
        <pointLight position={[1.5, -3, 3]} intensity={0.82} color="#16a34a" />
        <Stars radius={90} depth={45} count={460} factor={2} fade speed={0.14} />
        <SupplyChainDashboardWorld activeKey={activeKey} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.75} intensity={0.18} />
          <Vignette eskil={false} offset={0.55} darkness={0.08} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(37,99,235,0.10),transparent_28%),radial-gradient(circle_at_60%_56%,rgba(22,163,74,0.08),transparent_32%)]" />
      <div className="absolute inset-y-0 left-0 w-[57%] bg-gradient-to-r from-white via-white/95 to-white/42" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
}