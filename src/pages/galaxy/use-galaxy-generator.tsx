import { useMemo } from "react";
import * as Three from "three";
type Props = {
  count: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
};
function useGalaxyGenerator({
  count,
  radius,
  branches,
  spin,
  randomness,
  randomnessPower,
  insideColor,
  outsideColor,
}: Props) {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const brancheAngle = Math.PI * 2 * ((i % branches) / branches);
      const radiusParticle = Math.random() * radius;
      const spinAngle = radiusParticle * spin;
      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radiusParticle;
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radiusParticle;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radiusParticle;
      positions[i3 + 0] =
        Math.cos(brancheAngle + spinAngle) * radiusParticle + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] =
        Math.sin(brancheAngle + spinAngle) * radiusParticle + randomZ;
      console.log((i % branches) / branches);

      const colorInsideParticle = new Three.Color(insideColor);
      const colorOutsideParticle = new Three.Color(outsideColor);
      const mixedColor = colorInsideParticle.clone();
      mixedColor.lerp(colorOutsideParticle, radiusParticle / radius);
      colors[i3 + 0] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, [
    count,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  ]);

  return particles;
}

export default useGalaxyGenerator;
