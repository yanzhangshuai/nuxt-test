<script setup lang="ts">
const current = useLocalStorage('font', 'system')

const fonts = [
  { label: '系统字体',      value: 'system' },
  { label: '印刷体',        value: 'serif' },
  { label: '等宽字体',      value: 'mono' },
  { label: '无衬线体',      value: 'sans' },
  { label: '段宁硬笔行书',   value: 'duanNingYingBiXingShu2' },
]

onBeforeMount(() => {
  watch(current, (newVal, oldVal) => {
    document.documentElement.classList.remove(`font-${oldVal || 'system'}`)
    document.documentElement.classList.add(`font-${newVal}`)
  }, { immediate: true })
})
</script>

<template>
  <ASelect id="font-switcher" v-model:value="current" :options="fonts" size="large" class="min-w-35" />
</template>
