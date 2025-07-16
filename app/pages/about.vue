<script setup lang="ts">
useHead({
  title: '关于我们',
  meta : [
    { name: 'description', content: '了解更多关于我们的信息' },
    { name: 'keywords', content: 'Nuxt, Vue, 关于我们' },
  ],
})
// 这里可以添加页面逻辑
definePageMeta({
  meta: [
    { name: 'description', content: '了解更多关于我们的信息' },
    { name: 'keywords', content: 'Nuxt, Vue, 关于我们' },
  ],
})
</script>

<template>
  <div class="about-page">
    <h1>关于我们</h1>
    <div class="content">
      <p>这是一个使用Nuxt.js构建的示例项目。</p>
      <p>我们的团队致力于提供高质量的Web解决方案。</p>
      <div class="features">
        <h2>主要特点</h2>
        <ul>
          <li>现代化的前端技术栈</li>
          <li>响应式设计</li>
          <li>高性能</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #333;
  margin-bottom: 1.5rem;
}

.content {
  line-height: 1.6;
}

.features {
  margin-top: 2rem;
}

ul {
  margin-top: 1rem;
  padding-left: 1.5rem;
}
</style>
