export const models = {
  tile: {
    Large: {
      dimensiones: [6, 1, 6], //[x,y,z]
      colors: ["teamRed", "teamBlue", "teamYellow", "forest", "desert"],
      isBase: true,
      isTerrain: true,
      canHaveDecorations: true,
      canHaveObstacle: true,
    },
    High: {
      dimensiones: [2, 2, 2],
      colors: ["teamRed", "teamBlue", "teamYellow", "forest", "desert"],
      size: "High",
      isTerrain: true,
      canHaveDecorations: true,
      canHaveObstacle: true,
    },
    Medium: {
      dimensiones: [2, 1, 2],
      colors: ["teamRed", "teamBlue", "teamYellow", "forest", "desert"],
      size: "Medium",
      isTerrain: true,
      canHaveDecorations: true,
      canHaveObstacle: true,
    },
    low: {
      dimensiones: [1, 1, 1],
      colors: ["teamRed", "teamBlue", "teamYellow", "forest", "desert"],
      size: "Low",
      isTerrain: true,
      canHaveDecorations: true,
      canHaveObstacle: true,
    },
  },

  tileSlope: {
    LowMedium: {
      dimensiones: [2, 1.5, 2],
      colors: ["teamRed", "teamBlue", "teamYellow", "forest", "desert"],
      size: "LowMedium",
      canHaveDecorations: false,
      isTerrain: true,
      canHaveObstacle: false,
    },
    LowHigh: {
      dimensiones: [2, 2, 2],
      colors: ["teamRed", "teamBlue", "teamYellow", "forest", "desert"],
      size: "LowHigh",
      canHaveDecorations: false,
      isTerrain: true,
      canHaveObstacle: false,
    },
    MediumHigh: {
      dimensiones: [2, 2, 2],
      colors: ["teamRed", "teamBlue", "teamYellow", "forest", "desert"],
      size: "MediumHigh",
      canHaveDecorations: false,
      isTerrain: true,
      canHaveObstacle: false,
    },
  },

  obstaculos: {
    swiper: {
      dimensiones: [0.8, 1.63, 3.38],
      colors: ["teamRed", "teamBlue", "teamYellow"],
    },
    swiperLong: {
      dimensiones: [0.8, 1.63, 5.38],
      colors: ["teamRed", "teamBlue", "teamYellow"],
    },
    swiperDouble: {
      dimensiones: [0.8, 1.63, 5.96],
      colors: ["teamRed", "teamBlue", "teamYellow"],
    },
  },

  decorations: {
    flag: {
      dimensiones: [1.2, 2, 0.552],
      colors: ["teamRed", "teamBlue", "teamYellow"],
    },
    tree: {
      dimensiones: [1.53, 3, 1.5],
      colors: ["forest", "desert"],
    },
    rocksA: {
      dimensiones: [1.63, 0.35, 1.49],
      colors: ["forest", "desert"],
    },
    rocksB: {
      dimensiones: [2.04, 2.8, 0.551],
      colors: ["forest", "desert"],
    },
  },
};
export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};
