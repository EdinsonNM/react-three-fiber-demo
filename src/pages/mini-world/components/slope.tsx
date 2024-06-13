import { useGLTF } from "@react-three/drei";

type Props = {
  size: "Large" | "Medium" | "Small";
};
function Slope({ size }: Props) {
  const model = useGLTF(`/models/tile${size}.glb`);
  return <primitive object={model.scene.clone()} />;
}
export default Slope;
