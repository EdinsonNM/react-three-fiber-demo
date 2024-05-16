import { useMemo } from "react";

function useGalaxyGenerator(particlesCount: number) {
  const positions = useMemo(() => {
    const positionsA = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positionsA[i + 0] = (Math.random() - 0.5) * 3;
      positionsA[i + 1] = (Math.random() - 0.5) * 3;
      positionsA[i + 2] = (Math.random() - 0.5) * 3;
    }
    return positionsA;
  }, [particlesCount]);

  return positions;
}

export default useGalaxyGenerator;
