"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

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

// ShootingStar animation component (bigger, curvy path, sparkling, glitter trail)
function ShootingStarFlyBack({
  from,
  to,
  onEnd,
}: {
  from: [number, number, number];
  to: [number, number, number];
  onEnd: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailGroup = useRef<THREE.Group>(null);
  const progress = useRef(0);

  // For glitter trail particles
  const NUM_PARTICLES = 32;
  const particles = useMemo(
    () =>
      Array.from({ length: NUM_PARTICLES }).map(() => ({
        offset: Math.random() * 0.7 + 0.2,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 0.35 + 0.15,
        color: `hsl(${Math.floor(Math.random() * 60 + 180)}, 100%, 70%)`,
      })),
    []
  );

  // Curvy path: quadratic bezier control point
  const control = useMemo(() => {
    // Midpoint between from and to, offset perpendicular for curve
    const mx = (from[0] + to[0]) / 2;
    const my = (from[1] + to[1]) / 2;
    const mz = (from[2] + to[2]) / 2;
    // Perpendicular vector (simple: swap x/y, negate one)
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const dz = to[2] - from[2];
    // Find a perpendicular direction (not normalized, just for offset)
    const perp = [-dy, dx, dz * 0.2];
    // Curve amount scales with distance
    const curveAmount = 0.35 * Math.sqrt(dx * dx + dy * dy + dz * dz);
    return [
      mx + perp[0] * curveAmount * 0.08,
      my + perp[1] * curveAmount * 0.08,
      mz + perp[2] * curveAmount * 0.08,
    ] as [number, number, number];
  }, [from, to]);

  // Quadratic bezier interpolation
  function getCurvedPos(t: number) {
    const x =
      (1 - t) * (1 - t) * from[0] +
      2 * (1 - t) * t * control[0] +
      t * t * to[0];
    const y =
      (1 - t) * (1 - t) * from[1] +
      2 * (1 - t) * t * control[1] +
      t * t * to[1];
    const z =
      (1 - t) * (1 - t) * from[2] +
      2 * (1 - t) * t * control[2] +
      t * t * to[2];
    return [x, y, z] as [number, number, number];
  }

  useFrame((_, delta) => {
    if (progress.current < 1) {
      progress.current += delta * 0.7; // slow animation
      const t = Math.min(progress.current, 1);
      const [x, y, z] = getCurvedPos(t);
      if (meshRef.current) {
        meshRef.current.position.set(x, y, z);
        meshRef.current.rotation.y += 0.3;
        meshRef.current.rotation.x += 0.1;
      }
      if (trailGroup.current) {
        trailGroup.current.position.set(x, y, z);
      }
      if (t === 1) {
        onEnd();
      }
    }
  });

  // Compute trail direction (tangent at t=0)
  const dir = useMemo(() => {
    // Derivative of quadratic bezier at t=0
    return [
      2 * (control[0] - from[0]),
      2 * (control[1] - from[1]),
      2 * (control[2] - from[2]),
    ] as [number, number, number];
  }, [from, control]);

  // Trail segments (glow streak)
  const TRAIL_LENGTH = 3.5;
  const trailSegments = Array.from({ length: 12 }).map((_, i) => {
    const t = i / 12;
    // Place along the tangent direction, fade out
    return (
      <mesh
        key={i}
        position={[
          -dir[0] * t * TRAIL_LENGTH,
          -dir[1] * t * TRAIL_LENGTH,
          -dir[2] * t * TRAIL_LENGTH,
        ]}
      >
        <sphereGeometry args={[0.32 * (1 - t * 0.7), 10, 10]} />
        <meshBasicMaterial
          color="#b9f6ff"
          transparent
          opacity={0.18 - t * 0.13}
        />
      </mesh>
    );
  });

  // Glitter particles
  const glitterParticles = particles.map((p, i) => (
    <mesh
      key={i}
      position={[
        -dir[0] * p.offset * TRAIL_LENGTH + Math.cos(p.angle) * p.radius,
        -dir[1] * p.offset * TRAIL_LENGTH + Math.sin(p.angle) * p.radius,
        -dir[2] * p.offset * TRAIL_LENGTH +
          (Math.sin(p.angle * 2) * p.radius) / 2,
      ]}
    >
      <sphereGeometry args={[0.07 + Math.random() * 0.04, 8, 8]} />
      <meshBasicMaterial color={p.color} transparent opacity={0.8} />
    </mesh>
  ));

  return (
    <>
      {/* Shooting star head */}
      <mesh ref={meshRef} scale={[4, 4, 4]}>
        {/* Big glowing sphere */}
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshPhysicalMaterial
          color="#fff"
          emissive="#fff"
          emissiveIntensity={4.5}
          metalness={0.7}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.03}
        />
        {/* Extra glow */}
        <mesh>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshBasicMaterial color="#b9f6ff" transparent opacity={0.28} />
        </mesh>
      </mesh>
      {/* Trail and glitter */}
      <group ref={trailGroup}>
        {trailSegments}
        {glitterParticles}
      </group>
    </>
  );
}

