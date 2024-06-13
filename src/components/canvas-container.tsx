import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
type Props = {
  children: React.ReactNode;
};
function CanvasContainer({ children }: Props) {
  return (
    <Canvas
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
      camera={{ fov: 45, position: [0, 5, 20] }}
    >
      <OrbitControls />
      {children}
    </Canvas>
  );
}

export default CanvasContainer;
