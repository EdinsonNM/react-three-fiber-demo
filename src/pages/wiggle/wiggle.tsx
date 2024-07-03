import {
  OrbitControls,
  PivotControls,
  TransformControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { WiggleBone } from "wiggle";
import CanvasContainer from "../../components/canvas-container";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group } from "three";
import { WiggleRigHelper } from "wiggle/helper";

const rootBoneName = "Bone";
const bodyName = "Cube";
const Model = () => {
  const mesh = useRef<Group>(null);

  const { scene, animations } = useGLTF("./models/wiggle-spider.glb");
  const { actions } = useAnimations(animations, mesh);
  const [rootBone, setRootBone] = useState<any>(null);
  const [wiggleBones, setWiggleBones] = useState<WiggleBone[]>([]);
  console.log(actions);

  useEffect(() => {
    actions["body_idle"]?.play();
  }, [actions]);
  useEffect(() => {
    if (scene === null) return;
    const wiggleBonesT: WiggleBone[] = [];
    const rootBoneT = scene.getObjectByName(rootBoneName);

    scene.getObjectByName(bodyName)!.skeleton!.bones.forEach((wiggleBone) => {
      if (wiggleBone.name !== rootBoneName)
        wiggleBonesT.push(
          new WiggleBone(wiggleBone, { stiffness: 700, damping: 28 })
        );
    });
    setRootBone(rootBoneT);
    setWiggleBones(wiggleBonesT);
  }, [scene]);

  useFrame((_, delta) => {
    wiggleBones.forEach((wiggleBone) => {
      wiggleBone.update();
    });
  });

  const { scene: sceneGlobal } = useThree();
  useEffect(() => {
    const helper = new WiggleRigHelper({
      skeleton: scene.getObjectByName(bodyName).skeleton,
      dotSize: 0.2,
      lineWidth: 0.02,
    });
    sceneGlobal.add(helper);
  }, [sceneGlobal, scene]);
  return (
    <>
      <group ref={mesh}>
        <primitive object={scene} />
      </group>

      <TransformControls object={mesh} showY={false} />
    </>
  );
};
function Wiggle() {
  return (
    <CanvasContainer>
      <gridHelper args={[20, 20]} />
      <directionalLight position={[0, 10, 10]} castShadow />
      <ambientLight intensity={0.5} />
      <Model />
    </CanvasContainer>
  );
}
export default Wiggle;
