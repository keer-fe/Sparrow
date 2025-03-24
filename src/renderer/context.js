// 上下文
// 画布节点：svg 节点，用来将其挂载到 DOM 需要的位置
// 挂载节点：这是一个 g 节点，用来挂在新元素。通过更新它来达到管理坐标系变换的功能
import { createSVGElement, mount } from './utils';

export function createContext(width, height) {
  // 创建画布 svg 节点，并且设置宽高
  const svg = createSVGElement('svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // 创建挂载 g 节点，并且把 g 节点挂载到 svg 节点上
  const g = createSVGElement('g');
  mount(svg, g);

  // 返回画布节点和挂载节点
  return { node: svg, group: g };
}
