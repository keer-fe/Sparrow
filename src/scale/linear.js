import { normalize, ticks, nice, tickStep, floor, ceil } from './utils';

export function createLinear({
  domain: [d0, d1], // 输入范围
  range: [r0, r1], // 输出范围
  interpolate = interpolateNumber,
}) {
  const scale = (x) => {
    const t = normalize(x, d0, d1);
    return interpolate(t, r0, r1);
  };

  scale.ticks = (tickCount) => ticks(d0, d1, tickCount);
  scale.nice = (tickCount) => {
    const step = tickStep(d0, d1, tickCount);

    [d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step),
    });
  };

  return scale;
}

export function interpolateNumber(t, start, end) {
  return t * end - start * (t - 1);
}

export function interpolateColor(t, start, end) {
  const r = interpolateColor(t, start[0], end[0]);
  const g = interpolateColor(t, start[1], end[1]);
  const b = interpolateColor(t, start[2], end[2]);
  return `rgb(${r}, ${g}, ${b})`;
}
