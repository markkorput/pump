export async function play({
  frequency,
  duration = 1.0,
}: {
  frequency?: number;
  duration?: number;
} = {}) {
  // one context per document
  const context = new window.AudioContext();
  const osc = context.createOscillator(); // instantiate an oscillator
  // osc.type = "sine"; // this is the default - also square, sawtooth, triangle
  if (frequency) osc.frequency.value = 440; // Hz
  osc.connect(context.destination);
  osc.start();
  osc.stop(context.currentTime + duration);
}
