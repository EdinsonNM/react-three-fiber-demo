import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Empty() {
  return (
    <div className="text-4xl text-green-400 w-full h-full">
      <Canvas className="w-full h-full" camera={{ position: [0, 10, 5] }}>
        <OrbitControls />
        <directionalLight />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color={"hotpink"} />
        </mesh>
      </Canvas>
    </div>
  );
}
export default Empty;
