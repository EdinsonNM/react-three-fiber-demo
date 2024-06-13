import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Physics } from "@react-three/rapier";
import Player from "./player";
import Piso from "./piso";
import { Controls } from "./mini-world.constants";
import Space from "./space";

function MiniWorld() {
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
        camera={{ fov: 45, position: [0, 30, 50] }}
      >
        <Physics>
          <OrbitControls />
          <ambientLight />
          <directionalLight />
          <gridHelper />
          <axesHelper />
          <Player />
          <Piso />
          <Space />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}
export default MiniWorld;
