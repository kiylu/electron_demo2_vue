const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// 保持对窗口对象的全局引用，如果你不这样做，当 JavaScript 对象被垃圾回收时，窗口会被自动关闭。
let mainWindow;

// 我们在 package.json 中已经通过 wait-on 确保了 Vite 服务器已经启动，这里是第二种等待方式，其实可以不需要
// 等待 Vite 开发服务器启动的函数
// async function waitForVite() {
//   const http = require('http');
//   const maxRetries = 30; // 最多等待30秒
//   let retries = 0;

//   return new Promise((resolve) => {
//     const checkServer = () => {
//       const req = http.get('http://localhost:5173', (res) => {
//         resolve(true);
//         req.destroy();
//       });

//       req.on('error', () => {
//         retries++;
//         if (retries < maxRetries) {
//           setTimeout(checkServer, 1000); // 每秒检查一次
//         } else {
//           console.log('警告：Vite 服务器启动超时，将尝试加载页面');
//           resolve(false);
//         }
//       });

//       req.setTimeout(1000, () => {
//         req.destroy();
//       });
//     };

//     checkServer();
//   });
// }

async function createWindow() {
  // 在开发模式下等待 Vite 服务器启动
  // if (isDev) {
  //   console.log('等待 Vite 开发服务器启动...');
  //   await waitForVite();
  //   console.log('Vite 服务器已准备就绪');
  // }

  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // 安全考虑，设置为 false
      contextIsolation: true, // 启用上下文隔离
      enableRemoteModule: false, // 禁用远程模块
      preload: path.join(__dirname, 'preload.js')
    },
    show: false // 先不显示，等加载完成后再显示
  });

  // 在开发模式下加载 Vite 开发服务器，在生产模式下加载构建后的文件
  const startUrl = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, 'dist/index.html')}`;
  
  try {
    await mainWindow.loadURL(startUrl);
    console.log('页面加载成功');
  } catch (error) {
    console.error('页面加载失败:', error);
  }

  // 当窗口准备好时显示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    console.log('窗口已显示');
  });

  // 监听页面加载完成事件
  mainWindow.webContents.once('did-finish-load', () => {
    console.log('页面内容加载完成');
  });

  // 监听页面加载失败事件
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('页面加载失败:', errorCode, errorDescription);
  });

  // 当窗口被关闭时，取消引用 window 对象
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 在开发模式下打开开发者工具
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(createWindow);

// 当所有窗口都被关闭时退出应用
app.on('window-all-closed', () => {
  // 在 macOS 上，通常用户在明确地按下 Cmd + Q 之前应用会保持活动状态
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在 macOS 上，当点击 dock 图标并且没有其他窗口打开时，通常在应用中重新创建一个窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * 设置应用菜单
 * @description Role 是预定义的：Electron 提供了大量预定义的 role
 * 加了 role 之后，菜单项会自动实现对应功能
 * 但有些菜单项（如“新建”、“打开”等）需要我们自己实现逻辑（不加 role）
 */
const template = [
  {
    label: '文件',
    submenu: [
      {
        label: '新建',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          mainWindow.webContents.send('menu-new-file');
        }
      },
      {
        label: '打开',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          mainWindow.webContents.send('menu-open-file');
        }
      },
      { type: 'separator' },
      {
        label: '退出',
        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { role: 'undo', label: '撤销' },
      { role: 'redo', label: '重做' },
      { type: 'separator' },
      { role: 'cut', label: '剪切' },
      { role: 'copy', label: '复制' },
      { role: 'paste', label: '粘贴' }
    ]
  },
  {
    label: '视图',
    submenu: [
      { role: 'reload', label: '重新加载' },
      { role: 'forceReload', label: '强制重新加载' },
      { role: 'toggleDevTools', label: '切换开发者工具' },
      { type: 'separator' },
      { role: 'resetZoom', label: '实际大小' },
      { role: 'zoomIn', label: '放大' },
      { role: 'zoomOut', label: '缩小' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: '切换全屏' }
    ]
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '关于',
        click: () => {
          mainWindow.webContents.send('menu-about');
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// IPC 主进程处理
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('show-message-box', async (event, options) => {
  const { dialog } = require('electron');
  const result = await dialog.showMessageBox(mainWindow, options);
  return result;
});
