import { Gltf } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Chair() {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current!.rotation.y += delta * 0.1;
  });
  return (
    <group ref={ref} position={[0, 0.2, 0.6]}>
      <Gltf src="/models/room/hyo-room-chair.gltf" />;
    </group>
  );
}
export default Chair;
