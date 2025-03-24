import { applyAttributes, createSVGElement, mount } from './utils';

export function shape(type, context, attributes) {
  const { group } = context; // 挂载元素
  const el = createSVGElement(type); // 创建对应的元素
  applyAttributes(el, attributes); // 设置属性

  mount(group, el); // 挂载
  return el; // 返回该元素
}

export function line(context, attributes) {
  return shape('line', context, attributes);
}

// rect 不支持 width 和 height 为负数，下面这种情况将绘制不出来
// <rect width="-60" height="-60" x="100" y="100" />
// 为了使其支持负数的 width 和 height，我们转换为如下的形式
// <rect width="60" height="60" x="40" y="40" />
export function rect(context, attributes) {
  const { width, height, x, y } = attributes;

  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

export function circle(context, attributes) {
  return shape('circle', context, attributes);
}

// text 元素是将内容放在标签内部，而不是作为标签的属性
// 不是 <text text="content" />
// 是 <text>content</text>
export function text(context, attributes) {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text;
  return textElement;
}

// path 的属性 d 是个字符串，拼接起来比较麻烦，我们用数组去生成
export function path(context, attributes) {
  const { d } = attributes;
  return shape('path', context, {
    ...attributes,
    d: d.flat().join(' '),
  });
}

export function ring(context, attributes) {
  const { cx, cy, r1, r2, ...styles } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;

  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });

  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    cx,
    cy,
    r: (r1 + r2) / 2,
  });

  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });

  return [innerStroke, ring, outerStroke];
}
