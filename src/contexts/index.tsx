import { useContext } from "react";
import { RandomContext } from "./contextRandom";

export function useRandomContext() {
  return useContext(RandomContext);
}
