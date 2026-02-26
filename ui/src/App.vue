<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const todos = ref(null)
  const isLoading = ref(true);
  const error = ref(null);

  const fetchTodos = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch('/api/todos')
      console.log(response)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      todos.value = await response.json();
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false;
    }

  }

  onMounted(fetchTodos)
</script> 

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>
    <h1>{{ todos[0].title }}</h1>
    <p>{{ todos[0].description }}</p>
  </div>
</template>

<style scoped></style>
