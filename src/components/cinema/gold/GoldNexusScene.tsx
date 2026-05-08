"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type GoldNodeKey =
  | "core"
  | "forecast"
  | "sql"
  | "rag"
  | "alpha"
  | "beta"
  | "delta"
  | "epsilon"
  | "gamma"
  | "omega";

type GoldNexusSceneProps = {
  activeKey: GoldNodeKey;
  setActiveKey: (key: GoldNodeKey) => void;
};

const modelNodes: { key: GoldNodeKey; color: string; position: [number, number, number] }[] = [
  { key: "alpha", color: "#facc15", position: [2.2, 0.7, 0.1] },
  { key: "beta", color: "#60a5fa", position: [1.25, -1.55, -0.25] },
  { key: "delta", color: "#34d399", position: [-1.25, -1.25, 0.2] },
  { key: "epsilon", color: "#f59e0b", position: [-2.15, 0.55, -0.15] },
  { key: "gamma", color: "#c084fc", position: [-0.5, 1.75, 0.15] },
  { key: "omega", color: "#fde68a", position: [0.9, 1.55, -0.2] }
];

function InteractiveSphere({
  nodeKey,
  color,
  position,
  activeKey,
  setActiveKey
}: {
  nodeKey: GoldNodeKey;
  color: string;
  position: [number, number, number];
  activeKey: GoldNodeKey;
  setActiveKey: (key: GoldNodeKey) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const active = activeKey === nodeKey;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = active ? 1.55 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), delta * 7);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.45}>
      <mesh
        ref={ref}
        position={position}
        onPointerOver={(event) => {
          event.stopPropagation();
          setActiveKey(nodeKey);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
        onClick={(event) => {
          event.stopPropagation();
          setActiveKey(nodeKey);
        }}
      >
        <sphereGeometry args={[0.095, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 1.4 : 0.75}
          metalness={0.6}
          roughness={0.18}
        />
      </mesh>
    </Float>
  );
}

function GoldSystem({ activeKey, setActiveKey }: GoldNexusSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 160 }, (_, index) => {
      const angle = index * 0.41;
      const radius = 1.2 + ((index * 17) % 120) / 40;
      const y = -1.9 + ((index * 29) % 160) / 42;
      return {
        id: index,
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        ] as [number, number, number],
        size: 0.011 + (index % 4) * 0.006,
        color: index % 3 === 0 ? "#facc15" : index % 3 === 1 ? "#f59e0b" : "#fde68a"
      };
    });
  }, []);

  const forecastPoints = useMemo(() => {
    return [
      [-2.8, -0.95, 0.15],
      [-2.2, -0.72, -0.1],
      [-1.55, -0.55, 0.18],
      [-0.9, -0.22, -0.08],
      [-0.22, -0.02, 0.14],
      [0.45, 0.3, -0.12],
      [1.15, 0.58, 0.18],
      [1.85, 0.84, -0.08],
      [2.65, 1.05, 0.13]
    ] as [number, number, number][];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.07;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <mesh
        onPointerOver={(event) => {
          event.stopPropagation();
          setActiveKey("core");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
        onClick={() => setActiveKey("core")}
      >
        <sphereGeometry args={[0.52, 72, 72]} />
        <meshStandardMaterial
          color="#facc15"
          metalness={1}
          roughness={0.12}
          emissive="#f59e0b"
          emissiveIntensity={activeKey === "core" ? 0.75 : 0.42}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.18, 0.012, 18, 240]} />
        <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.55} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2.5, Math.PI / 4]}>
        <torusGeometry args={[1.72, 0.009, 18, 240]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.3} />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 8, Math.PI / 2.5]}>
        <torusGeometry args={[2.28, 0.008, 18, 240]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.25} />
      </mesh>

      <Line points={forecastPoints} color="#facc15" lineWidth={activeKey === "forecast" ? 4 : 2} />

      <mesh
        position={[0, -1.15, 0.01]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setActiveKey("forecast");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={[5.6, 0.25, 0.08]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      <group
        position={[2.55, -0.95, -0.2]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setActiveKey("sql");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, i * 0.18, 0]}>
            <boxGeometry args={[0.95, 0.075, 0.025]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#60a5fa"
              emissiveIntensity={activeKey === "sql" ? 0.8 : 0.35}
            />
          </mesh>
        ))}
      </group>

      <group
        position={[-2.55, -0.9, -0.2]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setActiveKey("rag");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, i * 0.16, 0]}>
            <boxGeometry args={[0.75 - i * 0.06, 0.06, 0.025]} />
            <meshStandardMaterial
              color="#34d399"
              emissive="#34d399"
              emissiveIntensity={activeKey === "rag" ? 0.75 : 0.3}
            />
          </mesh>
        ))}
      </group>

      {modelNodes.map((node) => (
        <group key={node.key}>
          <Line points={[[0, 0, 0], node.position]} color={node.color} lineWidth={activeKey === node.key ? 2.6 : 1} />
          <InteractiveSphere
            nodeKey={node.key}
            color={node.color}
            position={node.position}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
          />
        </group>
      ))}

      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.size, 10, 10]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.55}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function GoldNexusScene(props: GoldNexusSceneProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5.7], fov: 46 }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.38} />
        <pointLight position={[4, 3, 5]} intensity={2.6} color="#facc15" />
        <pointLight position={[-4, -2, -3]} intensity={1.25} color="#2563eb" />
        <pointLight position={[1, -4, 2]} intensity={1.1} color="#22c55e" />
        <Stars radius={90} depth={55} count={1700} factor={4} fade speed={0.38} />
        <GoldSystem {...props} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.22} luminanceSmoothing={0.8} intensity={0.55} />
          <Vignette eskil={false} offset={0.25} darkness={0.65} />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_38%,rgba(250,204,21,0.18),transparent_26%),radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.18),transparent_34%),linear-gradient(90deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.78)_43%,rgba(2,6,23,0.3)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]" />
    </div>
  );
}