<script setup lang="ts">
    import RootLayout from '@/layouts/RootLayout.vue';
    import { ref, onMounted, type Ref } from 'vue'

    import TodoCard from '../components/todos/TodoCard.vue';
    import TodoForm from '@/components/todos/TodoForm.vue';

    
    type ErrorRef = Ref<(null | string), (null | string)>

    const todos           = ref(null)
    const isLoading       = ref(true);
    const error: ErrorRef = ref(null);
    const submitError     = ref<string | null>(null);
    const isSubmitting    = ref(false);

    const TODOS_API_ENDPOINT = "/api/todos"

    const fetchTodos = async () => {
        isLoading.value = true;
        error.value     = null;

        try {
            const response = await fetch(TODOS_API_ENDPOINT);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            todos.value = await response.json();
        } catch (err) {
            const e     = err  as Error
            error.value = e.message
        } finally {
            isLoading.value = false;
        }
    }

    const handleSubmit = async (data: { title: string, description: string }) => {
        submitError.value  = null;
        isSubmitting.value = true;

        try {
            const response = await fetch(TODOS_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create todo');
            }

            // Refresh todos list
            await fetchTodos();
        } catch (err) {
            const e           = err as Error;
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
                <TodoForm
                    :isSubmitting="isSubmitting"
                    :submitError="submitError"
                    @submit="handleSubmit" 
                />
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
