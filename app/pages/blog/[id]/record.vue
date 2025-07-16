<script lang="ts" setup>
const { params } = useRoute()

const id = params.id
</script>

<template>
  <div>
    <h2>Record for Blog ID: {{ id }}</h2>
  </div>
</template>
