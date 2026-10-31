export function catRoamPose(time: number, width: number, height: number, reduced = false) {
  const artWidth = Math.min(320, width < 600 ? width * .56 : width * .31);
  const artHeight = artWidth / 1.55;
  const rx = Math.max(0, (width - artWidth) / 2 - 18);
  const ry = Math.max(0, (height - artHeight) / 2 - 22);
  // Constant arc speed around an ellipse; the table also gives a repeatable full-loop audit.
  const samples = 120;
  const lengths = [0];
  let total = 0, px = rx, py = 0;
  for (let i = 1; i <= samples; i++) {
    const a = i / samples * Math.PI * 2;
    const x = rx * Math.cos(a), y = ry * Math.sin(a);
    total += Math.hypot(x - px, y - py); lengths.push(total); px = x; py = y;
  }
  let angle = Math.PI / 2;
  if (!reduced && total) {
    const distance = ((time * 40 + total * .25) % total + total) % total;
    const next = lengths.findIndex(n => n >= distance);
    const i = Math.max(1, next);
    const mix = (distance - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1);
    angle = (i - 1 + mix) / samples * Math.PI * 2;
  }
  const heading = -Math.sin(angle);
  const face = Math.tanh(heading * 7);
  return { x: width / 2 + rx * Math.cos(angle), y: height / 2 + ry * Math.sin(angle), artWidth, artHeight,
    facing: face < 0 ? -1 : 1, turn: .20 + .80 * Math.abs(face), tilt: Math.cos(angle) * .055,
    cycle: total / 40 };
}
