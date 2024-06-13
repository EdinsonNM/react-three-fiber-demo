import { Html, OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { getSceneDescription } from "./openai-generator";
import { Canvas } from "@react-three/fiber";

function Openai() {
  const [model, setModel] = useState([]);
  const [description, setDescription] = useState("un perro"); //iption, setDescription] = useState(''); //
  const [isLoading, setLoading] = useState(false);
  const generateObject = () => {
    setLoading(true);
    getSceneDescription(description).then((sceneDescription: any) => {
      setModel(sceneDescription);
      setLoading(false);
    });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      generateObject();
      event.preventDefault();
    }
  };

  return (
    <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
      <OrbitControls />
      <group>
        {model.map((geometry, index) => {
          let geometryObject;
          switch (geometry.type) {
            case "box":
              geometryObject = <boxGeometry args={geometry.args} />;
              break;
            case "sphere":
              geometryObject = <sphereGeometry args={geometry.args} />;
              break;
            case "cylinder":
              geometryObject = <cylinderGeometry args={geometry.args} />;
              break;
            case "cone":
              geometryObject = <coneGeometry args={geometry.args} />;
              break;
            case "torus":
              geometryObject = <torusGeometry args={geometry.args} />;
              break;
          }
          return (
            <mesh
              key={`object-${index}`}
              position={geometry.position}
              rotation={geometry.rotation}
            >
              {geometryObject}
              <meshNormalMaterial />
            </mesh>
          );
        })}
      </group>
      {isLoading && (
        <Html className="w-[300px]" position={[-0.5, 0, 0]}>
          Generando idea....
        </Html>
      )}
      <Html className="fixed  left-0 bottom-16" position={[0, -3, 0]}>
        <div className="fixed left-0 bottom-16 w-full flex justify-center items-center flex-row">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ¿Qué se te ocurre el día de hoy?
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ingresa ty idea aquí y presiona enter"
              required
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </Html>
    </Canvas>
  );
}
export default Openai;