// Neon Star (realistic glowing sphere, now draggable and can fly back)
function NeonStar({
  skill,
  onHover,
  onUnhover,
  onClick,
  onDrag,
  isDragging,
  isReturning,
  rotationEnabled,
  setDraggingIndex,
  index,
}: {
  skill: SkillData;
  onHover: (skill: SkillData) => void;
  onUnhover: () => void;
  onClick: (skill: SkillData) => void;
  onDrag: (pos: [number, number, number]) => void;
  isDragging: boolean;
  isReturning: boolean;
  rotationEnabled: boolean;
  setDraggingIndex: (idx: number | null) => void;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<[number, number, number] | null>(null);

  useFrame(() => {
    if (meshRef.current) {
      if (rotationEnabled) {
        meshRef.current.rotation.y += 0.01;
      }
      meshRef.current.scale.setScalar(hovered ? 1.4 : 1);
    }
  });

  // Drag logic
  const { camera, gl } = useThree();

  // Convert screen to world coordinates
  const getWorldPosition = (event: any) => {
    const rect = gl.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
    return [vector.x, vector.y, vector.z] as [number, number, number];
  };

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setDragging(true);
    setDraggingIndex(index); // Notify parent that dragging has started
    dragOffset.current = getWorldPosition(e);
    document.body.style.cursor = "grabbing";
  };

  const handlePointerUp = (e: any) => {
    setDragging(false);
    setDraggingIndex(null); // Notify parent that dragging has ended
    document.body.style.cursor = "";
  };

  const handlePointerMove = (e: any) => {
    if (!dragging) return;
    const newPos = getWorldPosition(e);
    onDrag(newPos);
  };

  useEffect(() => {
    if (!dragging) return;
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
    // eslint-disable-next-line
  }, [dragging]);

  // Use high poly sphere and layered glow for realism
  return (
    <group
      position={skill.position}
      onPointerOver={
        isReturning
          ? undefined
          : () => {
              setHovered(true);
              onHover(skill);
            }
      }
      onPointerOut={
        isReturning
          ? undefined
          : () => {
              setHovered(false);
              onUnhover();
            }
      }
      onClick={isReturning ? undefined : () => onClick(skill)}
      onPointerDown={isReturning ? undefined : handlePointerDown}
      scale={isDragging ? 1.2 : 1}
    >
      {/* Core star: high poly, emissive, slightly glossy */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[0.45, 64, 64]} />
        <meshPhysicalMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={3.2}
          metalness={0.8}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.01}
          reflectivity={0.7}
          transmission={0.15}
          thickness={0.2}
        />
      </mesh>
      {/* Inner glow: soft, colored */}
      <mesh>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.22} />
      </mesh>
      {/* Outer glow: larger, white, very faint for halo */}
      <mesh>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshBasicMaterial color="#fff" transparent opacity={0.08} />
      </mesh>
      {/* Star label (no glow, just plain text) */}
      <group position={[0, 0.7, 0]}>
        <Html
          center
          style={{
            pointerEvents: "none",
            zIndex: 1,
          }}
          zIndexRange={[0, 1]}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            {skill.name}
          </div>
        </Html>
      </group>
    </group>
  );
}

