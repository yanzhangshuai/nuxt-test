<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

</script>

<template>
  <div>
    <h2>{{ error?.statusCode }}</h2>
    <NuxtLink to="/">返回首页</NuxtLink>
  </div>
</template>
