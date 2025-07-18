<script setup lang="ts">
// import { useUserStore } from '~/stores/user'

const appConfig = useAppConfig()
const { clear } = useUserSession()
// const userStore = useUserStore()

const authModal = reactive<{
  visible: boolean
  type   : 1 | 2 // 1=登录, 2=注册
}>({
  visible: false,
  type   : 1, // 1=登录, 2=注册
})

const openAuthModal = (type: 1 | 2) => {
  authModal.type = type
  authModal.visible = true
}

const onLogout = async () => {
  // await accountService.logout()
  clear()
  // fetch() // 刷新用户状态
  message.success('已退出登录')
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
          <li>
            <NuxtLink to="/" data-test-id="nav-home">首页</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blog" data-test-id="nav-blog">博客</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" data-test-id="nav-about">关于</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="right flex-center gap-4">
        <div class="flex gap-4 user-actions">
          <!-- <template v-if="userStore.user">
            <div class="flex items-center gap-2">
              <img :src="userStore.user.avatar" class="w-8 h-8 rounded-full">
              <span>{{ userStore.user.name }}</span>
              <AButton data-test-id="logout-btn" @click="userStore.logout">退出</AButton>
            </div>
          </template>
<template v-else>
            <AButton size="large" type="default" class="w-25 border-primary" data-test-id="login-btn" @click="openAuthModal(1)">登录</AButton>
            <AButton size="large" type="primary" class="w-25" data-test-id="register-btn" @click="openAuthModal(2)">注册</AButton>
          </template> -->

          <AuthState>
            <template #default="{ loggedIn, user }">
              <!-- 已登录 -->
              <div v-if="loggedIn" class="flex items-center gap-2">
                <img :src="user!.avatar" class="w-8 h-8 rounded-full">
                <span>{{ user!.name }}</span>
                <AButton data-test-id="logout-btn" @click="onLogout">退出</AButton>
              </div>

              <ASpace v-else>
                <AButton size="large" type="primary" class="w-25" ghost data-test-id="login-btn" @click="openAuthModal(1)">
                  登录
                </AButton>
                <AButton size="large" type="primary" class="w-25" data-test-id="register-btn" @click="openAuthModal(2)">
                  注册
                </AButton>
              </ASpace>
            </template>

            <template #placeholder>
              <button disabled>Loading...</button>
            </template>
          </AuthState>
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
  margin: 0;
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
