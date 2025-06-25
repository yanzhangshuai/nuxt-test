export interface BlogPost {
  id     : number
  title  : string
  content: string
  summary: string
  date   : string
  tags   : string[]
}

export const blogPosts: BlogPost[] = [
  {
    id     : 1,
    title  : '第一篇博客',
    content: '这是我的第一篇博客文章内容...',
    summary: '这是我的第一篇博客文章',
    date   : '2025-06-20',
    tags   : ['技术', 'Nuxt'],
  },
  {
    id     : 2,
    title  : 'Vue3新特性',
    content: 'Vue3的Composition API带来了许多改进...',
    summary: '探索Vue3的Composition API',
    date   : '2025-06-22',
    tags   : ['Vue', '前端'],
  },
  {
    id     : 3,
    title  : 'TypeScript实践',
    content: 'TypeScript可以显著提高代码质量...',
    summary: '如何在项目中应用TypeScript',
    date   : '2025-06-24',
    tags   : ['TypeScript', '开发'],
  },
]
