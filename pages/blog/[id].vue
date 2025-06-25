<script lang="ts" setup>
import type { BlogPost } from '~/server/api/blog/data'

const { params } = useRoute()
const id = Number(params.id)

const { data: post, pending, error } = await useFetch<BlogPost>(`/api/blog/${id}`, {
  lazy: true,
})

useHead({
  title: post.value?.title || '博客详情',
})
</script>

<template>
  <div class="blog-detail">
    <div v-if="pending" class="loading">加载中...</div>

    <div v-else-if="error" class="error">{{ error.message }}</div>

    <div v-else-if="post">
      <h1 class="title">{{ post.title }}</h1>
      <div class="meta">
        <span class="date">{{ post.date }}</span>
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="content" v-html="post.content" />
    </div>
    <div v-else class="error">文章不存在</div>
  </div>
</template>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.meta {
  color: #666;
  margin-bottom: 2rem;
}

.tag {
  display: inline-block;
  background: #eee;
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.content {
  line-height: 1.6;
}
</style>
