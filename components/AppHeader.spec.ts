import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest'
import AppHeader from './AppHeader.vue'
import { EAuthModalType } from './AuthModal.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '~/stores/user'

interface AppHeaderInstance {
  authModal: {
    visible: boolean
    type: EAuthModalType
  }
}

vi.mock('~/services/account', () => ({
  useAccountService: vi.fn(() => ({
    login: vi.fn().mockResolvedValue({
      data: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        avatar: '/avatar.png'
      },
      error: null
    }),
    logout: vi.fn().mockResolvedValue({})
  }))
}))

describe('AppHeader ', () => {

  describe('common', async () => {

    const wrapper = await mountSuspended(AppHeader, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })

    it('renders correctly', () => {
      expect(wrapper.find('.app-header').exists()).toBe(true)
      expect(wrapper.find('.logo').exists()).toBe(true)
      expect(wrapper.find('.nav-menu').exists()).toBe(true)
    })

    it('displays app title from config', () => {
      expect(wrapper.find('.logo span').text()).toBe('Hello Nuxt')
    })

    it('has correct navigation links', () => {
      expect(wrapper.find('[data-test-id="nav-home"]').text()).toBe('首页')
      expect(wrapper.find('[data-test-id="nav-blog"]').text()).toBe('博客')
      expect(wrapper.find('[data-test-id="nav-about"]').text()).toBe('关于')
    })

    it('contains FontSwitcher component', () => {
      expect(wrapper.findComponent({ name: 'FontSwitcher' }).exists()).toBe(true)
    })
  })

  describe('when user is not logged in', async () => {
    const wrapper = await mountSuspended(AppHeader, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })

    const userStore = useUserStore()

    await userStore.logout()

    it('shows login and register buttons', () => {
      const loginBtn = wrapper.find('[data-test-id="login-btn"]')
      const registerBtn = wrapper.find('[data-test-id="register-btn"]')

      expect(loginBtn.exists()).toBe(true)
      expect(registerBtn.exists()).toBe(true)
      expect(loginBtn.text().replace(/\s+/g, '')).toBe('登录')
      expect(registerBtn.text().replace(/\s+/g, '')).toBe('注册')
    })

    it('opens login modal when login button clicked', async () => {
      userStore.user = null
      await wrapper.find('[data-test-id="login-btn"]').trigger('click')
      expect((wrapper.vm as unknown as AppHeaderInstance).authModal.visible).toBe(true)
      expect((wrapper.vm as unknown as AppHeaderInstance).authModal.type).toBe(EAuthModalType.LOGIN)
    })

    it('opens register modal when register button clicked', async () => {
      userStore.user = null
      await wrapper.find('[data-test-id="register-btn"]').trigger('click')
      expect((wrapper.vm as unknown as AppHeaderInstance).authModal.visible).toBe(true)
      expect((wrapper.vm as unknown as AppHeaderInstance).authModal.type).toBe(EAuthModalType.REGISTER)
    })
  })


  describe('when user is logged in', async () => {

    const wrapper = await mountSuspended(AppHeader, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })

    const userStore = useUserStore()

    await userStore.login('test@example.com', 'password123')

    it('shows user info', () => {
      expect(wrapper.find('.user-actions img').attributes('src')).toBe('/avatar.png')
      expect(wrapper.find('.user-actions span').text()).toContain('Test User')
    })

    it('shows logout button', () => {
      expect(wrapper.find('[data-test-id="logout-btn"]').exists()).toBe(true)
    })

    it('calls logout when logout button clicked', async () => {
      await wrapper.find('[data-test-id="logout-btn"]').trigger('click')
      expect(userStore.logout).toHaveBeenCalled()
    })
  })

})

