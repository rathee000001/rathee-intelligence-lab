"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type SECFlowKey =
  | "filing"
  | "statements"
  | "excel"
  | "ratios"
  | "liquidity"
  | "profitability"
  | "leverage"
  | "trend"
  | "report"
  | "presentation"
  | "decision";

type SceneProps = {
  activeKey: SECFlowKey;
};

function FinancialStatementWorld({ activeKey }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const statementCells = useMemo(() => {
    return Array.from({ length: 84 }, (_, index) => ({
      id: index,
      x: -2.55 + (index % 12) * 0.24,
      y: -1.08 + Math.floor(index / 12) * 0.22,
      value: ((index + 5) * 11) % 9
    }));
  }, []);

  const ratioBars = useMemo(() => [0.42, 0.76, 0.54, 1.02, 0.68, 0.92, 0.5], []);

  const incomeLine = useMemo(() => {
    return [
      [-2.48, 1.02, 0.22],
      [-1.9, 0.88, 0.22],
      [-1.32, 0.98, 0.22],
      [-0.74, 0.72, 0.22],
      [-0.16, 0.84, 0.22],
      [0.42, 0.5, 0.22],
      [1.0, 0.66, 0.22],
      [1.58, 0.4, 0.22],
      [2.28, 0.52, 0.22]
    ] as [number, number, number][];
  }, []);

  const analysisPath = useMemo(() => {
    return [
      [-2.62, -0.9, 0.24],
      [-2.02, -0.58, 0.24],
      [-1.35, -0.22, 0.26],
      [-0.72, 0.02, 0.24],
      [-0.05, 0.22, 0.25],
      [0.65, 0.18, 0.24],
      [1.28, -0.04, 0.25],
      [1.92, -0.32, 0.24],
      [2.52, -0.68, 0.22]
    ] as [number, number, number][];
  }, []);

  const documentCards = useMemo(() => {
    return [
      { key: "filing", x: -2.72, y: 1.25, color: "#2563eb" },
      { key: "report", x: 2.22, y: 1.2, color: "#16a34a" },
      { key: "presentation", x: 2.65, y: 0.78, color: "#f59e0b" }
    ] as { key: SECFlowKey; x: number; y: number; color: string }[];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.13) * 0.035;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.035;
  });

  const dataActive = activeKey === "filing" || activeKey === "statements" || activeKey === "excel";
  const ratioActive =
    activeKey === "ratios" ||
    activeKey === "liquidity" ||
    activeKey === "profitability" ||
    activeKey === "leverage";
  const trendActive = activeKey === "trend" || activeKey === "decision";
  const docActive = activeKey === "report" || activeKey === "presentation";

  return (
    <group ref={groupRef} position={[1.15, 0.05, 0]} scale={0.97}>
      <mesh position={[0, 0.08, -0.18]}>
        <boxGeometry args={[6.55, 3.45, 0.08]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.25} emissive="#dbeafe" emissiveIntensity={0.08} />
      </mesh>

      {statementCells.map((cell) => (
        <mesh key={cell.id} position={[cell.x, cell.y, -0.03]}>
          <boxGeometry args={[0.17, 0.14, 0.025]} />
          <meshStandardMaterial
            color={dataActive ? "#2563eb" : "#94a3b8"}
            emissive={dataActive ? "#2563eb" : "#64748b"}
            emissiveIntensity={dataActive ? 0.14 + cell.value * 0.04 : 0.07}
            transparent
            opacity={dataActive ? 0.52 + cell.value * 0.035 : 0.25}
          />
        </mesh>
      ))}

      <Line
        points={incomeLine}
        color={trendActive ? "#0f172a" : "#2563eb"}
        lineWidth={trendActive ? 5 : 3}
      />

      <Line
        points={analysisPath}
        color={ratioActive ? "#16a34a" : "#facc15"}
        lineWidth={ratioActive ? 5 : 3}
      />

      <group position={[2.18, -1.16, 0.24]}>
        {ratioBars.map((height, index) => (
          <Float key={index} speed={1.05 + index * 0.04} rotationIntensity={0.05} floatIntensity={0.12}>
            <mesh position={[index * 0.16, height / 2, 0]}>
              <boxGeometry args={[0.08, height, 0.08]} />
              <meshStandardMaterial
                color={ratioActive ? "#16a34a" : "#93c5fd"}
                emissive={ratioActive ? "#16a34a" : "#60a5fa"}
                emissiveIntensity={ratioActive ? 0.72 : 0.25}
                metalness={0.32}
                roughness={0.22}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <mesh position={[0.08, 0.05, 0.04]} rotation={[-0.22, 0.08, -0.16]}>
        <planeGeometry args={[4.9, 2.2, 1, 1]} />
        <meshStandardMaterial
          color={ratioActive ? "#bbf7d0" : "#93c5fd"}
          transparent
          opacity={ratioActive ? 0.2 : 0.1}
          side={THREE.DoubleSide}
          emissive={ratioActive ? "#22c55e" : "#60a5fa"}
          emissiveIntensity={ratioActive ? 0.14 : 0.06}
        />
      </mesh>

      {documentCards.map((doc) => {
        const active = activeKey === doc.key || docActive;

        return (
          <Float key={doc.key} speed={1.16} rotationIntensity={0.16} floatIntensity={0.24}>
            <mesh position={[doc.x, doc.y, 0.18]}>
              <boxGeometry args={[activeKey === doc.key ? 0.42 : 0.34, activeKey === doc.key ? 0.3 : 0.24, 0.05]} />
              <meshStandardMaterial
                color={active ? doc.color : "#ffffff"}
                emissive={active ? doc.color : "#94a3b8"}
                emissiveIntensity={active ? 0.72 : 0.12}
                transparent
                opacity={0.9}
              />
            </mesh>
          </Float>
        );
      })}

      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.28}>
        <mesh position={[-2.68, -1.24, 0.2]}>
          <sphereGeometry args={[activeKey === "decision" ? 0.14 : 0.11, 28, 28]} />
          <meshStandardMaterial
            color={activeKey === "decision" ? "#facc15" : "#2563eb"}
            emissive={activeKey === "decision" ? "#facc15" : "#2563eb"}
            emissiveIntensity={activeKey === "decision" ? 0.9 : 0.45}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function SEC10KScene({ activeKey }: SceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.74} />
        <pointLight position={[4, 4, 5]} intensity={1.85} color="#facc15" />
        <pointLight position={[-3.5, -2, 4]} intensity={1.18} color="#2563eb" />
        <pointLight position={[1.5, -3, 3]} intensity={0.82} color="#16a34a" />
        <Stars radius={90} depth={45} count={460} factor={2} fade speed={0.14} />
        <FinancialStatementWorld activeKey={activeKey} />
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