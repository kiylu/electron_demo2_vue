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

**这个命令的执行流程：**
1. **并发启动两个进程**：
   - `npm run dev:vite` - 启动 Vite 开发服务器 (http://localhost:5173)
   - `npm run dev:electron` - 等待服务器就绪后启动 Electron 应用

2. **智能等待机制**：
   - 使用 `wait-on` 确保 Vite 服务器完全启动
   - 避免白屏问题，确保 Vue 应用准备就绪

3. **开发体验**：
   - Vue 应用支持热重载
   - Electron 窗口自动打开开发者工具
   - 任一进程失败时自动终止另一个

**其他开发命令：**
```bash
# 快速启动Electron（如果Vite已在运行）
npm run dev:electron-fast

# 仅启动Vite开发服务器
npm run dev:vite
```

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
├── src/                           # Vue 应用源码目录
│   ├── App.vue                   # 🎯 Vue主组件 - 所有UI逻辑
│   ├── main.js                   # 🎯 Vue应用入口 - 创建Vue实例
│   └── style.css                 # 🎨 全局样式 - CSS变量、响应式布局
├── assets/                       # 📁 静态资源（图标等）
├── public/                       # 📁 公共文件（favicon等）
├── dist/                         # 📁 构建输出目录（生产环境）
├── main.js                       # ⚡ Electron主进程 - 应用核心
├── preload.js                    # 🔗 安全桥梁 - IPC通信中介
├── index.html                    # 📄 HTML入口 - Vue应用容器
├── vite.config.js                # ⚙️ Vite配置 - 构建和开发服务器
├── package.json                  # 📦 项目配置 - 依赖和脚本
└── README.md                     # 📖 项目文档
```

### 文件详细说明

#### Vue 相关文件（你熟悉的部分）
- **`src/App.vue`** - 单文件组件，包含模板、脚本、样式
- **`src/main.js`** - `createApp(App).mount('#app')` 标准Vue入口
- **`src/style.css`** - CSS变量、Grid布局、响应式设计
- **`index.html`** - 标准HTML模板，包含 `<div id="app"></div>`

#### Electron 特有文件（需要学习的部分）
- **`main.js`** - Electron应用的"服务端"，管理窗口和系统交互
- **`preload.js`** - 安全中介，暴露受限的API给Vue应用
- **`vite.config.js`** - 配置相对路径等Electron兼容性设置

#### 配置文件
- **`package.json`** - 包含Electron特有的脚本和依赖

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

### Electron + Vue3 架构原理

#### 核心思想
Electron 本质上是一个将 Web 技术（HTML、CSS、JavaScript）包装成桌面应用的框架。对于 Vue 开发者来说，可以理解为：
- **Vue 应用** = 你熟悉的前端应用（运行在浏览器环境中）
- **Electron** = 提供桌面应用能力的"浏览器壳"

#### 架构组成

```
┌─────────────────────────────────────────────────────────────┐
│                    Electron 应用                            │
├─────────────────────────────────────────────────────────────┤
│  主进程 (Main Process)                                      │
│  ├── main.js - 应用生命周期管理                             │
│  ├── 窗口管理 - 创建、控制桌面窗口                         │
│  ├── 原生API - 文件系统、系统通知等                        │
│  └── 菜单管理 - 应用菜单栏                                 │
├─────────────────────────────────────────────────────────────┤
│  渲染进程 (Renderer Process)                               │
│  ├── Vue3 应用 (src/App.vue)                              │
│  ├── Vite 开发服务器                                       │
│  ├── 网页内容 - HTML/CSS/JavaScript                       │
│  └── preload.js - 安全的API桥接                           │
└─────────────────────────────────────────────────────────────┘
```

### 文件协作关系详解

#### 1. 启动流程 (`npm run dev`)

```bash
# package.json 脚本执行顺序
npm run dev
├── 启动 Vite 开发服务器 (dev:vite)
│   └── vite.config.js 配置 Vue3 构建
│   └── src/main.js 创建 Vue 应用
│   └── src/App.vue 渲染主界面
└── 等待服务器就绪后启动 Electron (dev:electron)
    └── main.js 创建桌面窗口
    └── 加载 http://localhost:5173 (Vue 应用)
    └── preload.js 注入安全API
```

#### 2. 文件职责分工

**Vue 部分（你已经熟悉的）：**
- `src/App.vue` - 主组件，包含所有UI逻辑
- `src/main.js` - Vue 应用入口，创建 Vue 实例
- `src/style.css` - 样式文件
- `index.html` - HTML 模板

**Electron 部分（桌面应用特有的）：**
- `main.js` - **主进程**，相当于桌面应用的"后端"
- `preload.js` - **安全桥梁**，连接主进程和Vue应用
- `vite.config.js` - 构建配置，确保Vue应用能在Electron中运行

#### 3. 进程间通信 (IPC) 详解

**问题**：Vue 应用运行在渲染进程中，无法直接访问系统API  
**解决**：通过 IPC 机制让 Vue 应用与主进程通信

```javascript
// Vue 组件中 (渲染进程)
const showAlert = async () => {
  // 调用预加载脚本暴露的API
  await window.electronAPI.showMessageBox({
    title: '消息提示',
    message: '这是来自主进程的消息！'
  });
};
```

```javascript
// preload.js (安全桥梁)
contextBridge.exposeInMainWorld('electronAPI', {
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options)
});
```

```javascript
// main.js (主进程)
ipcMain.handle('show-message-box', async (event, options) => {
  const { dialog } = require('electron');
  const result = await dialog.showMessageBox(mainWindow, options);
  return result;
});
```

### 关键技术实现

#### 1. Vue3 + Electron 集成

**传统Web开发 vs Electron开发的区别：**

| 方面 | 传统Web | Electron |
|------|---------|----------|
| 运行环境 | 浏览器 | Electron Runtime |
| 资源加载 | HTTP服务器 | 本地文件或开发服务器 |
| 系统权限 | 受限 | 完整系统访问权限 |
| 打包方式 | 静态资源 | 桌面应用安装包 |

**集成要点：**
```javascript
// vite.config.js - 关键配置
export default defineConfig({
  base: './', // 重要：Electron需要相对路径
  plugins: [vue()],
  // ... 其他配置
});
```

#### 2. 开发环境配置

**问题**：Vue开发需要热重载，Electron需要加载页面  
**解决**：分步启动 + 服务器检测

```javascript
// main.js 中的解决方案
async function waitForVite() {
  // 等待Vite服务器启动完成
  // 避免白屏问题
}

