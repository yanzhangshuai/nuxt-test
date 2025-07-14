<script lang="ts" setup>
useHead({
  title: '首页',
  meta : [
    { name: 'description', content: '这是一个基于Nuxt 3构建的现代化网站，提供丰富的功能和优质的内容体验' },
    { name: 'keywords', content: 'Nuxt, Vue, 网站, 现代化, 响应式设计' },
  ],
})
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <div class="home-container" uni-flex>
    <h1>欢迎来到我们的网站</h1>
    <p class="intro">这是一个基于Nuxt 3构建的现代化网站，提供丰富的功能和优质的内容体验</p>

    <div class="features">
      <div class="feature-card">
        <h3>快速高效</h3>
        <p>采用最新技术栈，确保网站快速响应</p>
      </div>
      <div class="feature-card">
        <h3>响应式设计</h3>
        <p>完美适配各种设备屏幕尺寸</p>
      </div>
      <div class="feature-card">
        <h3>丰富内容</h3>
        <p>提供多样化的内容展示和交互体验</p>
      </div>
    </div>

    <div class="cta-section">
      <NuxtLink class="cta-button" to="/blog">浏览博客</NuxtLink>
      <NuxtLink class="cta-button secondary" to="/about">关于我们</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.intro {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature-card {
  padding: 1.5rem;
  border-radius: 8px;
  background: #f8f8f8;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.cta-section {
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
}

.cta-button {
  padding: 0.8rem 1.5rem;
  background: #4f46e5;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

.cta-button.secondary {
  background: #f1f5f9;
  color: @primary;
  border: 1px solid #4f46e5;
}
</style>
