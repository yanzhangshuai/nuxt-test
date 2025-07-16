import { set } from '@vueuse/core';
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { computed, ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useLayout } from '~/hooks/layout'
import LayoutSwitcher from './LayoutSwitcher.vue'

// Mock useLayout hook
vi.mock('~/hooks/layout', () => ({
  useLayout: vi.fn(() => ({
    current: computed<'default' | 'sidebar'>(() => 'default'),
    toggleLayout: vi.fn(),
    setLayout: vi.fn<(type: 'default' | 'sidebar') => void>()
  }))
}))

// Mock @vueuse/core
vi.mock('@vueuse/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@vueuse/core')>()
  return {
    ...actual,
    createGlobalState: vi.fn((fn) => fn)
  }
})

describe('LayoutSwitcher', async () => {
  // let wrapper: ReturnType<typeof mount>
  const currentLayout = ref<'default' | 'sidebar'>('default')
  const mockUseLayout = {
    current: computed(() => currentLayout.value),
    toggleLayout: vi.fn(() => {
      currentLayout.value = currentLayout.value === 'default' ? 'sidebar' : 'default'
    }),
    setLayout: vi.fn((type: 'default' | 'sidebar') => {
      currentLayout.value = type
    })
  }

  vi.mocked(useLayout).mockReturnValue(mockUseLayout)
  const wrapper = await mountSuspended(LayoutSwitcher)

  it('renders correctly', () => {
    expect(wrapper.find('.layout-controls').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('displays current layout', () => {
    expect(wrapper.find('span').text()).toContain('default')
  })

  it('toggles layout when button clicked', async () => {
    mockUseLayout.setLayout('default')
    await wrapper.find('button').trigger('click')
    expect(mockUseLayout.current.value).toBe('sidebar')
    
    await wrapper.find('button').trigger('click')
    expect(mockUseLayout.current.value).toBe('default')
  })

  it('sets layout when setLayout called', async () => {
    mockUseLayout.setLayout('sidebar')
    expect(mockUseLayout.current.value).toBe('sidebar')
    
    mockUseLayout.setLayout('default')
    expect(mockUseLayout.current.value).toBe('default')
  })

  it('updates when layout changes', async () => {
    mockUseLayout.setLayout('default')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('span').text()).toBe('当前布局: default')

    mockUseLayout.setLayout('sidebar')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$forceUpdate()
    expect(wrapper.find('span').text()).toBe('当前布局: sidebar')
    expect(currentLayout.value).toBe('sidebar')
  })
})
