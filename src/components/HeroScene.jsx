import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function roundedRectShape(width, height, radius) {
  const x = -width / 2;
  const y = -height / 2;
  const w = width;
  const h = height;
  const r = radius;

  const shape = new THREE.Shape();

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

function RoundedPanel({
  width,
  height,
  radius,
  depth,
  position,
  rotation,
  children,
}) {
  const shape = useMemo(
    () => roundedRectShape(width, height, radius),
    [width, height, radius],
  );

  return (
    <mesh position={position} rotation={rotation}>
      <extrudeGeometry
        args={[
          shape,
          {
            depth,
            bevelEnabled: true,
            bevelSize: 0.025,
            bevelThickness: 0.025,
            bevelSegments: 8,
          },
        ]}
      />
      {children}
    </mesh>
  );
}

function WallLamp() {
  return (
    <group position={[1.65, 0.95, -1.25]} rotation={[0.05, -0.08, -0.28]}>
      <RoundedPanel
        width={0.72}
        height={1.95}
        radius={0.2}
        depth={0.22}
        position={[0.12, -0.02, -0.16]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#7b3e1c"
          roughness={0.45}
          metalness={0.15}
        />
      </RoundedPanel>

      <RoundedPanel
        width={0.52}
        height={1.68}
        radius={0.17}
        depth={0.08}
        position={[-0.08, 0, 0.03]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#fff7ad"
          emissive="#fff09a"
          emissiveIntensity={4}
          roughness={0.15}
        />
      </RoundedPanel>

      <pointLight
        position={[0, 0, 0.45]}
        intensity={9}
        distance={6}
        color="#ffe28a"
      />
    </group>
  );
}

function LightBeam() {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      1.35, 1.45, -1.45, 8.5, 4.4, -1.65, 8.5, -1.85, -1.65, 1.45, 0.15, -1.45,
    ]);

    const indices = [0, 1, 2, 0, 2, 3];

    g.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    g.setIndex(indices);
    g.computeVertexNormals();

    return g;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color="#ff8a3d"
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Room() {
  return (
    <group>
      <mesh position={[0, 0, -2.15]}>
        <planeGeometry args={[18, 10]} />
        <meshStandardMaterial color="#5a2112" roughness={0.85} />
      </mesh>

      <mesh position={[0, -2.18, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial color="#2d0d07" roughness={0.9} />
      </mesh>

      <mesh position={[3.2, 1.6, -2.05]} rotation={[0, 0, -0.03]}>
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial
          color="#b0602d"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[2.2, -1.36, -1.2]} rotation={[0, 0, 0.08]}>
        <planeGeometry args={[9, 0.14]} />
        <meshBasicMaterial
          color="#ff8a4d"
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh position={[1.6, -1.62, -0.95]} rotation={[0, 0, 0.08]}>
        <planeGeometry args={[8, 0.18]} />
        <meshBasicMaterial
          color="#ff6a3d"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function DustMotes() {
  const groupRef = useRef(null);

  const motes = useMemo(
    () => [
      [-0.4, 0.25, -0.4, 0.035],
      [0.18, 0.08, -0.5, 0.032],
      [-0.95, -0.9, -0.7, 0.025],
      [0.75, -0.5, -0.6, 0.018],
      [-1.25, 0.65, -0.8, 0.015],
      [0.9, 0.7, -0.7, 0.02],
    ],
    [],
  );

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;

    group.children.forEach((child, index) => {
      const original = motes[index];
      child.position.y =
        original[1] + Math.sin(clock.elapsedTime * 1.2 + index) * 0.035;
    });
  });

  return (
    <group ref={groupRef}>
      {motes.map(([x, y, z, size], index) => (
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial
            color="#ffc34d"
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene({ progress }) {
  const groupRef = useRef(null);
  const cameraRef = useRef(null);
  const smoothProgress = useRef(0);
  const cameraTargetRef = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const camera = cameraRef.current;
    if (!camera) return;

    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      progress,
      4,
      delta,
    );

    const p = smoothProgress.current;
    const cameraTarget = cameraTargetRef.current;

    cameraTarget.set(p * 0.85, -p * 0.08, 6 - p * 3.6);

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      cameraTarget.x,
      4,
      delta,
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      cameraTarget.y,
      4,
      delta,
    );

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      cameraTarget.z,
      4,
      delta,
    );

    camera.fov = THREE.MathUtils.lerp(42, 29, p);
    camera.updateProjectionMatrix();
    camera.lookAt(0.35, -0.15, -1.6);

    const group = groupRef.current;

    if (group) {
      group.rotation.y = THREE.MathUtils.lerp(0, -0.06, p);
      group.position.x = THREE.MathUtils.lerp(0, -0.25, p);
      group.scale.setScalar(THREE.MathUtils.lerp(1, 1.15, p));
    }
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 6]}
        fov={42}
        near={0.1}
        far={100}
      />

      <color attach="background" args={["#2b0f08"]} />
      <fog attach="fog" args={["#2b0f08", 6, 13]} />

      <ambientLight intensity={0.8} color="#7a2b18" />

      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#c26a32" />

      <pointLight position={[3, 1, 2]} intensity={5} color="#ff8a3d" />

      <group ref={groupRef}>
        <Room />
        <LightBeam />
        <WallLamp />
        <DustMotes />
      </group>
    </>
  );
}
