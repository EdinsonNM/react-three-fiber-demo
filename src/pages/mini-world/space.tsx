import { CuboidCollider, RigidBody } from "@react-three/rapier";

function Space() {
  return (
    <RigidBody
      type="fixed"
      colliders={false}
      sensor
      name="space"
      position-y={-7}
    >
      <CuboidCollider args={[40, 0.5, 100]} />
    </RigidBody>
  );
}
export default Space;
