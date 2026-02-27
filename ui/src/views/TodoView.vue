<script setup lang="ts">
    import RootLayout from '@/layouts/RootLayout.vue';
    import { ref, onMounted, type Ref } from 'vue'
    import { useRoute } from 'vue-router'

    interface Todo {
        id: string;
        title: string;
        description: string;
    }
    type TodoRef  = Ref<(null | Todo), (null | Todo)>
    type ErrorRef = Ref<(null | string), (null | string)>

    const route = useRoute();

    const TODOS_API_ENDPOINT = "/api/todos";
    const TODO_ID            = route.params.id;

    const todo: TodoRef   = ref(null);
    const isLoading       = ref(true);
    const error: ErrorRef = ref(null);

    const fetchTodo = async () => {
        try {
            const response = await fetch(`${TODOS_API_ENDPOINT}/${TODO_ID}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            todo.value = await response.json();
        } catch (err) {
            const e     = err  as Error
            error.value = e.message
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(fetchTodo);

</script> 

<template>
    <RootLayout>
        <div v-if="todo">To do view in vue: {{ todo.id }}</div>
    </RootLayout>
</template>

<style scoped>
</style>