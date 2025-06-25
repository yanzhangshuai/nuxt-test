<script setup lang="ts">
const appConfig = useAppConfig()
const isCollapsed = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <aside class="app-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-content">
      <NuxtLink class="logo flex-center" to="/">
        <img src="/images/logo.png" alt="Logo" width="25" height="25">
        <span v-if="!isCollapsed" class="ml-2">{{ appConfig.title }}</span>
      </NuxtLink>

      <nav class="nav-menu">
        <ul>
          <li>
            <NuxtLink to="/">
              <span v-if="!isCollapsed">首页</span>
              <span v-else>🏠</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blog">
              <span v-if="!isCollapsed">博客</span>
              <span v-else>📝</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">
              <span v-if="!isCollapsed">关于</span>
              <span v-else>ℹ️</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="bottom mt-auto gap-4 flex-n-col">
        <button class="btn login-btn">
          <span v-if="!isCollapsed">登录</span>
          <span v-else>🔑</span>
        </button>

        <button class="btn register-btn">
          <span v-if="!isCollapsed">注册</span>
          <span v-else>✍️</span>
        </button>

        <FontSwitcher />
      </div>

      <div class="h-4" />

      <button class="collapse-btn inline-flex ml-auto" @click="toggleCollapse">
        {{ isCollapsed ? '→' : '←' }}
      </button>
    </div>
  </aside>
</template>

<style scoped lang="less">
.app-sidebar {
  background-color: #fff;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  transition: width 0.3s ease;
}

.app-sidebar.collapsed {
  width: 64px;
}

.sidebar-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
  overflow: hidden;
}

.logo {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.logo  {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.collapse-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
}

.nav-menu ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
}

.nav-menu a {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  border-radius: 4px;
  white-space: nowrap;
}

.nav-menu a:hover {
  background-color: #f5f5f5;
  color: #007bff;
}

.btn {
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
}

.login-btn {
  background: transparent;
  border: 1px solid #007bff;
  color: #007bff;
}

.register-btn {
  background: #007bff;
  border: 1px solid #007bff;
  color: white;
}
</style>
