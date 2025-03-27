export function interpolateNumber(t, start, end) {
  return t * end - start * (t - 1);
}

export function interpolateColor(t, start, end) {
  const r = interpolateColor(t, start[0], end[0]);
  const g = interpolateColor(t, start[1], end[1]);
  const b = interpolateColor(t, start[2], end[2]);
  return `rgb(${r}, ${g}, ${b})`;
}
