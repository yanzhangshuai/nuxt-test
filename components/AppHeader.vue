<script setup lang="ts">
const appConfig = useAppConfig()
// 这里可以添加组件逻辑
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="logo flex items-center">
        <NuxtLink class="flex-center" to="/">
          <img src="/images/logo.png" alt="Logo" width="25" height="25" class="mr-2">
          <span class="text-#333">{{ appConfig.title }}</span>
        </NuxtLink>
      </div>

      <nav class="nav-menu">
        <ul>
          <li><NuxtLink to="/">首页</NuxtLink></li>
          <li><NuxtLink to="/blog">博客</NuxtLink></li>
          <li><NuxtLink to="/about">关于</NuxtLink></li>
        </ul>
      </nav>

      <div class="right flex-center gap-4">
        <div class="flex gap-4 user-actions">
          <button class="login-btn">登录</button>
          <button class="register-btn">注册</button>
        </div>

        <FontSwitcher />
      </div>
    </div>
  </header>
</template>

<style scoped lang="less">
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-menu ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.nav-menu a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.nav-menu a:hover {
  color: #007bff;
}

.user-actions button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
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
