# vue3-antd-admin

基于 vue-cli5.x / vite2.x + vue3.x + antd-design-vue3.x + typescript4.x 的后台管理系统模板

## 安装使用

- 获取项目代码

```bash
git clone 
```

- 安装依赖

```bash
cd vue3-antd-admin

yarn install

```

- 运行

```bash
yarn serve
```

- 打包

```bash
yarn build
```

## vscode 配置

安装项目根目录.vscode 推荐的插件，再安装 Volar，并禁用 Vetur，重启 vscode 即可。

> 使用了 Vue3.x 全家桶、ant-design-vue3.x 和 typescript4.x，实践 vue3.x 的新特性以及玩法，不得不说 vue3.x 的 Composition API 相比于 vue2.x 的 Options API 灵活很多，让我们可以灵活地组合组件逻辑，我们可以很轻松的使用 hooks 的形式去代替以前 mixins 等的写法。更多 hooks 可以参考[vueuse](https://vueuse.org/functions.html)

## 代码规范

- /src/components -- 公共组件文件名称大驼峰 (SearchTable)

- 除公共组件之外文件夹名或组件名称统一使用小写字母或者小写字母与‘-’组合（module-file）

- src/api | /src/hooks | /src/router | /src/store | /src/utils -- 系统方法使用小驼峰 (useHooks)

- 元素名称统一用小写字母'-'组合 <a-form> <search-table>

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
