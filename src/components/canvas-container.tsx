import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
type Props = {
  children: React.ReactNode;
  backgroundColor?: string;
};
function CanvasContainer({ children, backgroundColor = "transparent" }: Props) {
  return (
    <Canvas
      gl={{ alpha: true }}
      style={{ background: backgroundColor }}
      camera={{ fov: 45, position: [0, 5, 20] }}
      shadows
    >
      <OrbitControls makeDefault />
      {children}
    </Canvas>
  );
}

export default CanvasContainer;
