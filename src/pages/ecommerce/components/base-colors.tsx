import { useContext, useState } from "react";
import { EcommerceContext } from "../ecommerce.context";

function BaseColors() {
  const baseColors = [
    "#903345",
    "#F2D3AC",
    "#F2F2F2",
    "#000000",
    "#003299",
    "#009999",
  ];
  const { selectBaseColor, state } = useContext(EcommerceContext);

  const selectColor = (color: string) => {
    selectBaseColor(color);
  };
  return (
    <div className="mb-8">
      <h3>Base Color</h3>
      <ul className="flex gap-4 flex-wrap list-none justify-start ml-0 pl-0">
        {baseColors.map((color: string, index: number) => (
          <li className="relative" key={index}>
            {state.baseColor === color && (
              <span className="absolute -top-2 -right-1 bg-white text-xs w-18px h-18px flex items-center justify-center rounded-full border border-gray-700">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17L4.5 12.5L6 11L9 14L18 5L19.5 6.5L9 17Z"
                    fill="black"
                  />
                </svg>
              </span>
            )}
            <button
              className="w-8 h-8 rounded-full border-2 border-white border-solid cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => selectColor(color)}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BaseColors;
