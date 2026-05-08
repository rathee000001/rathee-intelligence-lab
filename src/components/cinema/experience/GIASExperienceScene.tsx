"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type ExperienceCluster =
  | "operations"
  | "database"
  | "market"
  | "stakeholder"
  | "reporting"
  | "recommendation";

type Props = {
  activeKey: ExperienceCluster;
};

const colors: Record<ExperienceCluster, string> = {
  operations: "#16a34a",
  database: "#2563eb",
  market: "#f59e0b",
  stakeholder: "#8b5cf6",
  reporting: "#38bdf8",
  recommendation: "#facc15"
};

function GIASWorld({ activeKey }: Props) {
  const groupRef = useRef<THREE.Group>(null);

  const cityNodes = useMemo(() => {
    return [
      { key: "operations", position: [-2.35, 0.95, 0.12], color: "#16a34a" },
      { key: "database", position: [-1.28, 1.25, -0.04], color: "#2563eb" },
      { key: "market", position: [-0.25, 0.62, 0.16], color: "#f59e0b" },
      { key: "stakeholder", position: [0.85, 1.08, -0.04], color: "#8b5cf6" },
      { key: "reporting", position: [1.9, 0.45, 0.16], color: "#38bdf8" },
      { key: "recommendation", position: [1.25, -0.82, -0.04], color: "#facc15" },
      { key: "operations", position: [-1.62, -0.78, -0.04], color: "#16a34a" },
      { key: "database", position: [-0.16, -1.08, 0.14], color: "#2563eb" }
    ] as { key: ExperienceCluster; position: [number, number, number]; color: string }[];
  }, []);

  const routePath = useMemo(() => {
    return [
      [-2.62, -1.1, 0.22],
      [-2.0, -0.72, 0.24],
      [-1.35, -0.35, 0.24],
      [-0.7, -0.05, 0.26],
      [-0.08, 0.12, 0.24],
      [0.6, 0.08, 0.25],
      [1.25, -0.14, 0.24],
      [1.9, -0.42, 0.25],
      [2.48, -0.75, 0.22]
    ] as [number, number, number][];
  }, []);

  const marketLine = useMemo(() => {
    return [
      [-2.45, 1.02, 0.2],
      [-1.88, 0.82, 0.22],
      [-1.28, 0.98, 0.2],
      [-0.7, 0.72, 0.22],
      [-0.1, 0.84, 0.2],
      [0.5, 0.52, 0.22],
      [1.12, 0.66, 0.2],
      [1.72, 0.44, 0.22],
      [2.34, 0.55, 0.2]
    ] as [number, number, number][];
  }, []);

  const dataCells = useMemo(() => {
    const cells: { id: string; x: number; y: number; value: number }[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        cells.push({
          id: `${row}-${col}`,
          x: -2.75 + col * 0.24,
          y: -1.12 + row * 0.22,
          value: ((row + 4) * (col + 5)) % 10
        });
      }
    }

    return cells;
  }, []);

  const reportingBars = useMemo(() => [0.34, 0.66, 0.48, 0.92, 0.72, 1.08, 0.56], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.11;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.04;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.04;
  });

  const activeColor = colors[activeKey];

  return (
    <group ref={groupRef} position={[0.9, 0.02, 0]} scale={1.02}>
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

      {dataCells.map((cell) => (
        <mesh key={cell.id} position={[cell.x, cell.y, -0.2]}>
          <boxGeometry args={[0.15, 0.11, 0.018]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.06 + cell.value * 0.028}
            transparent
            opacity={0.08 + cell.value * 0.028}
          />
        </mesh>
      ))}

      <Line
        points={routePath}
        color={activeKey === "operations" || activeKey === "stakeholder" ? "#16a34a" : "#60a5fa"}
        lineWidth={activeKey === "operations" || activeKey === "stakeholder" ? 5 : 3}
      />

      <Line
        points={marketLine}
        color={activeKey === "market" ? "#f59e0b" : "#94a3b8"}
        lineWidth={activeKey === "market" ? 5 : 2.5}
      />

      {cityNodes.map((node, index) => {
        const active = activeKey === node.key;

        return (
          <Float key={`${node.key}-${index}`} speed={1.08 + index * 0.03} rotationIntensity={0.16} floatIntensity={0.24}>
            <mesh position={node.position}>
              <sphereGeometry args={[active ? 0.16 : 0.095, 30, 30]} />
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

      {cityNodes.map((node, index) => {
        const next = cityNodes[(index + 1) % cityNodes.length];
        const related = activeKey === node.key || activeKey === next.key;

        return (
          <Line
            key={`${node.key}-${next.key}-${index}`}
            points={[node.position, next.position]}
            color={related ? activeColor : "#64748b"}
            lineWidth={related ? 3.6 : 1.5}
            transparent
            opacity={related ? 0.92 : 0.32}
          />
        );
      })}

      <group position={[2.12, -1.17, 0.24]}>
        {reportingBars.map((height, index) => (
          <Float key={index} speed={1.05 + index * 0.04} rotationIntensity={0.05} floatIntensity={0.12}>
            <mesh position={[index * 0.18, height / 2, 0]}>
              <boxGeometry args={[0.09, height, 0.08]} />
              <meshStandardMaterial
                color={activeKey === "reporting" ? "#38bdf8" : "#93c5fd"}
                emissive={activeKey === "reporting" ? "#38bdf8" : "#60a5fa"}
                emissiveIntensity={activeKey === "reporting" ? 0.72 : 0.25}
                metalness={0.32}
                roughness={0.22}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <Float speed={1.18} rotationIntensity={0.18} floatIntensity={0.24}>
        <mesh position={[0.05, -0.02, 0.12]}>
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
    </group>
  );
}

export default function GIASExperienceScene({ activeKey }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.52} />
        <pointLight position={[4, 4, 5]} intensity={2.2} color="#60a5fa" />
        <pointLight position={[-3, -2, 4]} intensity={1.55} color="#facc15" />
        <pointLight position={[1.5, -3, 3]} intensity={1.1} color="#16a34a" />
        <Stars radius={90} depth={45} count={680} factor={2.1} fade speed={0.16} />
        <GIASWorld activeKey={activeKey} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.22} luminanceSmoothing={0.75} intensity={0.45} />
          <Vignette eskil={false} offset={0.48} darkness={0.18} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(15,23,42,0.18),transparent_30%),radial-gradient(circle_at_58%_52%,rgba(37,99,235,0.08),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(22,163,74,0.10),transparent_30%)]" />
      <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-white via-white/96 to-white/35" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-white via-white/82 to-transparent" />
    </div>
  );
}