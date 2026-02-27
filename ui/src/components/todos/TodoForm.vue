<script setup lang="ts">
    import { ref } from 'vue';

    defineProps([
        'submitError',
        'isSubmitting',
    ]);

    // Define custom events this component can emit to its parent
    // This creates a typed 'submit' event that passes an object with title and description
    // Parent listens with: @submit="handleSubmit"
    const emit = defineEmits<{
        submit: [data: { title: string, description: string }]
    }>();

    const title       = ref('');
    const description = ref('');

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        emit('submit', {
            title: title.value,
            description: description.value
        });
        // Clear form after emitting
        title.value       = '';
        description.value = '';
    }
</script> 

<template>
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
</template>

<style scoped></style>