// Draw lines between stars to form a constellation
function ConstellationLines({ skills }: { skills: SkillData[] }) {
  // Connect each skill to the next (or by category for more complex shapes)
  const lines = [];
  for (let i = 0; i < skills.length - 1; i++) {
    lines.push(
      <line key={i}>
        <bufferGeometry
          attach="geometry"
          setFromPoints={new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...skills[i].position),
            new THREE.Vector3(...skills[i + 1].position),
          ])}
        />
        <lineBasicMaterial
          color="#00fff7"
          linewidth={2}
          transparent
          opacity={0.45}
        />
      </line>
    );
  }
  return <group>{lines}</group>;
}

// Warp speed effect: streaks when zooming fast
function WarpSpeedEffect() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const prevZ = useRef(camera.position.z);
  const [warp, setWarp] = useState(false);

  useFrame(() => {
    // If camera z changes rapidly, show warp effect
    const dz = Math.abs(camera.position.z - prevZ.current);
    setWarp(dz > 0.25);
    prevZ.current = camera.position.z;
  });

  // Render streaks if warp is true
  if (!warp) return null;
  // 30 random streaks
  return (
    <group ref={groupRef}>
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={i}>
          <bufferGeometry
            attach="geometry"
            setFromPoints={new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6
              ),
              new THREE.Vector3(
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6 - 2
              ),
            ])}
          />
          <lineBasicMaterial
            color="#fff"
            linewidth={2}
            transparent
            opacity={0.25 + Math.random() * 0.25}
          />
        </line>
      ))}
    </group>
  );
}

// Helper to generate non-colliding positions on a sphere
function generateConstellationPositions(
  count: number,
  radius = 10,
  minDist = 2.5
): [number, number, number][] {
  const positions: [number, number, number][] = [];
  let attempts = 0;
  while (positions.length < count && attempts < 10000) {
    // Fibonacci sphere for even distribution
    const i = positions.length;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = Math.cos(theta) * Math.sin(phi) * radius;
    const y = Math.sin(theta) * Math.sin(phi) * radius;
    const z = Math.cos(phi) * radius;
    // Check min distance to all previous
    let ok = true;
    for (const [px, py, pz] of positions) {
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2 + (z - pz) ** 2);
      if (dist < minDist) {
        ok = false;
        break;
      }
    }
    if (ok) positions.push([x, y, z]);
    attempts++;
  }
  // Fallback: if not enough, fill with random far points
  while (positions.length < count) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = Math.sin(phi) * Math.cos(theta) * radius;
    const y = Math.sin(phi) * Math.sin(theta) * radius;
    const z = Math.cos(phi) * radius;
    positions.push([x, y, z]);
  }
  return positions;
}

// Assign new positions to skillsData
const constellationPositions = generateConstellationPositions(
  skillsData.length,
  12,
  2.8
);
const spacedSkillsData = skillsData.map((skill, i) => ({
  ...skill,
  position: constellationPositions[i],
}));

