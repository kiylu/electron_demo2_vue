<template>
  <div id="app">
    <header class="app-header">
      <h1>🚀 Electron + Vue3 Demo</h1>
      <p class="subtitle">现代桌面应用开发演示</p>
    </header>

    <main class="main-content">
      <div class="card-grid">
        <!-- 系统信息卡片 -->
        <div class="card">
          <h3>📊 系统信息</h3>
          <div class="info-item">
            <span class="label">应用版本:</span>
            <span class="value">{{ appVersion }}</span>
          </div>
          <div class="info-item">
            <span class="label">平台:</span>
            <span class="value">{{ platform }}</span>
          </div>
          <div class="info-item">
            <span class="label">用户代理:</span>
            <span class="value">{{ userAgent }}</span>
          </div>
        </div>

        <!-- 功能演示卡片 -->
        <div class="card">
          <h3>🎯 功能演示</h3>
          <div class="button-group">
            <button @click="showAlert" class="btn btn-primary">
              💬 显示消息框
            </button>
            <button @click="showAbout" class="btn btn-secondary">
              ℹ️ 关于应用
            </button>
            <button @click="toggleTheme" class="btn btn-accent">
              {{ isDark ? '☀️ 浅色主题' : '🌙 深色主题' }}
            </button>
          </div>
        </div>

        <!-- 计数器演示卡片 -->
        <div class="card">
          <h3>🔢 Vue3 响应式演示</h3>
          <div class="counter-section">
            <div class="counter-display">
              <span class="counter-number">{{ count }}</span>
            </div>
            <div class="button-group">
              <button @click="decrement" class="btn btn-outline">➖</button>
              <button @click="reset" class="btn btn-outline">🔄 重置</button>
              <button @click="increment" class="btn btn-outline">➕</button>
            </div>
          </div>
        </div>

        <!-- 输入演示卡片 -->
        <div class="card">
          <h3>📝 双向绑定演示</h3>
          <div class="input-section">
            <input 
              v-model="message" 
              placeholder="输入一些文字..." 
              class="text-input"
            />
            <div class="output">
              <p><strong>实时输出:</strong></p>
              <p class="message-output">{{ message || '暂无输入' }}</p>
            </div>
          </div>
        </div>

        <!-- 列表演示卡片 -->
        <div class="card">
          <h3>📋 动态列表演示</h3>
          <div class="list-section">
            <div class="add-item">
              <input 
                v-model="newItem" 
                @keyup.enter="addItem"
                placeholder="添加新项目..."
                class="text-input"
              />
              <button @click="addItem" class="btn btn-primary">添加</button>
            </div>
            <ul class="item-list">
              <li v-for="(item, index) in items" :key="index" class="list-item">
                <span>{{ item }}</span>
                <button @click="removeItem(index)" class="btn-remove">❌</button>
              </li>
            </ul>
          </div>
        </div>

        <!-- 状态展示卡片 -->
        <div class="card">
          <h3>📈 状态监控</h3>
          <div class="status-grid">
            <div class="status-item">
              <span class="status-label">Vue 版本</span>
              <span class="status-value">{{ vueVersion }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">在线状态</span>
              <span class="status-value" :class="{ online: isOnline, offline: !isOnline }">
                {{ isOnline ? '🟢 在线' : '🔴 离线' }}
              </span>
            </div>
            <div class="status-item">
              <span class="status-label">页面加载时间</span>
              <span class="status-value">{{ loadTime }}ms</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <p>&copy; 2025 Electron + Vue3 Demo</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { version } from 'vue';

export default {
  name: 'App',
  setup() {
    // 响应式数据
    const count = ref(0);
    const message = ref('');
    const newItem = ref('');
    const items = ref(['示例项目 1', '示例项目 2', '示例项目 3']);
    const appVersion = ref('加载中...');
    const isDark = ref(false);
    const isOnline = ref(navigator.onLine);
    const loadTime = ref(0);

    // 计算属性
    const platform = computed(() => navigator.platform);
    const userAgent = computed(() => navigator.userAgent.split(' ')[0]);
    const vueVersion = computed(() => version);

    // 方法
    const increment = () => count.value++;
    const decrement = () => count.value--;
    const reset = () => count.value = 0;

    const addItem = () => {
      if (newItem.value.trim()) {
        items.value.push(newItem.value.trim());
        newItem.value = '';
      }
    };

    const removeItem = (index) => {
      items.value.splice(index, 1);
    };

    const showAlert = async () => {
      if (window.electronAPI) {
        await window.electronAPI.showMessageBox({
          type: 'info',
          title: '消息提示',
          message: '这是一个来自 Electron 主进程的消息！',
          detail: '这演示了渲染进程与主进程之间的通信。',
          buttons: ['好的']
        });
      } else {
        alert('这是一个浏览器中的普通提示框');
      }
    };

    const showAbout = async () => {
      if (window.electronAPI) {
        await window.electronAPI.showMessageBox({
          type: 'info',
          title: '关于应用',
          message: 'Electron + Vue3 Demo 应用',
          detail: `版本: ${appVersion.value}\n这是一个演示 Electron 与 Vue3 集成的示例应用。`,
          buttons: ['确定']
        });
      }
    };

    const toggleTheme = () => {
      isDark.value = !isDark.value;
      document.body.classList.toggle('dark-theme', isDark.value);
    };

    // 生命周期
    onMounted(async () => {
      const startTime = performance.now();
      
      // 获取应用版本
      if (window.electronAPI) {
        try {
          appVersion.value = await window.electronAPI.getAppVersion();
        } catch (error) {
          appVersion.value = '无法获取';
        }

        // 监听菜单事件
        window.electronAPI.onMenuNewFile(() => {
          message.value = '新建文件菜单被点击了！';
        });

        window.electronAPI.onMenuOpenFile(() => {
          message.value = '打开文件菜单被点击了！';
        });

        window.electronAPI.onMenuAbout(() => {
          showAbout();
        });
      } else {
        appVersion.value = '浏览器模式';
      }

      // 监听网络状态
      window.addEventListener('online', () => isOnline.value = true);
      window.addEventListener('offline', () => isOnline.value = false);

      // 计算加载时间
      window.addEventListener('load', () => {
        loadTime.value = Math.round(performance.now() - startTime);
      });
    });

    return {
      count,
      message,
      newItem,
      items,
      appVersion,
      isDark,
      isOnline,
      loadTime,
      platform,
      userAgent,
      vueVersion,
      increment,
      decrement,
      reset,
      addItem,
      removeItem,
      showAlert,
      showAbout,
      toggleTheme
    };
  }
};
</script>
