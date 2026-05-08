"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type RegressionFlowKey =
  | "goldCsv"
  | "fred"
  | "alignment"
  | "matrix"
  | "regression"
  | "coefficients"
  | "dashboard"
  | "statistics"
  | "charts";

type SceneProps = {
  activeKey: RegressionFlowKey;
};

function MatrixGrid({ activeKey }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const cells = useMemo(() => {
    const output: { id: string; x: number; y: number; z: number; intensity: number }[] = [];

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 9; col++) {
        output.push({
          id: `${row}-${col}`,
          x: -2.1 + col * 0.32,
          y: -1.05 + row * 0.28,
          z: -0.05,
          intensity: ((row * col + col) % 5) / 5
        });
      }
    }

    return output;
  }, []);

  const coefficientBars = useMemo(() => {
    return [0.38, 0.92, 0.62, 1.12, 0.54, 0.78, 0.42, 1.0, 0.66];
  }, []);

  const goldLine = useMemo(() => {
    return [
      [-2.35, -1.15, 0.18],
      [-1.8, -0.9, 0.18],
      [-1.25, -0.72, 0.18],
      [-0.7, -0.3, 0.18],
      [-0.15, -0.42, 0.18],
      [0.4, 0.05, 0.18],
      [0.95, 0.42, 0.18],
      [1.5, 0.75, 0.18],
      [2.15, 1.05, 0.18]
    ] as [number, number, number][];
  }, []);

  const regressionLine = useMemo(() => {
    return [
      [-2.35, -0.85, 0.22],
      [-1.8, -0.68, 0.22],
      [-1.25, -0.5, 0.22],
      [-0.7, -0.31, 0.22],
      [-0.15, -0.12, 0.22],
      [0.4, 0.08, 0.22],
      [0.95, 0.3, 0.22],
      [1.5, 0.52, 0.22],
      [2.15, 0.78, 0.22]
    ] as [number, number, number][];
  }, []);

  const signalStreams = useMemo(() => {
    return [
      [
        [-3.0, 1.45, -0.3],
        [-2.25, 1.18, -0.2],
        [-1.55, 0.92, -0.1],
        [-0.9, 0.55, 0]
      ],
      [
        [-3.0, 0.95, -0.35],
        [-2.2, 0.7, -0.2],
        [-1.35, 0.4, -0.1],
        [-0.62, 0.16, 0]
      ],
      [
        [-3.0, 0.42, -0.35],
        [-2.05, 0.2, -0.2],
        [-1.25, 0.0, -0.1],
        [-0.48, -0.12, 0]
      ]
    ] as [number, number, number][][];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.13;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.045;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.04;
  });

  const matrixActive = activeKey === "matrix" || activeKey === "goldCsv" || activeKey === "fred";
  const regressionActive = activeKey === "regression" || activeKey === "statistics";
  const coeffActive = activeKey === "coefficients";
  const dashboardActive = activeKey === "dashboard" || activeKey === "charts";

  return (
    <group ref={groupRef} position={[1.2, 0.05, 0]} scale={0.96}>
      <mesh position={[0, 0.15, -0.14]}>
        <boxGeometry args={[6.4, 3.4, 0.08]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.23} emissive="#dbeafe" emissiveIntensity={0.08} />
      </mesh>

      {cells.map((cell, index) => (
        <mesh key={cell.id} position={[cell.x, cell.y, cell.z]}>
          <boxGeometry args={[0.22, 0.16, 0.03]} />
          <meshStandardMaterial
            color={matrixActive ? "#2563eb" : "#94a3b8"}
            emissive={matrixActive ? "#2563eb" : "#64748b"}
            emissiveIntensity={matrixActive ? 0.22 + cell.intensity * 0.55 : 0.08 + cell.intensity * 0.15}
            transparent
            opacity={matrixActive ? 0.55 + cell.intensity * 0.35 : 0.26}
          />
        </mesh>
      ))}

      {signalStreams.map((stream, index) => (
        <Line
          key={index}
          points={stream}
          color={activeKey === "fred" ? "#2563eb" : "#38bdf8"}
          lineWidth={activeKey === "fred" ? 4 : 2}
          transparent
          opacity={activeKey === "fred" ? 0.95 : 0.45}
        />
      ))}

      <Line
        points={goldLine}
        color={activeKey === "goldCsv" || dashboardActive ? "#eab308" : "#facc15"}
        lineWidth={activeKey === "goldCsv" || dashboardActive ? 5 : 3}
      />

      <Line
        points={regressionLine}
        color={regressionActive ? "#0f172a" : "#2563eb"}
        lineWidth={regressionActive ? 5 : 3}
      />

      <mesh position={[0.05, 0.1, 0.04]} rotation={[-0.25, 0.08, -0.18]}>
        <planeGeometry args={[4.8, 2.2, 1, 1]} />
        <meshStandardMaterial
          color={regressionActive ? "#60a5fa" : "#93c5fd"}
          transparent
          opacity={regressionActive ? 0.22 : 0.1}
          side={THREE.DoubleSide}
          emissive="#60a5fa"
          emissiveIntensity={regressionActive ? 0.18 : 0.06}
        />
      </mesh>

      <group position={[2.55, -1.15, 0.26]}>
        {coefficientBars.map((height, index) => (
          <Float key={index} speed={1.2 + index * 0.03} rotationIntensity={0.05} floatIntensity={0.1}>
            <mesh position={[index * 0.16, height / 2, 0]}>
              <boxGeometry args={[0.08, height, 0.08]} />
              <meshStandardMaterial
                color={coeffActive ? "#facc15" : "#2563eb"}
                emissive={coeffActive ? "#facc15" : "#2563eb"}
                emissiveIntensity={coeffActive ? 0.72 : 0.28}
                metalness={0.35}
                roughness={0.2}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <Float speed={1.35} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh position={[2.3, 1.12, 0.25]}>
          <sphereGeometry args={[0.13, 32, 32]} />
          <meshStandardMaterial
            color={dashboardActive ? "#facc15" : "#2563eb"}
            emissive={dashboardActive ? "#facc15" : "#2563eb"}
            emissiveIntensity={0.9}
            metalness={0.7}
            roughness={0.16}
          />
        </mesh>
      </Float>

      <Float speed={1.15} rotationIntensity={0.25} floatIntensity={0.25}>
        <mesh position={[-2.75, 1.48, 0.12]}>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial
            color={activeKey === "fred" ? "#2563eb" : "#60a5fa"}
            emissive={activeKey === "fred" ? "#2563eb" : "#60a5fa"}
            emissiveIntensity={activeKey === "fred" ? 0.9 : 0.45}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.3}>
        <mesh position={[-2.5, -1.25, 0.14]}>
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshStandardMaterial
            color={activeKey === "goldCsv" ? "#facc15" : "#eab308"}
            emissive={activeKey === "goldCsv" ? "#facc15" : "#eab308"}
            emissiveIntensity={activeKey === "goldCsv" ? 0.95 : 0.42}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function GoldRegressionScene({ activeKey }: SceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.45], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.72} />
        <pointLight position={[4, 4, 5]} intensity={2.1} color="#facc15" />
        <pointLight position={[-3.5, -2, 4]} intensity={1.25} color="#2563eb" />
        <pointLight position={[1.5, -3, 3]} intensity={0.65} color="#22c55e" />
        <Stars radius={90} depth={45} count={520} factor={2} fade speed={0.16} />
        <MatrixGrid activeKey={activeKey} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.75} intensity={0.2} />
          <Vignette eskil={false} offset={0.55} darkness={0.08} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_60%_56%,rgba(37,99,235,0.08),transparent_32%)]" />
      <div className="absolute inset-y-0 left-0 w-[57%] bg-gradient-to-r from-white via-white/95 to-white/42" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
}