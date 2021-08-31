const path = require('path');

/**
 * jest config setting
 * @see https://facebook.github.io/jest/docs/zh-Hans/configuration.html
 */
module.exports = {
  // 项目根目录，其他路径可以引用 '<rootDir>' 作为基本路径
  rootDir: path.resolve(__dirname, '../../'),
  // 匹配到的文件将执行测试
  testRegex: '/test/.*?\\.(test|spec)\\.(js|jsx)?$',
  // 类似 webpack 的 resolve.extensions
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  // 类似 webpack 的 resolve.alias
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1'
  },
  // 指定相应的模块（提供一个同步方法）处理相应格式的文件
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.vue$': '<rootDir>/node_modules/vue-jest'
  },
  // 将不忽略 lodash-es, other-es-lib 这些es库, 从而使babel-jest去处理它们
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lodash-es|other-es-lib))'],
  // 快照测试 vue模块
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  // 每次测试前执行，一般用于执行区分其他环境的代码
  // setupFiles: ['<rootDir>/test/unit/setup'],
  // 是否搜集覆盖率信息
  collectCoverage: true,
  // Jest输出覆盖信息文件的目录
  coverageDirectory: '<rootDir>/test/unit/coverage',
  // 匹配的文件将收集覆盖率
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/index.ts',
    '!src/**/*.d.ts',
    '!**/node_modules/**'
  ],
  testEnvironmentOptions: { "resources": "usable" }
}
