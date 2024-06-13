import { RigidBody } from "@react-three/rapier";
import Model from "./components/model";

function Piso() {
  return (
    <RigidBody type="fixed" name="piso" colliders="trimesh">
      {/* <mesh>
        <boxGeometry args={[20, 0.5, 20]} />
        <meshStandardMaterial color="green" />
      </mesh>*/}
      <Model name="mini-world.gltf" position={[0, 0, 0]} rotation={[0, 0, 0]} />
    </RigidBody>
  );
}
export default Piso;
