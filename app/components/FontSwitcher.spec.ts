import { ref } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import FontSwitcher from './FontSwitcher.vue'

interface FontSwitcherInstance {
  fonts  : Array<{ label: string, value: string }>
  current: string
}

describe('fontSwitcher', () => {
  // Mock document.classList
  const classListMock = {
    add   : vi.fn(),
    remove: vi.fn(),
  }

  // Mock @vueuse/core with partial mocking
  vi.mock('@vueuse/core', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@vueuse/core')>()
    return {
      ...actual,
      useLocalStorage: vi.fn(() => ref('system')),
    }
  })

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
    Object.defineProperty(document.documentElement, 'classList', {
      value   : classListMock,
      writable: true,
    })
  })

  it('should render correctly', async () => {
    const wrapper = await mountSuspended(FontSwitcher)
    expect(wrapper.find('#font-switcher').exists()).toBe(true)
    expect(wrapper.find('.ant-select').exists()).toBe(true)
  })

  it('should initialize with system font', async () => {
    const wrapper = await mountSuspended(FontSwitcher)
    const vm = wrapper.vm as unknown as FontSwitcherInstance
    // expect(vm.current).toBe('system')
    expect(classListMock.add).toHaveBeenCalledWith('font-system')
  })

  it('should contain all font options', async () => {
    const wrapper = await mountSuspended(FontSwitcher)
    const vm = wrapper.vm as unknown as FontSwitcherInstance
    expect(vm.fonts).toEqual([
      { label: '系统字体', value: 'system' },
      { label: '印刷体', value: 'serif' },
      { label: '等宽字体', value: 'mono' },
      { label: '无衬线体', value: 'sans' },
      { label: '段宁硬笔行书', value: 'duanNingYingBiXingShu2' },
    ])
  })

  // it('should change font and update classList', async () => {
  //   const wrapper = await mountSuspended(FontSwitcher)
  //   await wrapper.vm.$nextTick()
  //   const vm = wrapper.vm as unknown as FontSwitcherInstance
  //   // Change font to serif
  //   vm.current = 'system'

  //   console.log('==========', vm.current)
  //   await wrapper.vm.$nextTick()

  //   vm.current = 'serif'
  //   console.log('==========::::', vm.current)
  //   await wrapper.vm.$nextTick()

  //   expect(classListMock.remove).toHaveBeenCalledWith('font-system')
  //   expect(classListMock.add).toHaveBeenCalledWith('font-serif')
  //   expect(vm.current).toBe('serif')
  // })

  // it('should persist font selection', async () => {
  //   const useLocalStorage = (await import('@vueuse/core')).useLocalStorage
  //   const wrapper = await mountSuspended(FontSwitcher)
  //   const vm = wrapper.vm as unknown as FontSwitcherInstance

  //   vm.current = 'mono'
  //   await wrapper.vm.$nextTick()

  //   expect(useLocalStorage).toHaveBeenCalledWith('font', 'system')
  //   expect(vm.current).toBe('mono')
  // })
})
