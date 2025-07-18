<script lang="ts" setup>
import { useBlogService } from '~/services/blog'

const blogService = useBlogService()
const { data: posts } = await blogService.list()
</script>

<template>
  <div class="blog-container">
    <h1>博客文章</h1>

    <div class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <NuxtLink :to="`/blog/${post.id}`" class="post-title">{{ post.title }}</NuxtLink>

        <div class="post-meta">
          <span class="post-date">{{ post.date }}</span>
          <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
        </div>
        <p class="post-summary">{{ post.summary }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.posts-list {
  margin-top: 30px;
}

.post-item {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.post-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.post-title:hover {
  color: #0066cc;
}

.post-meta {
  margin: 10px 0;
  color: #666;
  font-size: 0.9rem;
}

.post-tag {
  display: inline-block;
  margin-left: 10px;
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 4px;
}

.post-summary {
  color: #444;
  line-height: 1.6;
}
</style>
