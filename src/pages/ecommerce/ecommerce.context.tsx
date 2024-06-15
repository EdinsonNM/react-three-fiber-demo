import { createContext, useReducer } from "react";

export const EcommerceContext = createContext({
  state: { baseColor: "#F2F2F2", cushionColor: "#e5abb6" },
  selectBaseColor: (color: string) => {},
  selectCushionColor: (color: string) => {},
});

function reducer(state, action) {
  switch (action.type) {
    case "SET_BASE_COLOR":
      return { ...state, baseColor: action.payload };
    case "SET_CUSHION_COLOR":
      return { ...state, cushionColor: action.payload };
    default:
      return state;
  }
}

function EcommerceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    baseColor: "#F2F2F2",
    cushionColor: "#e5abb6",
  });

  const selectBaseColor = (color: string) => {
    dispatch({ type: "SET_BASE_COLOR", payload: color });
  };

  const selectCushionColor = (color: string) => {
    dispatch({ type: "SET_CUSHION_COLOR", payload: color });
  };

  return (
    <EcommerceContext.Provider
      value={{ state, selectBaseColor, selectCushionColor }}
    >
      {children}
    </EcommerceContext.Provider>
  );
}
export default EcommerceProvider;
