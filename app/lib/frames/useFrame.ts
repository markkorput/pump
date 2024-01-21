import { useRef, useEffect, useMemo } from "react";

/**
 * uses requestAnimationFrame to invoke the given `frame` callback each frame
 */
export function useFrame(frame: (time: number) => void) {
  const requestRef = useRef<number>();
  const nextFrame = useMemo(
    () => (time: number) => {
      frame(time);
      requestRef.current = requestAnimationFrame(nextFrame);
    },
    [frame],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(nextFrame);
    return () =>
      requestRef.current ? cancelAnimationFrame(requestRef.current) : undefined;
  }, [nextFrame]); // Make sure the effect runs only once
}
