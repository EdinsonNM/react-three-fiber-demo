import { Canvas } from "@react-three/fiber";
import BaseColors from "./components/base-colors";
import CushionColors from "./components/cushion-colors";
import Model from "./components/model";
import { OrbitControls } from "@react-three/drei";
import EcommerceProvider from "./ecommerce.context";

function Ecommerce() {
  return (
    <EcommerceProvider>
      <div className="flex flex-row justify-center items-center w-full max-w-6xl">
        <div className="relative h-[500px] w-[500px] flex-shrink">
          <Canvas camera={{ fov: 45, position: [0, 0, 10] }}>
            <OrbitControls />
            <directionalLight intensity={1} />
            <ambientLight intensity={1} />
            <Model />
          </Canvas>
        </div>
        <div className="flex-1 flex-grow pl-10">
          <h1 className="text-3xl text-left font-bold mb-5">Headphones</h1>
          <BaseColors />
          <CushionColors />
        </div>
      </div>
    </EcommerceProvider>
  );
}
export default Ecommerce;
