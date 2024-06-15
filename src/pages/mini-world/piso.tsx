import { RigidBody } from "@react-three/rapier";
import { Gltf, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Piso() {
  const { scene, nodes } = useGLTF("/models/mini-world.gltf");
  console.log(nodes);

  const blue1Ref = useRef();
  const blue2Ref = useRef();
  const redRef = useRef();
  const yellow2Ref = useRef();

  useFrame(() => {
    //nodes["swiperLong_teamBlue"].rotation.y += 0.03;
    //nodes["swiperLong_teamRed001"].rotation.y += 0.02;
    //nodes["swiperLong_teamYellow001"].rotation.y += 0.02;
    //nodes["swiperLong_teamYellow002"].rotation.y += 0.03;

    // Update RigidBody rotations
    // Update RigidBody rotations

    blue1Ref.current.setAngvel({ x: 0, y: 1, z: 0 }, true);
    blue2Ref.current.setAngvel({ x: 0, y: 1, z: 0 }, true);
  });
  return (
    <>
      <RigidBody type="kinematicVelocity" name="piso" colliders="trimesh">
        <primitive object={scene} position={[0, 0, 0]} rotation={[0, 0, 0]} />
      </RigidBody>
      <RigidBody
        type="kinematicVelocity"
        name="swiperBlue"
        colliders="trimesh"
        ref={blue1Ref}
        restitution={3}
      >
        <Gltf
          src="models/swiperDouble_teamBlue.gltf.glb"
          position={[-3.5, 0.5, 24.2]}
        />
      </RigidBody>
      <RigidBody
        type="kinematicVelocity"
        name="swiperBlue"
        colliders="trimesh"
        ref={blue2Ref}
        restitution={3}
      >
        <Gltf
          src="models/swiperDouble_teamYellow.gltf.glb"
          position={[2.65, 0.5, 24.2]}
        />
      </RigidBody>
    </>
  );
}
export default Piso;
