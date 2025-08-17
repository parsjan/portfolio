"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";

// Copy of SkillData and skillsData for self-containment
interface SkillData {
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
  description: string;
  type: "text" | "cube" | "sphere" | "torus" | "octahedron";
}

const skillsData: SkillData[] = [
  // Languages
  {
    name: "JavaScript",
    category: "Languages",
    position: [-8, 2, 0],
    color: "#F7DF1E",
    description: "5+ years of experience building dynamic web applications",
    type: "text",
  },
  {
    name: "TypeScript",
    category: "Languages",
    position: [-6, 3, -2],
    color: "#3178C6",
    description: "Strong typing for scalable applications",
    type: "text",
  },
  {
    name: "Python",
    category: "Languages",
    position: [-4, 1, 1],
    color: "#3776AB",
    description: "Backend development and automation scripts",
    type: "sphere",
  },
  // Frontend
  {
    name: "React",
    category: "Frontend",
    position: [0, 4, 0],
    color: "#61DAFB",
    description: "Component-based UI development",
    type: "octahedron",
  },
  {
    name: "Next.js",
    category: "Frontend",
    position: [2, 2, -1],
    color: "#000000",
    description: "Full-stack React framework",
    type: "cube",
  },
  {
    name: "Tailwind",
    category: "Frontend",
    position: [4, 3, 1],
    color: "#06B6D4",
    description: "Utility-first CSS framework",
    type: "torus",
  },
  // Backend
  {
    name: "Node.js",
    category: "Backend",
    position: [-2, -2, 2],
    color: "#339933",
    description: "Server-side JavaScript runtime",
    type: "sphere",
  },
  {
    name: "Express.js",
    category: "Backend",
    position: [0, -1, -2],
    color: "#000000",
    description: "Minimal web framework for Node.js",
    type: "cube",
  },
  {
    name: "FastAPI",
    category: "Backend",
    position: [2, -3, 0],
    color: "#009688",
    description: "Modern Python web framework",
    type: "octahedron",
  },
  // State Management
  {
    name: "Redux",
    category: "State Management",
    position: [6, 1, -2],
    color: "#764ABC",
    description: "Predictable state container",
    type: "torus",
  },
  {
    name: "MobX",
    category: "State Management",
    position: [8, -1, 0],
    color: "#FF9955",
    description: "Simple, scalable state management",
    type: "cube",
  },
  {
    name: "Zustand",
    category: "State Management",
    position: [7, 2, 2],
    color: "#2D3748",
    description: "Lightweight state management",
    type: "sphere",
  },
  // Databases
  {
    name: "MongoDB",
    category: "Databases",
    position: [-6, -4, -1],
    color: "#47A248",
    description: "NoSQL document database",
    type: "sphere",
  },
  {
    name: "PostgreSQL",
    category: "Databases",
    position: [-4, -2, -3],
    color: "#336791",
    description: "Advanced relational database",
    type: "cube",
  },
  {
    name: "MySQL",
    category: "Databases",
    position: [-2, -4, 1],
    color: "#4479A1",
    description: "Popular relational database",
    type: "octahedron",
  },
  // DevOps & Cloud
  {
    name: "Docker",
    category: "DevOps",
    position: [4, -1, 3],
    color: "#2496ED",
    description: "Containerization platform",
    type: "cube",
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    position: [6, -3, 1],
    color: "#326CE5",
    description: "Container orchestration",
    type: "torus",
  },
  {
    name: "AWS",
    category: "Cloud",
    position: [8, 0, -3],
    color: "#FF9900",
    description: "Cloud computing services",
    type: "sphere",
  },
  {
    name: "GitHub",
    category: "DevOps",
    position: [-8, 0, 3],
    color: "#181717",
    description: "Version control and collaboration",
    type: "octahedron",
  },
];

// Helper: Orbit ring geometry
function OrbitRing({
  radius,
  color = "#888",
}: {
  radius: number;
  color?: string;
}) {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    );
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line>
      <lineBasicMaterial
        color={color}
        linewidth={1}
        transparent
        opacity={0.3}
      />
    </line>
  );
}

// Helper: Sun at center
function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshPhysicalMaterial
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={1.5}
        metalness={0.7}
        roughness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshBasicMaterial color="#fff8b0" transparent opacity={0.18} />
      </mesh>
    </mesh>
  );
}

