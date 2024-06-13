import Model from "./model";

const TERRAIN_OBJECTS = [
  { type: "tileLarge_forest", position: [-6, 0, 0], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [0, 0, 0], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [6, 0, 0], rotation: [0, 0, 0] },

  { type: "tileLarge_forest", position: [-6, 0, 6], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [0, 0, 6], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [6, 0, 6], rotation: [0, 0, 0] },

  { type: "tileLarge_forest", position: [-6, 0, -6], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [0, 0, -6], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [6, 0, -6], rotation: [0, 0, 0] },

  { type: "tileLow_forest", position: [0, 1, 1], rotation: [0, 0, 0] },
  { type: "tileLow_forest", position: [2, 1, 1], rotation: [0, 0, 0] },
  { type: "tileLow_forest", position: [4, 1, 1], rotation: [0, 0, 0] },
  { type: "tileLow_forest", position: [6, 1, 1], rotation: [0, 0, 0] },

  {
    type: "tileSlopeLowMedium_forest",
    position: [-2, 1, 1],
    rotation: [0, 0, 0],
  },
  {
    type: "tileSlopeLowMedium_forest",
    position: [-4, 1, 1],
    rotation: [0, 0, 0],
  },
  {
    type: "tileSlopeLowMedium_forest",
    position: [-6, 1, 1],
    rotation: [0, 0, 0],
  },
  {
    type: "tileSlopeLowMedium_forest",
    position: [-8, 1, 1],
    rotation: [0, 0, 0],
  },

  { type: "tileHigh_forest", position: [6, 1, -1], rotation: [0, 0, 0] },
  { type: "tileHigh_forest", position: [6, 1, -2], rotation: [0, 0, 0] },
  { type: "tileHigh_forest", position: [6, 1, -3], rotation: [0, 0, 0] },

  /*{ type: "tileLarge_forest", position: [18, 0, 0], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [0, 0, 6], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [6, 0, 6], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [12, 0, 6], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [18, 0, 6], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [0, 0, 12], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [6, 0, 12], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [12, 0, 12], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [18, 0, 12], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [0, 0, 18], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [6, 0, 18], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [12, 0, 18], rotation: [0, 0, 0] },
  { type: "tileLarge_forest", position: [18, 0, 18], rotation: [0, 0, 0] },*/
];
function Terrain() {
  return (
    <>
      {" "}
      {TERRAIN_OBJECTS.map((item, index) => (
        <Model
          key={`item-${index}`}
          name={item.type}
          position={item.position as [number, number, number]}
          rotation={item.rotation as [number, number, number]}
        />
      ))}
    </>
  );
}
export default Terrain;
