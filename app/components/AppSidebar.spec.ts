import { describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import AppSidebar from './AppSidebar.vue'

interface AppSidebarInstance {
  authModal: {
    visible: boolean
    type   : 1 | 2
  }
  isCollapsed: boolean
}

vi.mock('~/services/account', () => ({
  useAccountService: vi.fn(() => ({
    login: vi.fn().mockResolvedValue({
      data: {
        id    : 1,
        email : 'test@example.com',
        name  : 'Test User',
        avatar: '/avatar.png',
      },
      error: null,
    }),
    logout: vi.fn().mockResolvedValue({}),
  })),
}))

describe('appSidebar', () => {
  describe('common', async () => {
    const wrapper = await mountSuspended(AppSidebar, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })

    it('renders correctly', () => {
      expect(wrapper.find('.app-sidebar').exists()).toBe(true)
      expect(wrapper.find('.logo').exists()).toBe(true)
      expect(wrapper.find('.nav-menu').exists()).toBe(true)
    })

    it('displays app title when not collapsed', () => {
      expect(wrapper.find('.logo span').text()).toBe('Hello Nuxt')
    })

    it('has correct navigation links', () => {
      expect(wrapper.find('[data-test-id="sidebar-home"]').text()).toContain('首页')
      expect(wrapper.find('[data-test-id="sidebar-blog"]').text()).toContain('博客')
      expect(wrapper.find('[data-test-id="sidebar-about"]').text()).toContain('关于')
    })

    it('contains FontSwitcher component when not collapsed', () => {
      expect(wrapper.findComponent({ name: 'FontSwitcher' }).exists()).toBe(true)
    })
  })

  describe('when collapsed', async () => {
    const wrapper = await mountSuspended(AppSidebar, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })

    await wrapper.find('[data-test-id="sidebar-toggle-btn"]').trigger('click')

    it('hides text and shows icons', () => {
      expect(wrapper.find('.logo span').exists()).toBe(false)
      expect(wrapper.find('.nav-menu span:first-child').text()).toBe('🏠')
    })

    it('shows expand button', () => {
      expect(wrapper.find('[data-test-id="sidebar-toggle-btn"]').text()).toBe('→')
    })

    it('contains FontSwitcher component when collapsed', () => {
      expect(wrapper.findComponent({ name: 'FontSwitcher' }).exists()).toBe(false)
    })
  })

  describe('when user is not logged in', async () => {
    const wrapper = await mountSuspended(AppSidebar, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })

    const userStore = useUserStore()

    await userStore.logout()

    it('shows login and register buttons', () => {
      expect(wrapper.find('[data-test-id="sidebar-login-btn"]').text()).toContain('登录')
      expect(wrapper.find('[data-test-id="sidebar-register-btn"]').text()).toContain('注册')
    })

    it('opens login modal when login button clicked', async () => {
      userStore.user = null
      await wrapper.find('[data-test-id="sidebar-login-btn"]').trigger('click')
      expect((wrapper.vm as unknown as AppSidebarInstance).authModal.visible).toBe(true)
      expect((wrapper.vm as unknown as AppSidebarInstance).authModal.type).toBe(1)
    })
  })

  describe('when user is logged in', async () => {
    const wrapper = await mountSuspended(AppSidebar, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })

    const userStore = useUserStore()

    await userStore.login('test@example.com', 'password123')

    it('shows user info', () => {
      expect(wrapper.find('.bottom img').attributes('src')).toBe('/avatar.png')
      expect(wrapper.find('.bottom span').text()).toBe('Test User')
    })

    it('shows logout button when not collapsed', async () => {
      expect(wrapper.find('[data-test-id="sidebar-logout-btn"]').text()).toBe('退出')
    })
  })
})
