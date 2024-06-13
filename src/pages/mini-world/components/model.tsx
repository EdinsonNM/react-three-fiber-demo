import { useGLTF } from "@react-three/drei";

type Props = {
  name: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
};
function Model({ name, ...props }: Props) {
  const nameModel = `/models/${name}`;
  const model = useGLTF(nameModel);
  return (
    <group {...props}>
      <primitive object={model.scene.clone()} />
    </group>
  );
}
export default Model;
