<script setup lang="ts">
  import { ref, onMounted, type Ref } from 'vue'
  const todos = ref(null)
  const isLoading = ref(true);
  const error: Ref<(null | string), (null | string)> = ref(null);
  const title = ref('');
  const description = ref('');
  const submitError = ref<string | null>(null);
  const isSubmitting = ref(false);

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
      const e = err  as Error
      error.value = e.message
    } finally {
      isLoading.value = false;
    }
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    submitError.value = null;
    isSubmitting.value = true;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.value,
          description: description.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      // Clear form
      title.value = '';
      description.value = '';

      // Refresh todos list
      await fetchTodos();
    } catch (err) {
      const e = err as Error;
      submitError.value = e.message;
    } finally {
      isSubmitting.value = false;
    }
  }

  onMounted(fetchTodos)
</script> 

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Elysia/Vue To-Do App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a 
              class="nav-link active"
              aria-current="page"
              href="/"
            >
              Home
            </a>
          </li>
        </ul>
        <div class="d-flex gap-2">
          <a
            class="btn btn-primary"
            href="/"
          >
            Log In
          </a>
          <a
            class="btn btn-outline-primary"
            href="/"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  </nav>
    
  <div class="container">
    <div class="row mt-3">
      <form @submit="handleSubmit">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="title"
            placeholder="Give your to-do a title"
            required
          >
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea 
            class="form-control" 
            id="description" 
            v-model="description" 
            rows="3"
            required
          ></textarea>
        </div>
        <div class="mb-3" v-if="submitError">
          <div class="alert alert-danger" role="alert">
            {{ submitError }}
          </div>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creating...' : 'Create Todo' }}
          </button>
        </div>
      </form>
    </div>

  
    <div class="row mt-3" v-if="isLoading">Loading...</div>

    <div class="row mt-3" v-else-if="error">Error: {{ error }}</div>
    
    <div class="row mt-3" v-else-if="todos">
      <ul v-for="todo in todos" :key="todo.id">
        <li style="list-style: none;">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{ todo.title }}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">ID: {{ todo.id }}</h6>
              <p class="card-text">{{ todo.description }}</p>
              <a href="#" class="card-link">View Todo</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<style scoped></style>
