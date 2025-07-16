<script setup lang="ts">
// 这里可以添加footer相关的逻辑
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-links">
          <NuxtLink to="/about">关于我们</NuxtLink>
          <NuxtLink to="/contact">联系我们</NuxtLink>
          <NuxtLink to="/privacy">隐私政策</NuxtLink>
        </div>
        <div class="copyright">
          © 2025 公司名称. 保留所有权利
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="less">
.app-footer {
  background-color: #f8f9fa;
  padding: 2rem 0;
  border-top: 1px solid #e9ecef;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer-links {
  margin-bottom: 1rem;
}

.footer-links a {
  margin: 0 1rem;
  color: #6c757d;
  text-decoration: none;
}

.footer-links a:hover {
  color: #0d6efd;
}

.copyright {
  color: #6c757d;
  font-size: 0.875rem;
}
</style>
