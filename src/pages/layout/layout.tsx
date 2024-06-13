import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  const navigation = [
    { url: "/", title: "Box" },
    { url: "/sphere", title: "sphere" },
    { url: "/galaxy", title: "Galaxy" },
    { url: "/openai", title: "OpenAI" },
    { url: "/animation-ai", title: "Animation AI" },
    { url: "/mini-world", title: "MiniWorld" },
    {
      url: "/terrain-procedural-generator",
      title: "Terrain Generator",
    },
  ];
  return (
    <div className="relative h-full w-full flex flex-col">
      <header className="flex-shrink text-3xl p-6">
        React Three Fiber Demo
      </header>
      <main className="fixed w-full h-full left-0 top-0 flex justify-center items-center">
        <Outlet />
      </main>
      <nav className="fixed left-0 bottom-0 h-7 w-full flex gap-4 justify-center items-center">
        <ul className="flex flex-row mx-auto gap-4 mb-20">
          {navigation.map((item) => (
            <li key={item.url} className="">
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-md hover:bg-gray-600 bg-gray-900 p-3"
                    : "rounded-md hover:bg-gray-600 p-3"
                }
              >
                {item.title}
              </NavLink>{" "}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
export default Layout;
