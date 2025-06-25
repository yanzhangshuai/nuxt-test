<script setup lang="ts">
const fonts = [
  { name: '系统字体', value: 'system' },
  { name: '印刷体', value: 'serif' },
  { name: '等宽字体', value: 'mono' },
  { name: '段宁硬笔行书', value: 'duanNingYingBiXingShu2' },
]

const current = ref('system')

function onChange(font: string) {
  if (unref(current) === font) {
    return
  }

  current.value = font
}
watch(current, (newVal, oldVal) => {
  document.documentElement.classList.remove(`font-${oldVal}`)
  document.documentElement.classList.add(`font-${newVal}`)
})
</script>

<template>
  <div class="font-switcher">
    <select v-model="current" class="px-3 py-2 border rounded w-full">
      <option v-for="font in fonts" :key="font.value" :value="font.value">
        {{ font.name }}
      </option>
    </select>
  </div>
</template>
