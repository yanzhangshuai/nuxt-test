<script setup lang="ts">
import { useLayout } from './hooks/layout'

const { current: currentLayout } = useLayout()
</script>

<template>
  <NuxtLayout :name="currentLayout">
    <NuxtPage />
    <LayoutSwitcher />
  </NuxtLayout>
</template>
