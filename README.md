# 🚀 Electron + Vue3 Demo

这是一个展示如何将 Electron 与 Vue3 集成的演示项目。该项目使用现代前端技术栈，提供了一个功能完整的桌面应用程序示例。

## ✨ 功能特性

- 🖥️ **Electron** - 跨平台桌面应用框架
- ⚡ **Vue3** - 现代 JavaScript 框架，使用 Composition API
- 🛠️ **Vite** - 快速的构建工具和开发服务器
- 💬 **IPC 通信** - 主进程与渲染进程之间的通信示例
- 🎨 **现代 UI** - 响应式设计，支持深色/浅色主题切换
- 📊 **实时数据** - Vue3 响应式数据演示
- 🔄 **双向绑定** - 表单输入与数据同步
- 📋 **动态列表** - 添加/删除列表项功能
- 📈 **状态监控** - 应用状态和系统信息展示

## 🛠️ 技术栈

- **前端框架**: Vue3 (Composition API)
- **桌面框架**: Electron
- **构建工具**: Vite
- **包管理器**: npm
- **样式**: 原生 CSS (CSS Grid, Flexbox)

## 📦 安装和运行

### 前置要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器和 Electron 应用：

```bash
npm run dev
```

这将同时启动：
- Vite 开发服务器 (http://localhost:5173)
- Electron 应用程序

### 构建生产版本

构建 Vue 应用：

```bash
npm run build
```

构建并打包 Electron 应用：

```bash
npm run build:electron
```

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
electron_demo2_vue/
├── src/                    # Vue 应用源码
│   ├── App.vue            # 主 Vue 组件
│   ├── main.js            # Vue 应用入口
│   └── style.css          # 全局样式
├── assets/                # 静态资源
├── public/                # 公共文件
├── dist/                  # 构建输出目录
├── main.js                # Electron 主进程
├── preload.js             # Electron 预加载脚本
├── index.html             # HTML 入口文件
├── vite.config.js         # Vite 配置
└── package.json           # 项目配置
```

## 🎯 主要功能演示

### 1. 系统信息展示
- 应用版本信息
- 平台检测
- 用户代理信息

### 2. Electron 功能
- 原生消息框
- 菜单栏集成
- 主进程与渲染进程通信

### 3. Vue3 特性
- Composition API
- 响应式数据
- 计算属性
- 生命周期钩子

### 4. 用户界面
- 现代化卡片布局
- 响应式设计
- 深色/浅色主题切换
- 平滑动画效果

## 🔧 开发说明

### IPC 通信

项目展示了 Electron 中主进程与渲染进程之间的通信：

- 使用 `contextBridge` 安全地暴露 API
- 通过 `ipcRenderer` 和 `ipcMain` 进行双向通信
- 菜单事件处理

### Vue3 最佳实践

- 使用 Composition API 组织代码
- 响应式数据管理
- 组件化开发思维

### 安全考虑

- 禁用了 `nodeIntegration`
- 使用 `contextIsolation`
- 通过预加载脚本安全地暴露 API

## 📱 支持的平台

- ✅ Windows
- ✅ macOS
- ✅ Linux

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目采用 ISC 许可证。

## 🙏 致谢

感谢以下开源项目：

- [Electron](https://electronjs.org/)
- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)

---

**注意**: 这是一个演示项目，仅用于学习和参考目的。在生产环境中使用时，请确保进行适当的安全审查和优化。
