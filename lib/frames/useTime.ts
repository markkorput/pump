import { useState } from "react";
import { useFrame } from "./useFrame";

export function useTime(): number {
  const [time, setTime] = useState<number>();
  useFrame(setTime);
  return time || 0;
}
