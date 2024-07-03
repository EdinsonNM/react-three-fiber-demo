import {
  CameraControls,
  FaceControls,
  Gltf,
  useAnimations,
  useGLTF,
  useHelper,
  useVideoTexture,
} from "@react-three/drei";
import { useCallback, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils";
import * as THREE from "three";
import Chair from "./chair";

function Robot() {
  const meshRef = useRef(null);
  const { scene, animations } = useGLTF(
    "/models/room/robot-security/scene.gltf"
  );
  const { actions } = useAnimations(animations, meshRef);
  console.log("robot actions", actions);
  useEffect(() => {
    actions["Take 01"]?.play();
  }, [actions]);
  return (
    <group ref={meshRef}>
      <primitive
        object={scene}
        scale={[0.08, 0.08, 0.08]}
        position={[-0.7, 0.75, -0.7]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </group>
  );
}
function Dog() {
  const meshRef = useRef(null);
  const { scene, animations } = useGLTF("/models/room/dog_puppy/scene.gltf");
  const { actions } = useAnimations(animations, meshRef);
  console.log("robot actions", actions);
  useEffect(() => {
    actions["Animation"]?.play();
  }, [actions]);
  return (
    <group ref={meshRef}>
      <primitive
        object={scene}
        scale={[0.2, 0.2, 0.2]}
        position={[-0.1, 0.2, -0.6]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  );
}
function Bb8() {
  const meshRef = useRef(null);
  const { scene, animations } = useGLTF("/models/room/bb8/scene.gltf");
  const { actions } = useAnimations(animations, meshRef);
  console.log(actions);
  const targetPosition = useRef({ x: 0, z: 0 });

  useEffect(() => {
    actions["Rolling"]?.play();
  }, [actions]);
  useFrame(() => {
    meshRef.current.rotation.y += 0.01 * 1;

    if (Math.random() < 0.02) {
      // Cambia la posición objetivo con un 2% de probabilidad en cada frame
      targetPosition.current.x = Math.random() * 0.5 * (Math.random() * 2 - 1); // entre -1 y 1
      targetPosition.current.z = Math.random() * 0.5 * (Math.random() * 2 - 1); // entre -1 y 1
    }

    // Interpola suavemente la posición actual hacia la posición objetivo
    meshRef.current!.position.x = lerp(
      meshRef.current.position.x,
      targetPosition.current.x,
      0.1
    );
    meshRef.current!.position.z = lerp(
      meshRef.current!.position.z,
      targetPosition.current.z,
      0.1
    );

    // Mantén Y en su valor original, si es necesario
    meshRef.current!.position.y = 0;
  });
  return (
    <group ref={meshRef}>
      <primitive object={scene} position={[0, 0.2, 0]} />
    </group>
  );
}
function Proyector() {
  const videoTexture = useVideoTexture("/models/room/video1.mov");
  const refLight = useRef();
  const targetRef = useRef();
  useFrame(() => {
    refLight.current.target = targetRef.current;
  });
  return (
    <>
      <mesh
        ref={targetRef}
        rotation={[0, Math.PI / 2, 0]}
        position={[-0.925, 1.36, 0]}
        scale={[0.12, 0.12, 0.12]}
      >
        <planeGeometry args={[16, 9, 1]} />
        <meshBasicMaterial map={videoTexture} />
      </mesh>
      <pointLight
        position={[0.75, 0.64, -0.35]}
        color={"blue"}
        intensity={10}
      />
      <spotLight
        ref={refLight}
        position={[0.75, 0.64, -0.35]}
        angle={0.3}
        penumbra={0.8}
        intensity={100}
        distance={1}
        target={targetRef.current}
        color={"white"}
      />
    </>
  );
}
function Monitor() {
  const faceControlsApiRef = useRef();
  //const controls = useThree((state) => state.controls);

  const screenMatRef = useRef(null);

  const onVideoFrame = useCallback((e) => {
    screenMatRef!.current!.map = e.texture;
  }, []);
  const pointRef = useRef();
  const helper = useHelper(pointRef, THREE.PointLightHelper, "red");

  return (
    <>
      <group rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <FaceControls
          ref={faceControlsApiRef}
          autostart={true}
          makeDefault
          webcam={true}
          manualUpdate
          manualDetect
          onVideoFrame={onVideoFrame}
        />
      </group>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-0.75, 0.98, 0.68]}>
        <planeGeometry args={[0.6, 0.35]} />
        <meshStandardMaterial
          ref={screenMatRef}
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight ref={pointRef} position={[-0.75, 1, 0.68]} color={"yellow"} />
    </>
  );
}

function Monitor2() {
  const videoTexture = useVideoTexture("/models/room/code.mov");

  return (
    <>
      <mesh
        rotation={[0, Math.PI / 2.9, 0]}
        position={[-0.62, 0.92, 0.13]}
        scale={[0.025, 0.028, 0.025]}
      >
        <planeGeometry args={[16, 9, 1]} />
        <meshBasicMaterial map={videoTexture} />
      </mesh>{" "}
      <pointLight position={[-0.62, 0.92, 0.13]} color={"green"} />
    </>
  );
}
function Room() {
  return (
    <Canvas
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
      camera={{ fov: 45, position: [0, 1, 20], rotation: [0, Math.PI / 2, 0] }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <spotLight
        position={[0, 1, -2]}
        rotation={[0, Math.PI / 2, 0]}
        intensity={25}
        color={"purple"}
        castShadow
      />
      <CameraControls />
      <directionalLight />
      <ambientLight position={[0, 10, 10]} color={"#f2f2f2"} />
      <pointLight position={[0, 10, 5]} color={"white"} /> <Proyector />
      <Gltf src="/models/room/hyo-room.gltf" />
      <Bb8 />
      <Robot />
      <Monitor />
      <Monitor2 />
      <Dog />
      <Chair />
    </Canvas>
  );
}
export default Room;
