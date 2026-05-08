"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type ChaptersFlowKey =
  | "mission"
  | "story"
  | "past"
  | "segmentation"
  | "target"
  | "positioning"
  | "usp"
  | "fundraiser"
  | "marketing"
  | "appeal"
  | "integration"
  | "cta"
  | "thankyou";

type SceneProps = {
  activeKey: ChaptersFlowKey;
};

function StoryCampaignWorld({ activeKey }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const pageStack = useMemo(() => {
    return Array.from({ length: 9 }, (_, index) => ({
      id: index,
      x: -2.2 + index * 0.18,
      y: -0.45 + index * 0.08,
      z: -0.08 + index * 0.018,
      rot: -0.18 + index * 0.025
    }));
  }, []);

  const audienceNodes = useMemo(() => {
    return [
      { key: "segmentation", x: 1.1, y: 1.05, color: "#2563eb" },
      { key: "target", x: 1.75, y: 0.52, color: "#16a34a" },
      { key: "positioning", x: 2.05, y: -0.15, color: "#f59e0b" },
      { key: "usp", x: 1.55, y: -0.82, color: "#7c3aed" }
    ] as { key: ChaptersFlowKey; x: number; y: number; color: string }[];
  }, []);

  const storyPath = useMemo(() => {
    return [
      [-2.35, -0.78, 0.2],
      [-1.75, -0.48, 0.22],
      [-1.1, -0.12, 0.25],
      [-0.42, 0.18, 0.22],
      [0.22, 0.35, 0.2],
      [0.9, 0.44, 0.24],
      [1.45, 0.36, 0.2],
      [2.12, 0.12, 0.22]
    ] as [number, number, number][];
  }, []);

  const fundraiserPath = useMemo(() => {
    return [
      [-2.2, 0.8, 0.18],
      [-1.45, 0.98, 0.2],
      [-0.72, 0.82, 0.22],
      [-0.08, 0.48, 0.25],
      [0.55, 0.18, 0.22],
      [1.18, -0.12, 0.2],
      [1.85, -0.42, 0.22],
      [2.45, -0.78, 0.2]
    ] as [number, number, number][];
  }, []);

  const marketingBars = useMemo(() => {
    return [0.28, 0.62, 0.42, 0.86, 0.56, 1.05, 0.72];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.11;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.13) * 0.035;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.035;
  });

  const storyActive = activeKey === "mission" || activeKey === "story" || activeKey === "past";
  const audienceActive =
    activeKey === "segmentation" ||
    activeKey === "target" ||
    activeKey === "positioning" ||
    activeKey === "usp";
  const campaignActive =
    activeKey === "fundraiser" ||
    activeKey === "marketing" ||
    activeKey === "appeal" ||
    activeKey === "integration" ||
    activeKey === "cta" ||
    activeKey === "thankyou";

  return (
    <group ref={groupRef} position={[1.15, 0.05, 0]} scale={0.97}>
      <mesh position={[0, 0.08, -0.18]}>
        <boxGeometry args={[6.55, 3.45, 0.08]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.24}
          emissive="#dbeafe"
          emissiveIntensity={0.08}
        />
      </mesh>

      {pageStack.map((page) => (
        <Float key={page.id} speed={1.15 + page.id * 0.03} rotationIntensity={0.06} floatIntensity={0.08}>
          <mesh position={[page.x, page.y, page.z]} rotation={[0.1, page.rot, -0.08]}>
            <boxGeometry args={[0.82, 1.08, 0.035]} />
            <meshStandardMaterial
              color={storyActive ? "#fef3c7" : "#ffffff"}
              emissive={storyActive ? "#facc15" : "#94a3b8"}
              emissiveIntensity={storyActive ? 0.2 : 0.06}
              transparent
              opacity={0.88}
            />
          </mesh>
        </Float>
      ))}

      <Line
        points={storyPath}
        color={storyActive ? "#facc15" : "#2563eb"}
        lineWidth={storyActive ? 5 : 3}
      />

      <Line
        points={fundraiserPath}
        color={campaignActive ? "#16a34a" : "#60a5fa"}
        lineWidth={campaignActive ? 5 : 3}
      />

      {audienceNodes.map((node) => {
        const active = activeKey === node.key || audienceActive;

        return (
          <Float key={node.key} speed={1.2} rotationIntensity={0.18} floatIntensity={0.24}>
            <mesh position={[node.x, node.y, 0.18]}>
              <sphereGeometry args={[activeKey === node.key ? 0.14 : 0.105, 28, 28]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={active ? 0.85 : 0.38}
                metalness={0.42}
                roughness={0.2}
              />
            </mesh>
          </Float>
        );
      })}

      <group position={[2.35, -1.18, 0.24]}>
        {marketingBars.map((height, index) => (
          <Float key={index} speed={1.1 + index * 0.03} rotationIntensity={0.05} floatIntensity={0.12}>
            <mesh position={[index * 0.18, height / 2, 0]}>
              <boxGeometry args={[0.09, height, 0.08]} />
              <meshStandardMaterial
                color={activeKey === "marketing" || activeKey === "cta" ? "#2563eb" : "#93c5fd"}
                emissive={activeKey === "marketing" || activeKey === "cta" ? "#2563eb" : "#60a5fa"}
                emissiveIntensity={activeKey === "marketing" || activeKey === "cta" ? 0.7 : 0.24}
                metalness={0.32}
                roughness={0.22}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <Float speed={1.28} rotationIntensity={0.2} floatIntensity={0.34}>
        <mesh position={[2.65, 1.18, 0.22]}>
          <sphereGeometry args={[0.14, 30, 30]} />
          <meshStandardMaterial
            color={activeKey === "cta" || activeKey === "thankyou" ? "#16a34a" : "#f59e0b"}
            emissive={activeKey === "cta" || activeKey === "thankyou" ? "#16a34a" : "#f59e0b"}
            emissiveIntensity={activeKey === "cta" || activeKey === "thankyou" ? 0.95 : 0.45}
            metalness={0.5}
            roughness={0.18}
          />
        </mesh>
      </Float>

      <Float speed={1.18} rotationIntensity={0.22} floatIntensity={0.28}>
        <mesh position={[-2.65, 1.16, 0.2]}>
          <sphereGeometry args={[0.12, 28, 28]} />
          <meshStandardMaterial
            color={activeKey === "mission" ? "#facc15" : "#2563eb"}
            emissive={activeKey === "mission" ? "#facc15" : "#2563eb"}
            emissiveIntensity={activeKey === "mission" ? 0.9 : 0.45}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function ChaptersScene({ activeKey }: SceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.74} />
        <pointLight position={[4, 4, 5]} intensity={1.85} color="#facc15" />
        <pointLight position={[-3.5, -2, 4]} intensity={1.18} color="#2563eb" />
        <pointLight position={[1.5, -3, 3]} intensity={0.82} color="#16a34a" />
        <Stars radius={90} depth={45} count={460} factor={2} fade speed={0.14} />
        <StoryCampaignWorld activeKey={activeKey} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.75} intensity={0.18} />
          <Vignette eskil={false} offset={0.55} darkness={0.08} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_60%_56%,rgba(22,163,74,0.08),transparent_32%)]" />
      <div className="absolute inset-y-0 left-0 w-[57%] bg-gradient-to-r from-white via-white/95 to-white/42" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
}