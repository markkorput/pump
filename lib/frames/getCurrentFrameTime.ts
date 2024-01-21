/**
 * uses requestAnimationFrame to invoke the given `frame` callback each frame
 */
export async function getCurrentFrameTime(): Promise<number> {
  return new Promise(requestAnimationFrame);
}