// 3D Scene
function Scene({
  onSkillHover,
  onSkillUnhover,
  onSkillClick,
  rotationEnabled,
}: {
  onSkillHover: (skill: SkillData) => void;
  onSkillUnhover: () => void;
  onSkillClick: (skill: SkillData) => void;
  rotationEnabled: boolean;
}) {
  const { camera, gl } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 15);
  }, [camera]);

  const sceneGroupRef = useRef<THREE.Group>(null);

  // Animation state for initial "fly-in"
  const [flyInProgress, setFlyInProgress] = useState(0); // 0 to 1
  const [flyInDone, setFlyInDone] = useState(false);

  // Star positions state
  const [starPositions, setStarPositions] = useState(
    spacedSkillsData.map((s) => s.position)
  );
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // For shooting star animation
  const [returning, setReturning] = useState<{
    index: number;
    from: [number, number, number];
    to: [number, number, number];
  } | null>(null);

  // Store initial random positions for fly-in
  const initialRandomPositions = useMemo(
    () =>
      spacedSkillsData.map(
        () =>
          [
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 60,
          ] as [number, number, number]
      ),
    []
  );

  // Animate fly-in and fast rotation for 3 seconds (was 2 seconds)
  useEffect(() => {
    setFlyInProgress(0);
    setFlyInDone(false);
    // Animate progress from 0 to 1 over 3 seconds
    let raf: number;
    let start: number | null = null;
    function animateFlyIn(ts: number) {
      if (start === null) start = ts;
      const elapsed = (ts - start) / 3000; // changed from 2000 to 3000
      setFlyInProgress(Math.min(1, elapsed));
      if (elapsed < 1) {
        raf = requestAnimationFrame(animateFlyIn);
      } else {
        setFlyInDone(true);
      }
    }
    raf = requestAnimationFrame(animateFlyIn);
    return () => cancelAnimationFrame(raf);
  }, [spacedSkillsData]);

  // Handler for drag
  const handleStarDrag = (index: number, pos: [number, number, number]) => {
    // If star is dragged too far (distance > 25), trigger return
    const initial = spacedSkillsData[index].position;
    const dist = Math.sqrt(
      (pos[0] - initial[0]) ** 2 +
        (pos[1] - initial[1]) ** 2 +
        (pos[2] - initial[2]) ** 2
    );
    if (dist > 25) {
      setReturning({
        index,
        from: pos,
        to: initial,
      });
      setDraggingIndex(null);
      setStarPositions((prev) => prev.map((p, i) => (i === index ? pos : p)));
    } else {
      setStarPositions((prev) => prev.map((p, i) => (i === index ? pos : p)));
    }
  };

  // When shooting star animation ends, reset star to initial position
  const handleSpaceshipEnd = () => {
    if (returning) {
      setStarPositions((prev) =>
        prev.map((p, i) => (i === returning.index ? returning.to : p))
      );
      setReturning(null);
    }
  };

  // Rotation: fast during fly-in, normal after
  useFrame(() => {
    if (sceneGroupRef.current) {
      if (!flyInDone) {
        // Fast rotation during fly-in
        sceneGroupRef.current.rotation.y += 0.025;
        sceneGroupRef.current.rotation.x += 0.005;
      } else if (rotationEnabled && draggingIndex === null) {
        // Normal rotation after fly-in
        sceneGroupRef.current.rotation.y += 0.0015;
        sceneGroupRef.current.rotation.x += 0.0003;
      }
    }
  });

  // Interpolated positions for fly-in
  const interpolatedPositions = spacedSkillsData.map((skill, i) => {
    if (flyInDone) return starPositions[i];
    const [x0, y0, z0] = initialRandomPositions[i];
    const [x1, y1, z1] = spacedSkillsData[i].position;
    const t = Math.min(1, flyInProgress);
    return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, z0 + (z1 - z0) * t] as [
      number,
      number,
      number
    ];
  });

  return (
    <group ref={sceneGroupRef}>
      {/* Space background */}
      <color attach="background" args={["#070b1a"]} />
      {/* Subtle stars in background */}
      <group>
        {Array.from({ length: 80 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 18,
              (Math.random() - 0.5) * 20,
            ]}
          >
            <sphereGeometry args={[0.08 + Math.random() * 0.09, 8, 8]} />
            <meshBasicMaterial color="#fff" opacity={0.7} transparent />
          </mesh>
        ))}
      </group>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 10]} intensity={1.2} color="#00fff7" />
      <pointLight position={[0, 0, -10]} intensity={0.7} color="#fff" />
      {/* Rotating constellation group */}
      <group>
        {/* Constellation lines */}
        <ConstellationLines
          skills={spacedSkillsData.map((skill, i) => ({
            ...skill,
            position: interpolatedPositions[i],
          }))}
        />
        {/* Neon stars */}
        {spacedSkillsData.map((skill, index) => (
          <NeonStar
            key={index}
            skill={{ ...skill, position: interpolatedPositions[index] }}
            onHover={onSkillHover}
            onUnhover={onSkillUnhover}
            onClick={onSkillClick}
            onDrag={(pos) => {
              setDraggingIndex(index);
              handleStarDrag(index, pos);
            }}
            isDragging={draggingIndex === index}
            isReturning={!!returning && returning.index === index}
            rotationEnabled={
              rotationEnabled && draggingIndex === null && flyInDone
            }
            setDraggingIndex={setDraggingIndex}
            index={index}
            // Disable pointer events during fly-in
            {...(!flyInDone && {
              onPointerDown: undefined,
              onClick: undefined,
            })}
          />
        ))}
        {/* Shooting star animation */}
        {returning && (
          <ShootingStarFlyBack
            from={returning.from}
            to={returning.to}
            onEnd={handleSpaceshipEnd}
          />
        )}
      </group>
      {/* Warp speed effect */}
      <WarpSpeedEffect />
      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={30}
      />
    </group>
  );
}

