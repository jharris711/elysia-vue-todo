<script setup lang="ts">
    import RootLayout from '@/layouts/RootLayout.vue';
    import { ref, onMounted, type Ref } from 'vue'

    import TodoCard from '../components/TodoCard.vue';

    const todos = ref(null)
    const isLoading = ref(true);
    const error: Ref<(null | string), (null | string)> = ref(null);
    const title = ref('');
    const description = ref('');
    const submitError = ref<string | null>(null);
    const isSubmitting = ref(false);

    const TODOS_API_ENDPOINT = "/api/todos"

    const fetchTodos = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await fetch(TODOS_API_ENDPOINT);

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
            const response = await fetch(TODOS_API_ENDPOINT, {
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
    <RootLayout>
        <div class="container">
            <div class="row mt-3">
                <form @submit="handleSubmit">
                    <div class="mb-3">
                        <label for="title" class="form-label"><strong>Title</strong></label>
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
                        <label for="description" class="form-label"><strong>Description</strong></label>
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
            
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3 " v-else-if="todos">
                <div class="col" v-for="todo in todos" :key="todo.id">
                    <TodoCard
                    :title="todo.title"
                    :id="todo.id"
                    :description="todo.description"
                    />
                </div>
            </div>
        </div>

    </RootLayout>
</template>

<style scoped></style>
