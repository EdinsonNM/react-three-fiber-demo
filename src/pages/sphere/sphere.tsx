import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function SphereContent() {
  return (
    <>
      <OrbitControls />
      <points>
        <sphereGeometry />
        <pointsMaterial size={0.02} />
      </points>
    </>
  );
}

function Sphere() {
  return (
    <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
      <SphereContent />
    </Canvas>
  );
}
export default Sphere;
