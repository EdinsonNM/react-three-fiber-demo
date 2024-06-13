import {
  Environment,
  KeyboardControls,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ProceduralTerrain from "./components/procedural-terrain";
import { Suspense } from "react";
import Player from "../mini-world/player";
import { Physics, RigidBody } from "@react-three/rapier";
import { Controls } from "../mini-world/mini-world.constants";

function TerrainProceduralGenerator() {
  const models = [
    { path: "/models/tileHigh_desert.gltf.glb", weight: 0.2 },
    { path: "/models/tileHigh_forest.gltf.glb", weight: 0.9 },
    //{ path: "/models/tileHigh_teamBlue.gltf.glb", weight: 0.1 },
    //{ path: "/models/tileHigh_teamRed.gltf.glb", weight: 0.1 },
    //{ path: "/models/tileHigh_teamYellow.gltf.glb", weight: 0.1 },

    { path: "/models/tileLow_desert.gltf.glb", weight: 0.2 },
    { path: "/models/tileLow_forest.gltf.glb", weight: 0.9 },
    //{ path: "/models/tileLow_teamBlue.gltf.glb", weight: 0.1 },
    //{ path: "/models/tileLow_teamRed.gltf.glb", weight: 0.1 },
    // { path: "/models/tileLow_teamYellow.gltf.glb", weight: 0.1 },

    { path: "/models/tree_desert.gltf.glb", weight: 0.3 },
    { path: "/models/tree_forest.gltf.glb", weight: 0.3 },

    { path: "/models/rocksA_desert.gltf.glb", weight: 0.3 },
    { path: "/models/rocksA_forest.gltf.glb", weight: 0.3 },
  ];

  const map = [
    { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
    { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
    { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
    { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    { name: Controls.jump, keys: ["Space"] },
  ];
  return (
    <KeyboardControls map={map}>
      <Canvas
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
        camera={{ fov: 45, position: [0, 10, 50] }}
        shadows
      >
        <Physics>
          <OrbitControls />
          <directionalLight position={[0, 10, 10]} castShadow />

          <Player />
          <Suspense fallback={null}>
            <RigidBody type="fixed" colliders="trimesh" name="piso">
              <ProceduralTerrain
                width={20}
                height={20}
                scale={0.2}
                models={models}
              />
            </RigidBody>
          </Suspense>
          <RigidBody type="fixed" colliders="cuboid" name="piso">
            <mesh position={[20, 0, 20]} receiveShadow>
              <boxGeometry args={[50, 0.5, 50]} />
              <meshStandardMaterial color="green" />
            </mesh>
          </RigidBody>
        </Physics>
        <Environment background preset="park" />
      </Canvas>
    </KeyboardControls>
  );
}
export default TerrainProceduralGenerator;
