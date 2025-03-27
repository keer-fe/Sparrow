import { createLinear } from './linear';

export function createTime({ domain, ...rest }) {
  const transform = (x) => x.getTime();
  const transformedDomain = domain.map(transform);
  const linear = createLinear({ domain: transformedDomain, ...rest });

  const scale = (x) => linear(transform(x));
  scale.nice = (tickCount) => scale.nice(tickCount);
  scale.ticks = (tickCount) => scale.ticks(tickCount).map((d) => new Date(d));

  return scale;
}
