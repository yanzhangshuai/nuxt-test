<script setup lang="ts">
import { EAuthModalType } from './AuthModal.vue'
import { useUserStore } from '~/stores/user'

const appConfig = useAppConfig()
const userStore = useUserStore()

const authModal = reactive<{
  visible: boolean
  type   : EAuthModalType // 1=登录, 2=注册
}>({
  visible: false,
  type   : EAuthModalType.LOGIN, // 1=登录, 2=注册
})

const openAuthModal = (type: EAuthModalType) => {
  authModal.type    = type
  authModal.visible = true
}

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
          <li><NuxtLink to="/" data-test-id="nav-home">首页</NuxtLink></li>
          <li><NuxtLink to="/blog" data-test-id="nav-blog">博客</NuxtLink></li>
          <li><NuxtLink to="/about" data-test-id="nav-about">关于</NuxtLink></li>
        </ul>
      </nav>

      <div class="right flex-center gap-4">
        <div class="flex gap-4 user-actions">
          <template v-if="userStore.user">
            <div class="flex items-center gap-2">
              <img :src="userStore.user.avatar" class="w-8 h-8 rounded-full" />
              <span>{{ userStore.user.name }}</span>
              <AButton @click="userStore.logout" data-test-id="logout-btn">退出</AButton>
            </div>
          </template>
          <template v-else>
            <AButton size="large" type="default" class="w-25 border-primary" @click="openAuthModal(EAuthModalType.LOGIN)" data-test-id="login-btn">登录</AButton>
            <AButton size="large" type="primary" class="w-25" @click="openAuthModal(EAuthModalType.REGISTER)" data-test-id="register-btn">注册</AButton>
          </template>
        </div>

        <FontSwitcher />
      </div>
    </div>
  </header>

  <AuthModal v-model:open="authModal.visible" :type="authModal.type" />
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
