import React, { useReducer, createContext, ReactElement, useContext } from "react";
import { initialState, asteroidReducer } from "./reducer";
import { Action, InitialState } from "../types";

const AsteroidContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function AsteroidsContext({ children }: { children: ReactElement }) {
  const [state, dispatch] = useReducer(asteroidReducer, initialState);
  return <AsteroidContext.Provider value={{ state, dispatch }}>{children}</AsteroidContext.Provider>;
}
function useAsteroidContext() {
  const context = useContext(AsteroidContext);
  if (context === undefined) {
    throw new Error("useAsteroidContext must be used within a contextProvider");
  }
  const { state, dispatch } = context;

  return { state, dispatch };
}

export { AsteroidsContext, useAsteroidContext };
