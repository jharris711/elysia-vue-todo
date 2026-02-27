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
        <div class="container">
            <div class="row mt-3">
                <div class="col-2"></div>
                <div class="col">
                    <div v-if="todo">
                        <div class="card w-100 text-center">
                            <div class="card-body">
                                <h5 class="card-title">{{  todo.title }}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">ID: {{ todo.id }}</h6>
                                <p class="card-text">{{ todo.description }}</p>
                                <a href="#" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                        </div>    
                    </div>
                </div>
                <div class="col-2"></div>
            </div>
        </div>   
    </RootLayout>
</template>

<style scoped>
</style>