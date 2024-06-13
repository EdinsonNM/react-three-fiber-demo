import { RigidBody, euler, quat, vec3 } from "@react-three/rapier";
import {
  Gltf,
  PerspectiveCamera,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Controls } from "./mini-world.constants";
import { useRef } from "react";
import { Vector3 } from "three";

const MOVEMENT_SPEED = 5;
const ROTATION_SPEED = 2;
const JUMP_FORCE = 8;

function Player() {
  const playerRef = useRef();
  const camera = useRef();
  const cameraTarget = useRef(new Vector3(0, 0, 0));
  const [, get] = useKeyboardControls();
  const inTheAir = useRef(false);
  const velocity = new Vector3();
  useFrame(() => {
    cameraTarget.current.lerp(vec3(playerRef.current.translation()), 0.5);
    camera.current!.lookAt(cameraTarget.current);

    const rotVel = {
      x: 0,
      y: 0,
      z: 0,
    };
    const currentVelocity = playerRef.current!.linvel();
    velocity.set(0, 0, 0);

    if (get()[Controls.forward]) {
      velocity.z += MOVEMENT_SPEED;
    }
    if (get()[Controls.back]) {
      velocity.z -= MOVEMENT_SPEED;
    }
    if (get()[Controls.left]) {
      rotVel.y += ROTATION_SPEED;
    }
    if (get()[Controls.right]) {
      rotVel.y -= ROTATION_SPEED;
    }
    playerRef.current.setAngvel(rotVel, true);

    const eulerRot = euler().setFromQuaternion(
      quat(playerRef.current.rotation())
    );

    velocity.applyEuler(eulerRot);

    if (get()[Controls.jump] && !inTheAir.current) {
      inTheAir.current = true;
      velocity.y += JUMP_FORCE;
    } else {
      velocity.y = currentVelocity.y;
    }
    playerRef.current.setLinvel(velocity, true);
  });
  const respawn = () => {
    playerRef.current.setTranslation(vec3({ x: 0, y: 5, z: 0 }), true);
  };
  return (
    <RigidBody
      position-y={10}
      ref={playerRef}
      gravityScale={1.2}
      enabledRotations={[false, true, false]}
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject!.name === "piso") {
          inTheAir.current = false;
        }
      }}
      onIntersectionEnter={({ other }) => {
        if (other.rigidBodyObject!.name === "space") {
          respawn();
        }
      }}
    >
      <Gltf src="/models/player-dog.gltf" castShadow />
      <PerspectiveCamera ref={camera} makeDefault position={[0, 5, -8]} />
      {/*<mesh position-y={1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>*/}
    </RigidBody>
  );
}
export default Player;
