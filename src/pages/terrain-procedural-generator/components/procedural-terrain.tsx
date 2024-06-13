import { Gltf } from "@react-three/drei";
import { Noise } from "noisejs";

const getWeightedRandomModel = (models) => {
  const totalWeight = models.reduce((acc, model) => acc + model.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const model of models) {
    if (randomNum < model.weight) {
      return model.path;
    }
    randomNum -= model.weight;
  }
  return models[0].path; // Fallback
};
const ProceduralTerrain = ({ width, height, scale, models }) => {
  const noise = new Noise(Math.random());
  const terrainPieces = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const heightValue = noise.perlin2(x * scale, y * scale) * 10;
      const modelPath = getWeightedRandomModel(models);
      const position = [x * 2, heightValue, y * 2] as [number, number, number];
      terrainPieces.push(
        <Gltf
          key={`${x}-${y}`}
          src={modelPath}
          position={position}
          receiveShadow
          castShadow
        />
      );
    }
  }

  return <>{terrainPieces}</>;
};
export default ProceduralTerrain;
