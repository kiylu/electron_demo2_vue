const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload script is running...');

// 通过 contextBridge 暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取应用版本
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // 显示消息框
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  
  // 监听菜单事件
  onMenuNewFile: (callback) => ipcRenderer.on('menu-new-file', callback),
  onMenuOpenFile: (callback) => ipcRenderer.on('menu-open-file', callback),
  onMenuAbout: (callback) => ipcRenderer.on('menu-about', callback),
  
  // 移除监听器
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});

console.log('Electron API has been exposed to renderer process');
