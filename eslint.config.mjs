import globals from 'globals';
import pluginJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import babelParser from '@babel/eslint-parser';

// 获取当前文件的绝对路径
const currentFilePath = fileURLToPath(import.meta.url);
// 获取当前文件所在的目录路径
const currentDirectory = path.dirname(currentFilePath);

// 创建一个 ESLint 配置兼容实例，指定基础目录
const eslintConfigCompat = new FlatCompat({
  baseDirectory: currentDirectory,
});

/**
 * 导出 ESLint 的配置数组
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  // 使用 ESLint 推荐的配置
  pluginJs.configs.recommended,
  // 扩展 Airbnb 的基础 ESLint 配置
  ...eslintConfigCompat.extends('eslint-config-airbnb-base'),
  {
    languageOptions: {
      parser: babelParser,
      // 定义全局变量，包含浏览器、ES2021、Node.js 和 Jest 的全局变量
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // 禁用 import/prefer-default-export 规则
      'import/prefer-default-export': 0,
      'import/no-extraneous-dependencies': 0,
      'no-use-before-define': 0,
      'no-shadow': 0,
      'no-restricted-syntax': 0,
      'no-return-assign': 0,
      'no-param-reassign': 0,
      'no-sequences': 0,
      'no-loop-func': 0,
      'no-nested-ternary': 0,
    },
  },
];
