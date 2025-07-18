import { computed, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useLayout = createGlobalState(() => {
  const layout = useLocalStorage<'default' | 'sidebar'>('layout', 'default')

  const current = computed(() => {
    return layout.value === 'sidebar' ? 'sidebar' : 'default'
  })

  const toggleLayout = () => {
    layout.value = layout.value === 'default' ? 'sidebar' : 'default'
  }

  const setLayout = (type: 'default' | 'sidebar') => {
    layout.value = type
  }

  return {
    current,
    toggleLayout,
    setLayout,
  }
})
