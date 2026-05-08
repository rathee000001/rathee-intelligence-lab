"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type BookFairiesFlowKey =
  | "hero"
  | "about"
  | "progress"
  | "impact"
  | "partners"
  | "fundraiser"
  | "tiers"
  | "gallery"
  | "donate"
  | "contact"
  | "thankyou";

type SceneProps = {
  activeKey: BookFairiesFlowKey;
};

function FundraiserCampaignWorld({ activeKey }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const books = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => ({
      id: index,
      x: -2.65 + (index % 4) * 0.22,
      y: -1.08 + Math.floor(index / 4) * 0.22,
      z: -0.05 + index * 0.015,
      color: index % 3 === 0 ? "#2563eb" : index % 3 === 1 ? "#16a34a" : "#facc15"
    }));
  }, []);

  const progressRings = useMemo(() => {
    return [
      { x: 0.65, y: 0.96, color: "#2563eb", key: "progress" },
      { x: 1.22, y: 0.42, color: "#16a34a", key: "impact" },
      { x: 1.8, y: -0.15, color: "#8b5cf6", key: "progress" }
    ] as { x: number; y: number; color: string; key: BookFairiesFlowKey }[];
  }, []);

  const universityNodes = useMemo(() => {
    return [
      { x: -1.3, y: 1.1, color: "#2563eb" },
      { x: -0.75, y: 1.38, color: "#16a34a" },
      { x: -0.12, y: 1.12, color: "#f59e0b" }
    ];
  }, []);

  const donationBars = useMemo(() => {
    return [0.35, 0.72, 1.08];
  }, []);

  const bookPath = useMemo(() => {
    return [
      [-2.58, -0.78, 0.22],
      [-2.0, -0.45, 0.24],
      [-1.35, -0.12, 0.26],
      [-0.72, 0.16, 0.24],
      [-0.05, 0.34, 0.25],
      [0.62, 0.42, 0.24],
      [1.22, 0.3, 0.26],
      [1.95, -0.05, 0.24],
      [2.55, -0.42, 0.22]
    ] as [number, number, number][];
  }, []);

  const donationPath = useMemo(() => {
    return [
      [-2.25, 0.76, 0.18],
      [-1.55, 0.52, 0.2],
      [-0.85, 0.18, 0.22],
      [-0.18, -0.02, 0.22],
      [0.48, -0.2, 0.24],
      [1.15, -0.34, 0.22],
      [1.84, -0.58, 0.2],
      [2.45, -0.92, 0.18]
    ] as [number, number, number][];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.11;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.13) * 0.035;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.32) * 0.035;
  });

  const storyActive = activeKey === "hero" || activeKey === "about" || activeKey === "gallery";
  const progressActive = activeKey === "progress" || activeKey === "impact";
  const partnerActive = activeKey === "partners";
  const fundraiserActive = activeKey === "fundraiser" || activeKey === "tiers" || activeKey === "donate";
  const contactActive = activeKey === "contact" || activeKey === "thankyou";

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

      {books.map((book) => (
        <Float key={book.id} speed={1.1 + book.id * 0.03} rotationIntensity={0.05} floatIntensity={0.1}>
          <mesh position={[book.x, book.y, book.z]} rotation={[0.08, -0.18, -0.1]}>
            <boxGeometry args={[0.16, 0.52, 0.06]} />
            <meshStandardMaterial
              color={storyActive ? book.color : "#cbd5e1"}
              emissive={storyActive ? book.color : "#64748b"}
              emissiveIntensity={storyActive ? 0.28 : 0.08}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      ))}

      <Line
        points={bookPath}
        color={storyActive ? "#2563eb" : "#60a5fa"}
        lineWidth={storyActive ? 5 : 3}
      />

      <Line
        points={donationPath}
        color={fundraiserActive ? "#16a34a" : "#facc15"}
        lineWidth={fundraiserActive ? 5 : 3}
      />

      {progressRings.map((ring, index) => {
        const active = activeKey === ring.key || progressActive;

        return (
          <Float key={index} speed={1.1 + index * 0.12} rotationIntensity={0.22} floatIntensity={0.24}>
            <group position={[ring.x, ring.y, 0.2]}>
              <mesh>
                <torusGeometry args={[active ? 0.18 : 0.15, 0.015, 16, 72]} />
                <meshStandardMaterial
                  color={ring.color}
                  emissive={ring.color}
                  emissiveIntensity={active ? 0.85 : 0.35}
                  metalness={0.4}
                  roughness={0.2}
                />
              </mesh>
              <mesh>
                <sphereGeometry args={[0.045, 20, 20]} />
                <meshStandardMaterial
                  color={ring.color}
                  emissive={ring.color}
                  emissiveIntensity={active ? 0.9 : 0.4}
                />
              </mesh>
            </group>
          </Float>
        );
      })}

      {universityNodes.map((node, index) => (
        <Float key={index} speed={1.18 + index * 0.08} rotationIntensity={0.18} floatIntensity={0.26}>
          <mesh position={[node.x, node.y, 0.2]}>
            <sphereGeometry args={[partnerActive ? 0.14 : 0.1, 28, 28]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={partnerActive ? 0.85 : 0.38}
              metalness={0.4}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      <group position={[2.28, -1.16, 0.24]}>
        {donationBars.map((height, index) => (
          <Float key={index} speed={1.05 + index * 0.04} rotationIntensity={0.05} floatIntensity={0.12}>
            <mesh position={[index * 0.22, height / 2, 0]}>
              <boxGeometry args={[0.12, height, 0.09]} />
              <meshStandardMaterial
                color={fundraiserActive ? "#16a34a" : "#93c5fd"}
                emissive={fundraiserActive ? "#16a34a" : "#60a5fa"}
                emissiveIntensity={fundraiserActive ? 0.7 : 0.25}
                metalness={0.32}
                roughness={0.22}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <Float speed={1.28} rotationIntensity={0.2} floatIntensity={0.34}>
        <mesh position={[2.65, 1.18, 0.22]}>
          <sphereGeometry args={[contactActive ? 0.15 : 0.12, 30, 30]} />
          <meshStandardMaterial
            color={contactActive ? "#16a34a" : "#f59e0b"}
            emissive={contactActive ? "#16a34a" : "#f59e0b"}
            emissiveIntensity={contactActive ? 0.95 : 0.45}
            metalness={0.5}
            roughness={0.18}
          />
        </mesh>
      </Float>

      <Float speed={1.18} rotationIntensity={0.2} floatIntensity={0.28}>
        <mesh position={[-2.68, 1.2, 0.2]}>
          <sphereGeometry args={[activeKey === "hero" ? 0.14 : 0.11, 28, 28]} />
          <meshStandardMaterial
            color={activeKey === "hero" ? "#facc15" : "#2563eb"}
            emissive={activeKey === "hero" ? "#facc15" : "#2563eb"}
            emissiveIntensity={activeKey === "hero" ? 0.9 : 0.45}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function BookFairiesScene({ activeKey }: SceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.74} />
        <pointLight position={[4, 4, 5]} intensity={1.85} color="#facc15" />
        <pointLight position={[-3.5, -2, 4]} intensity={1.18} color="#2563eb" />
        <pointLight position={[1.5, -3, 3]} intensity={0.82} color="#16a34a" />
        <Stars radius={90} depth={45} count={460} factor={2} fade speed={0.14} />
        <FundraiserCampaignWorld activeKey={activeKey} />
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