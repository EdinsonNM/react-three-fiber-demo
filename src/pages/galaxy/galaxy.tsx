import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import useGalaxyGenerator from "./use-galaxy-generator";
import { useControls } from "leva";

const Galaxy = () => {
  // Your component logic here
  const meshRef = useRef(null);
  const positions = useGalaxyGenerator();
  console.log(positions);
  useFrame(() => {
    meshRef.current.rotation.y += 0.002;
  });

  const { size } = useControls({
    size: {
      value: 0.01,
      min: 0.01,
      max: 1,
    },
  });

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
        </bufferGeometry>
        <pointsMaterial
          size={size}
          color="#5786F5"
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      {/*<Stars
        radius={100} // Radio de la esfera de estrellas
        depth={50} // Profundidad de la capa de estrellas
        count={5000} // Número de estrellas
        factor={4} // Variación en el tamaño de las estrellas
        saturation={0} // Saturación del color de las estrellas
        fade // Efecto de desvanecimiento en las estrellas
  />*/}
    </>
  );
};

export default Galaxy;
