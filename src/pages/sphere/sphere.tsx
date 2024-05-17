import { Environment, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { extend } from "@react-three/fiber";
extend({ TextGeometry });

function Sphere() {
  const {
    wireframe,
    material,
    isVisibleLighting,
    environment,
    environmentType,
    metalness,
    roughness,
  } = useControls({
    isVisibleLighting: false,
    wireframe: true,
    environment: false,
    environmentType: {
      options: [
        "apartment",
        "city",
        "dawn",
        "forest",
        "lobby",
        "night",
        "park",
        "studio",
        "sunset",
        "warehouse",
      ],
      value: "city",
    },
    material: {
      value: "normalMap",
      options: ["normalMap", "standardMaterial", "pointMaterial"],
    },
    metalness: { value: 0, min: 0, max: 255, step: 0.1 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
  });

  const texture = useTexture("textures/texture.jpg");

  return (
    <>
      <points>
        <sphereGeometry />
        <pointsMaterial size={0.02} />
      </points>
    </>
  );
}
export default Sphere;
