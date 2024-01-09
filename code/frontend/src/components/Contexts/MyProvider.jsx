import React, { useState } from "react";
import { MyContext } from "./MyContext";

export function MyProvider({ children }) {
  const [data, setData] = useState("Initial data");

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
}
