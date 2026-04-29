import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function roundedRectShape(width, height, radius) {
  const x = -width / 2;
  const y = -height / 2;

  const shape = new THREE.Shape();

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

function LightBox({ open }) {
  const groupRef = useRef(null);

  const outerShape = useMemo(() => roundedRectShape(0.82, 2.35, 0.18), []);
  const innerShape = useMemo(() => roundedRectShape(0.48, 2.05, 0.16), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const scale = 1 + open * 0.22;

    groupRef.current.scale.x = THREE.MathUtils.damp(
      groupRef.current.scale.x,
      scale,
      5,
      delta,
    );

    groupRef.current.scale.y = THREE.MathUtils.damp(
      groupRef.current.scale.y,
      scale,
      5,
      delta,
    );
  });

  return (
    <group
      ref={groupRef}
      position={[0.45, 0.55, 0]}
      rotation={[0.05, -0.35, -0.3]}
    >
      {/* outer right-side box */}
      <mesh position={[0.18, 0, -0.12]}>
        <extrudeGeometry
          args={[
            outerShape,
            {
              depth: 0.28,
              bevelEnabled: true,
              bevelSize: 0.025,
              bevelThickness: 0.025,
              bevelSegments: 8,
            },
          ]}
        />
        <meshStandardMaterial
          color="#8a431f"
          roughness={0.42}
          metalness={0.08}
        />
      </mesh>

      {/* front light */}
      <mesh position={[-0.12, 0, 0.08]}>
        <extrudeGeometry
          args={[
            innerShape,
            {
              depth: 0.05,
              bevelEnabled: true,
              bevelSize: 0.025,
              bevelThickness: 0.025,
              bevelSegments: 8,
            },
          ]}
        />
        <meshStandardMaterial
          color="#fff7a8"
          emissive="#fff19c"
          emissiveIntensity={4.5}
          roughness={0.2}
        />
      </mesh>

      <pointLight
        position={[-0.08, 0, 0.5]}
        intensity={8}
        distance={7}
        color="#ffe082"
      />
    </group>
  );
}

function LightBeam() {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      0.55, 1.3, -0.4, 7.5, 4.1, -1.5, 7.5, -2.4, -1.5, 0.65, -0.8, -0.4,
    ]);

    g.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    g.setIndex([0, 1, 2, 0, 2, 3]);
    g.computeVertexNormals();

    return g;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color="#ff9b45"
        transparent
        opacity={0.22}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Room() {
  return (
    <>
      {/* back wall */}
      <mesh position={[0, 0, -1.8]}>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color="#652513" roughness={0.85} />
      </mesh>

      {/* floor */}
      <mesh position={[0, -2.05, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 7]} />
        <meshStandardMaterial color="#2b0b05" roughness={0.9} />
      </mesh>

      {/* base lines */}
      <mesh position={[1.1, -1.42, -0.9]} rotation={[0, 0, 0.08]}>
        <planeGeometry args={[9, 0.12]} />
        <meshBasicMaterial
          color="#ff7840"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[1.2, -1.65, -0.7]} rotation={[0, 0, 0.08]}>
        <planeGeometry args={[9, 0.16]} />
        <meshBasicMaterial
          color="#ff5f32"
          transparent
          opacity={0.09}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function Scene({ open }) {
  const cameraRef = useRef(null);

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    const targetZ = 5.6 - open * 1.3;

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      4,
      delta,
    );
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      open * 0.25,
      4,
      delta,
    );

    camera.lookAt(0.4, -0.1, -1.4);
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 5.6]}
        fov={42}
        near={0.1}
        far={100}
      />

      <color attach="background" args={["#2b0f08"]} />
      <fog attach="fog" args={["#2b0f08", 6, 13]} />

      <ambientLight intensity={0.75} color="#7a2b18" />
      <directionalLight position={[3, 4, 3]} intensity={2.2} color="#c26a32" />

      <Room />
      <LightBeam />
      <LightBox open={open} />
    </>
  );
}

export default function HeroThreeBackground({ open }) {
  return (
    <Canvas className="hero-three-canvas" dpr={[1, 2]} gl={{ antialias: true }}>
      <Scene open={open} />
    </Canvas>
  );
}