async function createWindow() {
  if (isDev) {
    await waitForVite(); // 等待Vue应用准备就绪
  }
  // 创建窗口并加载Vue应用
}
```

#### 3. 安全架构设计

**Electron安全最佳实践：**
```javascript
// main.js - 安全的窗口配置
new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,    // 禁止渲染进程直接访问Node.js
    contextIsolation: true,    // 启用上下文隔离
    enableRemoteModule: false, // 禁用远程模块
    preload: path.join(__dirname, 'preload.js') // 使用预加载脚本
  }
});
```

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

## 💡 功能实现详解

### 1. 系统信息展示功能

**Vue开发者视角：** 就像调用API获取数据一样简单

```vue
<!-- Vue组件中 -->
<template>
  <div class="info-item">
    <span class="label">应用版本:</span>
    <span class="value">{{ appVersion }}</span>
  </div>
</template>

<script>
const appVersion = ref('加载中...');

onMounted(async () => {
  // 就像调用后端API一样
  if (window.electronAPI) {
    appVersion.value = await window.electronAPI.getAppVersion();
  }
});
</script>
```

**背后的技术实现：**
1. Vue 组件调用 `window.electronAPI.getAppVersion()`
2. `preload.js` 接收调用并转发给主进程
3. 主进程执行 `app.getVersion()` 获取真实版本
4. 结果回传给 Vue 组件并更新UI

### 2. 原生消息框功能

**实现对比：**

```javascript
// 🚫 传统Web开发 - 功能受限
alert('这是浏览器的简单提示框');