interface Skills3DShowroomProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Skills3DShowroom({
  isOpen,
  onClose,
}: Skills3DShowroomProps) {
  const [hoveredSkill, setHoveredSkill] = useState<SkillData | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Track if rotation should be enabled
  const [rotationEnabled, setRotationEnabled] = useState(true);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // Stop rotation when a skill is selected
    setRotationEnabled(selectedSkill == null);
  }, [selectedSkill]);

  if (!hasMounted) return null;

  const handleSkillHover = (skill: SkillData) => {
    setHoveredSkill(skill);
  };

  const handleSkillUnhover = () => {
    setHoveredSkill(null);
  };

  const handleSkillClick = (skill: SkillData) => {
    setSelectedSkill(skill);
    setRotationEnabled(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              My Skills in 3D
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <p className="text-gray-300 mt-2">
            Explore my tech stack in an interactive 3D environment. Hover and
            click on objects to learn more!
          </p>
        </div>

        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 22], fov: 75 }} // changed from 15 to 22 for more zoomed-out view
          style={{
            background: "radial-gradient(circle, #1a1a2e 0%, #000000 100%)",
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Scene
            onSkillHover={handleSkillHover}
            onSkillUnhover={handleSkillUnhover}
            onSkillClick={handleSkillClick}
            rotationEnabled={rotationEnabled}
          />
        </Canvas>

        {/* Tooltip */}
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 text-center"
          >
            <h3 className="text-xl font-bold text-cyan-400">
              {hoveredSkill.name}
            </h3>
            <p className="text-gray-300 text-sm">{hoveredSkill.category}</p>
          </motion.div>
        )}

        {/* Skill Detail Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center z-[10000] bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                className="bg-gray-900 border border-cyan-500/30 rounded-xl p-6 max-w-md mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-cyan-400">
                    {selectedSkill.name}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedSkill(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-purple-400 font-medium">
                      Category:
                    </span>
                    <p className="text-gray-300">{selectedSkill.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-purple-400 font-medium">
                      Experience:
                    </span>
                    <p className="text-gray-300">{selectedSkill.description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="absolute bottom-6 left-6 text-gray-400 text-sm">
          <p>• Drag to rotate • Scroll to zoom • Click objects for details</p>
        </div>

        {/* Back Button */}
        <Button
          onClick={onClose}
          className="absolute bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portfolio
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
