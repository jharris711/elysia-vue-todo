<script setup lang="ts">
    defineProps([
        'title',
        'id',
        'description'
    ])
</script>

<template>
    <div class="card h-100 mh-100" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">
                {{ title }}
            </h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
                ID: {{ id }}
            </h6>
            <p class="card-text text-truncate">
                {{ description }}
            </p>
        </div>
        <div class="card-footer text-body-secondary">
            <RouterLink :to="{ name: 'todoDetail', params: { id } }" class="card-link bottom">
                View Todo
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>