import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as Three from "three";
import useLevaControls from "./use-leva-controls";
import useGalaxyGenerator from "./use-galaxy-generator";
import CanvasContainer from "../../components/canvas-container";

const GalaxyContent = () => {
  // Your component logic here
  const meshRef = useRef<any>(null);

  const controls = useLevaControls();
  useFrame(() => {
    meshRef!.current!.rotation.y += 0.003;
  });
  useEffect(() => {
    meshRef!.current!.geometry.dispose();
  }, [controls]);
  const { positions, colors } = useGalaxyGenerator(controls);

  return (
    <>
      <ambientLight intensity={0.5} />
      <points ref={meshRef}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={positions.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={controls.size}
          sizeAttenuation
          depthWrite={false}
          blending={Three.AdditiveBlending}
          vertexColors
        />
      </points>
    </>
  );
};
const Galaxy = () => {
  return (
    <CanvasContainer>
      <GalaxyContent />
    </CanvasContainer>
  );
};

export default Galaxy;