// Helper: Planet (skill)
function Planet({
  skill,
  orbitRadius,
  orbitSpeed,
  index,
  onHover,
  onUnhover,
}: {
  skill: SkillData;
  orbitRadius: number;
  orbitSpeed: number;
  index: number;
  onHover: (skill: SkillData, pos: [number, number, number]) => void;
  onUnhover: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  // Orbit angle state
  const angleRef = useRef(Math.random() * Math.PI * 2);
  useFrame((state) => {
    // Orbit
    angleRef.current += orbitSpeed;
    const x = Math.cos(angleRef.current) * orbitRadius;
    const y = Math.sin(angleRef.current) * orbitRadius;
    const z = Math.sin(angleRef.current * 0.7 + index) * 0.5; // subtle vertical float
    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.01 + orbitSpeed * 2; // self-rotation
      meshRef.current.rotation.x += 0.005;
    }
    if (hovered) {
      onHover(skill, [x, y, z]);
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
  };
  const handlePointerOut = () => {
    setHovered(false);
    onUnhover();
  };

  // Geometry by type
  let geometry;
  switch (skill.type) {
    case "cube":
      geometry = <boxGeometry args={[0.6, 0.6, 0.6]} />;
      break;
    case "sphere":
      geometry = <sphereGeometry args={[0.5, 32, 32]} />;
      break;
    case "torus":
      geometry = <torusGeometry args={[0.45, 0.18, 16, 64]} />;
      break;
    case "octahedron":
      geometry = <octahedronGeometry args={[0.55]} />;
      break;
    case "text":
      geometry = <sphereGeometry args={[0.45, 32, 32]} />;
      break;
    default:
      geometry = <sphereGeometry args={[0.5, 32, 32]} />;
  }

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        {geometry}
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.5 : 0.18}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
    </Float>
  );
}

// Main Solar System Scene
function SolarSystemScene({
  onPlanetHover,
  onPlanetUnhover,
}: {
  onPlanetHover: (skill: SkillData, pos: [number, number, number]) => void;
  onPlanetUnhover: () => void;
}) {
  // Orbit radii and speeds
  const baseRadius = 3.2;
  const radiusStep = 1.1;
  const baseSpeed = 0.008;
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.45} />
      <pointLight
        position={[0, 0, 0]}
        intensity={2.5}
        color="#FFD700"
        distance={20}
        decay={2}
        castShadow
      />

      {/* Sun */}
      <Sun />

      {/* Orbits and Planets */}
      {skillsData.map((skill, i) => {
        const orbitRadius = baseRadius + i * radiusStep;
        const orbitSpeed = baseSpeed + i * 0.0015;
        return (
          <group key={skill.name + i}>
            <OrbitRing radius={orbitRadius} color="#aaa" />
            <Planet
              skill={skill}
              orbitRadius={orbitRadius}
              orbitSpeed={orbitSpeed}
              index={i}
              onHover={onPlanetHover}
              onUnhover={onPlanetUnhover}
            />
          </group>
        );
      })}

      {/* Controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={6}
        maxDistance={30}
      />
    </>
  );
}

// Tooltip in 3D space
function PlanetTooltip({
  skill,
  position,
}: {
  skill: SkillData;
  position: [number, number, number];
}) {
  return (
    <Html position={position} center style={{ pointerEvents: "none" }}>
      <div
        style={{
          background: "rgba(20,20,30,0.92)",
          border: "1px solid #00eaff44",
          borderRadius: 10,
          padding: "10px 18px",
          color: "#fff",
          minWidth: 180,
          boxShadow: "0 2px 16px #00eaff22",
          fontSize: 15,
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <div style={{ fontWeight: 700, color: skill.color, fontSize: 18 }}>
          {skill.name}
        </div>
        <div style={{ fontSize: 13, color: "#b5eaff", marginTop: 2 }}>
          {skill.category}
        </div>
        <div style={{ fontSize: 13, color: "#fff", marginTop: 6 }}>
          {skill.description}
        </div>
      </div>
    </Html>
  );
}

// Main export
export default function SkillsSolarSystem() {
  const [hoveredSkill, setHoveredSkill] = useState<SkillData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<[number, number, number] | null>(
    null
  );

  const handlePlanetHover = (
    skill: SkillData,
    pos: [number, number, number]
  ) => {
    setHoveredSkill(skill);
    setTooltipPos(pos);
  };
  const handlePlanetUnhover = () => {
    setHoveredSkill(null);
    setTooltipPos(null);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        background: "radial-gradient(circle, #1a1a2e 0%, #000000 100%)",
        borderRadius: 18,
        boxShadow: "0 4px 32px #00eaff11",
      }}
    >
      <Canvas camera={{ position: [0, 0, 16], fov: 70 }} shadows>
        <SolarSystemScene
          onPlanetHover={handlePlanetHover}
          onPlanetUnhover={handlePlanetUnhover}
        />
        {hoveredSkill && tooltipPos && (
          <PlanetTooltip skill={hoveredSkill} position={tooltipPos} />
        )}
      </Canvas>
    </div>
  );
}
