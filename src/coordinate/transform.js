export function transform(type, transformer) {
  transformer.type = () => type;
  return transformer;
}

// 平移
export function translate(tx = 0, ty = 0) {
  return transform('translate', ([px, py]) => [px + tx, py + ty]);
}

// 缩放
export function scale(sx = 1, sy = 1) {
  return transform('scale', ([px, py]) => [px * sx, py * sy]);
}

// 反射
export function reflect() {
  return transform('reflect', scale(-1, -1));
}

// 按照 X 轴反射
export function reflectX() {
  return transform('reflectX', scale(-1, 1));
}

// 按照 Y 轴反射
export function reflectY() {
  return transform('reflectY', scale(1, -1));
}

// 转置
export function transpose() {
  return transform('transpose', ([px, py]) => [py, px]);
}

// 极坐标
export function polar() {
  // 这里我们把点的第一个维度作为 theta
  // 第二个维度作为radius
  return transform('polar', ([theta, radius]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y];
  });
}
