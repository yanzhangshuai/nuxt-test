export const useBlogService = defineService({
  list() {
    return request.get<BlogPost[]>('blog-list', `/api/blog/list`)
  },

  get(id: number) {
    return request.get<BlogPost>('blog-detail', `/api/blog/${id}`)
  },
  // async createBlog(data: { title: string, content: string }) {
  //   return request.post('blog-create', '/api/blog/create', {
  //     body   : data,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  // },
  // async updateBlog(id: string, data: { title: string, content: string }) {
  //   return request.post('blog-update', `/api/blog/update/${id}`, {
  //     body   : data,
  //     headers: {        'Content-Type': 'application/json',
  //     },
  //   })
  // },
})
