<script setup lang="ts">
import { useLayout } from './hooks/layout'
import { useUserStore } from './stores/user'

useHead({
  titleTemplate: 'Nuxt 现代化网站 - %s',
})

const { current: currentLayout } = useLayout()

await useUserStore().getUser()

// const event = useRequestEvent()

// console.log('event========', event)

</script>

<template>
  <AExtractStyle>
    <NuxtLayout :name="currentLayout">
      <NuxtPage />
      <LayoutSwitcher />
    </NuxtLayout>
  </AExtractStyle>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
