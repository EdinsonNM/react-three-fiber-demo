import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Props) {
  return (
    <div className="relative h-full w-full flex flex-col">
      <nav className="flex-shrink">header</nav>
      <main className="fixed w-full h-full left-0 top-0 flex justify-center items-center">
        <Canvas gl={{ alpha: true }} style={{ background: "transparent" }}>
          <OrbitControls />
          {children}
        </Canvas>
      </main>
    </div>
  );
}
export default Layout;
