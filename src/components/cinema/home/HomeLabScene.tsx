"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type HomeLabSceneProps = {
  activeCluster: string;
};

const clusterColors: Record<string, string> = {
  gold: "#facc15",
  supply: "#16a34a",
  finance: "#2563eb",
  marketing: "#ec4899",
  management: "#7c3aed",
  lab: "#38bdf8"
};

function HomeLabWorld({ activeCluster }: HomeLabSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return [
      { key: "gold", label: "Forecasting", position: [-1.85, 0.95, 0.2], color: "#facc15" },
      { key: "supply", label: "Supply Chain", position: [0.1, 1.28, -0.05], color: "#16a34a" },
      { key: "finance", label: "Finance", position: [1.85, 0.68, 0.15], color: "#2563eb" },
      { key: "marketing", label: "Marketing", position: [-1.55, -0.82, 0.1], color: "#ec4899" },
      { key: "management", label: "Management", position: [0.6, -1.05, 0.2], color: "#7c3aed" },
      { key: "lab", label: "Portfolio AI", position: [2.08, -0.68, -0.05], color: "#38bdf8" }
    ] as const;
  }, []);

  const links = useMemo(() => {
    return [
      ["gold", "supply"],
      ["supply", "finance"],
      ["finance", "lab"],
      ["gold", "marketing"],
      ["marketing", "management"],
      ["management", "lab"],
      ["supply", "management"],
      ["gold", "lab"]
    ] as const;
  }, []);

  const dataParticles = useMemo(() => {
    return Array.from({ length: 180 }, (_, index) => {
      const angle = index * 0.43;
      const radius = 1.45 + ((index * 17) % 130) / 52;
      const y = -1.75 + ((index * 29) % 160) / 45;

      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius - 0.2
        ] as [number, number, number],
        size: 0.01 + (index % 4) * 0.005,
        color: index % 4 === 0 ? "#facc15" : index % 4 === 1 ? "#60a5fa" : index % 4 === 2 ? "#16a34a" : "#ec4899"
      };
    });
  }, []);

  const matrixCells = useMemo(() => {
    const cells: { id: string; x: number; y: number; value: number }[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 10; col++) {
        cells.push({
          id: `${row}-${col}`,
          x: -2.35 + col * 0.25,
          y: -1.0 + row * 0.22,
          value: ((row + 3) * (col + 4)) % 8
        });
      }
    }

    return cells;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.13;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.13) * 0.045;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.04;
  });

  const activeColor = clusterColors[activeCluster] || clusterColors.lab;

  return (
    <group ref={groupRef} position={[0.8, 0.02, 0]} scale={1.02}>
      <mesh position={[0.05, 0.05, -0.24]}>
        <boxGeometry args={[5.95, 3.25, 0.08]} />
        <meshStandardMaterial
          color="#020617"
          transparent
          opacity={0.82}
          emissive="#0f172a"
          emissiveIntensity={0.22}
        />
      </mesh>

      {matrixCells.map((cell) => (
        <mesh key={cell.id} position={[cell.x, cell.y, -0.18]}>
          <boxGeometry args={[0.16, 0.12, 0.018]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.08 + cell.value * 0.035}
            transparent
            opacity={0.13 + cell.value * 0.035}
          />
        </mesh>
      ))}

      {links.map(([from, to]) => {
        const source = nodes.find((node) => node.key === from);
        const target = nodes.find((node) => node.key === to);
        const related = activeCluster === from || activeCluster === to;

        if (!source || !target) return null;

        return (
          <Line
            key={`${from}-${to}`}
            points={[source.position, target.position]}
            color={related ? activeColor : "#64748b"}
            lineWidth={related ? 3.8 : 1.6}
            transparent
            opacity={related ? 0.95 : 0.36}
          />
        );
      })}

      <Float speed={1.25} rotationIntensity={0.2} floatIntensity={0.24}>
        <mesh>
          <sphereGeometry args={[0.42, 48, 48]} />
          <meshStandardMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.52}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[0.82, 0.008, 16, 160]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.45} />
      </mesh>

      <mesh rotation={[0.5, Math.PI / 2.5, 0.2]}>
        <torusGeometry args={[1.35, 0.006, 16, 180]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.32} />
      </mesh>

      {nodes.map((node) => {
        const active = activeCluster === node.key;

        return (
          <Float key={node.key} speed={1.12} rotationIntensity={0.16} floatIntensity={0.22}>
            <mesh position={node.position}>
              <sphereGeometry args={[active ? 0.14 : 0.1, 30, 30]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={active ? 1 : 0.46}
                metalness={0.5}
                roughness={0.18}
              />
            </mesh>
          </Float>
        );
      })}

      {dataParticles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 10, 10]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.55}
            transparent
            opacity={0.78}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HomeLabScene({ activeCluster }: HomeLabSceneProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6.15], fov: 43 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.52} />
        <pointLight position={[4, 4, 5]} intensity={2.2} color="#60a5fa" />
        <pointLight position={[-3, -2, 4]} intensity={1.55} color="#facc15" />
        <pointLight position={[1.5, -3, 3]} intensity={1.1} color="#16a34a" />
        <Stars radius={90} depth={45} count={680} factor={2.1} fade speed={0.16} />
        <HomeLabWorld activeCluster={activeCluster} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.22} luminanceSmoothing={0.75} intensity={0.45} />
          <Vignette eskil={false} offset={0.48} darkness={0.18} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(15,23,42,0.18),transparent_30%),radial-gradient(circle_at_58%_52%,rgba(37,99,235,0.08),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(250,204,21,0.10),transparent_30%)]" />
      <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-white via-white/96 to-white/35" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-white via-white/82 to-transparent" />
    </div>
  );
}