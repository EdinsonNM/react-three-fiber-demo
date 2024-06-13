import { useEffect, useRef } from "react";
import { Noise } from "noisejs";
import * as THREE from "three";

function Terrain() {
  const meshRef = useRef();
  const noise = new Noise(Math.random());
  const width = 100;
  const height = 100;
  const scale = 0.1;
  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    width - 1,
    height - 1
  );

  useEffect(() => {
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      vertices[i + 2] = noise.perlin2(x * scale, y * scale) * 10; // Adjust the scale and height as needed
    }
    geometry.computeVertexNormals();
  }, [geometry, noise, scale]);

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

export default Terrain;
