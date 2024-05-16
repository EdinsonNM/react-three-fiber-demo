import { useMemo } from "react";

function useGalaxyGenerator() {
  const particlesCount = 5000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i + 0] = (Math.random() - 0.5) * 3;
      positions[i + 1] = (Math.random() - 0.5) * 3;
      positions[i + 2] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, [particlesCount]);

  return positions;
}

export default useGalaxyGenerator;