// ✅ Electron开发 - 原生系统对话框
await window.electronAPI.showMessageBox({
  type: 'info',
  title: '消息提示',
  message: '这是原生系统对话框！',
  detail: '支持更多自定义选项',
  buttons: ['确定', '取消']
});
```

**技术流程：**
```
Vue组件触发 → preload.js转发 → main.js调用系统API → 显示原生对话框
```

### 3. 菜单栏集成

**Vue开发者可能的疑问：** "网页怎么能有桌面应用的菜单栏？"

**答案：** Electron 主进程负责创建菜单，Vue负责响应菜单事件

```javascript
// main.js - 创建菜单（主进程）
const template = [
  {
    label: '文件',
    submenu: [
      {
        label: '新建',
        click: () => {
          // 向Vue应用发送消息
          mainWindow.webContents.send('menu-new-file');
        }
      }
    ]
  }
];
```

```javascript
// Vue组件 - 监听菜单事件（渲染进程）
onMounted(() => {
  window.electronAPI.onMenuNewFile(() => {
    message.value = '新建文件菜单被点击了！';
  });
});
```

### 4. 主题切换功能

**纯Vue实现：**
```javascript
const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark-theme', isDark.value);
};
```

**说明：** 这个功能完全是Vue层面的，不需要Electron参与。证明了Electron中的Vue应用与普通Web应用在很多方面是相同的。

### 5. 响应式数据演示

**核心特点：** Vue3的响应式系统在Electron中完全正常工作

```javascript
// 计数器功能 - 纯Vue3 Composition API
const count = ref(0);
const increment = () => count.value++;
const decrement = () => count.value--;

// 动态列表 - 数组响应式
const items = ref(['示例1', '示例2']);
const addItem = () => {
  if (newItem.value.trim()) {
    items.value.push(newItem.value.trim());
  }
};
```

## 🤔 常见问题解答

### Q1: 为什么不能直接在Vue组件中使用Node.js API？
**A:** 出于安全考虑，Electron禁止渲染进程直接访问Node.js。必须通过IPC通信让主进程代为执行。

### Q2: 开发时为什么会出现白屏？
**A:** Electron启动速度比Vite服务器快，需要等待机制确保Vue应用准备就绪。

### Q3: 如何调试Electron应用？
**A:** 
- **Vue部分**：使用Electron内置的开发者工具（和Chrome一样）
- **主进程**：使用 `console.log` 或IDE调试功能
- **IPC通信**：在preload.js中添加日志

### Q4: 打包后的应用如何工作？
**A:** 
- Vue应用被构建为静态文件（dist目录）
- Electron加载本地文件而不是开发服务器
- 所有文件被打包成桌面应用安装包

### Q5: 相比纯Web应用，有什么额外能力？
**A:**
- ✅ 访问本地文件系统
- ✅ 系统通知
- ✅ 原生菜单和对话框
- ✅ 系统托盘
- ✅ 跨平台桌面应用
- ✅ 无需浏览器运行

## 🎯 学习建议

### 对于Vue开发者：

1. **先理解概念**：把Electron看作"可以调用系统API的浏览器"
2. **从IPC开始**：掌握渲染进程和主进程的通信方式
3. **安全意识**：理解为什么需要preload.js作为安全桥梁
4. **渐进学习**：先做简单的消息框，再尝试文件操作等复杂功能

### 推荐学习路径：

1. **运行本项目** → 理解基本概念
2. **修改Vue组件** → 验证前端技能仍然适用
3. **添加新的IPC功能** → 学习主进程交互
4. **尝试系统API** → 文件读写、通知等
5. **打包部署** → 生成桌面应用

## � 快速上手指南

### 5分钟体验 Electron + Vue3

1. **克隆并启动项目**：
```bash
git clone https://github.com/kiylu/electron_demo2_vue.git
cd electron_demo2_vue
npm install
npm run dev
```

2. **观察启动过程**：
   - 终端显示 Vite 服务器启动
   - 自动等待服务器就绪
   - Electron 窗口弹出并显示 Vue 应用

3. **测试核心功能**：
   - 点击"显示消息框" → 体验原生对话框
   - 使用菜单栏 → 观察IPC通信
   - 切换主题 → 验证Vue响应式

4. **修改代码验证**：
```vue
<!-- 在 src/App.vue 中找到标题，修改为你的名字 -->
<h1>🚀 {{ yourName }} 的 Electron + Vue3 Demo</h1>
```

5. **查看效果**：
   - 保存文件后应用自动热重载
   - 既有 Vue 的开发体验，又有桌面应用的能力

**恭喜！** 你已经体验了 Electron + Vue3 的完整开发流程！

---

## 📚 扩展学习资源

- [Electron 官方文档](https://electronjs.org/docs)
- [Vue3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Electron Builder 打包工具](https://www.electron.build/)

## �📱 支持的平台

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
