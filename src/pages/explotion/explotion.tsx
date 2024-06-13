import { useEffect, useRef } from "react";
import CanvasContainer from "../../components/canvas-container";
import { Gltf, useAnimations, useGLTF } from "@react-three/drei";
import { AnimationAction, Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring } from "framer-motion";

const Cube = () => {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 20, damping: 1 });
  const meshRef = useRef<Group>(null);
  const { scene, animations } = useGLTF("models/cube-explotion.glb");
  const { actions } = useAnimations(animations, meshRef);

  console.log(actions);
  useEffect(() => {
    //actions["action1"]?.reset().fadeIn(0.5).play();
  }, [actions]);

  useFrame(({ camera }) => {
    meshRef.current!.rotation!.y += 0.01;
    Object.keys(actions).forEach((key) => {
      const action = actions[key] as AnimationAction;
      action.play().paused = true;
      action.time = spring.get();
    });
  });
  return (
    <group
      ref={meshRef}
      onPointerDown={() => {
        motionVal.set(1);
      }}
      onPointerUp={() => {
        motionVal.set(0);
      }}
    >
      <primitive object={scene} />;
    </group>
  );
};
const Explotion = () => {
  return (
    <CanvasContainer>
      <directionalLight />
      <ambientLight intensity={0.5} />
      <Cube />
      <Gltf src="models/player-dog.gltf" position={[0, -1, 0]} />
    </CanvasContainer>
  );
};

export default Explotion;
