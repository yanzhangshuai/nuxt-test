<script setup lang="ts">
</script>

<template>
  <div class="layout-container">
    <AppSidebar />

    <div class="content-wrapper">
      <main class="main-content">
        <slot />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 250px;
  /* 与侧边栏宽度一致 */
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
