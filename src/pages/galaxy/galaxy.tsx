import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import useGalaxyGenerator from "./use-galaxy-generator";
import { useControls } from "leva";
import * as Three from "three";
const Galaxy = () => {
  // Your component logic here
  const meshRef = useRef<any>(null);

  const {
    size,
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  } = useControls({
    radius: {
      value: 5,
      min: 1,
      max: 10,
      step: 1,
    },
    count: {
      value: 9000,
      min: 1000,
      step: 100,
      max: 100000,
    },
    size: {
      value: 0.01,
      min: 0.01,
      max: 1,
    },
    branches: {
      value: 3,
      max: 20,
      min: 1,
      step: 1,
    },
    spin: {
      value: 1,
      min: -5,
      max: 5,
      step: 1,
    },
    randomness: {
      value: 0.5,
      min: 0,
      max: 2,
      step: 0.01,
    },
    randomnessPower: {
      value: 2,
      min: 1,
      max: 10,
      step: 1,
    },
    insideColor: {
      value: "#fc9818",
    },
    outsideColor: {
      value: "#0458e8",
    },
  });
  useFrame(() => {
    meshRef!.current!.rotation.y += 0.003;
  });
  useEffect(() => {
    meshRef!.current!.geometry.dispose();
  }, [
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  ]);
  const { positions, colors } = useGalaxyGenerator(
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor
  );

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
          size={size}
          sizeAttenuation
          depthWrite={false}
          blending={Three.AdditiveBlending}
          vertexColors
        />
      </points>
    </>
  );
};

export default Galaxy;
