import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js', // 打包入口
  output: [
    {
      file: 'lib/sparrow.js', // 对于 nodejs，打包成 commonjs
      format: 'cjs',
    },
    {
      file: 'esm/sparrow.js', // 对于浏览器，打包成 ES module
      format: 'es',
    },
    {
      file: 'dist/sparrow.min.js', // 对于 nodejs 和浏览器，打包成混合模式
      name: 'sp',
      format: 'umd',
    },
  ],
  plugins: [
    resolve(),
    babel(), // 使用 babel 插件
  ],
};
