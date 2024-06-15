import { useGLTF } from "@react-three/drei";
import { EcommerceContext } from "../ecommerce.context";
import { useContext, useEffect } from "react";

function Model() {
  const { state } = useContext(EcommerceContext);
  const { scene, nodes, materials } = useGLTF(
    "./models/ecommerce/headphones.gltf"
  );
  console.log(nodes, materials);
  useEffect(() => {
    materials.Base.color.set(state.baseColor);
    materials.Cush.color.set(state.cushionColor);
  }, [materials.Base, state.baseColor, materials.Cush, state.cushionColor]);
  return <primitive object={scene} />;
}
export default Model;
