import { Environment, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import CanvasContainer from "../../components/canvas-container";
import { Canvas } from "@react-three/fiber";

function BoxContent() {
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
      <mesh>
        {isVisibleLighting && <ambientLight />}
        <boxGeometry />
        {material === "normalMap" && (
          <meshNormalMaterial wireframe={wireframe} />
        )}
        {material === "standardMaterial" && (
          <meshStandardMaterial
            wireframe={wireframe}
            map={texture}
            metalness={metalness}
            roughness={roughness}
          />
        )}
      </mesh>
      {environment && <Environment preset={environmentType} background />}
    </>
  );
}
function Box() {
  return (
    <CanvasContainer>
      <BoxContent />
    </CanvasContainer>
  );
}
export default Box;
