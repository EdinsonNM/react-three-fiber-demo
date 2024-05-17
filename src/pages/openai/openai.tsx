import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import * as THREE from "three";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function parseDescription(description) {
  // Función para interpretar la descripción y extraer detalles de la escena
  // Aquí se utiliza un ejemplo simple para parsear la descripción
  const objects = [];
  const lines = description.split(".");
  lines.forEach((line) => {
    if (line.includes("cube")) {
      objects.push({ type: "cube", position: [0, 0, 0], color: "green" });
    }
    if (line.includes("sphere")) {
      objects.push({ type: "sphere", position: [1.5, 0, 0], color: "red" });
    }
    if (line.includes("cylinder")) {
      objects.push({ type: "cylinder", position: [-1.5, 0, 0], color: "blue" });
    }
  });
  return objects;
}
async function getSceneDescription(promptUser: string) {
  const prompt = `You are an expert in Three.js. You will generate only a JSON array, without any additional text, containing objects needed to create a 3D model using basic geometries in Three.js. Each object in the array should include the type of geometry (e.g., "box", "sphere", "cylinder"), args (e.g., [width, height, depth] for box, [radius, widthSegments, heightSegments] for sphere, [radiusTop, radiusBottom, height, radialSegments] for cylinder), position ([x, y, z]), and rotation ([x, y, z]).  All values should be numerical and pre-calculated (e.g., use 3.14 instead of Math.PI). The user can request models such as people, animals, and objects. The JSON array should look like this:

  [
    {
      "type": "box",
      "args": [2, 3, 1],
      "position": [0, 1.5, 0],
      "rotation": [0, 0, 0]
    },
    {
      "type": "box",
      "args": [1.5, 1.5, 1.5],
      "position": [0, 4.25, 0],
      "rotation": [0, 0, 0]
    },
    {
      "type": "cylinder",
      "args": [0.3, 0.3, 2, 32],
      "position": [-1.65, 1.5, 0],
      "rotation": [0, 0, 0]
    },
    {
      "type": "cylinder",
      "args": [0.3, 0.3, 2, 32],
      "position": [1.65, 1.5, 0],
      "rotation": [0, 0, 0]
    },
    {
      "type": "cylinder",
      "args": [0.5, 0.5, 3, 32],
      "position": [-0.75, -1.5, 0],
      "rotation": [0, 0, 0]
    },
    {
      "type": "cylinder",
      "args": [0.5, 0.5, 3, 32],
      "position": [0.75, -1.5, 0],
      "rotation": [0, 0, 0]
    }
  ]`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: prompt,
      },
      { role: "user", content: `Create a 3D model of a: ${promptUser}` },
    ],
    //max_tokens: 1000,
  });
  const text = completion.choices[0]?.message?.content?.trim();

  try {
    const parsedResponse = JSON.parse(text);
    return parsedResponse;
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    return null;
  }
}

function Openai() {
  const [model, setModel] = useState([]);
  const [description, setDescription] = useState("un perro"); //iption, setDescription] = useState(''); //

  const generateObject = () => {
    getSceneDescription(description).then((sceneDescription: any) => {
      setModel(sceneDescription);
    });
  };
  useEffect(() => {
    //generateObject();
  }, [setDescription]);
  return (
    <>
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
      <Html className="fixed">
        <div className="fixed left-0 bottom-16 w-full flex justify-center items-center flex-row">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={generateObject}>Generar</button>
        </div>
      </Html>
    </>
  );
}
export default Openai;
