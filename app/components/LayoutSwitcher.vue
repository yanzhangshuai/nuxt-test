<script setup lang="ts">
const { current: currentLayout, toggleLayout } = useLayout()
</script>

<template>
  <div class="layout-controls">
    <button @click="toggleLayout">切换布局</button>
    <span>当前布局: {{ currentLayout }}</span>
  </div>
</template>

<style scoped lang="less">
.layout-controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  border-radius: 4px;
  z-index: 100;
}

.layout-controls button {
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
