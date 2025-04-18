// 创建 SVG 元素
export function createSVGElement(type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

// 将 child 节点挂载到 parent 节点上面
export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}

// 设置属性
export function applyAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    // 这里需要把 strokeWidth 的属性转换为 stroke-width 的形式
    // 思路就是正则匹配将大写字母替换成 - + 对应的小写字母的形式
    const kebabCaseKey = key.replace(
      /[A-Z]/g,
      (d) => `-${d.toLocaleLowerCase()}`,
    );
    element.setAttribute(kebabCaseKey, value);
  }
}

export function applyTransform(element, transform) {
  const oldTransform = element.getAttribute('transform') || '';
  // 将新的变化指定到后面的变换后，这里需要字符串拼接
  const prefix = oldTransform ? `${oldTransform} ` : '';
  element.setAttribute('transform', `${prefix}${transform}`);
}
