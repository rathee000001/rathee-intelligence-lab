"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type MetaFlowKey =
  | "context"
  | "leadership"
  | "culture"
  | "ethics"
  | "privacy"
  | "regulation"
  | "stakeholders"
  | "problem"
  | "recommendations"
  | "report"
  | "presentation";

type SceneProps = {
  activeKey: MetaFlowKey;
};

function MetaCaseWorld({ activeKey }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const networkNodes = useMemo(() => {
    return [
      { key: "context", x: -2.25, y: 0.95, color: "#2563eb" },
      { key: "leadership", x: -1.45, y: 0.35, color: "#7c3aed" },
      { key: "culture", x: -0.65, y: 0.82, color: "#16a34a" },
      { key: "ethics", x: 0.05, y: 0.22, color: "#f59e0b" },
      { key: "privacy", x: 0.75, y: 0.9, color: "#0ea5e9" },
      { key: "regulation", x: 1.5, y: 0.28, color: "#ef4444" },
      { key: "stakeholders", x: 2.25, y: 0.78, color: "#22c55e" }
    ] as { key: MetaFlowKey; x: number; y: number; color: string }[];
  }, []);

  const issuePath = useMemo(() => {
    return [
      [-2.55, -0.72, 0.24],
      [-1.95, -0.45, 0.25],
      [-1.3, -0.25, 0.24],
      [-0.65, -0.06, 0.25],
      [0.02, -0.18, 0.24],
      [0.7, -0.38, 0.25],
      [1.35, -0.54, 0.24],
      [2.1, -0.78, 0.25]
    ] as [number, number, number][];
  }, []);

  const recommendationPath = useMemo(() => {
    return [
      [-2.25, 1.35, 0.2],
      [-1.55, 1.12, 0.22],
      [-0.82, 0.82, 0.2],
      [-0.05, 0.48, 0.22],
      [0.72, 0.18, 0.2],
      [1.48, -0.18, 0.22],
      [2.32, -0.52, 0.2]
    ] as [number, number, number][];
  }, []);

  const decisionBars = useMemo(() => [0.35, 0.68, 0.52, 0.95, 0.74, 1.12], []);

  const documentCards = useMemo(() => {
    return [
      { key: "report", x: 2.28, y: 1.25, color: "#2563eb" },
      { key: "presentation", x: 2.68, y: 0.88, color: "#f59e0b" },
      { key: "recommendations", x: -2.55, y: -1.18, color: "#16a34a" }
    ] as { key: MetaFlowKey; x: number; y: number; color: string }[];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.13) * 0.035;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.035;
  });

  const governanceActive =
    activeKey === "leadership" ||
    activeKey === "culture" ||
    activeKey === "ethics" ||
    activeKey === "privacy" ||
    activeKey === "regulation";

  const stakeholderActive = activeKey === "stakeholders" || activeKey === "context";
  const issueActive = activeKey === "problem";
  const recommendationActive = activeKey === "recommendations";
  const docActive = activeKey === "report" || activeKey === "presentation";

  return (
    <group ref={groupRef} position={[1.15, 0.05, 0]} scale={0.97}>
      <mesh position={[0, 0.08, -0.18]}>
        <boxGeometry args={[6.55, 3.45, 0.08]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.25} emissive="#dbeafe" emissiveIntensity={0.08} />
      </mesh>

      {networkNodes.map((node, index) => {
        const active = activeKey === node.key || governanceActive || stakeholderActive;

        return (
          <Float key={node.key} speed={1.12 + index * 0.04} rotationIntensity={0.18} floatIntensity={0.24}>
            <mesh position={[node.x, node.y, 0.2]}>
              <sphereGeometry args={[activeKey === node.key ? 0.15 : 0.105, 28, 28]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={active ? 0.82 : 0.35}
                metalness={0.42}
                roughness={0.2}
              />
            </mesh>
          </Float>
        );
      })}

      {networkNodes.slice(0, -1).map((node, index) => {
        const next = networkNodes[index + 1];
        return (
          <Line
            key={`${node.key}-${next.key}`}
            points={[
              [node.x, node.y, 0.08],
              [next.x, next.y, 0.08]
            ]}
            color={governanceActive ? "#2563eb" : "#94a3b8"}
            lineWidth={governanceActive ? 3.8 : 2}
            transparent
            opacity={governanceActive ? 0.9 : 0.45}
          />
        );
      })}

      <Line
        points={issuePath}
        color={issueActive ? "#ef4444" : "#facc15"}
        lineWidth={issueActive ? 5 : 3}
      />

      <Line
        points={recommendationPath}
        color={recommendationActive ? "#16a34a" : "#60a5fa"}
        lineWidth={recommendationActive ? 5 : 3}
      />

      <mesh position={[0.06, -0.08, 0.04]} rotation={[-0.2, 0.08, -0.16]}>
        <planeGeometry args={[4.9, 2.2, 1, 1]} />
        <meshStandardMaterial
          color={governanceActive ? "#dbeafe" : "#fef3c7"}
          transparent
          opacity={governanceActive ? 0.18 : 0.1}
          side={THREE.DoubleSide}
          emissive={governanceActive ? "#2563eb" : "#facc15"}
          emissiveIntensity={governanceActive ? 0.12 : 0.06}
        />
      </mesh>

      <group position={[2.15, -1.18, 0.24]}>
        {decisionBars.map((height, index) => (
          <Float key={index} speed={1.05 + index * 0.04} rotationIntensity={0.05} floatIntensity={0.12}>
            <mesh position={[index * 0.18, height / 2, 0]}>
              <boxGeometry args={[0.09, height, 0.08]} />
              <meshStandardMaterial
                color={recommendationActive ? "#16a34a" : "#93c5fd"}
                emissive={recommendationActive ? "#16a34a" : "#60a5fa"}
                emissiveIntensity={recommendationActive ? 0.72 : 0.25}
                metalness={0.32}
                roughness={0.22}
              />
            </mesh>
          </Float>
        ))}
      </group>

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
        <mesh position={[-2.68, 1.28, 0.2]}>
          <sphereGeometry args={[activeKey === "context" ? 0.14 : 0.11, 28, 28]} />
          <meshStandardMaterial
            color={activeKey === "context" ? "#2563eb" : "#facc15"}
            emissive={activeKey === "context" ? "#2563eb" : "#facc15"}
            emissiveIntensity={activeKey === "context" ? 0.9 : 0.45}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function MetaCaseScene({ activeKey }: SceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.74} />
        <pointLight position={[4, 4, 5]} intensity={1.85} color="#facc15" />
        <pointLight position={[-3.5, -2, 4]} intensity={1.18} color="#2563eb" />
        <pointLight position={[1.5, -3, 3]} intensity={0.82} color="#16a34a" />
        <Stars radius={90} depth={45} count={460} factor={2} fade speed={0.14} />
        <MetaCaseWorld activeKey={activeKey} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.75} intensity={0.18} />
          <Vignette eskil={false} offset={0.55} darkness={0.08} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(37,99,235,0.10),transparent_28%),radial-gradient(circle_at_60%_56%,rgba(124,58,237,0.08),transparent_32%)]" />
      <div className="absolute inset-y-0 left-0 w-[57%] bg-gradient-to-r from-white via-white/95 to-white/42" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
}