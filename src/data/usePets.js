import { useContext } from "react";
import { PetsContext } from "./petsContext.js";

export function usePets() {
  return useContext(PetsContext);
}