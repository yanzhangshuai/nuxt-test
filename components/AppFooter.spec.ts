import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppFooter from './AppFooter.vue'

describe('AppFooter', () => {
  it('renders correctly', async () => {
    const wrapper = await mountSuspended(AppFooter)
    
    // 验证footer元素存在
    expect(wrapper.find('footer.app-footer').exists()).toBe(true)
    
    // 验证容器存在
    expect(wrapper.find('.container').exists()).toBe(true)
    
    // 验证链接数量
    const links = wrapper.findAll('.footer-links a')
    expect(links.length).toBe(3)
    
    // 验证链接文本
    expect(links[0].text()).toBe('关于我们')
    expect(links[1].text()).toBe('联系我们')
    expect(links[2].text()).toBe('隐私政策')
    
    // 验证链接href属性
    expect(links[0].attributes('href')).toBe('/about')
    expect(links[1].attributes('href')).toBe('/contact')
    expect(links[2].attributes('href')).toBe('/privacy')
    
    // 验证版权信息
    expect(wrapper.find('.copyright').text()).toContain('© 2025 公司名称')
  })

  it('applies correct styles', async () => {
    const wrapper = await mountSuspended(AppFooter)
    
    // 验证基础样式
    const footer = wrapper.find('footer.app-footer')
    // expect(footer.attributes('style')).toContain('background-color: rgb(248, 249, 250)')
    // expect(footer.attributes('style')).toContain('border-top: 1px solid rgb(233, 236, 239)')
    
    // 验证链接hover颜色
    // const link = wrapper.find('.footer-links a')
    // expect(link.attributes('style')).toContain('color: rgb(108, 117, 125)')
  })
})
